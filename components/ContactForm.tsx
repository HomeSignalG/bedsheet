"use client";

import { useId, useRef, useState } from "react";
import {
  inquiryTypes,
  RETAIL_INQUIRY,
  validateContactForm,
  type ContactFormData,
  type ContactFormErrors,
} from "@/lib/contact";

const emptyForm: ContactFormData = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  inquiryType: "",
  subject: "",
  message: "",
  jobTitle: "",
  companyWebsite: "",
  retailOrganization: "",
  storeCount: "",
};

type Status = "idle" | "submitting" | "success" | "error";

/* Labels sit inside the field border, per the design mockups. */
const fieldBoxClasses =
  "rounded-md border bg-cream px-4 py-2.5 focus-within:border-slate focus-within:ring-2 focus-within:ring-slate/25";
const boxLabelClasses = "block text-xs font-medium text-warmgray";
const controlClasses =
  "w-full border-0 bg-transparent p-0 pt-0.5 text-charcoal placeholder:text-warmgray focus:outline-none";
const errorClasses = "mt-2 text-sm text-red-700";

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(emptyForm);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const idPrefix = useId();
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const showBuyerFields = form.inquiryType === RETAIL_INQUIRY;
  const fieldId = (name: keyof ContactFormData) => `${idPrefix}-${name}`;

  function setField(name: keyof ContactFormData, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
    // Clear the field's error as soon as the user edits it.
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateContactForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("idle");
      // Move focus to the error summary so the problem is announced.
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as {
        ok: boolean;
        errors?: ContactFormErrors;
      };
      if (!response.ok || !result.ok) {
        setErrors(result.errors ?? {});
        setStatus("error");
        requestAnimationFrame(() => errorSummaryRef.current?.focus());
        return;
      }
      setForm(emptyForm);
      setErrors({});
      setStatus("success");
    } catch {
      setStatus("error");
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
    }
  }

  const errorEntries = Object.entries(errors) as [keyof ContactFormData, string][];

  if (status === "success") {
    return (
      <div
        role="status"
        className="border border-slate bg-cream p-8 text-center"
      >
        <h3 className="font-serif text-2xl">Thank you.</h3>
        <p className="mt-3 leading-relaxed text-warmgray">
          Your message has been received. We&rsquo;ll get back to you by email as
          soon as we can.
        </p>
        <p className="mt-6">
          <button
            type="button"
            className="text-sm font-medium uppercase tracking-[0.18em] text-slate-deep underline underline-offset-4"
            onClick={() => setStatus("idle")}
          >
            Send another message
          </button>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {(errorEntries.length > 0 || status === "error") && (
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          className="border border-red-700/40 bg-red-50 p-5 text-sm text-red-800"
        >
          {errorEntries.length > 0 ? (
            <>
              <p className="font-medium">
                Please fix the following before sending your message:
              </p>
              <ul className="mt-2 list-disc pl-5">
                {errorEntries.map(([field, message]) => (
                  <li key={field}>
                    <a href={`#${fieldId(field)}`} className="underline underline-offset-2">
                      {message}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="font-medium">
              Something went wrong sending your message. Please try again.
            </p>
          )}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id={fieldId("firstName")}
          label="First Name"
          autoComplete="given-name"
          required
          value={form.firstName}
          error={errors.firstName}
          onChange={(value) => setField("firstName", value)}
        />
        <TextField
          id={fieldId("lastName")}
          label="Last Name"
          autoComplete="family-name"
          required
          value={form.lastName}
          error={errors.lastName}
          onChange={(value) => setField("lastName", value)}
        />
      </div>

      <TextField
        id={fieldId("email")}
        label="Email Address"
        type="email"
        autoComplete="email"
        required
        value={form.email}
        error={errors.email}
        onChange={(value) => setField("email", value)}
      />

      <TextField
        id={fieldId("company")}
        label="Company / Organization"
        autoComplete="organization"
        value={form.company}
        error={errors.company}
        onChange={(value) => setField("company", value)}
      />

      <div>
        <div
          className={`${fieldBoxClasses} ${
            errors.inquiryType ? "border-red-700/60" : "border-stone"
          }`}
        >
          <label htmlFor={fieldId("inquiryType")} className={boxLabelClasses}>
            Type of Inquiry <RequiredMark />
          </label>
          <select
            id={fieldId("inquiryType")}
            value={form.inquiryType}
            required
            aria-invalid={errors.inquiryType ? true : undefined}
            aria-describedby={errors.inquiryType ? `${fieldId("inquiryType")}-error` : undefined}
            onChange={(event) => setField("inquiryType", event.target.value)}
            className={controlClasses}
          >
            <option value="">Please select an option</option>
            {inquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        {errors.inquiryType && (
          <p id={`${fieldId("inquiryType")}-error`} className={errorClasses}>
            {errors.inquiryType}
          </p>
        )}
      </div>

      {showBuyerFields && (
        <fieldset className="space-y-6 border border-stone bg-ivory p-6">
          <legend className="px-2 text-sm font-semibold uppercase tracking-[0.18em] text-charcoal">
            Retail buyer details (optional)
          </legend>
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField
              id={fieldId("jobTitle")}
              label="Job Title"
              autoComplete="organization-title"
              value={form.jobTitle ?? ""}
              error={errors.jobTitle}
              onChange={(value) => setField("jobTitle", value)}
            />
            <TextField
              id={fieldId("companyWebsite")}
              label="Company Website"
              type="url"
              autoComplete="url"
              placeholder="https://"
              value={form.companyWebsite ?? ""}
              error={errors.companyWebsite}
              onChange={(value) => setField("companyWebsite", value)}
            />
            <TextField
              id={fieldId("retailOrganization")}
              label="Retail Organization"
              value={form.retailOrganization ?? ""}
              error={errors.retailOrganization}
              onChange={(value) => setField("retailOrganization", value)}
            />
            <TextField
              id={fieldId("storeCount")}
              label="Number of Stores / Locations"
              inputMode="numeric"
              value={form.storeCount ?? ""}
              error={errors.storeCount}
              onChange={(value) => setField("storeCount", value)}
            />
          </div>
        </fieldset>
      )}

      <TextField
        id={fieldId("subject")}
        label="Subject"
        required
        value={form.subject}
        error={errors.subject}
        onChange={(value) => setField("subject", value)}
      />

      <div>
        <div
          className={`${fieldBoxClasses} ${
            errors.message ? "border-red-700/60" : "border-stone"
          }`}
        >
          <label htmlFor={fieldId("message")} className={boxLabelClasses}>
            Message <RequiredMark />
          </label>
          <textarea
            id={fieldId("message")}
            rows={6}
            required
            placeholder="How can we help?"
            value={form.message}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? `${fieldId("message")}-error` : undefined}
            onChange={(event) => setField("message", event.target.value)}
            className={`${controlClasses} resize-y`}
          />
        </div>
        {errors.message && (
          <p id={`${fieldId("message")}-error`} className={errorClasses}>
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full cursor-pointer rounded-md bg-charcoal px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-charcoal-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
      <p className="text-sm text-warmgray">
        <span className="text-red-700" aria-hidden="true">
          *
        </span>{" "}
        Required field
      </p>
    </form>
  );
}

function RequiredMark() {
  return (
    <span className="text-red-700" aria-hidden="true">
      *
    </span>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required = false,
  autoComplete,
  placeholder,
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  inputMode?: "numeric";
}) {
  return (
    <div>
      <div
        className={`${fieldBoxClasses} ${
          error ? "border-red-700/60" : "border-stone"
        }`}
      >
        <label htmlFor={id} className={boxLabelClasses}>
          {label} {required && <RequiredMark />}
        </label>
        <input
          id={id}
          type={type}
          value={value}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          inputMode={inputMode}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(event) => onChange(event.target.value)}
          className={controlClasses}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className={errorClasses}>
          {error}
        </p>
      )}
    </div>
  );
}
