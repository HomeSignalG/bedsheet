import type { ReactNode } from "react";

type SectionBackground = "white" | "ivory" | "beige" | "navy";

const backgroundClasses: Record<SectionBackground, string> = {
  white: "bg-white text-navy",
  ivory: "bg-ivory text-navy",
  beige: "bg-beige text-navy",
  navy: "bg-navy text-white",
};

/**
 * Shared section wrapper: consistent vertical rhythm, max width, and an
 * optional eyebrow / title / intro block.
 */
export default function Section({
  background = "white",
  eyebrow,
  title,
  intro,
  children,
  labelledBy,
}: {
  background?: SectionBackground;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children?: ReactNode;
  /** id used to label the section when a title is rendered */
  labelledBy?: string;
}) {
  const headingId = labelledBy ?? (title ? slugify(title) : undefined);

  return (
    <section
      className={`${backgroundClasses[background]} px-6 py-20 sm:px-8 md:py-28`}
      aria-labelledby={title ? headingId : undefined}
    >
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title || intro) && (
          <div className="mb-12 max-w-3xl md:mb-16">
            {eyebrow && (
              <p
                className={`mb-3 text-xs font-semibold uppercase tracking-[0.2em] ${
                  background === "navy" ? "text-mist" : "text-accent"
                }`}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 id={headingId} className="font-serif text-3xl leading-tight md:text-4xl">
                {title}
              </h2>
            )}
            {intro && (
              <p
                className={`mt-5 text-lg leading-relaxed ${
                  background === "navy" ? "text-mist" : "text-navy/75"
                }`}
              >
                {intro}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
