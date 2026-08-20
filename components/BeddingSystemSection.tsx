import Trademark from "@/components/Trademark";
import { pocketDepthRange, siteConfig } from "@/config/site";

type SectionBackground = "ivory" | "cream";

const backgroundClasses: Record<SectionBackground, string> = {
  ivory: "bg-ivory",
  cream: "bg-cream",
};

/**
 * The bedding-system section: what comes in the system, then what it fits.
 * Shared by the Home and Product pages so the two never drift apart.
 * `headingId` keeps the labelled-by reference unique per page. `background`
 * varies only the section fill: ivory on Home, cream on Product, where the
 * section above it is already ivory.
 */
export default function BeddingSystemSection({
  headingId = "bedding-system-heading",
  background = "ivory",
}: {
  headingId?: string;
  background?: SectionBackground;
}) {
  return (
    <section
      aria-labelledby={headingId}
      className={`${backgroundClasses[background]} px-6 py-16 sm:px-8 md:py-20`}
    >
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h2
            id={headingId}
            className="text-lg font-semibold uppercase tracking-[0.14em] text-charcoal"
          >
            The {siteConfig.brandShort}
            <Trademark /> Bedding System
          </h2>
          <p className="mt-3 leading-relaxed text-warmgray">
            Everything you need for an easier-to-change bed.
          </p>
        </div>

        <ul className="mx-auto mt-12 grid max-w-2xl gap-x-16 gap-y-8 sm:grid-cols-2">
          {siteConfig.systemContents.map((entry) => (
            <li key={entry.item} className="flex items-center gap-5">
              <span className="w-8 shrink-0 text-center font-serif text-4xl leading-none text-charcoal">
                {entry.quantity}
              </span>
              <span className="border-l border-stone pl-5 leading-snug text-charcoal">
                {entry.item}
              </span>
            </li>
          ))}
        </ul>

        <hr className="my-14 border-stone" />

        <div className="text-center">
          <h3 className="text-lg font-semibold uppercase tracking-[0.14em] text-charcoal">
            Available to Fit Your Mattress
          </h3>
          <p className="mt-3 leading-relaxed text-warmgray">
            Six standard mattress sizes &middot; Available in mattress depths
            from {pocketDepthRange()}
          </p>
        </div>

        <ul className="mt-12 grid gap-y-10 sm:grid-cols-3">
          {siteConfig.sizes.map((size, index) => (
            <li
              key={size.size}
              className={`text-center ${
                index % 3 !== 0 ? "sm:border-l sm:border-stone" : ""
              }`}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-charcoal">
                {size.size}
              </p>
              <p className="mt-1.5 text-sm text-warmgray">{size.dimensions}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
