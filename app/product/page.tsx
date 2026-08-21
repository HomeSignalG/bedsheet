import type { Metadata } from "next";
import Section from "@/components/Section";
import PatentBadge from "@/components/PatentBadge";
import BeddingSystemSection from "@/components/BeddingSystemSection";
import StepCards from "@/components/StepCards";
import CtaBand from "@/components/CtaBand";
import SpecTable from "@/components/SpecTable";
import PlaceholderImage from "@/components/PlaceholderImage";
import ImageCard from "@/components/ImageCard";
import Trademark from "@/components/Trademark";
import {
  CheckSolidIcon,
  DiamondIcon,
  FabricIcon,
  WashIcon,
} from "@/components/icons";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Product",
  description:
    "A fitted base that stays on your mattress and a removable bottom sheet that snaps on and off in seconds. Six sizes, Twin through California King, available in mattress depths from 10\"–22\".",
  alternates: { canonical: "/product" },
  openGraph: {
    title: `Product | ${siteConfig.brandName}`,
    description:
      "A fitted base that stays on your mattress and a removable bottom sheet that snaps on and off in seconds. Six sizes, Twin through California King, available in mattress depths from 10\"–22\".",
    url: "/product",
  },
};

const heroChecklist = [
  "Snaps on and off in seconds",
  "Fitted base stays on your mattress",
  "Choose your mattress size and depth",
];

const featureCards = [
  {
    title: "1. Secure Snap System",
    src: "/placeholders/snap-system-taupe.webp",
    alt: "Close-up of the snap system: the stud on the bottom sheet corner aligned above the matching socket on the fitted base",
    caption:
      "Durable, low-profile snaps keep the bottom sheet perfectly in place—no shifting, no bunching.",
  },
  {
    title: "2. Smooth, Low Profile",
    src: "/placeholders/snap-low-profile.webp",
    alt: "Raking close-up of a single low-profile snap sitting almost flush with the sheet surface",
    caption:
      "Snaps are discreet and smooth so you won't feel them and they won't interfere with your comfort.",
  },
  {
    title: "3. Deep, Secure Pocket",
    src: "/placeholders/elastic-pocket.webp",
    alt: "A hand lifting the elasticized hem of the fitted base at a mattress corner, showing the depth of the pocket",
    caption:
      "Deep pockets and elasticized edges keep the fitted base locked in, night after night.",
  },
  {
    title: "4. Quality Construction",
    src: "/placeholders/snap-construction.webp",
    alt: "Close-up of a hand holding the sheet corner, showing the set grommet and the reinforced stitching along the hem",
    caption:
      "Reinforced stitching, premium fabrics, and durable hardware built to last through countless washes.",
  },
];

const detailStrip = [
  {
    icon: <FabricIcon />,
    title: "Premium Fabrics",
    copy: "Soft, breathable, and durable fabrics for lasting comfort and performance.",
  },
  {
    icon: <WashIcon />,
    title: "Care Instructions",
    copy: "Machine wash with like colors. Tumble dry low. Remove promptly.",
  },
  {
    icon: null,
    title: "Colors",
    copy: "Classic colors that fit every bedroom.",
  },
  {
    icon: <DiamondIcon />,
    title: "Built to Last",
    copy: "Premium materials and construction you can count on for years.",
  },
];

function HeroLabel({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="border-l-2 border-slate pl-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal">
        {title}
      </dt>
      <dd className="mt-1 text-sm leading-relaxed text-warmgray">{copy}</dd>
    </div>
  );
}

export default function ProductPage() {
  return (
    <>
      {/* Hero — photo bleeds to the top and right edges on large screens */}
      <section className="relative bg-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:px-8 md:py-20 lg:min-h-[560px] lg:grid-cols-2">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-deep">
              The {siteConfig.brandShort}
              <Trademark /> Bedding System
            </p>
            <h1 className="font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
              The two-part system that stays put.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-warmgray">
              A fitted base that stays on your mattress. A removable bottom sheet
              that snaps on and off in seconds—so you can change your bed the
              easy way.
            </p>
            <ul className="mt-7 space-y-3">
              {heroChecklist.map((item) => (
                <li key={item} className="flex items-center gap-3 text-charcoal">
                  <span className="shrink-0 text-slate" aria-hidden="true">
                    <CheckSolidIcon />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <PatentBadge />
            </div>
          </div>
          {/* Contained image + labels on small screens */}
          <div className="lg:hidden">
            <PlaceholderImage
              src="/placeholders/bedroom-warm.webp"
              alt="The BackEasy Sheets system on an upholstered bed: white fitted base and bottom sheet with snap fasteners along the edge, and a woven throw folded across the foot"
              width={1536}
              height={1024}
              priority
            />
            <dl className="mt-6 grid gap-6 sm:grid-cols-2">
              <HeroLabel
                title="Removable Bottom Sheet"
                copy="Soft, smooth, and easy to remove and wash."
              />
              <HeroLabel
                title="Fitted Base"
                copy="Stays securely on your mattress. All. The. Time."
              />
            </dl>
          </div>
        </div>
        {/* Full-bleed photo with overlaid callouts on large screens */}
        <div className="absolute inset-y-0 right-0 hidden w-[46%] lg:block">
          <PlaceholderImage
            src="/placeholders/bedroom-warm.webp"
            alt="The BackEasy Sheets system on an upholstered bed: white fitted base and bottom sheet with snap fasteners along the edge, and a woven throw folded across the foot"
            width={1536}
            height={1024}
            priority
            className="h-full w-full rounded-none object-contain"
          />
          <dl>
            <div className="absolute right-8 top-14 max-w-56 rounded-lg bg-cream/90 p-4 shadow-sm backdrop-blur-sm">
              <HeroLabel
                title="Removable Bottom Sheet"
                copy="Soft, smooth, and easy to remove and wash."
              />
            </div>
            <div className="absolute bottom-16 right-8 max-w-56 rounded-lg bg-cream/90 p-4 shadow-sm backdrop-blur-sm">
              <HeroLabel
                title="Fitted Base"
                copy="Stays securely on your mattress. All. The. Time."
              />
            </div>
          </dl>
        </div>
      </section>

      {/* Feature cards */}
      <section id="features" aria-labelledby="features-heading" className="scroll-mt-24 bg-cream px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2
            id="features-heading"
            className="mb-10 text-lg font-semibold uppercase tracking-[0.14em] text-charcoal"
          >
            Designed to Work Better
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featureCards.map((card) => (
              <ImageCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section aria-label="How it works" className="bg-ivory px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-lg font-semibold uppercase tracking-[0.14em] text-charcoal">
            Change Your Bottom Sheet in Seconds
          </h2>
          <StepCards
            layout="stacked"
            steps={[
              {
                label: "Unsnap",
                copy: "Release the snaps along the sides.",
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
        </div>
      </section>

      {/* What comes in the system. The sizes half is left off here: the
          Sizes & Mattress Depths section below covers the same ground. */}
      <BeddingSystemSection
        headingId="bedding-system-heading"
        background="cream"
        showSizes={false}
      />

      {/* Sizes & mattress depths */}
      <Section background="cream" labelledBy="spec-heading">
        <h2
          id="spec-heading"
          className="mb-10 text-lg font-semibold uppercase tracking-[0.14em] text-charcoal"
        >
          Sizes &amp; Mattress Depths
        </h2>
        <SpecTable />
      </Section>

      {/* Detail strip */}
      <section aria-label="Materials, care, and colors" className="border-t border-stone bg-cream px-6 py-14 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {detailStrip.map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              {item.icon ? (
                <span className="mt-0.5 shrink-0 text-slate" aria-hidden="true">
                  {item.icon}
                </span>
              ) : (
                <span className="mt-1 flex shrink-0 gap-1.5" aria-hidden="true">
                  <span className="h-6 w-6 border border-stone bg-ivory" />
                  <span className="h-6 w-6 border border-stone bg-slate/70" />
                  <span className="h-6 w-6 border border-stone bg-taupe" />
                </span>
              )}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-charcoal">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-warmgray">{item.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Start a Retail Account"
        copy="A smarter bed sheet system your customers will love."
      />
    </>
  );
}
