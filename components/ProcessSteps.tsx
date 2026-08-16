/**
 * Horizontal step diagram (e.g. REMOVE → WASH → REATTACH).
 * Renders as an ordered list for semantics; arrows are decorative.
 */
export default function ProcessSteps({
  steps,
}: {
  steps: { label: string; description?: string }[];
}) {
  return (
    <ol className="grid gap-8 sm:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col">
      {steps.map((step, index) => (
        <li key={step.label} className="relative">
          <div className="flex items-baseline gap-4">
            <span
              className="font-serif text-4xl text-accent md:text-5xl"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-navy">
              {step.label}
            </span>
          </div>
          {step.description && (
            <p className="mt-4 text-sm leading-relaxed text-navy/75">
              {step.description}
            </p>
          )}
          {index < steps.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute -right-6 top-2 hidden text-2xl text-accent lg:block"
            >
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
