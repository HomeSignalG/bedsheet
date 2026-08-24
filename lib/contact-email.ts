/**
 * Renders the two emails a contact-form submission produces:
 *
 *   1. The notification to the business inbox — plain text, optimised for
 *      reading the submitted fields at a glance. Its `reply_to` is set to
 *      the sender by the delivery adapter, so replying answers them.
 *   2. The confirmation back to the sender — the receipt telling them their
 *      message really was sent and where the answer will arrive. It carries
 *      no copy of the submission; see `buildConfirmationEmail` for why.
 *
 * These are pure functions with no environment or network access, so the
 * wording and the escaping are covered by unit tests. The delivery adapter
 * (`lib/contact-delivery.ts`) supplies the brand details and does the
 * sending.
 */

import type { ContactFormData } from "./contact";

/** Brand details the copy is built from, passed in by the caller. */
export interface EmailBrand {
  /** Full brand name, used in running copy. */
  brandName: string;
  /** Short brand name, used where the full one would crowd the line. */
  brandShort: string;
  /** The business inbox submissions are delivered to. */
  contactEmail: string;
}

export interface EmailContent {
  subject: string;
  text: string;
  /** Only the confirmation carries an HTML part. */
  html?: string;
}

/** Longest subject line either email will emit. */
const MAX_SUBJECT_LENGTH = 200;

/**
 * Longest the sender's first name may run in the confirmation greeting.
 * A name field accepts 200 characters, which is room enough to address a
 * paragraph at a stranger; a greeting needs far less than that.
 */
const MAX_GREETING_LENGTH = 40;

/**
 * Flattens a submitted value to a single bounded line: control characters
 * and line breaks become spaces, runs of whitespace collapse, and anything
 * past `maxLength` is truncated.
 *
 * Used for the notification subject, which is assembled from submitted
 * values. Delivery goes over a JSON API rather than raw SMTP, so a newline
 * cannot inject a header there — but a value that reaches a header must not
 * carry line breaks or control characters under any backend, and this keeps
 * that true whichever one `contact-delivery.ts` is pointed at. Also used for
 * the confirmation greeting, which is the one piece of sender-supplied text
 * that email still contains.
 */
export function sanitizeHeader(
  value: string,
  maxLength = MAX_SUBJECT_LENGTH,
): string {
  let stripped = "";
  for (const char of value) {
    const code = char.codePointAt(0) ?? 0;
    stripped += code < 0x20 || code === 0x7f ? " " : char;
  }
  const cleaned = stripped.replace(/\s+/g, " ").trim();
  return cleaned.length > maxLength
    ? `${cleaned.slice(0, maxLength - 1)}…`
    : cleaned;
}

/** Escapes text for interpolation into the HTML part of an email. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * The email sent to the business inbox. Plain text on purpose: it is read
 * for its field values, and every mail client renders text the same way.
 */
export function buildNotificationEmail(
  data: ContactFormData,
  brand: EmailBrand,
): EmailContent {
  const subject = sanitizeHeader(`[${data.inquiryType}] ${data.subject}`);

  const lines = [
    `Name:     ${data.firstName} ${data.lastName}`,
    `Email:    ${data.email}`,
    `Company:  ${data.company || "—"}`,
    `Inquiry:  ${data.inquiryType}`,
    `Subject:  ${data.subject}`,
  ];

  const filled = buyerFields(data);
  if (filled.length > 0) {
    lines.push("", "Retail buyer details");
    for (const [label, value] of filled) {
      lines.push(`${label}: ${value}`);
    }
  }

  lines.push("", "Message", "-------", data.message);
  lines.push(
    "",
    "—",
    `Sent from the ${brand.brandShort} contact form. Reply to this email to answer the sender directly.`,
  );

  return { subject, text: lines.join("\n") };
}

/**
 * The confirmation sent back to whoever filled in the form: proof the message
 * went through, and where the answer will arrive.
 *
 * It deliberately does NOT quote the submission back. This email goes to
 * whatever address was typed into the form, which nobody has verified — so
 * anything echoed into it is text an attacker can aim at a stranger's inbox
 * from a domain we care about the reputation of. The sender already knows
 * what they wrote; the copy is worth little to them and a lot to a spammer.
 * The full submission goes only to the business inbox, in the notification.
 *
 * What is left of the sender's input is their first name, in the greeting.
 * That is capped short and stripped of line breaks for the same reason, and
 * every interpolated value is escaped in the HTML part.
 */
export function buildConfirmationEmail(
  data: ContactFormData,
  brand: EmailBrand,
): EmailContent {
  const subject = sanitizeHeader(
    `We received your message \u2014 ${brand.brandShort}`,
  );
  const greeting = sanitizeHeader(data.firstName, MAX_GREETING_LENGTH) || "there";
  const replyTo = data.email.trim();

  const text = [
    `Hi ${greeting},`,
    "",
    `Thank you for contacting ${brand.brandName}. This email confirms that your`,
    "message was sent successfully and is now with our team.",
    "",
    `We will reply to ${replyTo}, typically within one business day.`,
    "",
    "There is no need to reply to this email. If you need to reach us sooner,",
    `email ${brand.contactEmail}.`,
    "",
    `\u2014 The ${brand.brandShort} team`,
  ].join("\n");

  const html = `<!doctype html>
<html lang="en"><body style="margin:0;padding:24px;background:#f4f1ea;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#2f2f2d;">
<div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2ddd2;border-radius:12px;padding:32px;">
<h1 style="margin:0 0 16px;font-size:20px;line-height:1.3;">We received your message</h1>
<p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Hi ${escapeHtml(greeting)},</p>
<p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Thank you for contacting ${escapeHtml(
    brand.brandName,
  )}. This email confirms that your message was sent successfully and is now with our team.</p>
<p style="margin:0 0 16px;font-size:15px;line-height:1.6;">We will reply to <strong>${escapeHtml(
    replyTo,
  )}</strong>, typically within one business day.</p>
<p style="margin:28px 0 0;font-size:14px;line-height:1.6;color:#6f6a61;">There is no need to reply to this email. If you need to reach us sooner, email <a href="mailto:${escapeHtml(
    brand.contactEmail,
  )}" style="color:#4a5a6b;">${escapeHtml(brand.contactEmail)}</a>.</p>
<p style="margin:16px 0 0;font-size:14px;line-height:1.6;">\u2014 The ${escapeHtml(
    brand.brandShort,
  )} team</p>
</div></body></html>`;

  return { subject, text, html };
}

/** The optional retail-buyer fields that were actually filled in. */
function buyerFields(data: ContactFormData): [string, string][] {
  const candidates: [string, string | undefined][] = [
    ["Job title", data.jobTitle],
    ["Website", data.companyWebsite],
    ["Retail org", data.retailOrganization],
    ["Stores", data.storeCount],
  ];
  return candidates
    .filter((entry): entry is [string, string] => Boolean(entry[1]?.trim()))
    .map(([label, value]) => [label, value.trim()]);
}
