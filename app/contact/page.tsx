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
      {/* Hero — photo bleeds to the top and right edges on large screens */}
      <section className="relative bg-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:px-8 md:py-20 lg:min-h-[520px] lg:grid-cols-2">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-deep">
              Contact Us
            </p>
            <h1 className="font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
              We&rsquo;d love to hear from you.
            </h1>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-warmgray">
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
          <div className="lg:hidden">
            <PlaceholderImage
              src="/placeholders/contact-hero.svg"
              alt="Placeholder for a photo of a made bed with the top sheet turned down"
              width={1200}
              height={900}
              priority
            />
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 hidden w-[46%] lg:block">
          <PlaceholderImage
            src="/placeholders/contact-hero.svg"
            alt="Placeholder for a photo of a made bed with the top sheet turned down"
            width={1200}
            height={900}
            priority
            className="h-full w-full rounded-none object-cover"
          />
        </div>
      </section>

      {/* Contact card + form */}
      <section aria-label="Contact form" className="bg-cream px-6 py-16 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[320px_1fr] lg:gap-14">
          <aside className="h-fit rounded-2xl border border-stone bg-ivory p-8 text-center">
            <span
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate text-cream"
              aria-hidden="true"
            >
              <MailIcon size={26} />
            </span>
            <h2 className="mt-5 text-base font-semibold uppercase tracking-[0.14em] text-charcoal">
              Get in Touch
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-warmgray">
              Email is the best way to reach us. We look forward to hearing
              from you!
            </p>
            <p className="mt-5">
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-charcoal underline underline-offset-4"
              >
                {siteConfig.email}
              </a>
            </p>
            <p className="mt-1 text-sm text-warmgray">General Inquiries</p>

            <hr className="my-8 border-stone" />

            <span className="mx-auto inline-flex text-slate" aria-hidden="true">
              <HeartIcon />
            </span>
            <h3 className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-charcoal">
              Thank You
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-warmgray">
              We appreciate your interest in {siteConfig.brandName}.
            </p>
          </aside>

          <div>
            <h2 className="font-serif text-2xl text-charcoal md:text-3xl">
              Send Us a Message
            </h2>
            <p className="mt-3 max-w-xl leading-relaxed text-warmgray">
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
      <section aria-label="Privacy assurance" className="bg-cream px-6 pb-16 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-start gap-5 rounded-xl border border-stone bg-ivory p-6">
          <span className="mt-0.5 shrink-0 text-slate" aria-hidden="true">
            <ShieldIcon />
          </span>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-charcoal">
              Your Information Is Safe
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-warmgray">
              We respect your privacy and will never share your information.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
