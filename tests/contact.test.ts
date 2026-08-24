import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  HONEYPOT_FIELD,
  MAX_BODY_BYTES,
  inquiryTypes,
  validateContactForm,
  type ContactFormData,
} from "../lib/contact.ts";

function form(overrides: Partial<ContactFormData> = {}): ContactFormData {
  return {
    firstName: "Ann",
    lastName: "Lee",
    email: "ann@shop.example",
    company: "Shop Co",
    inquiryType: "General Inquiry",
    subject: "Wholesale",
    message: "Hello there.",
    ...overrides,
  };
}

describe("validateContactForm", () => {
  it("accepts a complete submission", () => {
    assert.deepEqual(validateContactForm(form()), {});
  });

  it("requires every mandatory field", () => {
    const errors = validateContactForm(
      form({
        firstName: "",
        lastName: "",
        email: "",
        inquiryType: "",
        subject: "",
        message: "",
      }),
    );
    assert.deepEqual(Object.keys(errors).sort(), [
      "email",
      "firstName",
      "inquiryType",
      "lastName",
      "message",
      "subject",
    ]);
  });

  it("treats whitespace-only values as missing", () => {
    const errors = validateContactForm(form({ firstName: "   ", message: "\n\t " }));
    assert.ok(errors.firstName);
    assert.ok(errors.message);
  });

  it("rejects malformed email addresses", () => {
    for (const email of ["ann", "ann@", "@shop.example", "ann@shop", "a b@c.de"]) {
      assert.ok(validateContactForm(form({ email })).email, `expected ${email} to fail`);
    }
  });

  it("accepts every inquiry type on the list and nothing else", () => {
    for (const inquiryType of inquiryTypes) {
      assert.equal(validateContactForm(form({ inquiryType })).inquiryType, undefined);
    }
    assert.ok(validateContactForm(form({ inquiryType: "Anything Else" })).inquiryType);
  });

  it("caps field and message length", () => {
    assert.ok(validateContactForm(form({ subject: "s".repeat(201) })).subject);
    assert.equal(validateContactForm(form({ subject: "s".repeat(200) })).subject, undefined);
    assert.ok(validateContactForm(form({ message: "m".repeat(5001) })).message);
    assert.equal(validateContactForm(form({ message: "m".repeat(5000) })).message, undefined);
  });

  it("measures length after trimming, so padding alone never trips the cap", () => {
    const padded = `  ${"s".repeat(200)}  `;
    assert.equal(validateContactForm(form({ subject: padded })).subject, undefined);
  });

  it("length-checks the optional buyer fields without requiring them", () => {
    assert.deepEqual(validateContactForm(form({ jobTitle: "", storeCount: "" })), {});
    assert.ok(validateContactForm(form({ jobTitle: "j".repeat(201) })).jobTitle);
  });
});

describe("spam-protection constants", () => {
  it("names a decoy field that is not a real form field", () => {
    assert.ok(HONEYPOT_FIELD.length > 0);
    assert.ok(!(HONEYPOT_FIELD in form()));
  });

  it("caps the body well above a full submission", () => {
    const largest = JSON.stringify(form({ message: "m".repeat(5000) })).length;
    assert.ok(MAX_BODY_BYTES > largest * 2);
  });
});
