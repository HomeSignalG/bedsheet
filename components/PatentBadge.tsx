import { ShieldIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

/**
 * "Patented system" callout card used on Home and Product heroes.
 *
 * The wording lives in `siteConfig.patent` alongside every other patent
 * claim the site makes, so legal review changes them all in one place.
 */
export default function PatentBadge() {
  return (
    <div className="inline-flex items-start gap-4 rounded-lg border border-stone bg-cream p-5 shadow-sm">
      <span className="mt-0.5 shrink-0 text-slate" aria-hidden="true">
        <ShieldIcon />
      </span>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-charcoal">
          {siteConfig.patent.badgeTitle}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-warmgray">
          {siteConfig.patent.badgeCopy.map((line, index) => (
            <span key={line}>
              {index > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
