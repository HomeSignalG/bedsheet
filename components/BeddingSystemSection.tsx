import { pocketDepthRange, siteConfig } from "@/config/site";

/**
 * The bedding-system section: what comes in the system, then what it fits.
 * Shared by the Home and Product pages so the two never drift apart.
 * `headingId` keeps the labelled-by reference unique per page.
 */
export default function BeddingSystemSection({
  headingId = "bedding-system-heading",
}: {
  headingId?: string;
}) {
  return (
    <section aria-labelledby={headingId} className="bg-ivory px-6 py-16 sm:px-8 md:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h2
            id={headingId}
            className="text-lg font-semibold uppercase tracking-[0.14em] text-navy"
          >
            The {siteConfig.brandShort} Bedding System
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
            Six standard mattress sizes &middot; Available in mattress depths
            from {pocketDepthRange()}
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
