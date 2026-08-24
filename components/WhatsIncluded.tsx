import type { ReactNode } from "react";
import {
  FittedBaseIllustration,
  PillowcasesIllustration,
  TopSheetIllustration,
  TwoSheetsIllustration,
} from "@/components/icons";
import { siteConfig } from "@/config/site";

/**
 * What comes in one system, on the Product page.
 *
 * The pair of removable bottom sheets is the reason the system exists, so it
 * leads in a panel of its own with the benefit spelled out; the other three
 * contents follow as equal columns. Quantities and the pillowcase qualifier
 * come from `siteConfig.systemContents` so Home cannot drift from Product.
 */

const illustrations: Record<string, ReactNode> = {
  "Fitted Mattress Base Sheet": (
    <FittedBaseIllustration className="h-16 w-auto" />
  ),
  "Top Sheet": <TopSheetIllustration className="h-16 w-auto" />,
  Pillowcases: <PillowcasesIllustration className="h-16 w-auto" />,
};

export default function WhatsIncluded({ headingId }: { headingId: string }) {
  const featured = siteConfig.systemContents.find((entry) => entry.featured);
  const supporting = siteConfig.systemContents.filter(
    (entry) => !entry.featured,
  );

  return (
    <div>
      <h2
        id={headingId}
        className="text-lg font-semibold uppercase tracking-[0.14em] text-charcoal"
      >
        What&apos;s Included
      </h2>
      <p className="mt-3 leading-relaxed text-warmgray">
        More than a sheet set. Designed to make changing your bed easier.
      </p>

      {featured && (
        <div className="mt-8 rounded-lg border border-stone bg-ivory p-7 sm:p-10">
          <div className="grid items-center gap-8 sm:grid-cols-[auto_1fr] sm:gap-12">
            <span className="text-slate" aria-hidden="true">
              <TwoSheetsIllustration className="h-24 w-auto sm:h-28" />
            </span>
            <div>
              <h3 className="text-xl font-semibold uppercase tracking-[0.12em] text-charcoal sm:text-2xl">
                {featured.quantity}&times; {featured.item}
              </h3>
              <p className="mt-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-slate-deep">
                One on the bed. One ready to swap in.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-charcoal">
                No need to wash and dry your sheet the same day.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-warmgray">
                Remove the used bottom sheet and put the clean one on when
                you&apos;re ready.
              </p>
            </div>
          </div>
        </div>
      )}

      <ul className="mt-10 grid gap-10 sm:grid-cols-3">
        {supporting.map((entry) => (
          <li key={entry.item} className="text-center">
            <span
              className="flex justify-center text-slate"
              aria-hidden="true"
            >
              {illustrations[entry.item]}
            </span>
            {/* Body face rather than the serif used for the quantities on
                Home: the display serif draws its times sign small and high
                on the math axis, so "4x" reads as a superscript next to a
                lining figure. The body face sets the pair correctly, the
                same way it does in the dimensions column of the size table. */}
            <p className="mt-5 text-3xl font-semibold leading-none text-charcoal">
              {entry.quantity}&times;
            </p>
            <p className="mt-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-charcoal">
              {entry.item}
            </p>
            {entry.note && (
              <p className="mt-1.5 text-sm leading-relaxed text-warmgray">
                {entry.note}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
