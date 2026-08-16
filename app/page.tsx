import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import BenefitStrip from "@/components/BenefitStrip";
import PatentBadge from "@/components/PatentBadge";
import StepCards from "@/components/StepCards";
import CtaBand from "@/components/CtaBand";
import PlaceholderImage from "@/components/PlaceholderImage";
import {
  ArrowRightIcon,
  BackIcon,
  BedIcon,
  ChildIcon,
  HouseIcon,
  RulerIcon,
} from "@/components/icons";
import { pocketDepthRange, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `${siteConfig.brandName} — Change your sheets. Not your fitted base.`,
  description:
    "The Easy Top Bed Sheet System features a removable top sheet that snaps on and off in seconds—so you can change your bed the easy way.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.brandName} — Change your sheets. Not your fitted base.`,
    description:
      "The Easy Top Bed Sheet System features a removable top sheet that snaps on and off in seconds—so you can change your bed the easy way.",
    url: "/",
  },
};

const heroBenefits = [
  {
    icon: <BackIcon />,
    title: "Easier on Your Back",
    copy: "No more lifting or wrestling with the mattress.",
  },
  {
    icon: <ChildIcon />,
    title: "Easy Enough for Kids",
    copy: "A simple way for kids and teens to change their own sheets.",
  },
  {
    icon: <HouseIcon />,
    title: "Made for Real Life",
    copy: "From everyday messes to laundry day—fresh sheets made simple.",
  },
];

const lifestylePanels = [
  {
    icon: <BackIcon />,
    title: "Easier on Your Back",
    copy: "Change the sleeping surface without wrestling with the mattress.",
    src: "/images/lifestyle-ease.svg",
    alt: "Placeholder for a photo of someone easily changing the top sheet",
  },
  {
    icon: <ChildIcon />,
    title: "Easy Enough for Kids",
    copy: "Empower kids and teens to take ownership of their space. A 10-year-old can change the bed.",
    src: "/images/lifestyle-kids.svg",
    alt: "Placeholder for a photo of a child around age ten changing their own bed",
  },
  {
    icon: <HouseIcon />,
    title: "Made for Real Life",
    copy: "Life happens. Messes happen. Laundry happens. We make it easier.",
    src: "/images/lifestyle-household.svg",
    alt: "Placeholder for a photo of a family household with a pet on the bed",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ivory px-6 py-16 sm:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <h1 className="font-serif text-4xl leading-tight text-navy sm:text-5xl md:text-[3.4rem]">
              Change your sheets. Not your fitted base.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy/75">
              The {siteConfig.brandName} features a removable top sheet that
              snaps on and off in seconds—so you can change your bed the easy
              way.
            </p>
            <div className="mt-8">
              <BenefitStrip items={heroBenefits} />
            </div>
            <div className="mt-9">
              <Link
                href="/product"
                className="inline-flex items-center gap-3 bg-navy px-8 py-4 text-sm font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-navy-deep"
              >
                Discover the Difference
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
          <div className="relative">
            <PlaceholderImage
              src="/images/home-hero.svg"
              alt="The removable top sheet turned back on a made bed, showing the snap edge"
              width={1200}
              height={900}
              priority
            />
            <div className="mt-4 lg:absolute lg:-bottom-6 lg:right-0 lg:mt-0 lg:max-w-xs">
              <PatentBadge />
            </div>
          </div>
        </div>
      </section>

      {/* Three-step process */}
      <Section background="white" labelledBy="steps-heading">
        <h2
          id="steps-heading"
          className="mb-12 text-center text-lg font-semibold uppercase tracking-[0.14em] text-navy"
        >
          Change your top sheet in seconds.
        </h2>
        <StepCards
          steps={[
            {
              label: "Remove",
              copy: "Unsnap the top sheet from the base.",
              src: "/images/step-remove.svg",
              alt: "Placeholder for a photo of hands unsnapping the top sheet",
            },
            {
              label: "Wash",
              copy: "Toss it in the wash and dry.",
              src: "/images/step-wash.svg",
              alt: "Placeholder for a photo of the top sheet going into the washing machine",
            },
            {
              label: "Reattach",
              copy: "Snap on a clean top sheet. You're done.",
              src: "/images/step-reattach.svg",
              alt: "Placeholder for a photo of hands snapping on a clean top sheet",
            },
          ]}
        />
      </Section>

      {/* Lifestyle panels */}
      <section aria-label="Everyday benefits" className="bg-ivory px-6 py-16 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {lifestylePanels.map((panel) => (
            <figure key={panel.title} className="relative flex h-full flex-col bg-white">
              <figcaption className="border border-b-0 border-mist p-6">
                <p className="font-serif text-xl text-navy">{panel.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">{panel.copy}</p>
              </figcaption>
              <PlaceholderImage src={panel.src} alt={panel.alt} width={800} height={600} />
              <span
                className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white"
                aria-hidden="true"
              >
                {panel.icon}
              </span>
            </figure>
          ))}
        </div>
      </section>

      {/* Two-part system */}
      <Section
        background="white"
        eyebrow="A better way to bed."
        title="The two-part system that stays put."
        intro="The fitted base stays securely on your mattress. The removable top sheet is what gets changed. It's that simple."
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_320px]">
          <PlaceholderImage
            src="/images/system-exploded.svg"
            alt="Exploded view showing the removable top sheet lifted above the fitted base on a mattress"
            width={1200}
            height={700}
          />
          <dl className="space-y-8">
            <div className="border-l-2 border-accent pl-5">
              <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-navy">
                Removable Top Sheet
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-navy/70">
                Soft, smooth, and easy to remove and wash. Snaps on and off in
                seconds.
              </dd>
            </div>
            <div className="border-l-2 border-accent pl-5">
              <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-navy">
                Fitted Base
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-navy/70">
                Stays on your mattress securely. All. The. Time.
              </dd>
            </div>
          </dl>
        </div>
      </Section>

      {/* Sizes */}
      <section aria-labelledby="sizes-heading" className="bg-ivory px-6 py-14 sm:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[240px_1fr_230px]">
          <div className="flex items-start gap-4">
            <span className="mt-1 shrink-0 text-accent" aria-hidden="true">
              <RulerIcon />
            </span>
            <div>
              <h2
                id="sizes-heading"
                className="text-sm font-semibold uppercase tracking-[0.14em] text-navy"
              >
                Made to Fit Real Mattresses
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-navy/70">
                Six sizes. One system. Fits {pocketDepthRange()} mattress
                depths.
              </p>
            </div>
          </div>
          <ul className="grid grid-cols-3 gap-6 sm:grid-cols-6">
            {siteConfig.sizes.map((size) => (
              <li key={size.size} className="text-center">
                <span className="inline-flex text-navy/70" aria-hidden="true">
                  <BedIcon />
                </span>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-navy">
                  {size.size}
                </p>
                <p className="mt-0.5 text-xs text-navy/60">{size.dimensions}</p>
              </li>
            ))}
          </ul>
          <div className="border border-mist bg-beige/60 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-navy">
              Pocket Depth
            </p>
            <p className="mt-1 font-serif text-2xl text-navy">{pocketDepthRange()}</p>
            <p className="mt-2 text-xs leading-relaxed text-navy/70">
              Universal pocket depth accommodates the full range of mattresses.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Built for Retailers."
        copy="A smarter bed sheet system your customers will love."
      />
    </>
  );
}
