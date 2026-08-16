import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import { ButtonLink } from "@/components/Button";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The two-part bed-sheet system began with a real problem: after back surgery, changing a conventional fitted sheet became painful for our founder. There had to be a better way.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About Us | ${siteConfig.brandName}`,
    description:
      "The two-part bed-sheet system began with a real problem: after back surgery, changing a conventional fitted sheet became painful for our founder. There had to be a better way.",
    url: "/about",
  },
};

const audiences = [
  "Busy households",
  "Parents",
  "Kids",
  "Teenagers",
  "Older adults",
  "People who simply dislike changing fitted sheets",
  "Anyone who wants a faster, simpler bedding routine",
];

const philosophy = [
  {
    title: "Solve real problems",
    body: "This product exists because of a real, everyday frustration — not a trend. Everything we make starts with a problem worth solving.",
  },
  {
    title: "Thoughtful design",
    body: "Every detail of the two-part system is considered: how it attaches, how it releases, and how it holds up to real life.",
  },
  {
    title: "Simplicity",
    body: "The best solution is the one that makes a chore smaller, not more complicated. Two parts. One simple routine.",
  },
  {
    title: "Quality",
    body: "A product meant to be washed and reattached again and again has to be built to last. We won't ship anything that isn't.",
  },
  {
    title: "Independence",
    body: "When changing the bed is easy, kids can own it, teens can own it, and adults keep owning it — at every stage of life.",
  },
  {
    title: siteConfig.tagline,
    body: "Messes, pets, laundry day, busy weeks. Our brand promise is a product that works the way real life actually happens.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="About us"
        title="A better way to change your sheets."
        copy="This product came from a very real problem — and evolved into something designed to make everyday life easier for anyone who has ever dreaded changing a fitted sheet."
      />

      <Section
        background="white"
        eyebrow="Our story"
        title="It started with a real problem"
      >
        <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-navy/80">
          <p>
            After back surgery, changing a conventional fitted sheet became
            painful for our founder. Lifting the mattress, reaching across the
            bed, stretching the elastic, and tucking each corner into place —
            the whole process became physically difficult.
          </p>
          <p>
            Over time, something else happened: she began avoiding the task
            altogether, because she had come to associate it with pain and
            discomfort. She still wanted clean sheets. The problem was the
            process required to get them.
          </p>
          <p>That led to the question at the center of this product:</p>
          <blockquote className="border-l-2 border-accent pl-6 font-serif text-2xl leading-snug text-navy md:text-3xl">
            Why should changing the part of the bed that gets dirty require
            lifting and remaking the entire fitted sheet?
          </blockquote>
          <p>
            From that question came the two-part bed-sheet concept: a fitted
            base that stays securely installed on the mattress, and a removable
            sleeping surface that comes off for washing and reattaches in
            moments.
          </p>
        </div>
      </Section>

      <Section
        background="ivory"
        eyebrow="Broader purpose"
        title="It started with one back. It's built for every household."
        intro="What began as one person's answer to back pain turned out to solve a problem almost everyone has."
      >
        <ul className="grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience) => (
            <li
              key={audience}
              className="border border-mist bg-white p-6 text-navy/80"
            >
              {audience}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        background="white"
        eyebrow="Brand philosophy"
        title="What we believe"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {philosophy.map((item) => (
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

      <Section background="navy" labelledBy="about-cta">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="about-cta" className="font-serif text-3xl md:text-4xl">
            See what we made
          </h2>
          <p className="mt-5 leading-relaxed text-mist">
            Explore the two-part system — how it works, how it&rsquo;s built,
            and the sizes it fits.
          </p>
          <div className="mt-8">
            <ButtonLink href="/product" variant="onDark">
              Discover the Product
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
