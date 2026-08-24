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

  it("names the address the reply will go to", () => {
    const email = buildConfirmationEmail(form(), brand);
    assert.ok(email.text.includes("We will reply to ann@shop.example"));
    assert.ok(email.html?.includes("ann@shop.example"));
  });

  // The confirmation goes to an address nobody has verified, so anything it
  // echoes is text an attacker can aim at a stranger from our domain. The
  // submission belongs in the notification to the business inbox and nowhere
  // else — these are the regression guards for that.
  it("never quotes the submitted message back", () => {
    const secret = "Attacker authored payload text.";
    const email = buildConfirmationEmail(form({ message: secret }), brand);
    assert.ok(!email.text.includes(secret));
    assert.ok(!email.html?.includes(secret));
  });

  it("never echoes the other submitted free-text fields", () => {
    const email = buildConfirmationEmail(
      form({
        subject: "SUBJECT-PAYLOAD",
        company: "COMPANY-PAYLOAD",
        jobTitle: "JOBTITLE-PAYLOAD",
        companyWebsite: "https://website-payload.example",
        retailOrganization: "RETAILORG-PAYLOAD",
        storeCount: "STORECOUNT-PAYLOAD",
      }),
      brand,
    );
    for (const payload of [
      "SUBJECT-PAYLOAD",
      "COMPANY-PAYLOAD",
      "JOBTITLE-PAYLOAD",
      "website-payload",
      "RETAILORG-PAYLOAD",
      "STORECOUNT-PAYLOAD",
    ]) {
      assert.ok(!email.text.includes(payload), `text leaked ${payload}`);
      assert.ok(!email.html?.includes(payload), `html leaked ${payload}`);
    }
  });

  it("points the sender at the business inbox for anything urgent", () => {
    const email = buildConfirmationEmail(form(), brand);
    assert.ok(email.text.includes(brand.contactEmail));
    assert.ok(email.html?.includes(`mailto:${brand.contactEmail}`));
  });

  it("escapes the greeting in the HTML part", () => {
    const email = buildConfirmationEmail(
      form({ firstName: `<img src=x onerror="alert(1)">` }),
      brand,
    );
    assert.ok(!email.html?.includes("<img src=x"));
    assert.ok(email.html?.includes("&lt;img src=x"));
  });

  it("caps the greeting so a name field cannot carry a message", () => {
    const email = buildConfirmationEmail(
      form({ firstName: "Ann".padEnd(200, "!") }),
      brand,
    );
    const greeting = email.text.split("\n")[0];
    assert.ok(greeting.length <= "Hi ,".length + 40, greeting);
  });

  it("strips line breaks from the greeting", () => {
    const email = buildConfirmationEmail(
      form({ firstName: "Ann\nClick https://phish.example" }),
      brand,
    );
    assert.equal(email.text.split("\n")[0], "Hi Ann Click https://phish.example,");
  });

  it("falls back to a neutral greeting when the name is blank", () => {
    assert.ok(
      buildConfirmationEmail(form({ firstName: "   " }), brand).text.startsWith(
        "Hi there,",
      ),
    );
  });
});
