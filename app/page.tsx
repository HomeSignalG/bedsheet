import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import BenefitStrip from "@/components/BenefitStrip";
import BeddingSystemSection from "@/components/BeddingSystemSection";
import PatentBadge from "@/components/PatentBadge";
import StepCards from "@/components/StepCards";
import CtaBand from "@/components/CtaBand";
import PlaceholderImage from "@/components/PlaceholderImage";
import Trademark from "@/components/Trademark";
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
    "The SWAP Bedding System features a removable bottom sheet that snaps on and off in seconds—so you can change your bed the easy way.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.brandName} — Change your sheets. Not your fitted sheet.`,
    description:
      "The SWAP Bedding System features a removable bottom sheet that snaps on and off in seconds—so you can change your bed the easy way.",
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
}[] = [
  {
    icon: <BackIcon />,
    title: "Easier on Your Back",
    copy: "Change your bedsheets without wrestling with the mattress.",
    src: "/placeholders/top-sheet-peel-back.webp",
    alt: "A woman lifting the corner of the light-blue bottom sheet away from the snap fasteners on the fitted base",
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
  },
];

/**
 * The three layers called out on the two-part system diagram. `leader` is the
 * vertical position of that callout's leader line in the artwork, as a
 * percentage of the image height, so the label can be pinned to the dot that
 * points at its layer.
 */
const systemLayers = [
  {
    title: "Removable Bottom Sheet",
    copy: "Snaps on and off in seconds.",
    leader: "8.58%",
  },
  {
    title: "Fitted Base",
    copy: "Stays on your mattress securely.",
    leader: "24.38%",
  },
  {
    title: "Mattress",
    copy: "Your mattress. The foundation that supports you.",
    leader: "45.88%",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — photo bleeds to the top and right edges on large screens */}
      <section className="relative bg-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:px-8 md:py-20 lg:min-h-[560px] lg:grid-cols-2">
          <div>
            <h1 className="font-serif text-4xl leading-tight text-charcoal sm:text-5xl md:text-[3.4rem]">
              Change your sheets. Not your fitted sheet.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-warmgray">
              The {siteConfig.brandShort}
              <Trademark /> {siteConfig.brandSubtitle} features a removable
              bottom sheet that snaps on and off in seconds—so you can change
              your bed the easy way.
            </p>
            <div className="mt-8">
              <BenefitStrip items={heroBenefits} />
            </div>
            <div className="mt-9">
              <Link
                href="/product"
                className="inline-flex items-center gap-3 rounded-md bg-charcoal px-8 py-4 text-sm font-medium uppercase tracking-[0.14em] text-cream transition-colors hover:bg-charcoal-deep"
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
              alt="The SWAP system on a grey platform bed: light-blue fitted base and bottom sheet with a navy throw folded across the foot"
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
            alt="The SWAP system on a grey platform bed: light-blue fitted base and bottom sheet with a navy throw folded across the foot"
            width={1402}
            height={1122}
            priority
            className="h-full w-full rounded-none object-contain"
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
          className="mb-12 text-center text-lg font-semibold uppercase tracking-[0.14em] text-charcoal"
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
      <section aria-label="Everyday benefits" className="bg-cream px-6 py-16 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {lifestylePanels.map((panel) => (
            <figure
              key={panel.title}
              className="flex h-full flex-col overflow-hidden rounded-xl border border-stone bg-cream"
            >
              {/* The photo is scaled to fit this tile, never cropped to it,
                  so the snaps and grommets stay in frame. The caption sits
                  below the tile rather than over the photo for the same
                  reason. */}
              <div className="relative aspect-[4/3] bg-ivory">
                <PlaceholderImage
                  src={panel.src}
                  alt={panel.alt}
                  width={800}
                  height={600}
                  className="absolute inset-0 h-full w-full rounded-none object-contain"
                />
                <span
                  className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-slate text-cream"
                  aria-hidden="true"
                >
                  {panel.icon}
                </span>
              </div>
              <figcaption className="p-6">
                <p className="text-lg font-bold uppercase leading-snug tracking-[0.06em] text-charcoal">
                  {panel.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-warmgray">{panel.copy}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Two-part system — the diagram artwork carries no text, so the
          heading, copy and callouts render as live, editable text. On large
          screens each callout is pinned to the leader line its dot sits on in
          the artwork, so every label lines up with the layer it names. */}
      <Section
        background="cream"
        eyebrow="A better way to bed."
        title="The two-part system that stays put."
        intro="The fitted base stays securely on your mattress. The removable bottom sheet is what gets changed. It's that simple."
      >
        <div className="relative">
          <div className="lg:w-[58%]">
            <PlaceholderImage
              src="/placeholders/system-diagram-clean.webp"
              alt="Exploded diagram of the two-part system: a removable bottom sheet with snap fasteners lifts away from a fitted base, which stays on the mattress and its foundation below."
              width={1265}
              height={1010}
              className="rounded-none"
            />
          </div>
          <dl className="mt-10 space-y-8 lg:mt-0 lg:space-y-0">
            {systemLayers.map((layer) => (
              <div
                key={layer.title}
                style={{ top: layer.leader }}
                className="border-l-2 border-slate pl-5 lg:absolute lg:left-[62%] lg:right-0 lg:-translate-y-1/2"
              >
                <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-charcoal">
                  {layer.title}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-warmgray">
                  {layer.copy}
                </dd>
              </div>
            ))}
          </dl>
          {/* Carries each leader line across the gutter, from the edge of the
              artwork to the label that names the layer it points at. */}
          {systemLayers.map((layer) => (
            <span
              key={layer.title}
              aria-hidden="true"
              style={{ top: layer.leader }}
              className="absolute left-[58%] hidden h-px w-[4%] bg-slate lg:block"
            />
          ))}
        </div>
      </Section>

      {/* The bedding system: what comes in the system, then what it fits */}
      <BeddingSystemSection headingId="system-heading" />

      <CtaBand
        title="Start a Retail Account"
        copy="A smarter bed sheet system your customers will love."
      />
    </>
  );
}
