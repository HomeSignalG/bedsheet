import Trademark from "@/components/Trademark";
import { pocketDepthRange, siteConfig } from "@/config/site";

/**
 * The bedding system section: what's included in a set, then what it fits.
 * Rendered on both Home and Product so the two stay identical — the markup
 * is unchanged from the approved Home-page version.
 */
export default function BeddingSystemSection() {
  return (
    <section aria-labelledby="system-heading" className="bg-ivory px-6 py-16 sm:px-8 md:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h2
            id="system-heading"
            className="text-lg font-semibold uppercase tracking-[0.14em] text-navy"
          >
            The {siteConfig.brandShort}
            <Trademark /> Bedding System
          </h2>
          <p className="mt-3 leading-relaxed text-navy/70">
            Everything you need for an easier-to-change bed.
          </p>
        </div>

        <ul className="mx-auto mt-12 grid max-w-2xl gap-x-16 gap-y-8 sm:grid-cols-2">
          {siteConfig.systemContents.map((entry) => (
            <li key={entry.item} className="flex items-center gap-5">
              <span className="w-8 shrink-0 text-center font-serif text-4xl leading-none text-navy">
                {entry.quantity}
              </span>
              <span className="border-l border-mist pl-5 leading-snug text-navy">
                {entry.item}
              </span>
            </li>
          ))}
        </ul>

        <hr className="my-14 border-mist" />

        <div className="text-center">
          <h3 className="text-lg font-semibold uppercase tracking-[0.14em] text-navy">
            Available to Fit Your Mattress
          </h3>
          <p className="mt-3 leading-relaxed text-navy/70">
            Six standard mattress sizes &middot; {pocketDepthRange()} pocket
            depths
          </p>
        </div>

        <ul className="mt-12 grid gap-y-10 sm:grid-cols-3">
          {siteConfig.sizes.map((size, index) => (
            <li
              key={size.size}
              className={`text-center ${
                index % 3 !== 0 ? "sm:border-l sm:border-mist" : ""
              }`}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-navy">
                {size.size}
              </p>
              <p className="mt-1.5 text-sm text-navy/60">{size.dimensions}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
