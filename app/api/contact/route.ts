import { NextResponse } from "next/server";
import {
  HONEYPOT_FIELD,
  MAX_BODY_BYTES,
  validateContactForm,
  type ContactFormData,
} from "@/lib/contact";
import {
  deliverContactSubmission,
  DeliveryNotConfiguredError,
} from "@/lib/contact-delivery";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/config/site";

/** Submissions allowed from one client per window. */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json(
      { ok: false, error: "Request origin not allowed." },
      { status: 403 },
    );
  }

  const limit = rateLimit(clientKey(request), {
    limit: RATE_LIMIT,
    windowMs: RATE_WINDOW_MS,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let raw: string;
  try {
    raw = await readBody(request);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Request body too large." },
      { status: 413 },
    );
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  // Decoy field: only an automated client fills it in. Answer 200 so the
  // bot has nothing to tune against, and drop the submission. Logged
  // because this is the one path that drops a message while reporting
  // success — if a real sender ever trips it, the log is the only trace.
  if (readString(body, HONEYPOT_FIELD)) {
    console.info("[contact] submission dropped: decoy field was filled in.");
    return NextResponse.json({ ok: true });
  }

  const data = normalize(body);
  const errors = validateContactForm(data);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  try {
    await deliverContactSubmission(data);
  } catch (error) {
    // Never report success for a message that was not delivered. The reason
    // stays server-side; the sender gets the fallback email address.
    console.error("[contact] delivery failed:", error);
    const status = error instanceof DeliveryNotConfiguredError ? 503 : 502;
    return NextResponse.json(
      {
        ok: false,
        error: `Your message could not be sent. Please email ${siteConfig.email} directly.`,
      },
      { status },
    );
  }

  return NextResponse.json({ ok: true });
}

/**
 * Delivery configuration check.
 *
 * A delivery failure is reported to the sender as one deliberately vague
 * sentence — the browser must never be told anything about the server's
 * configuration. The cost is that "CONTACT_DELIVERY was never set" and
 * "Resend rejected the key" look identical from the outside, so whoever runs
 * the site cannot tell which one they have without shell access to the logs.
 *
 * This answers that question over HTTP. It reports which pieces of
 * configuration are present as booleans only — never a key, never a secret,
 * and nothing an attacker could not already infer by submitting the form and
 * reading the error. Answers 503 while delivery cannot work, so an uptime
 * check can watch it.
 *
 * GET handlers are dynamic by default in Next 16, so this reads the live
 * environment on every request rather than whatever was set at build time.
 */
export async function GET() {
  const mode = process.env.CONTACT_DELIVERY ?? null;
  const contactFromEmailSet = Boolean(process.env.CONTACT_FROM_EMAIL);
  const smtpHostSet = Boolean(process.env.SMTP_HOST);
  const smtpUserSet = Boolean(process.env.SMTP_USER);
  const smtpPasswordSet = Boolean(process.env.SMTP_PASSWORD);
  const resendApiKeySet = Boolean(process.env.RESEND_API_KEY);
  const problems: string[] = [];

  if (!mode) {
    problems.push(
      'CONTACT_DELIVERY is not set. Set it to "smtp" to send through your mail host, or "resend" to send through the Resend API.',
    );
  } else if (mode === "smtp") {
    if (!smtpHostSet) problems.push("SMTP_HOST is not set.");
    if (!smtpUserSet) problems.push("SMTP_USER is not set.");
    if (!smtpPasswordSet) problems.push("SMTP_PASSWORD is not set.");
    if (!contactFromEmailSet) {
      problems.push(
        "CONTACT_FROM_EMAIL is not set. It should be the mailbox the SMTP credentials belong to.",
      );
    }
  } else if (mode === "resend") {
    if (!resendApiKeySet) {
      problems.push('RESEND_API_KEY is not set, and CONTACT_DELIVERY="resend" requires it.');
    }
    if (!contactFromEmailSet) {
      problems.push(
        'CONTACT_FROM_EMAIL is not set, and CONTACT_DELIVERY="resend" requires it. It must be an address on a domain verified in Resend.',
      );
    }
  } else if (mode === "log") {
    problems.push(
      'CONTACT_DELIVERY="log" only prints submissions to the server console and is refused outright in production. Set it to "smtp" or "resend".',
    );
  } else {
    problems.push(
      'CONTACT_DELIVERY is set to an unknown mode. Use "smtp" or "resend".',
    );
  }

  const ready = problems.length === 0;

  return NextResponse.json(
    {
      ready,
      deliveryMode: mode,
      contactFromEmailSet,
      smtpHostSet,
      smtpUserSet,
      smtpPasswordSet,
      smtpPort: process.env.SMTP_PORT ?? null,
      resendApiKeySet,
      deliversTo: siteConfig.email,
      problems,
    },
    {
      status: ready ? 200 : 503,
      // Never let a proxy or CDN serve a stale answer: the whole point is to
      // reflect the environment the server is running with right now.
      headers: { "Cache-Control": "no-store" },
    },
  );
}

/**
 * Rejects cross-site posts. Browsers always attach `Origin` to a
 * same-origin POST, so a request that carries one from somewhere else is
 * refused; one with no `Origin` at all (curl, a server-to-server call) is
 * allowed through to the rate limiter and validator.
 */
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const host = request.headers.get("host");
  try {
    const originHost = new URL(origin).host;
    if (host && originHost === host) return true;
    return originHost === new URL(siteConfig.baseUrl).host;
  } catch {
    return false;
  }
}

/**
 * Reads the body as text, refusing anything over `MAX_BODY_BYTES` — checking
 * `Content-Length` first, then counting as the stream arrives so a lying or
 * absent header cannot get past it.
 */
async function readBody(request: Request): Promise<string> {
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) {
    throw new Error("body too large");
  }

  const body = request.body;
  if (!body) return "";

  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.length;
      if (total > MAX_BODY_BYTES) {
        throw new Error("body too large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const joined = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    joined.set(chunk, offset);
    offset += chunk.length;
  }
  return new TextDecoder().decode(joined);
}

function readString(body: unknown, key: string): string {
  if (typeof body !== "object" || body === null) return "";
  const value = (body as Record<string, unknown>)[key];
  return typeof value === "string" ? value.trim() : "";
}

/** Coerces unknown JSON into a ContactFormData shape with trimmed strings. */
function normalize(body: unknown): ContactFormData {
  return {
    firstName: readString(body, "firstName"),
    lastName: readString(body, "lastName"),
    email: readString(body, "email"),
    company: readString(body, "company"),
    inquiryType: readString(body, "inquiryType"),
    subject: readString(body, "subject"),
    message: readString(body, "message"),
    jobTitle: readString(body, "jobTitle"),
    companyWebsite: readString(body, "companyWebsite"),
    retailOrganization: readString(body, "retailOrganization"),
    storeCount: readString(body, "storeCount"),
  };
}
