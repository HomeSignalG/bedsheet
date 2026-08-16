import type { Metadata } from "next";
import BenefitStrip from "@/components/BenefitStrip";
import ContactForm from "@/components/ContactForm";
import PlaceholderImage from "@/components/PlaceholderImage";
import {
  BadgeIcon,
  HeartIcon,
  MailIcon,
  PeopleIcon,
  ShieldIcon,
} from "@/components/icons";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Whether you're a retailer, distributor, or have a question about our products, we're here to help. Send us a message and our team will get back to you as soon as possible.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact | ${siteConfig.brandName}`,
    description:
      "Whether you're a retailer, distributor, or have a question about our products, we're here to help. Send us a message and our team will get back to you as soon as possible.",
    url: "/contact",
  },
};

const heroBenefits = [
  {
    icon: <BadgeIcon />,
    title: "Responsive",
    copy: "We typically respond within 1 business day.",
  },
  {
    icon: <PeopleIcon />,
    title: "Personal",
    copy: "Real people who care about your success.",
  },
  {
    icon: <ShieldIcon />,
    title: "Reliable",
    copy: "You can count on us for clear answers.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white px-6 py-16 sm:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Contact Us
            </p>
            <h1 className="font-serif text-4xl leading-tight text-navy sm:text-5xl">
              We&rsquo;d love to hear from you.
            </h1>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-navy/75">
              <p>
                Whether you&rsquo;re a retailer, distributor, or have a question
                about our products, we&rsquo;re here to help.
              </p>
              <p>
                Send us a message and our team will get back to you as soon as
                possible.
              </p>
            </div>
            <div className="mt-9">
              <BenefitStrip items={heroBenefits} />
            </div>
          </div>
          <PlaceholderImage
            src="/placeholders/contact-hero.svg"
            alt="Placeholder for a photo of a made bed with the top sheet turned down"
            width={1200}
            height={900}
            priority
          />
        </div>
      </section>

      {/* Contact card + form */}
      <section aria-label="Contact form" className="bg-white px-6 py-16 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[320px_1fr] lg:gap-14">
          <aside className="h-fit rounded-2xl border border-mist bg-ivory p-8 text-center">
            <span
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white"
              aria-hidden="true"
            >
              <MailIcon size={26} />
            </span>
            <h2 className="mt-5 text-base font-semibold uppercase tracking-[0.14em] text-navy">
              Get in Touch
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-navy/75">
              Email is the best way to reach us. We look forward to hearing
              from you!
            </p>
            <p className="mt-5">
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-navy underline underline-offset-4"
              >
                {siteConfig.email}
              </a>
            </p>
            <p className="mt-1 text-sm text-navy/60">General Inquiries</p>

            <hr className="my-8 border-mist" />

            <span className="mx-auto inline-flex text-accent" aria-hidden="true">
              <HeartIcon />
            </span>
            <h3 className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-navy">
              Thank You
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-navy/75">
              We appreciate your interest in {siteConfig.brandName}.
            </p>
          </aside>

          <div>
            <h2 className="font-serif text-2xl text-navy md:text-3xl">
              Send Us a Message
            </h2>
            <p className="mt-3 max-w-xl leading-relaxed text-navy/75">
              Fill out the form below and a member of our team will get back to
              you as soon as possible.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Privacy banner */}
      <section aria-label="Privacy assurance" className="bg-white px-6 pb-16 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-start gap-5 rounded-xl border border-mist bg-ivory p-6">
          <span className="mt-0.5 shrink-0 text-navy" aria-hidden="true">
            <ShieldIcon />
          </span>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-navy">
              Your Information Is Safe
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-navy/75">
              We respect your privacy and will never share your information.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
