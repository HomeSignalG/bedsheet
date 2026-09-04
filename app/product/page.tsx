import type { Metadata } from "next";
import Section from "@/components/Section";
import PatentBadge from "@/components/PatentBadge";
import HeroPhoto from "@/components/HeroPhoto";
import StepCards from "@/components/StepCards";
import CtaBand from "@/components/CtaBand";
import SpecTable from "@/components/SpecTable";
import WhatsIncluded from "@/components/WhatsIncluded";
import ColorSwatches from "@/components/ColorSwatches";
import PlaceholderImage, { type Photo } from "@/components/PlaceholderImage";
import ImageCard from "@/components/ImageCard";
import Trademark from "@/components/Trademark";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
import {
  CheckSolidIcon,
  DiamondIcon,
  FabricIcon,
  WashIcon,
} from "@/components/icons";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Two-Part Bed Sheet System",
  description:
    "A fitted base sheet that stays on the mattress and a removable bottom sheet that snaps on and off. Six sizes, Twin to California King, depths 10\"–22\".",
  path: "/product",
});

/** Hero photograph. Declared once so both renderings share one description. */
const heroPhoto: Photo = {
  src: "/placeholders/bedroom-warm.webp",
  alt: "The BackEasy Sheets system on an upholstered bed: white fitted base and bottom sheet with snap fasteners along the edge, and a woven throw folded across the foot",
  width: 1536,
  height: 1024,
};

/** The two parts the hero photograph calls out, named as on the diagram. */
const heroParts = [
  {
    title: "Removable Bottom Sheet",
    copy: "Soft, smooth, and easy to remove and wash.",
  },
  {
    title: "Fitted Base",
    copy: "Stays securely on your mattress. All. The. Time.",
  },
];

const heroChecklist = [
  "Snaps on and off in seconds",
  "Fitted base stays on your mattress",
  'Available in six mattress sizes, with pocket depths from 10"–22".',
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
    icon: <DiamondIcon />,
    title: "Built to Last",
    copy: "Premium materials and construction you can count on for years.",
  },
  {
    icon: <WashIcon />,
    title: "Easy Care",
    copy: "Machine wash with like colors. Tumble dry low. Remove promptly.",
  },
];

/**
 * One labelled part of the hero photograph.
 *
 * Renders the `dt`/`dd` pair and its own wrapping `div` — the single level
 * of wrapping a `dl` permits. Anything positioning these has to style this
 * div rather than add another around it, or the list becomes invalid.
 */
function HeroLabel({
  title,
  copy,
  className = "",
}: {
  title: string;
  copy: string;
  className?: string;
}) {
  return (
    <div className={`border-l-2 border-slate pl-4 ${className}`}>
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
      <BreadcrumbStructuredData name="Product" path="/product" />
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
              easy way. Instead of pulling a conventional fitted sheet off the
              mattress and working a clean one back over each corner, you unsnap
              one layer and snap on the next.
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
            <PlaceholderImage {...heroPhoto} priority sizes="(min-width: 640px) 640px, 100vw" />
            <dl className="mt-6 grid gap-6 sm:grid-cols-2">
              {heroParts.map((part) => (
                <HeroLabel key={part.title} {...part} />
              ))}
            </dl>
          </div>
        </div>
        {/* Photo with overlaid callouts on large screens. Both callouts are
            positioned against the photograph — see HeroPhoto — so they stay
            on the bed they name at every viewport width. */}
        <HeroPhoto photo={heroPhoto}>
          <dl>
            <HeroLabel
              {...heroParts[0]}
              className="absolute right-4 top-6 max-w-56 rounded-lg border-l-2 bg-cream/90 p-4 pl-4 shadow-sm backdrop-blur-sm"
            />
            <HeroLabel
              {...heroParts[1]}
              className="absolute bottom-6 right-4 max-w-56 rounded-lg border-l-2 bg-cream/90 p-4 pl-4 shadow-sm backdrop-blur-sm"
            />
          </dl>
        </HeroPhoto>
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
          <h2 className="mb-4 text-lg font-semibold uppercase tracking-[0.14em] text-charcoal">
            Change Your Bottom Sheet in Seconds
          </h2>
          <p className="mb-10 max-w-2xl leading-relaxed text-warmgray">
            Two parts, one bed. The fitted mattress base sheet is installed
            once and stays on the mattress. The removable bottom sheet snaps to
            it, and that is the part you take off, wash, and snap back on.
          </p>
          <StepCards
            layout="stacked"
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
        </div>
      </section>

      {/* Product information, read top to bottom: what's in the box, then
          what it fits, then what it comes in. One section with hairline
          rules so the three read as one block rather than three bands. */}
      <Section background="cream" labelledBy="whats-included-heading">
        <WhatsIncluded headingId="whats-included-heading" />

        <div className="mt-14 border-t border-stone pt-12">
          {/* scroll-mt: the header is sticky, so Home's link to this anchor
              would otherwise land with the heading behind it. */}
          <h2
            id="spec-heading"
            className="mb-10 scroll-mt-24 text-lg font-semibold uppercase tracking-[0.14em] text-charcoal"
          >
            Sizes &amp; Mattress Depths
          </h2>
          <SpecTable />
        </div>

        <div className="mt-14 border-t border-stone pt-12">
          <h2
            id="colors-heading"
            className="text-lg font-semibold uppercase tracking-[0.14em] text-charcoal"
          >
            Available Colors
          </h2>
          <p className="mt-3 leading-relaxed text-warmgray">
            Classic colors designed to complement every bedroom.
          </p>
          <div className="mt-8">
            <ColorSwatches />
          </div>
        </div>
      </Section>

      {/* Detail strip */}
      <section aria-label="Materials, care, and construction" className="border-t border-stone bg-cream px-6 py-14 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {detailStrip.map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <span className="mt-0.5 shrink-0 text-slate" aria-hidden="true">
                {item.icon}
              </span>
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
