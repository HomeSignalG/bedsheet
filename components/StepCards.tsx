import PlaceholderImage from "@/components/PlaceholderImage";

/**
 * Numbered process steps with arrow separators.
 * `row` (Home): number + text beside the image.
 * `stacked` (Product): number badge on the image, text below.
 *
 * Every step shares a 3:4 tile so the steps line up regardless of each
 * source photo's aspect ratio. The photo is scaled to fit inside that tile
 * rather than cropped to it, so the snaps and grommets stay in frame.
 */
export default function StepCards({
  steps,
  layout = "row",
}: {
  steps: { label: string; copy: string; src: string; alt: string }[];
  layout?: "row" | "stacked";
}) {
  return (
    <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
      {steps.map((step, index) => (
        <li key={step.label} className="relative">
          {layout === "row" ? (
            <div className="grid grid-cols-[1fr_1.2fr] items-center gap-4">
              <div>
                <StepNumber index={index} />
                <h3 className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-charcoal">
                  {step.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-warmgray">{step.copy}</p>
              </div>
              <StepImage step={step} />
            </div>
          ) : (
            <div>
              <div className="relative">
                <StepImage step={step} />
                <span className="absolute -left-2 -top-2 z-10" aria-hidden="true">
                  <StepNumber index={index} />
                </span>
              </div>
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-charcoal">
                {step.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-warmgray">{step.copy}</p>
            </div>
          )}
          {index < steps.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute -right-6 top-1/2 hidden -translate-y-1/2 text-2xl text-warmgray/60 md:block"
            >
              ›
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

function StepImage({ step }: { step: { src: string; alt: string } }) {
  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-ivory">
      <PlaceholderImage
        src={step.src}
        alt={step.alt}
        width={800}
        height={1000}
        bare
        sizes="(min-width: 768px) 33vw, 100vw"
        className="absolute inset-0 h-full w-full object-contain"
      />
    </div>
  );
}

function StepNumber({ index }: { index: number }) {
  return (
    <span
      className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal text-sm font-semibold text-cream"
      aria-hidden="true"
    >
      {index + 1}
    </span>
  );
}
