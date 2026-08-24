import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildConfirmationEmail,
  buildNotificationEmail,
  escapeHtml,
  sanitizeHeader,
  type EmailBrand,
} from "../lib/contact-email.ts";
import type { ContactFormData } from "../lib/contact.ts";

const brand: EmailBrand = {
  brandName: "BackEasy Sheets Bedding System",
  brandShort: "BackEasy Sheets",
  contactEmail: "info@backeasysheets.com",
};

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

describe("sanitizeHeader", () => {
  it("removes the line breaks a header must never carry", () => {
    const cleaned = sanitizeHeader("Hi\r\nBcc: victim@example.com");
    assert.ok(!cleaned.includes("\n"));
    assert.ok(!cleaned.includes("\r"));
    assert.equal(cleaned, "Hi Bcc: victim@example.com");
  });

  it("strips other control characters and collapses whitespace", () => {
    assert.equal(sanitizeHeader("a\u0000b\u0007c\td"), "a b c d");
    assert.equal(sanitizeHeader("del\u007fimited"), "del imited");
    assert.equal(sanitizeHeader("  spaced    out  "), "spaced out");
  });

  it("truncates past the cap", () => {
    const cleaned = sanitizeHeader("s".repeat(500));
    assert.equal(cleaned.length, 200);
    assert.ok(cleaned.endsWith("…"));
  });
});

describe("escapeHtml", () => {
  it("escapes every character that could break out of markup", () => {
    assert.equal(
      escapeHtml(`<img src=x onerror="alert('&')">`),
      "&lt;img src=x onerror=&quot;alert(&#39;&amp;&#39;)&quot;&gt;",
    );
  });
});

describe("buildNotificationEmail", () => {
  it("subjects the email with the inquiry type and subject", () => {
    const email = buildNotificationEmail(form(), brand);
    assert.equal(email.subject, "[General Inquiry] Wholesale");
  });

  it("sanitizes a subject built from submitted values", () => {
    const email = buildNotificationEmail(
      form({ subject: "Hi\nBcc: victim@example.com" }),
      brand,
    );
    assert.ok(!email.subject.includes("\n"));
  });

  it("carries every submitted field into the body", () => {
    const email = buildNotificationEmail(
      form({ message: "Please send a wholesale price list." }),
      brand,
    );
    for (const value of [
      "Ann Lee",
      "ann@shop.example",
      "Shop Co",
      "General Inquiry",
      "Wholesale",
      "Please send a wholesale price list.",
    ]) {
      assert.ok(email.text.includes(value), `expected body to include ${value}`);
    }
  });

  it("includes retail buyer details only when they are filled in", () => {
    assert.ok(
      !buildNotificationEmail(form(), brand).text.includes("Retail buyer details"),
    );
    const withBuyer = buildNotificationEmail(
      form({ jobTitle: "Head Buyer", storeCount: "42" }),
      brand,
    );
    assert.ok(withBuyer.text.includes("Retail buyer details"));
    assert.ok(withBuyer.text.includes("Job title: Head Buyer"));
    assert.ok(withBuyer.text.includes("Stores: 42"));
  });
});

describe("buildConfirmationEmail", () => {
  it("uses a fixed subject rather than one built from submitted text", () => {
    const email = buildConfirmationEmail(
      form({ subject: "<script>alert(1)</script>" }),
      brand,
    );
    assert.equal(email.subject, "We received your message — BackEasy Sheets");
  });

  it("tells the sender their message was sent", () => {
    const email = buildConfirmationEmail(form(), brand);
    assert.ok(email.text.includes("Hi Ann,"));
    assert.ok(email.text.includes("sent successfully"));
    assert.ok(email.html?.includes("We received your message"));
  });

  it("quotes the submission back for the sender's records", () => {
    const email = buildConfirmationEmail(
      form({ message: "Please send a wholesale price list." }),
      brand,
    );
    assert.ok(email.text.includes("Subject: Wholesale"));
    assert.ok(email.text.includes("Please send a wholesale price list."));
    assert.ok(email.html?.includes("Please send a wholesale price list."));
  });

  it("points the sender at the business inbox for anything urgent", () => {
    const email = buildConfirmationEmail(form(), brand);
    assert.ok(email.text.includes(brand.contactEmail));
    assert.ok(email.html?.includes(`mailto:${brand.contactEmail}`));
  });

  it("escapes submitted text in the HTML part", () => {
    const email = buildConfirmationEmail(
      form({
        firstName: "<b>Ann</b>",
        message: `<img src=x onerror="alert(1)">`,
      }),
      brand,
    );
    assert.ok(!email.html?.includes("<img src=x"));
    assert.ok(!email.html?.includes("<b>Ann</b>"));
    assert.ok(email.html?.includes("&lt;img src=x"));
  });

  it("falls back to a neutral greeting when the name is blank", () => {
    assert.ok(
      buildConfirmationEmail(form({ firstName: "   " }), brand).text.startsWith(
        "Hi there,",
      ),
    );
  });

  it("omits optional rows that were left empty", () => {
    const email = buildConfirmationEmail(form({ company: "" }), brand);
    assert.ok(!email.text.includes("Company:"));
    assert.ok(!email.text.includes("Job title:"));
  });
});
