import { pocketDepthRange, siteConfig } from "@/config/site";

/**
 * Mattress size specification table.
 *
 * Depth is deliberately not a column: it is a separate selection the
 * customer makes, not a range a single fitted base spans. The note below
 * the table states the available depths.
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
            <tr className="bg-navy text-white">
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
                className={index % 2 === 0 ? "bg-ivory" : "bg-white"}
              >
                <th scope="row" className="px-4 py-3 font-semibold uppercase tracking-[0.06em]">
                  {row.size}
                </th>
                <td className="px-4 py-3 text-navy/75">{row.dimensions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for mobile */}
      <ul className="space-y-4 sm:hidden">
        {siteConfig.sizes.map((row) => (
          <li key={row.size} className="border border-mist bg-white">
            <p className="bg-navy px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-white">
              {row.size}
            </p>
            <dl className="space-y-1 p-5 text-sm text-navy/75">
              <div className="flex justify-between gap-4">
                <dt>Mattress Dimensions</dt>
                <dd>{row.dimensions}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm leading-relaxed text-navy/70">
        Every size is available in mattress depths from {pocketDepthRange()}.
        Measure your mattress and select the depth that matches it, the same
        way you select the size.
      </p>
    </div>
  );
}
