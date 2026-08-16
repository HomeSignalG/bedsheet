import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ImageCard from "@/components/ImageCard";
import ProcessSteps from "@/components/ProcessSteps";
import SpecTable from "@/components/SpecTable";
import PlaceholderImage from "@/components/PlaceholderImage";
import { ButtonLink } from "@/components/Button";
import { pocketDepthProse, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Technical overview of the two-part bed-sheet system: removable washable top, secure fitted base, sizing from Twin through California King, and specifications.",
  alternates: { canonical: "/product" },
  openGraph: {
    title: `Product | ${siteConfig.brandName}`,
    description:
      "Technical overview of the two-part bed-sheet system: removable washable top, secure fitted base, sizing from Twin through California King, and specifications.",
    url: "/product",
  },
};

const PENDING = "Final specification pending.";

const constructionDetails = [
  {
    src: "/images/construction-attachment.svg",
    alt: "Placeholder for a close-up photo of the attachment mechanism",
    title: "Attachment mechanism",
    caption: `Secures the removable top to the fitted base and releases without lifting the mattress. ${PENDING}`,
  },
  {
    src: "/images/construction-top.svg",
    alt: "Placeholder for a photo of the removable top construction",
    title: "Removable top construction",
    caption: `The washable sleeping surface, engineered to attach flat and stay smooth through the night. ${PENDING}`,
  },
  {
    src: "/images/construction-base.svg",
    alt: "Placeholder for a photo of the fitted base",
    title: "Fitted base",
    caption: `Installs once and stays securely on the mattress between washes. ${PENDING}`,
  },
  {
    src: "/images/construction-corner.svg",
    alt: "Placeholder for a close-up photo of the corner and retention construction",
    title: "Corner / retention construction",
    caption: `Designed to hold the base in place across a wide range of mattress depths. ${PENDING}`,
  },
  {
    src: "/images/construction-seams.svg",
    alt: "Placeholder for a close-up photo of seams and stitching",
    title: "Seams / stitching",
    caption: `Constructed for repeated washing and reattachment. ${PENDING}`,
  },
  {
    src: "/images/construction-fabric.svg",
    alt: "Placeholder for a close-up photo of the fabric",
    title: "Fabric",
    caption: `Fabric selection is under evaluation. ${PENDING}`,
  },
];

const productDetailSections = [
  {
    title: "Materials",
    body: `Material selection for the removable top and fitted base is in progress. Fabric composition and thread specifications will be published once finalized. ${PENDING}`,
  },
  {
    title: "Colors",
    body: `The launch color palette is being finalized. Colorways will be announced ahead of retail availability. ${PENDING}`,
  },
  {
    title: "Care instructions",
    body: `The removable top is designed to be machine-washed like a conventional sheet. Complete care instructions will accompany final fabric selection. ${PENDING}`,
  },
  {
    title: "Packaging",
    body: `Retail packaging is in development and will be designed for shelf and planogram requirements. ${PENDING}`,
  },
  {
    title: "Product construction",
    body: `Construction documentation — including attachment hardware, seam specifications, and durability testing — will be published as manufacturing details are finalized. ${PENDING}`,
  },
  {
    title: "Patent",
    body: siteConfig.patent.shortNotice,
  },
  {
    title: "Retail-ready specifications",
    body: `A complete retail specification sheet — including case-pack details and logistics information — will be available to buyers upon request once finalized. Buyer inquiries are welcome through our contact page. ${PENDING}`,
  },
];

export default function ProductPage() {
  return (
    <>
      <Hero
        background="white"
        eyebrow="The product"
        title="The two-part system that stays put."
        copy="A removable, washable top attached to a secure fitted base. Easy attachment and removal, designed for a wide range of mattress depths — so changing the bed means changing one layer, not remaking the whole thing."
        media={
          <PlaceholderImage
            src="/images/product-hero.svg"
            alt="Clean isolated visual of the two-part sheet system: removable top and fitted base"
            width={1200}
            height={900}
            priority
          />
        }
      />

      <Section background="ivory" labelledBy="system-overview">
        <h2 id="system-overview" className="sr-only">
          System overview
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Removable washable top",
              body: "The sleeping surface detaches and machine-washes like a conventional sheet.",
            },
            {
              title: "Secure fitted base",
              body: "Stays installed on the mattress — no repeated removal and reinstallation.",
            },
            {
              title: "Easy attachment / removal",
              body: "Designed so the top releases and reattaches without lifting the mattress.",
            },
            {
              title: "Wide depth range",
              body: `One fit designed for mattresses ${pocketDepthProse()} deep.`,
            },
          ].map((item) => (
            <div key={item.title} className="border border-mist bg-white p-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-navy/75">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        background="white"
        eyebrow="Construction details"
        title="How it's built"
        intro="Detailed construction documentation is being finalized alongside manufacturing. Where a specification is not yet locked, it is marked as pending."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {constructionDetails.map((detail) => (
            <ImageCard key={detail.title} {...detail} />
          ))}
        </div>
      </Section>

      <Section
        background="ivory"
        eyebrow="How it works"
        title="Four steps, no mattress wrestling"
      >
        <ProcessSteps
          steps={[
            {
              label: "Detach",
              description: "Release the removable top from the fitted base.",
            },
            {
              label: "Remove",
              description: "Lift the sleeping surface away — the base stays on the mattress.",
            },
            {
              label: "Wash",
              description: "Machine-wash the top like any conventional sheet.",
            },
            {
              label: "Reattach",
              description: "Secure the clean top back onto the base. Done.",
            },
          ]}
        />
      </Section>

      <Section
        background="beige"
        eyebrow="What's included"
        title="In every set"
      >
        <ul className="grid max-w-2xl gap-4 sm:grid-cols-2">
          {siteConfig.whatsIncluded.map((item) => (
            <li
              key={item}
              className="border border-navy/15 bg-white p-6 text-center"
            >
              <span className="font-serif text-xl">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-navy/60">
          Packaging contents are subject to final configuration ahead of retail
          launch.
        </p>
      </Section>

      <Section
        background="white"
        eyebrow="Specifications"
        title="Size & pocket depth"
        intro={`Available ${siteConfig.sizeRange}. Every size is designed to fit mattresses ${pocketDepthProse()} deep.`}
      >
        <SpecTable />
      </Section>

      <Section
        background="ivory"
        eyebrow="Product details"
        title="Documentation & specifications"
        intro="The sections below reflect the current state of product development. Nothing here is final until it says so."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {productDetailSections.map((section) => (
            <section
              key={section.title}
              aria-label={section.title}
              className="border border-mist bg-white p-8"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">
                {section.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-navy/75">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </Section>

      <Section background="navy" labelledBy="product-cta">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="product-cta" className="font-serif text-3xl md:text-4xl">
            Questions about the product?
          </h2>
          <p className="mt-5 leading-relaxed text-mist">
            Retail buyers, distributors, media, and anyone curious about the
            system can reach us through our contact page.
          </p>
          <div className="mt-8">
            <ButtonLink href="/contact" variant="onDark">
              Get in Touch
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
