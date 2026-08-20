import { pocketDepthRange, siteConfig } from "@/config/site";

/**
 * Size & pocket-depth specification table with a charcoal header row.
 * Renders a full table on larger screens and stacked cards on mobile.
 */
export default function SpecTable() {
  const depth = pocketDepthRange();

  return (
    <div>
      {/* Table for sm and up */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">
            Mattress size and pocket depth specifications
          </caption>
          <thead>
            <tr className="bg-charcoal text-cream">
              <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em]">
                Size
              </th>
              <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em]">
                Mattress Dimensions (W × L)
              </th>
              <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em]">
                Pocket Depth
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
                <td className="px-4 py-3 text-center text-warmgray">{row.dimensions}</td>
                <td className="px-4 py-3 text-center text-warmgray">{depth}</td>
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
              <div className="flex justify-between gap-4">
                <dt>Pocket Depth</dt>
                <dd>{depth}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}
