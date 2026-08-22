import type { ContactFormData } from "@/lib/contact";
import { siteConfig } from "@/config/site";

/**
 * Delivery adapter for contact-form submissions.
 *
 * The API route validates the submission and then hands it to
 * `deliverContactSubmission`. Delivery either succeeds or throws — the route
 * turns a throw into a 5xx and the form tells the sender their message did
 * not go through. Nothing here may swallow a failure: a form that reports
 * success while dropping the message loses leads silently.
 *
 * Two modes, chosen by environment:
 *
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

export async function deliverContactSubmission(
  data: ContactFormData,
): Promise<void> {
  const mode = process.env.CONTACT_DELIVERY;

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
    console.info("[contact] submission received (log mode, not delivered):", {
      ...data,
      receivedAt: new Date().toISOString(),
    });
    return;
  }

  throw new DeliveryNotConfiguredError(
    "CONTACT_DELIVERY is not set. Contact-form submissions have nowhere to go.",
  );
}

async function deliverViaResend(data: ContactFormData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    throw new DeliveryNotConfiguredError(
      'CONTACT_DELIVERY="resend" requires both RESEND_API_KEY and CONTACT_FROM_EMAIL.',
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [siteConfig.email],
      reply_to: data.email,
      subject: `[${data.inquiryType}] ${data.subject}`,
      text: formatSubmission(data),
    }),
  });

  if (!response.ok) {
    // The body may carry the reason; it is safe to log server-side but is
    // never returned to the browser.
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Resend rejected the submission (${response.status}). ${detail}`.trim(),
    );
  }
}

/** Plain-text rendering of a submission, used as the email body. */
function formatSubmission(data: ContactFormData): string {
  const lines = [
    `Name:     ${data.firstName} ${data.lastName}`,
    `Email:    ${data.email}`,
    `Company:  ${data.company || "—"}`,
    `Inquiry:  ${data.inquiryType}`,
    `Subject:  ${data.subject}`,
  ];

  const buyerFields: [string, string | undefined][] = [
    ["Job title", data.jobTitle],
    ["Website", data.companyWebsite],
    ["Retail org", data.retailOrganization],
    ["Stores", data.storeCount],
  ];
  const filled = buyerFields.filter(([, value]) => value);

  if (filled.length > 0) {
    lines.push("", "Retail buyer details");
    for (const [label, value] of filled) {
      lines.push(`${label}: ${value}`);
    }
  }

  lines.push("", "Message", "-------", data.message);
  return lines.join("\n");
}
