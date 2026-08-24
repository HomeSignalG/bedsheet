import { pocketDepthRange, siteConfig } from "@/config/site";

/**
 * Mattress size specification table.
 *
 * Depth is deliberately not a column. The note below the table states the
 * range of pocket depths offered and nothing further — see the comment on
 * that note.
 */
export default function SpecTable() {
  return (
    <div>
      {/* Table for sm and up */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">
            Mattress dimensions for each available size
          </caption>
          <thead>
            <tr className="bg-charcoal text-cream">
              <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em]">
                Size
              </th>
              <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em]">
                Mattress Dimensions (W × L)
              </th>
            </tr>
          </thead>
          <tbody>
            {siteConfig.sizes.map((row, index) => (
              <tr
                key={row.size}
                className={index % 2 === 0 ? "bg-ivory" : "bg-cream"}
              >
                <th scope="row" className="px-4 py-3 font-semibold uppercase tracking-[0.06em]">
                  {row.size}
                </th>
                <td className="px-4 py-3 text-warmgray">{row.dimensions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for mobile */}
      <ul className="space-y-4 sm:hidden">
        {siteConfig.sizes.map((row) => (
          <li key={row.size} className="border border-stone bg-cream">
            <p className="bg-charcoal px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-cream">
              {row.size}
            </p>
            <dl className="space-y-1 p-5 text-sm text-warmgray">
              <div className="flex justify-between gap-4">
                <dt>Mattress Dimensions</dt>
                <dd>{row.dimensions}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      {/* The only pocket-depth claim the site makes. How the depths are
          manufactured or sold is not settled, so nothing here may imply
          depth tiers, selectable depths, or a universal fit. */}
      <p className="mt-6 text-sm font-semibold leading-relaxed text-charcoal">
        Available in pocket depths from {pocketDepthRange()}.
      </p>
    </div>
  );
}
