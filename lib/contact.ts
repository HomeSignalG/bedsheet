/**
 * Contact form schema and validation, shared by the client form and the
 * API route so the two can never drift apart.
 */

export const inquiryTypes = [
  "Retail Buyer / Retail Partnership",
  "Distributor",
  "Media / Press",
  "Product Inquiry",
  "General Inquiry",
  "Other",
] as const;

export type InquiryType = (typeof inquiryTypes)[number];

export const RETAIL_INQUIRY: InquiryType = "Retail Buyer / Retail Partnership";

/**
 * Name of the decoy field. It is rendered off-screen and hidden from
 * assistive tech, so only an automated client fills it in; the API route
 * rejects any submission that does. Deliberately plausible-looking —
 * "honeypot" in the name would defeat the point.
 */
export const HONEYPOT_FIELD = "websiteUrl";

/**
 * Largest request body the API route will read, in bytes. Comfortably above
 * a full submission (the message alone is capped at 5,000 characters) and
 * far below anything worth parsing.
 */
export const MAX_BODY_BYTES = 64 * 1024;

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  inquiryType: string;
  subject: string;
  message: string;
  /** Optional buyer-specific fields, shown for retail inquiries. */
  jobTitle?: string;
  companyWebsite?: string;
  retailOrganization?: string;
  storeCount?: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

/**
 * Validates the form data. Returns an empty object when everything passes.
 * Used on the client for inline errors and on the server as the source of
 * truth.
 *
 * Length is measured on the trimmed value, matching what actually gets
 * stored and what the counts in the messages refer to.
 */
export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const firstName = data.firstName.trim();
  if (!firstName) {
    errors.firstName = "Please enter your first name.";
  } else if (firstName.length > MAX_FIELD_LENGTH) {
    errors.firstName = `First name must be ${MAX_FIELD_LENGTH} characters or fewer.`;
  }

  const lastName = data.lastName.trim();
  if (!lastName) {
    errors.lastName = "Please enter your last name.";
  } else if (lastName.length > MAX_FIELD_LENGTH) {
    errors.lastName = `Last name must be ${MAX_FIELD_LENGTH} characters or fewer.`;
  }

  const email = data.email.trim();
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address, like name@company.com.";
  } else if (email.length > MAX_FIELD_LENGTH) {
    errors.email = `Email address must be ${MAX_FIELD_LENGTH} characters or fewer.`;
  }

  if (data.company.trim().length > MAX_FIELD_LENGTH) {
    errors.company = `Company must be ${MAX_FIELD_LENGTH} characters or fewer.`;
  }

  if (!inquiryTypes.includes(data.inquiryType as InquiryType)) {
    errors.inquiryType = "Please choose a type of inquiry.";
  }

  const subject = data.subject.trim();
  if (!subject) {
    errors.subject = "Please enter a subject.";
  } else if (subject.length > MAX_FIELD_LENGTH) {
    errors.subject = `Subject must be ${MAX_FIELD_LENGTH} characters or fewer.`;
  }

  const message = data.message.trim();
  if (!message) {
    errors.message = "Please enter a message.";
  } else if (message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`;
  }

  // Buyer-specific fields are optional; only length-check them.
  for (const field of [
    "jobTitle",
    "companyWebsite",
    "retailOrganization",
    "storeCount",
  ] as const) {
    const value = data[field]?.trim();
    if (value && value.length > MAX_FIELD_LENGTH) {
      errors[field] = `This field must be ${MAX_FIELD_LENGTH} characters or fewer.`;
    }
  }

  return errors;
}
