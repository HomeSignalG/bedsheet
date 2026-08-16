import { ShieldIcon } from "@/components/icons";

/** "Patented system" callout card used on Home and Product heroes. */
export default function PatentBadge() {
  return (
    <div className="inline-flex items-start gap-4 border border-mist bg-white p-5">
      <span className="mt-0.5 shrink-0 text-navy" aria-hidden="true">
        <ShieldIcon />
      </span>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-navy">
          Patented System
        </p>
        <p className="mt-1 text-sm leading-relaxed text-navy/70">
          Engineered for a better bed.
          <br />
          Designed for real life.
        </p>
      </div>
    </div>
  );
}
