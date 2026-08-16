import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import FeatureCard from "@/components/FeatureCard";
import ImageCard from "@/components/ImageCard";
import ProcessSteps from "@/components/ProcessSteps";
import SystemDiagram from "@/components/SystemDiagram";
import PlaceholderImage from "@/components/PlaceholderImage";
import { ButtonLink } from "@/components/Button";
import { BackIcon, ChildIcon, HouseIcon } from "@/components/icons";
import { pocketDepthProse, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `${siteConfig.brandName} — Change your sheets. Not your fitted base.`,
  description:
    "A two-part bed-sheet system: the fitted base stays installed on the mattress while the removable sleeping surface comes off for washing.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.brandName} — Change your sheets. Not your fitted base.`,
    description:
      "A two-part bed-sheet system: the fitted base stays installed on the mattress while the removable sleeping surface comes off for washing.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow={siteConfig.tagline}
        title="Change your sheets. Not your fitted base."
        copy="Our two-part system separates the sleeping surface from the fitted base. The removable top comes off for washing; the fitted base stays right where it belongs — on the mattress."
        actions={<ButtonLink href="/product">Discover the Product</ButtonLink>}
        media={
          <PlaceholderImage
            src="/images/home-hero.svg"
            alt="The removable top being lifted away from the fitted base on a made bed"
            width={1200}
            height={900}
            priority
          />
        }
      />

      <Section
        background="white"
        eyebrow="Why it matters"
        title="Fresh sheets, without the fight"
      >
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard title="Easier on Your Back" icon={<BackIcon />}>
            Change the sleeping surface without repeatedly wrestling with or
            lifting the mattress. The fitted base stays installed, so laundry
            day skips the hardest part.
          </FeatureCard>
          <FeatureCard title="Easy Enough for Kids" icon={<ChildIcon />}>
            A simpler way for kids and teenagers to take responsibility for
            changing their own sheets — no fighting a fitted sheet onto a
            mattress corner by corner.
          </FeatureCard>
          <FeatureCard title="Made for Real Life" icon={<HouseIcon />}>
            Everyday messes, pets, kids, laundry day, busy households. Fresh
            sheets should be easier — so we made them easier.
          </FeatureCard>
        </div>
      </Section>

      <Section
        background="ivory"
        eyebrow="Simple process"
        title="Three steps to a fresh bed"
      >
        <ProcessSteps
          steps={[
            {
              label: "Remove",
              description:
                "Detach the sleeping surface from the fitted base — no mattress lifting required.",
            },
            {
              label: "Wash",
              description:
                "The removable top goes in the wash like any other sheet.",
            },
            {
              label: "Reattach",
              description:
                "Secure the clean top back onto the base and the bed is made.",
            },
          ]}
        />
      </Section>

      <Section
        background="white"
        eyebrow="Everyday life"
        title="Designed around the way people actually live"
      >
        <div className="grid gap-6 md:grid-cols-3">
          <ImageCard
            src="/images/lifestyle-ease.svg"
            alt="Placeholder for a photo of someone easily removing the top layer of the bed"
            title="An easier physical process"
            caption="Swap the sleeping surface from the top of the bed — the fitted base never has to come off."
          />
          <ImageCard
            src="/images/lifestyle-kids.svg"
            alt="Placeholder for a photo of a child around age ten changing their own bed"
            title="Kids can do it themselves"
            caption="Simple enough that kids and teens can change their own bed — without wrestling a traditional fitted sheet."
          />
          <ImageCard
            src="/images/lifestyle-household.svg"
            alt="Placeholder for a photo of a busy family household with pets"
            title="Built for busy households"
            caption="Families, pets, spills, and short weekends. When washing is easy, sheets get washed."
          />
        </div>
      </Section>

      <Section
        background="ivory"
        eyebrow="The system"
        title="Two parts. One better routine."
        intro="The fitted base installs once and stays put. The removable sleeping surface is the only part you change regularly."
      >
        <SystemDiagram />
      </Section>

      <Section background="beige" labelledBy="size-callout">
        <div className="text-center">
          <h2 id="size-callout" className="font-serif text-3xl md:text-4xl">
            {siteConfig.sizeRange}
          </h2>
          <p className="mt-4 text-lg text-navy/75">
            Fits mattresses {pocketDepthProse()} deep
          </p>
          <div className="mt-8">
            <ButtonLink href="/product" variant="secondary">
              See Sizes &amp; Specifications
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section background="navy" labelledBy="retail-heading">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-mist">
            For buyers
          </p>
          <h2 id="retail-heading" className="font-serif text-3xl md:text-4xl">
            Built for Retail
          </h2>
          <p className="mt-5 leading-relaxed text-mist">
            A patented two-part bedding system designed for today&rsquo;s
            retail market. We welcome inquiries from retail buyers and
            distributors.
          </p>
          <div className="mt-8">
            <ButtonLink href="/contact" variant="onDark">
              Contact Us
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
