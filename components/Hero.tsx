import type { ReactNode } from "react";

/**
 * Shared hero block. Supports a full-width text hero or a split layout
 * with media on the right.
 */
export default function Hero({
  eyebrow,
  title,
  copy,
  actions,
  media,
  background = "ivory",
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  actions?: ReactNode;
  media?: ReactNode;
  background?: "ivory" | "white" | "navy";
}) {
  const bg =
    background === "navy"
      ? "bg-navy text-white"
      : background === "white"
        ? "bg-white text-navy"
        : "bg-ivory text-navy";

  return (
    <section className={`${bg} px-6 py-20 sm:px-8 md:py-28`}>
      <div
        className={`mx-auto max-w-6xl ${
          media ? "grid items-center gap-12 lg:grid-cols-2 lg:gap-16" : ""
        }`}
      >
        <div className={media ? "" : "max-w-3xl"}>
          {eyebrow && (
            <p
              className={`mb-4 text-xs font-semibold uppercase tracking-[0.2em] ${
                background === "navy" ? "text-mist" : "text-accent"
              }`}
            >
              {eyebrow}
            </p>
          )}
          <h1 className="font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {copy && (
            <p
              className={`mt-6 max-w-xl text-lg leading-relaxed ${
                background === "navy" ? "text-mist" : "text-navy/75"
              }`}
            >
              {copy}
            </p>
          )}
          {actions && <div className="mt-10 flex flex-wrap gap-4">{actions}</div>}
        </div>
        {media && <div>{media}</div>}
      </div>
    </section>
  );
}
