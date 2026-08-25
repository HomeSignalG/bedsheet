import type { ContactFormData } from "@/lib/contact";
import {
  buildConfirmationEmail,
  buildNotificationEmail,
  type EmailBrand,
  type EmailContent,
} from "@/lib/contact-email";
import { siteConfig } from "@/config/site";

/**
 * Delivery adapter for contact-form submissions.
 *
 * The API route validates the submission and then hands it to
 * `deliverContactSubmission`, which sends two emails:
 *
 *   1. The notification to `siteConfig.email` — the business inbox. This is
 *      the message itself, and it must succeed. If it fails, this function
 *      throws, the route answers 5xx, and the form tells the sender their
 *      message did not go through. Nothing here may swallow that failure: a
 *      form that reports success while dropping the message loses leads
 *      silently.
 *   2. The confirmation back to the address the sender typed in, so they
 *      have proof it was sent. This one is best-effort — it is sent second,
 *      and a failure is logged rather than thrown. The lead is already in
 *      the inbox by that point, and telling the sender "your message could
 *      not be sent" when it was would only produce a duplicate submission.
 *
 * Three modes, chosen by environment:
 *
 *   CONTACT_DELIVERY=smtp     Send through an ordinary SMTP server — the
 *                             mailbox the site already owns, using the
 *                             credentials the web host provides. Requires
 *                             SMTP_HOST, SMTP_USER, SMTP_PASSWORD and
 *                             CONTACT_FROM_EMAIL; SMTP_PORT and SMTP_SECURE
 *                             are optional.
 *   CONTACT_DELIVERY=resend   Send via the Resend API. Requires
 *                             RESEND_API_KEY and CONTACT_FROM_EMAIL.
 *   CONTACT_DELIVERY=log      Log to the server console. Development only;
 *                             refused when NODE_ENV is "production".
 *
 * With CONTACT_DELIVERY unset, delivery fails loudly. To add another backend
 * (Supabase, Formspree, SES), add a branch here — no page or form changes
 * are required.
 */

export class DeliveryNotConfiguredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DeliveryNotConfiguredError";
  }
}

/** Brand details the email copy is rendered from. */
const brand: EmailBrand = {
  brandName: siteConfig.brandName,
  brandShort: siteConfig.brandShort,
  contactEmail: siteConfig.email,
};

export async function deliverContactSubmission(
  data: ContactFormData,
): Promise<void> {
  const mode = process.env.CONTACT_DELIVERY;

  if (mode === "smtp") {
    await deliverViaSmtp(data);
    return;
  }

  if (mode === "resend") {
    await deliverViaResend(data);
    return;
  }

  if (mode === "log") {
    if (process.env.NODE_ENV === "production") {
      throw new DeliveryNotConfiguredError(
        'CONTACT_DELIVERY="log" is a development-only mode and will not run in production.',
      );
    }
    const notification = buildNotificationEmail(data, brand);
    const confirmation = buildConfirmationEmail(data, brand);
    console.info("[contact] submission received (log mode, not delivered):", {
      receivedAt: new Date().toISOString(),
      notification: {
        to: siteConfig.email,
        replyTo: data.email,
        subject: notification.subject,
        text: notification.text,
      },
      confirmation: {
        to: data.email,
        replyTo: siteConfig.email,
        subject: confirmation.subject,
        text: confirmation.text,
      },
    });
    return;
  }

  throw new DeliveryNotConfiguredError(
    "CONTACT_DELIVERY is not set. Contact-form submissions have nowhere to go.",
  );
}

/**
 * Sends through a plain SMTP server — the same credentials a mail client
 * would use for the site's own mailbox. This is the path that needs no
 * third-party account and no DNS work: the host already runs the mail
 * server for the address the site publishes.
 *
 * `SMTP_PORT` defaults to 587, the submission port, which starts plaintext
 * and upgrades with STARTTLS; 465 is implicit TLS from the first byte.
 * `SMTP_SECURE` overrides that inference for a host that does something
 * unusual. TLS is required either way — `requireTLS` makes a server that
 * cannot upgrade fail loudly rather than sending the password in the clear.
 */
/** What a live connection test found. Carries no secret. */
export interface DeliveryProbe {
  ok: boolean;
  /** How far the connection got: dns, connect, tls, auth, or ready. */
  stage: string;
  /** SMTP status code, when the server issued one. */
  code?: number;
  /** The server's own response line, or the transport error. */
  detail?: string;
}

/**
 * Opens a real connection to the mail server and authenticates, without
 * sending anything.
 *
 * The POST handler cannot report why delivery failed — the browser must
 * never learn about the server's configuration — so the reason only reaches
 * the host's log. On a host whose log box streams from the moment it is
 * opened, that reason is easy to miss entirely. This makes it retrievable.
 *
 * What it returns is the mail server's own verdict on our credentials: a
 * status code and the response line, e.g. 535 "Invalid login or password".
 * No password, no key, and nothing an attacker could not learn by submitting
 * the form and watching it fail — but enough for whoever runs the site to
 * tell "wrong password" from "wrong port" without shell access.
 */
export async function probeDelivery(): Promise<DeliveryProbe> {
  const mode = process.env.CONTACT_DELIVERY;

  if (mode !== "smtp") {
    return {
      ok: false,
      stage: "unsupported",
      detail: `Live probing is implemented for CONTACT_DELIVERY="smtp"; this server is set to ${
        mode ? `"${mode}"` : "nothing"
      }.`,
    };
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  if (!host || !user || !pass) {
    return { ok: false, stage: "config", detail: "SMTP settings are incomplete." };
  }

  const port = Number(process.env.SMTP_PORT ?? 587);
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === "true"
    : port === 465;

  const { createTransport } = await import("nodemailer");
  const transport = createTransport({
    host,
    port,
    secure,
    requireTLS: !secure,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 10_000,
  });

  try {
    await transport.verify();
    return { ok: true, stage: "ready", detail: "Authenticated successfully." };
  } catch (error) {
    const e = error as { code?: string; responseCode?: number; response?: string; message?: string };
    const detail = e.response || e.message || String(error);
    // nodemailer reports ESOCKET for a refused connection and for a TLS
    // failure alike, so fall through to the underlying errno. The point of
    // the stage is to say which thing to go and fix — a wrong password and
    // an unreachable port must not read the same.
    const stage =
      e.code === "EAUTH" ? "auth"
      : /ENOTFOUND|EAI_AGAIN/.test(detail) ? "dns"
      : /ECONNREFUSED|ETIMEDOUT|EHOSTUNREACH|ENETUNREACH/.test(detail) ? "connect"
      : e.code === "ETIMEDOUT" || e.code === "ECONNECTION" ? "connect"
      : e.code === "ESOCKET" || e.code === "ETLS" ? "tls"
      : "unknown";
    return { ok: false, stage, code: e.responseCode, detail };
  } finally {
    transport.close();
  }
}

async function deliverViaSmtp(data: ContactFormData): Promise<void> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const from = process.env.CONTACT_FROM_EMAIL;

  const missing = [
    !host && "SMTP_HOST",
    !user && "SMTP_USER",
    !pass && "SMTP_PASSWORD",
    !from && "CONTACT_FROM_EMAIL",
  ].filter(Boolean);

  if (missing.length > 0 || !host || !user || !pass || !from) {
    throw new DeliveryNotConfiguredError(
      `CONTACT_DELIVERY="smtp" requires ${missing.join(", ")}.`,
    );
  }

  const port = Number(process.env.SMTP_PORT ?? 587);
  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new DeliveryNotConfiguredError(
      `SMTP_PORT is not a valid port number: "${process.env.SMTP_PORT}".`,
    );
  }

  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === "true"
    : port === 465;

  // Imported here rather than at module scope so that the other delivery
  // modes, and the config check, never pay to load it.
  const { createTransport } = await import("nodemailer");
  const transport = createTransport({
    host,
    port,
    secure,
    requireTLS: !secure,
    auth: { user, pass },
  });

  try {
    // The message itself. A throw here reaches the sender as a failure.
    const notification = buildNotificationEmail(data, brand);
    await transport.sendMail({
      from,
      to: siteConfig.email,
      replyTo: data.email,
      subject: notification.subject,
      text: notification.text,
    });

    // The sender's receipt. Best-effort, see the note at the top.
    const confirmation = buildConfirmationEmail(data, brand);
    try {
      await transport.sendMail({
        from,
        to: data.email,
        replyTo: siteConfig.email,
        subject: confirmation.subject,
        text: confirmation.text,
        html: confirmation.html,
      });
    } catch (error) {
      console.error(
        `[contact] notification delivered, but the confirmation to ${data.email} failed:`,
        error,
      );
    }
  } finally {
    // Without this the pooled connection keeps the process's event loop
    // busy well past the response.
    transport.close();
  }
}

async function deliverViaResend(data: ContactFormData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    throw new DeliveryNotConfiguredError(
      'CONTACT_DELIVERY="resend" requires both RESEND_API_KEY and CONTACT_FROM_EMAIL.',
    );
  }

  // The message itself. A throw here is the whole point of the adapter
  // contract — the sender is told it did not go through.
  const notification = buildNotificationEmail(data, brand);
  await sendViaResend(apiKey, {
    from,
    to: [siteConfig.email],
    reply_to: data.email,
    subject: notification.subject,
    text: notification.text,
  });

  // The sender's receipt. Best-effort by design, see the note at the top.
  const confirmation = buildConfirmationEmail(data, brand);
  try {
    await sendViaResend(apiKey, {
      from,
      to: [data.email],
      reply_to: siteConfig.email,
      subject: confirmation.subject,
      text: confirmation.text,
      html: confirmation.html,
    });
  } catch (error) {
    console.error(
      `[contact] notification delivered, but the confirmation to ${data.email} failed:`,
      error,
    );
  }
}

interface ResendPayload extends EmailContent {
  from: string;
  to: string[];
  reply_to: string;
}

async function sendViaResend(
  apiKey: string,
  payload: ResendPayload,
): Promise<void> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    // The body may carry the reason; it is safe to log server-side but is
    // never returned to the browser.
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Resend rejected the email to ${payload.to.join(", ")} (${response.status}). ${detail}`.trim(),
    );
  }
}
