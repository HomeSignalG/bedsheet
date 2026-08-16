import PlaceholderImage from "@/components/PlaceholderImage";

/**
 * Numbered process steps — number + text beside an image, with arrow
 * separators ("Change your top sheet in seconds"), per the mockups.
 */
export default function StepCards({
  steps,
}: {
  steps: { label: string; copy: string; src: string; alt: string }[];
}) {
  return (
    <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
      {steps.map((step, index) => (
        <li key={step.label} className="relative">
          <div className="grid grid-cols-[1fr_1.2fr] items-center gap-4">
            <div>
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <h3 className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-navy">
                {step.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/70">{step.copy}</p>
            </div>
            <PlaceholderImage
              src={step.src}
              alt={step.alt}
              width={800}
              height={600}
              className="rounded-lg"
            />
          </div>
          {index < steps.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute -right-6 top-1/2 hidden -translate-y-1/2 text-2xl text-navy/40 md:block"
            >
              ›
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
