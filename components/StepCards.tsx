import PlaceholderImage from "@/components/PlaceholderImage";

/**
 * Numbered process steps with images and arrow separators
 * ("Change your top sheet in seconds").
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
          <div className="flex items-start gap-4">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy font-serif text-lg text-white"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-navy">
                    {step.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/70">
                    {step.copy}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <PlaceholderImage src={step.src} alt={step.alt} width={800} height={600} />
              </div>
            </div>
          </div>
          {index < steps.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute -right-6 top-1/2 hidden -translate-y-1/2 text-2xl text-accent md:block"
            >
              ›
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
