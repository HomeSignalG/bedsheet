import type { ContactFormData } from "@/lib/contact";

/**
 * Delivery adapter for contact-form submissions.
 *
 * The API route validates the submission and then hands it to
 * `deliverContactSubmission`. Swapping in a real backend later
 * (Supabase, Resend, Formspree, or another form/email service) means
 * replacing only this function — no page or form changes required.
 *
 * Example future implementations:
 *   - Supabase:  insert the submission into a `contact_submissions` table.
 *   - Resend:    send the submission to siteConfig.email via the Resend API.
 *   - Formspree: POST the fields to a Formspree endpoint.
 */
export async function deliverContactSubmission(
  data: ContactFormData,
): Promise<void> {
  // Development-safe implementation: log to the server console only.
  // Nothing is emailed or stored, and no third-party service is contacted.
  console.info("[contact] submission received (dev mode, not delivered):", {
    ...data,
    receivedAt: new Date().toISOString(),
  });
}
