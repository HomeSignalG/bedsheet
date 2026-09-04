import type { Metadata } from "next";
import Link from "next/link";
import HeroPhoto from "@/components/HeroPhoto";
import PlaceholderImage, { type Photo } from "@/components/PlaceholderImage";
import { LockIcon, ShieldIcon } from "@/components/icons";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Legal & Privacy Policy",
  description:
    "Patent statement and privacy policy for BackEasy Sheets: what the contact form collects, how it is used, and how long it is kept.",
  path: "/legal",
});

/**
 * Hero photograph. A detail shot of the hem and stitching rather than a
 * lifestyle scene: this page is about construction, ownership and data, and
 * the lifestyle photography already runs on three other pages.
 */
const heroPhoto: Photo = {
  src: "/placeholders/promise-hem.webp",
  alt: "Close-up of a hand holding the crisp white sheet hem, showing the set grommet and fine stitching",
  width: 1536,
  height: 1024,
};

const privacySections = [
  {
    title: "1. Information We Collect",
    body: (
      <p>
        We collect only the information you voluntarily provide when you fill
        out our contact form: your name, email address, company and job details
        (if provided), and the contents of your inquiry. Our web host also
        records standard server logs, including IP addresses, to keep the site
        running and to limit automated abuse of the contact form.
      </p>
    ),
  },
  {
    title: "2. How We Use Your Information",
    body: (
      <p>
        We use the information you provide solely to respond to your inquiries,
        communicate with you about our products or services, and provide the
        information you request. We do not use it for automated decision-making
        or profiling, and we do not send marketing email to addresses collected
        through the contact form unless you ask us to.
      </p>
    ),
  },
  {
    title: "3. Information Sharing",
    body: (
      <p>
        We do not sell, rent, or trade your personal information. We share it
        only with the service providers that host this site and deliver our
        contact-form email, and only to the extent needed to provide those
        services. We may also disclose information where the law requires it.
      </p>
    ),
  },
  {
    title: "4. Data Retention",
    body: (
      <p>
        We keep contact-form submissions for {siteConfig.privacy.retention}{" "}
        after our last correspondence with you, then delete them. Server logs
        are kept for a short period by our host and then rotated out. You may
        ask us to delete your information sooner at any time.
      </p>
    ),
  },
  {
    title: "5. Data Security",
    body: (
      <p>
        This site is served over HTTPS, and we take reasonable measures to
        protect your information from unauthorized access, use, or disclosure.
        However, no method of transmission over the internet is 100% secure.
      </p>
    ),
  },
  {
    title: "6. Cookies and Tracking",
    body: siteConfig.privacy.usesCookies ? (
      <p>
        This website uses cookies to enhance your browsing experience. You can
        disable cookies in your browser settings if you prefer.
      </p>
    ) : (
      <p>
        This website sets no cookies. We run no analytics, no advertising
        pixels, and no third-party tracking scripts, so there is nothing here
        for you to opt out of.
      </p>
    ),
  },
  {
    title: "7. Your Privacy Rights",
    body: (
      <p>
        You may ask us to access, correct, delete, or provide a copy of the
        personal information we hold about you, and you may object to or ask us
        to restrict how we use it. Email{" "}
        <a
          href={`mailto:${siteConfig.privacy.requestEmail}`}
          className="text-slate-deep underline underline-offset-4"
        >
          {siteConfig.privacy.requestEmail}
        </a>{" "}
        and we will respond within 30 days. We will never charge you or treat
        you differently for exercising these rights.
      </p>
    ),
  },
  {
    title: "8. California Residents",
    body: (
      <p>
        Under the CCPA and CPRA you may request the categories and specific
        pieces of personal information we have collected, ask us to delete or
        correct it, and opt out of its sale or sharing. We do not sell or share
        personal information as those laws define it, and we have not done so
        in the preceding twelve months. Use the contact address in section 7 to
        make a request.
      </p>
    ),
  },
  {
    title: "9. Visitors in the UK and EEA",
    body: (
      <p>
        Where the UK GDPR or EU GDPR applies, our lawful basis for handling
        your inquiry is legitimate interest — responding to a message you chose
        to send us. You have the rights described in section 7, plus the right
        to lodge a complaint with your local supervisory authority. Information
        you send us is processed in the United States.
      </p>
    ),
  },
  {
    title: "10. Children's Privacy",
    body: (
      <p>
        Our website is not intended for children under the age of 13, and we do
        not knowingly collect personal information from children. If you
        believe a child has sent us personal information, contact us and we
        will delete it.
      </p>
    ),
  },
  {
    title: "11. Changes to This Policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. Any changes will
        be posted on this page, and the &ldquo;Last Updated&rdquo; date at the
        top will change with them.
      </p>
    ),
  },
  {
    title: "12. Contact Us",
    body: (
      <p>
        If you have any questions about this Privacy Policy, email us at{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-slate-deep underline underline-offset-4"
        >
          {siteConfig.email}
        </a>{" "}
        or use the{" "}
        <Link href="/contact" className="text-slate-deep underline underline-offset-4">
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
      <BreadcrumbStructuredData name="Legal & Privacy Policy" path="/legal" />
      {/* Hero — photo bleeds to the top and right edges on large screens */}
      <section className="relative bg-ivory">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:px-8 md:py-20 lg:min-h-[420px] lg:grid-cols-2">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-deep">
              Legal &amp; Privacy Policy
            </p>
            <h1 className="font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
              Our commitment to trust and transparency.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-warmgray">
              This page outlines our patent protection and how we collect, use,
              and protect your information.
            </p>
            <p className="mt-4 text-sm text-warmgray">
              Last Updated: {siteConfig.legalLastUpdated}
            </p>
          </div>
          <div className="lg:hidden">
            <PlaceholderImage {...heroPhoto} priority sizes="(min-width: 640px) 640px, 100vw" />
          </div>
        </div>
        <HeroPhoto photo={heroPhoto} />
      </section>

      <div className="bg-ivory px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl bg-cream p-8 shadow-sm sm:p-12">
          {/* Patent & IP */}
          <section id="patent" aria-labelledby="patent-heading" className="scroll-mt-24">
            <div className="flex items-start gap-5">
              <span className="mt-1 hidden shrink-0 text-slate sm:block" aria-hidden="true">
                <ShieldIcon />
              </span>
              <div>
                <h2
                  id="patent-heading"
                  className="text-lg font-semibold uppercase tracking-[0.14em] text-charcoal"
                >
                  Patent &amp; Intellectual Property
                </h2>
                <div className="mt-5 space-y-4 leading-relaxed text-charcoal">
                  <p>{siteConfig.patent.statement}</p>
                  <p>
                    No part of our product, design, or website content may be
                    copied, reproduced, distributed, or used without our prior
                    written permission.
                  </p>
                  {siteConfig.patent.number && (
                    <p>
                      <strong className="text-charcoal">Patent information:</strong>{" "}
                      {siteConfig.patent.number}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>

          <hr className="my-12 border-stone" />

          {/* Privacy policy */}
          <section id="privacy" aria-labelledby="privacy-heading" className="scroll-mt-24">
            <div className="flex items-start gap-5">
              <span className="mt-1 hidden shrink-0 text-slate sm:block" aria-hidden="true">
                <LockIcon />
              </span>
              <div className="min-w-0 flex-1">
                <h2
                  id="privacy-heading"
                  className="text-lg font-semibold uppercase tracking-[0.14em] text-charcoal"
                >
                  Privacy Policy
                </h2>
                <p className="mt-5 leading-relaxed text-charcoal">
                  Your privacy is important to us. This Privacy Policy explains
                  how we collect, use, and safeguard your information when you
                  contact us through our website.
                </p>
                <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                  {privacySections.map((section) => (
                    <section
                      key={section.title}
                      aria-label={section.title}
                      className="border-t border-stone pt-6"
                    >
                      <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-charcoal">
                        {section.title}
                      </h3>
                      <div className="mt-3 text-sm leading-relaxed text-warmgray">
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
