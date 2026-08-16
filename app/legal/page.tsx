import type { Metadata } from "next";
import Link from "next/link";
import { LockIcon, ShieldIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Legal & Privacy Policy",
  description:
    "Our commitment to trust and transparency: patent protection and how we collect, use, and protect your information.",
  alternates: { canonical: "/legal" },
  openGraph: {
    title: `Legal & Privacy Policy | ${siteConfig.brandName}`,
    description:
      "Our commitment to trust and transparency: patent protection and how we collect, use, and protect your information.",
    url: "/legal",
  },
};

const privacySections = [
  {
    title: "1. Information We Collect",
    body: (
      <p>
        We collect only the information you voluntarily provide to us when you
        fill out our contact form, including your name, email address, company
        (if provided), and the details of your inquiry.
      </p>
    ),
  },
  {
    title: "2. How We Use Your Information",
    body: (
      <p>
        We use the information you provide solely to respond to your inquiries,
        communicate with you about our products or services, and provide the
        information you request.
      </p>
    ),
  },
  {
    title: "3. Information Sharing",
    body: (
      <p>
        We do not sell, rent, or trade your personal information. We may share
        your information only with trusted service providers who assist us in
        operating our website or responding to your inquiries, and only to the
        extent necessary to provide those services.
      </p>
    ),
  },
  {
    title: "4. Data Security",
    body: (
      <p>
        We take reasonable measures to protect your information from
        unauthorized access, use, or disclosure. However, no method of
        transmission over the internet is 100% secure.
      </p>
    ),
  },
  {
    title: "5. Your Choices",
    body: (
      <p>
        You may request that we update, correct, or delete your personal
        information at any time by contacting us.
      </p>
    ),
  },
  {
    title: "6. Cookies",
    body: (
      <p>
        Our website may use cookies to enhance your browsing experience. You
        can choose to disable cookies in your browser settings if you prefer.
      </p>
    ),
  },
  {
    title: "7. Children's Privacy",
    body: (
      <p>
        Our website is not intended for children under the age of 13, and we do
        not knowingly collect personal information from children.
      </p>
    ),
  },
  {
    title: "8. Changes to This Policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. Any changes will
        be posted on this page with an updated effective date.
      </p>
    ),
  },
  {
    title: "9. Contact Us",
    body: (
      <p>
        If you have any questions about this Privacy Policy, please contact us
        through the{" "}
        <Link href="/contact" className="text-accent underline underline-offset-4">
          contact form
        </Link>{" "}
        on our website.
      </p>
    ),
  },
];

export default function LegalPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ivory px-6 py-16 sm:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Legal &amp; Privacy Policy
          </p>
          <h1 className="max-w-2xl font-serif text-4xl leading-tight text-navy sm:text-5xl">
            Our commitment to trust and transparency.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy/75">
            This page outlines our patent protection and how we collect, use,
            and protect your information.
          </p>
          <p className="mt-4 text-sm text-navy/60">
            Last Updated: {siteConfig.legalLastUpdated}
          </p>
        </div>
      </section>

      <div className="bg-white px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-4xl border border-mist bg-white p-8 sm:p-12">
          {/* Patent & IP */}
          <section id="patent" aria-labelledby="patent-heading" className="scroll-mt-24">
            <div className="flex items-start gap-5">
              <span className="mt-1 hidden shrink-0 text-navy sm:block" aria-hidden="true">
                <ShieldIcon />
              </span>
              <div>
                <h2
                  id="patent-heading"
                  className="text-lg font-semibold uppercase tracking-[0.14em] text-navy"
                >
                  Patent &amp; Intellectual Property
                </h2>
                <div className="mt-5 space-y-4 leading-relaxed text-navy/80">
                  <p>{siteConfig.patent.statement}</p>
                  <p>
                    No part of our product, design, or website content may be
                    copied, reproduced, distributed, or used without our prior
                    written permission.
                  </p>
                  <p>
                    <strong className="text-navy">Patent information:</strong>{" "}
                    {siteConfig.patent.number ?? siteConfig.patent.shortNotice}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <hr className="my-12 border-mist" />

          {/* Privacy policy */}
          <section id="privacy" aria-labelledby="privacy-heading" className="scroll-mt-24">
            <div className="flex items-start gap-5">
              <span className="mt-1 hidden shrink-0 text-navy sm:block" aria-hidden="true">
                <LockIcon />
              </span>
              <div className="min-w-0 flex-1">
                <h2
                  id="privacy-heading"
                  className="text-lg font-semibold uppercase tracking-[0.14em] text-navy"
                >
                  Privacy Policy
                </h2>
                <p className="mt-5 leading-relaxed text-navy/80">
                  Your privacy is important to us. This Privacy Policy explains
                  how we collect, use, and safeguard your information when you
                  contact us through our website.
                </p>
                <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                  {privacySections.map((section, index) => (
                    <section
                      key={section.title}
                      aria-label={section.title}
                      className={`border-t border-mist pt-6 ${
                        index >= 6 ? "sm:col-span-2" : ""
                      }`}
                    >
                      <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-navy">
                        {section.title}
                      </h3>
                      <div className="mt-3 text-sm leading-relaxed text-navy/75">
                        {section.body}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
