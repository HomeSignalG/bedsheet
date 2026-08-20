import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import BenefitStrip from "@/components/BenefitStrip";
import PatentBadge from "@/components/PatentBadge";
import StepCards from "@/components/StepCards";
import CtaBand from "@/components/CtaBand";
import BeddingSystemSection from "@/components/BeddingSystemSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import {
  ArrowRightIcon,
  BackIcon,
  ChildIcon,
  HouseIcon,
} from "@/components/icons";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `${siteConfig.brandName} — Change your sheets. Not your fitted sheet.`,
  description:
    "The Easy Top Bed Sheet System features a removable bottom sheet that snaps on and off in seconds—so you can change your bed the easy way.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.brandName} — Change your sheets. Not your fitted sheet.`,
    description:
      "The Easy Top Bed Sheet System features a removable bottom sheet that snaps on and off in seconds—so you can change your bed the easy way.",
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

const lifestylePanels: {
  icon: React.ReactNode;
  title: string;
  copy: string;
  src: string;
  alt: string;
  /** Crop focus for landscape photos in the portrait panel. */
  objectPosition?: string;
}[] = [
  {
    icon: <BackIcon />,
    title: "Easier on Your Back",
    copy: "Change your bedsheets without wrestling with the mattress.",
    src: "/placeholders/top-sheet-peel-back.webp",
    alt: "A woman lifting the corner of the light-blue bottom sheet away from the snap fasteners on the fitted base",
    objectPosition: "70% center",
  },
  {
    icon: <ChildIcon />,
    title: "Easy Enough for Kids",
    copy: "Empower kids and teens to take ownership of their space. A 10-year-old can change the bed.",
    src: "/placeholders/kid-changing-bed.webp",
    alt: "A boy smiling as he lifts the light-blue bottom sheet off the snap fasteners to change his own bed",
  },
  {
    icon: <HouseIcon />,
    title: "Made for Real Life",
    copy: "Life happens. Messes happen. Laundry happens. We make it easier.",
    src: "/placeholders/family-pet-bed.webp",
    alt: "A girl hugging a golden retriever on a bed made up with the light-blue bottom sheet",
    objectPosition: "center 38%",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — photo bleeds to the top and right edges on large screens */}
      <section className="relative bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:px-8 md:py-20 lg:min-h-[560px] lg:grid-cols-2">
          <div>
            <h1 className="font-serif text-4xl leading-tight text-navy sm:text-5xl md:text-[3.4rem]">
              Change your sheets. Not your fitted sheet.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy/75">
              The {siteConfig.brandName} features a removable bottom sheet that
              snaps on and off in seconds—so you can change your bed the easy
              way.
            </p>
            <div className="mt-8">
              <BenefitStrip items={heroBenefits} />
            </div>
            <div className="mt-9">
              <Link
                href="/product"
                className="inline-flex items-center gap-3 rounded-md bg-navy px-8 py-4 text-sm font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-navy-deep"
              >
                Discover the Difference
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
          {/* Contained image + badge on small screens */}
          <div className="lg:hidden">
            <PlaceholderImage
              src="/placeholders/bedroom-navy.webp"
              alt="The Easy Top system on a grey platform bed: light-blue fitted base and bottom sheet with a navy throw folded across the foot"
              width={1402}
              height={1122}
              priority
            />
            <div className="mt-4">
              <PatentBadge />
            </div>
          </div>
        </div>
        {/* Full-bleed photo on large screens */}
        <div className="absolute inset-y-0 right-0 hidden w-[46%] lg:block">
          <PlaceholderImage
            src="/placeholders/bedroom-navy.webp"
            alt="The Easy Top system on a grey platform bed: light-blue fitted base and bottom sheet with a navy throw folded across the foot"
            width={1402}
            height={1122}
            priority
            className="h-full w-full rounded-none object-cover"
          />
          <div className="absolute bottom-10 left-0 max-w-xs -translate-x-1/4">
            <PatentBadge />
          </div>
        </div>
      </section>

      {/* Three-step process */}
      <Section background="ivory" labelledBy="steps-heading">
        <h2
          id="steps-heading"
          className="mb-12 text-center text-lg font-semibold uppercase tracking-[0.14em] text-navy"
        >
          Change your bottom sheet in seconds.
        </h2>
        <StepCards
          steps={[
            {
              label: "Remove",
              copy: "Unsnap the bottom sheet from the fitted mattress sheet.",
              src: "/placeholders/snap-closeup.webp",
              alt: "Close-up of the bottom sheet corner folded back, showing the snap fastener on the sheet and the matching snap on the fitted base below",
            },
            {
              label: "Wash",
              copy: "Toss it in the wash and dry.",
              src: "/placeholders/laundry-basket.webp",
              alt: "The bottom sheet being lifted from a laundry basket into the washing machine",
            },
            {
              label: "Reattach",
              copy: "Snap on a clean bottom sheet. You're done.",
              src: "/placeholders/snap-corner-navy.webp",
              alt: "Close-up of the fitted base corner with the bottom sheet snapped into place over the grommet",
            },
          ]}
        />
      </Section>

      {/* Lifestyle panels */}
      <section aria-label="Everyday benefits" className="bg-white px-6 py-16 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {lifestylePanels.map((panel) => (
            <figure
              key={panel.title}
              className="relative aspect-[4/3] overflow-hidden rounded-xl border border-mist"
            >
              <PlaceholderImage
                src={panel.src}
                alt={panel.alt}
                width={800}
                height={600}
                objectPosition={panel.objectPosition}
                className="absolute inset-0 h-full w-full rounded-none object-cover"
              />
              {/* Caption sits low, where these photos are plain sheet, so
                  faces stay visible and the navy text keeps its contrast. */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white via-white/88 to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-lg font-bold uppercase leading-snug tracking-[0.06em] text-navy">
                  {panel.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-navy/75">{panel.copy}</p>
              </figcaption>
              <span
                className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white"
                aria-hidden="true"
              >
                {panel.icon}
              </span>
            </figure>
          ))}
        </div>
      </section>

      {/* Two-part system — the diagram artwork carries no text, so the
          heading, copy and callouts render as live, editable text. */}
      <Section
        background="white"
        eyebrow="A better way to bed."
        title="The two-part system that stays put."
        intro="The fitted base stays securely on your mattress. The removable bottom sheet is what gets changed. It's that simple."
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
          <PlaceholderImage
            src="/placeholders/system-diagram-clean.webp"
            alt="Exploded diagram of the two-part system: a removable bottom sheet with snap fasteners lifts away from a fitted base, which stays on the mattress below."
            width={1265}
            height={784}
            className="rounded-none"
          />
          <dl className="space-y-8">
            <div className="border-l-2 border-navy pl-5">
              <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-navy">
                Removable Bottom Sheet
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-navy/70">
                Snaps on and off in seconds.
              </dd>
            </div>
            <div className="border-l-2 border-navy pl-5">
              <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-navy">
                Fitted Base
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-navy/70">
                Stays on your mattress securely.
              </dd>
            </div>
            <div className="border-l-2 border-navy pl-5">
              <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-navy">
                Mattress
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-navy/70">
                Your mattress. The foundation that supports you.
              </dd>
            </div>
          </dl>
        </div>
      </Section>

      <BeddingSystemSection headingId="system-heading" />

      <CtaBand
        title="Start a Retail Account"
        copy="A smarter bed sheet system your customers will love."
      />
    </>
  );
}
