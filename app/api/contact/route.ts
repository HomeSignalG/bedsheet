import { NextResponse } from "next/server";
import { validateContactForm, type ContactFormData } from "@/lib/contact";
import { deliverContactSubmission } from "@/lib/contact-delivery";

// TODO (spam protection, before connecting a live backend):
//   - Add a honeypot field check (reject submissions that fill it).
//   - Add rate limiting per IP (e.g. an in-memory or KV-backed limiter).
//   - Consider a privacy-friendly CAPTCHA (e.g. Cloudflare Turnstile)
//     if automated submissions become a problem.
//   - Verify the Origin header against the configured base URL.

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const data = normalize(body);
  const errors = validateContactForm(data);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  await deliverContactSubmission(data);

  return NextResponse.json({ ok: true });
}

/** Coerces unknown JSON into a ContactFormData shape with trimmed strings. */
function normalize(body: unknown): ContactFormData {
  const source = (typeof body === "object" && body !== null ? body : {}) as Record<
    string,
    unknown
  >;
  const str = (key: string): string =>
    typeof source[key] === "string" ? (source[key] as string).trim() : "";

  return {
    firstName: str("firstName"),
    lastName: str("lastName"),
    email: str("email"),
    company: str("company"),
    inquiryType: str("inquiryType"),
    subject: str("subject"),
    message: str("message"),
    jobTitle: str("jobTitle"),
    companyWebsite: str("companyWebsite"),
    retailOrganization: str("retailOrganization"),
    storeCount: str("storeCount"),
  };
}
