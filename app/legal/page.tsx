import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import LegalSection from "@/components/LegalSection";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Legal & Privacy Policy",
  description:
    "Patent and intellectual property information, and our privacy policy covering information collected through this website.",
  alternates: { canonical: "/legal" },
  openGraph: {
    title: `Legal & Privacy Policy | ${siteConfig.brandName}`,
    description:
      "Patent and intellectual property information, and our privacy policy covering information collected through this website.",
    url: "/legal",
  },
};

export default function LegalPage() {
  return (
    <>
      <Hero
        eyebrow="Legal"
        title="Legal & Privacy Policy"
        copy={`Last Updated: ${siteConfig.legalLastUpdated}`}
      />

      <div className="mx-auto max-w-3xl space-y-16 px-6 py-20 sm:px-8">
        <LegalSection id="patent" title="Patent & Intellectual Property">
          <p>{siteConfig.patent.statement}</p>
          <p>{siteConfig.patent.shortNotice}</p>
          <p>
            The product names, product descriptions, images, and other content
            on this website belong to {siteConfig.brandName} and may not be
            reproduced without permission.
          </p>
        </LegalSection>

        <LegalSection id="privacy" title="Privacy Policy">
          <h3 className="pt-2 font-serif text-xl text-navy">
            Information we collect
          </h3>
          <p>
            This website does not require an account and does not sell anything
            directly. The personal information we collect is what you choose to
            submit through our contact form: your name, email address, company
            or organization, inquiry type, subject, message, and — if you
            identify as a retail buyer — optional details such as job title,
            company website, retail organization, and number of store
            locations.
          </p>

          <h3 className="pt-2 font-serif text-xl text-navy">
            How we use your information
          </h3>
          <p>
            We use the information you submit to respond to your inquiry, to
            follow up on retail and distribution conversations you initiate,
            and to operate and improve this website. We do not use contact-form
            submissions for unrelated marketing without your consent.
          </p>

          <h3 className="pt-2 font-serif text-xl text-navy">
            Service providers
          </h3>
          <p>
            Like most websites, we rely on service providers to operate — for
            example, website hosting and, in the future, form-processing or
            email-delivery services. These providers may process the
            information you submit on our behalf, only as needed to provide
            their services to us.
          </p>

          <h3 className="pt-2 font-serif text-xl text-navy">
            Information sharing
          </h3>
          <p>
            We do not sell your personal information. We share it only with the
            service providers described above, or where required by law. Because
            service providers may process form submissions and site analytics,
            we cannot promise that information never leaves our systems — but we
            limit sharing to what is necessary to run the site and respond to
            you.
          </p>

          <h3 className="pt-2 font-serif text-xl text-navy">Data security</h3>
          <p>
            We take reasonable measures to protect the information you submit
            from unauthorized access, use, or disclosure. No method of
            transmission or storage is completely secure, so we cannot
            guarantee absolute security.
          </p>

          <h3 className="pt-2 font-serif text-xl text-navy">
            Cookies & analytics
          </h3>
          <p>
            This website does not currently use advertising cookies. If we add
            analytics tools to understand how visitors use the site, those
            tools may set cookies or collect usage data; we will update this
            policy to describe them before or when they are introduced. You can
            control cookies through your browser settings.
          </p>

          <h3 className="pt-2 font-serif text-xl text-navy">Your choices</h3>
          <p>
            You may request that we correct or delete the personal information
            you submitted through the contact form at any time by emailing{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-accent underline underline-offset-4"
            >
              {siteConfig.email}
            </a>
            . Submitting the contact form is always optional.
          </p>

          <h3 className="pt-2 font-serif text-xl text-navy">
            Children&rsquo;s privacy
          </h3>
          <p>
            This website is intended for adults, including consumers,
            retailers, and business partners. It is not directed to children
            under 13, and we do not knowingly collect personal information from
            children. If you believe a child has submitted personal information
            through this site, contact us and we will delete it.
          </p>

          <h3 className="pt-2 font-serif text-xl text-navy">
            Updates to this policy
          </h3>
          <p>
            We may update this policy as the product, website, and applicable
            laws evolve. Changes will be posted on this page with a revised
            &ldquo;Last Updated&rdquo; date above.
          </p>

          <h3 className="pt-2 font-serif text-xl text-navy">Contact</h3>
          <p>
            Questions about this policy can be sent to{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-accent underline underline-offset-4"
            >
              {siteConfig.email}
            </a>{" "}
            or submitted through our{" "}
            <Link href="/contact" className="text-accent underline underline-offset-4">
              contact page
            </Link>
            .
          </p>
        </LegalSection>
      </div>
    </>
  );
}
