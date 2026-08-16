import { pocketDepthRange, siteConfig } from "@/config/site";

/**
 * Size & pocket-depth specification table.
 * Renders a full table on larger screens and stacked cards on mobile.
 */
export default function SpecTable() {
  const depth = pocketDepthRange();

  return (
    <div>
      {/* Table for sm and up */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            Mattress size and pocket depth specifications
          </caption>
          <thead>
            <tr className="border-b-2 border-navy">
              <th scope="col" className="py-4 pr-6 text-xs font-semibold uppercase tracking-[0.18em]">
                Size
              </th>
              <th scope="col" className="py-4 pr-6 text-xs font-semibold uppercase tracking-[0.18em]">
                Mattress Dimensions
              </th>
              <th scope="col" className="py-4 text-xs font-semibold uppercase tracking-[0.18em]">
                Pocket Depth
              </th>
            </tr>
          </thead>
          <tbody>
            {siteConfig.sizes.map((row) => (
              <tr key={row.size} className="border-b border-mist">
                <th scope="row" className="py-4 pr-6 font-medium">
                  {row.size}
                </th>
                <td className="py-4 pr-6 text-navy/75">{row.dimensions}</td>
                <td className="py-4 text-navy/75">{depth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for mobile */}
      <ul className="space-y-4 sm:hidden">
        {siteConfig.sizes.map((row) => (
          <li key={row.size} className="border border-mist bg-white p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em]">
              {row.size}
            </p>
            <dl className="mt-3 space-y-1 text-sm text-navy/75">
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
