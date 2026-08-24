import type { Metadata } from "next";
import { Dancing_Script } from "next/font/google";
import Section from "@/components/Section";
import BenefitStrip from "@/components/BenefitStrip";
import CtaBand from "@/components/CtaBand";
import HeroPhoto from "@/components/HeroPhoto";
import PlaceholderImage, { type Photo } from "@/components/PlaceholderImage";
import Trademark from "@/components/Trademark";
import {
  ArrowRightIcon,
  BackIcon,
  BadgeIcon,
  CheckMarkIcon,
  ChildIcon,
  ClockIcon,
  CrossIcon,
  DiamondIcon,
  HeartIcon,
  HouseIcon,
  LeafIcon,
  PeopleIcon,
  PersonIcon,
  SupportIcon,
} from "@/components/icons";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

// Loaded here rather than in the root layout: the signature below is the
// only place on the site that uses it, and loading it globally preloads a
// third font family on every route.
//
// Applied as `className`, not as a CSS variable. A `@theme` token built from
// a variable (`--font-script: var(--font-signature), …`) is substituted where
// it is *declared* — on :root — so setting `--font-signature` further down
// the tree leaves the token invalid and the text falls back to body copy.
const signature = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "BackEasy Sheets was created to solve a problem that was very real, very personal—and far too common. Born from a real problem after back surgery, built for real life.",
  path: "/about",
});

/** Hero photograph. Declared once so both renderings share one description. */
const heroPhoto: Photo = {
  src: "/placeholders/about-hero-farmhouse.webp",
  alt: "A sunlit farmhouse bedroom with the BackEasy Sheets system made up on the bed, snaps visible along the sheet edge",
  width: 1398,
  height: 1125,
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
    copy: "A simple way for kids and teens to take ownership.",
  },
  {
    icon: <HouseIcon />,
    title: "Made for Real Life",
    copy: "From everyday messes to laundry day—fresh sheets made simple.",
  },
];

const problems = [
  "Lifting and bending hurts",
  "Fitted sheets come loose",
  "Time-consuming",
  "Frustrating and exhausting",
  "So easy to put off",
];

const solutions = [
  "Fitted base stays on",
  "Bottom sheet snaps on/off",
  "Change in seconds",
  "No lifting the mattress",
  "Clean sheets, less stress",
];

const whyItMatters = [
  {
    icon: <HeartIcon />,
    title: "Health & Comfort",
    copy: "Less strain on your body. More comfortable everyday routines.",
  },
  {
    icon: <ClockIcon />,
    title: "Time Saved",
    copy: "Change only what needs washing—fast and simple.",
  },
  {
    icon: <PeopleIcon />,
    title: "Kid Independence",
    copy: "Empower kids and teens to take ownership of their space.",
  },
  {
    icon: <PersonIcon />,
    title: "For Every Stage",
    copy: "Great for anyone with back pain, limited mobility, or a busy life.",
  },
  {
    icon: <LeafIcon />,
    title: "Sustainable Choice",
    copy: "Wash less, save water and energy, reduce wear and tear.",
  },
];

const promiseChips = [
  { icon: <BadgeIcon />, label: "Quality you can trust" },
  { icon: <DiamondIcon />, label: "Built to last" },
  { icon: <SupportIcon />, label: "We're here for you" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero — photo bleeds to the top and right edges on large screens */}
      <section className="relative bg-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:px-8 md:py-20 lg:min-h-[560px] lg:grid-cols-2">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-deep">
              About Us
            </p>
            <h1 className="font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
              A better way to change your sheets.
            </h1>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-warmgray">
              <p>
                {siteConfig.brandShort}
                <Trademark /> was created to solve a problem that was very
                real, very personal—and far too common.
              </p>
              <p>
                Today, {siteConfig.patent.prose} helps people of all ages
                change the part of the bed that gets dirty most—without the
                struggle.
              </p>
            </div>
            <div className="mt-9">
              <BenefitStrip items={heroBenefits} />
            </div>
          </div>
          <div className="lg:hidden">
            <PlaceholderImage {...heroPhoto} priority sizes="(min-width: 640px) 640px, 100vw" />
          </div>
        </div>
        <HeroPhoto photo={heroPhoto} />
      </section>

      {/* Our story: problem and solution */}
      <Section
        background="ivory"
        eyebrow="Our story"
        title="Born from a real problem."
        labelledBy="our-story"
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr_1.05fr] lg:gap-8">
          <div className="space-y-5 leading-relaxed text-charcoal">
            <p>
              After back surgery, our founder found that something as simple as
              changing a fitted sheet became excruciating.
            </p>
            <p>
              Lifting the mattress to pull, stretch, and tuck the fitted sheet
              was painful—but the real challenge became psychological.
            </p>
            <p>
              Knowing it would hurt, she began to put it off. Changing sheets
              became something she avoided, not because she didn&rsquo;t care,
              but because the process was just too hard.
            </p>
            <p className="font-semibold text-charcoal">There had to be a better way.</p>
          </div>

          {/* The problem: photo + list */}
          <div className="flex gap-5">
            <PlaceholderImage
              src="/placeholders/about-problem-bw.webp"
              alt="Black and white photo of a woman straining as she stretches a conventional fitted sheet over a mattress corner"
              width={1536}
              height={1024}
              sizes="(min-width: 1024px) 200px, 45vw"
              className="max-w-[45%] self-start rounded-lg"
            />
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-red-800">
                The Problem:
              </h3>
              <ul className="mt-4 space-y-3">
                {problems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-charcoal">
                    <span className="shrink-0 text-red-700" aria-hidden="true">
                      <CrossIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* The solution: photo + list, with connecting arrow */}
          <div className="relative flex gap-5 lg:pl-6">
            <span
              className="absolute -left-7 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-stone bg-cream text-slate shadow-sm lg:flex"
              aria-hidden="true"
            >
              <ArrowRightIcon size={18} />
            </span>
            <PlaceholderImage
              src="/placeholders/about-solution-photo.webp"
              alt="A woman easily lifting the bottom sheet off the snap fasteners at the corner of a neatly made bed"
              width={1515}
              height={1038}
              sizes="(min-width: 1024px) 200px, 45vw"
              className="max-w-[45%] self-start rounded-lg"
            />
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-800">
                The Solution:
              </h3>
              <ul className="mt-4 space-y-3">
                {solutions.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-charcoal">
                    <span className="shrink-0 text-emerald-700" aria-hidden="true">
                      <CheckMarkIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-14 rounded-lg bg-cream px-6 py-5 text-center text-lg leading-relaxed text-charcoal">
          So we reimagined the bed sheet from the ground up—creating a system
          that stays put, and a bottom sheet that comes off in seconds.
        </p>
      </Section>

      {/* Why it matters */}
      <section aria-labelledby="why-heading" className="bg-cream px-6 pb-20 sm:px-8">
        <div className="mx-auto max-w-6xl border-t border-stone pt-14">
          <h2
            id="why-heading"
            className="mb-10 text-lg font-semibold uppercase tracking-[0.14em] text-charcoal"
          >
            Why It Matters
          </h2>
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-stone">
            {whyItMatters.map((item) => (
              <li key={item.title} className="text-center lg:px-5 first:lg:pl-0 last:lg:pr-0">
                <span className="mb-3 inline-flex text-slate" aria-hidden="true">
                  {item.icon}
                </span>
                <p className="text-sm font-semibold text-charcoal">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-warmgray">{item.copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Our promise / Founded on purpose */}
      <section aria-label="Our promise and our founder" className="bg-ivory px-6 py-16 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-10">
          <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-charcoal">
                Our Promise
              </h2>
              <p className="mt-4 leading-relaxed text-charcoal">
                We are committed to thoughtful design, premium materials, and a
                better experience—because the little things you do every day
                should be easier.
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
                {promiseChips.map((chip) => (
                  <li key={chip.label} className="flex items-center gap-3 text-sm text-charcoal">
                    <span className="shrink-0 text-slate" aria-hidden="true">
                      {chip.icon}
                    </span>
                    {chip.label}
                  </li>
                ))}
              </ul>
            </div>
            <PlaceholderImage
              src="/placeholders/promise-hem.webp"
              alt="Close-up of a hand holding the crisp white sheet hem, showing the set grommet and fine stitching"
              width={1536}
              height={1024}
              sizes="(min-width: 640px) 224px, 100vw"
              className="sm:max-w-56"
            />
          </div>

          <div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-charcoal">
                Founded on Purpose
              </h2>
              <p className="mt-4 leading-relaxed text-charcoal">
                {siteConfig.brandShort} was founded by a problem solver, a
                designer, and someone who refused to accept that clean sheets
                had to come at the cost of pain.
              </p>
              <p className="mt-4 font-semibold text-charcoal">
                This is personal.
                <br />
                This is our purpose.
              </p>
              <p className={`${signature.className} mt-6 text-4xl text-charcoal`}>
                {siteConfig.founder.name}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-warmgray">
                {siteConfig.founder.title}
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Partner With Us"
        copy="Our innovative bed sheet system is ready for today's retail market. Let's bring easier living to more homes—together."
      />
    </>
  );
}
