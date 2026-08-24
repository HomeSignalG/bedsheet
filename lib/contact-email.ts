/**
 * Renders the two emails a contact-form submission produces:
 *
 *   1. The notification to the business inbox — plain text, optimised for
 *      reading the submitted fields at a glance. Its `reply_to` is set to
 *      the sender by the delivery adapter, so replying answers them.
 *   2. The confirmation back to the sender — the receipt telling them their
 *      message really was sent, with a copy for their records.
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
 * Strips anything that does not belong on a header line and collapses
 * runs of whitespace.
 *
 * The notification subject is assembled from submitted values. Delivery
 * goes over a JSON API rather than raw SMTP, so a newline cannot inject a
 * header there — but a value that reaches a header must not carry line
 * breaks or control characters under any backend, and this keeps that true
 * whichever one `contact-delivery.ts` is pointed at.
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
 * The confirmation sent back to whoever filled in the form: proof the
 * message went through, what we received, and when to expect an answer.
 *
 * It quotes the submission back, so it carries text the sender supplied.
 * That is why the HTML part escapes every interpolated value and why the
 * subject line is fixed rather than built from their input.
 */
export function buildConfirmationEmail(
  data: ContactFormData,
  brand: EmailBrand,
): EmailContent {
  const subject = sanitizeHeader(
    `We received your message — ${brand.brandShort}`,
  );
  const greetingName = data.firstName.trim() || "there";

  const detailRows: [string, string][] = [
    ["Inquiry", data.inquiryType],
    ["Subject", data.subject],
  ];
  if (data.company.trim()) {
    detailRows.push(["Company", data.company.trim()]);
  }
  detailRows.push(...buyerFields(data));

  const text = [
    `Hi ${greetingName},`,
    "",
    `Thank you for contacting ${brand.brandName}. This email confirms that your`,
    "message was sent successfully and is now with our team. We typically",
    "respond within one business day.",
    "",
    "Here is a copy for your records:",
    "",
    ...detailRows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message",
    "-------",
    data.message,
    "",
    "There is no need to reply to this email — we will be in touch. If you",
    `need to reach us sooner, email ${brand.contactEmail}.`,
    "",
    `— The ${brand.brandShort} team`,
  ].join("\n");

  const rows = detailRows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#6f6a61;vertical-align:top;white-space:nowrap;">${escapeHtml(
          label,
        )}</td><td style="padding:4px 0;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="en"><body style="margin:0;padding:24px;background:#f4f1ea;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#2f2f2d;">
<div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2ddd2;border-radius:12px;padding:32px;">
<h1 style="margin:0 0 16px;font-size:20px;line-height:1.3;">We received your message</h1>
<p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Hi ${escapeHtml(greetingName)},</p>
<p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Thank you for contacting ${escapeHtml(
    brand.brandName,
  )}. This email confirms that your message was sent successfully and is now with our team. We typically respond within one business day.</p>
<p style="margin:24px 0 8px;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6f6a61;">Copy for your records</p>
<table role="presentation" style="width:100%;border-collapse:collapse;font-size:15px;line-height:1.6;">${rows}</table>
<p style="margin:20px 0 8px;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6f6a61;">Message</p>
<div style="white-space:pre-wrap;font-size:15px;line-height:1.6;border-left:3px solid #e2ddd2;padding:4px 0 4px 16px;">${escapeHtml(
    data.message,
  )}</div>
<p style="margin:28px 0 0;font-size:14px;line-height:1.6;color:#6f6a61;">There is no need to reply to this email — we will be in touch. If you need to reach us sooner, email <a href="mailto:${escapeHtml(
    brand.contactEmail,
  )}" style="color:#4a5a6b;">${escapeHtml(brand.contactEmail)}</a>.</p>
<p style="margin:16px 0 0;font-size:14px;line-height:1.6;">— The ${escapeHtml(
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
