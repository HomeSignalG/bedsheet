import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Retailers, distributors, media, and anyone with product questions can reach us by email or through the contact form.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact | ${siteConfig.brandName}`,
    description:
      "Retailers, distributors, media, and anyone with product questions can reach us by email or through the contact form.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Contact"
        title="We'd love to hear from you."
        copy="Retailers, distributors, media, and anyone with a question about the product can reach us through this page. Choose the inquiry type that fits and we'll route your message to the right place."
      />

      <Section background="white" labelledBy="contact-content">
        <h2 id="contact-content" className="sr-only">
          Contact us
        </h2>
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">
              Email
            </h3>
            <p className="mt-4 leading-relaxed text-navy/75">
              Email is the best way to reach us.
            </p>
            <p className="mt-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-accent underline underline-offset-4"
              >
                {siteConfig.email}
              </a>
            </p>

            <h3 className="mt-12 text-sm font-semibold uppercase tracking-[0.18em]">
              Retail buyers
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-navy/75">
              Interested in bringing the product to your shelves? Select
              &ldquo;Retail Buyer / Retail Partnership&rdquo; in the form and
              tell us about your organization.
            </p>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
