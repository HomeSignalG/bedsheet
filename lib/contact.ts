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
 */
export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.firstName.trim()) {
    errors.firstName = "Please enter your first name.";
  } else if (data.firstName.length > MAX_FIELD_LENGTH) {
    errors.firstName = `First name must be ${MAX_FIELD_LENGTH} characters or fewer.`;
  }

  if (!data.lastName.trim()) {
    errors.lastName = "Please enter your last name.";
  } else if (data.lastName.length > MAX_FIELD_LENGTH) {
    errors.lastName = `Last name must be ${MAX_FIELD_LENGTH} characters or fewer.`;
  }

  if (!data.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = "Please enter a valid email address, like name@company.com.";
  }

  if (data.company.length > MAX_FIELD_LENGTH) {
    errors.company = `Company must be ${MAX_FIELD_LENGTH} characters or fewer.`;
  }

  if (!inquiryTypes.includes(data.inquiryType as InquiryType)) {
    errors.inquiryType = "Please choose a type of inquiry.";
  }

  if (!data.subject.trim()) {
    errors.subject = "Please enter a subject.";
  } else if (data.subject.length > MAX_FIELD_LENGTH) {
    errors.subject = `Subject must be ${MAX_FIELD_LENGTH} characters or fewer.`;
  }

  if (!data.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (data.message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`;
  }

  // Buyer-specific fields are optional; only length-check them.
  for (const field of [
    "jobTitle",
    "companyWebsite",
    "retailOrganization",
    "storeCount",
  ] as const) {
    const value = data[field];
    if (value && value.length > MAX_FIELD_LENGTH) {
      errors[field] = `This field must be ${MAX_FIELD_LENGTH} characters or fewer.`;
    }
  }

  return errors;
}
