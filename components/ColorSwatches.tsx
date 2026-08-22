import { siteConfig } from "@/config/site";

/**
 * Available colorways, shown as a row of large circular swatches.
 *
 * Seven across on desktop, wrapping evenly on narrower screens. The fill
 * values live in `siteConfig.colorways` so they can be swapped in one
 * place when the final fabric colors are set.
 */
export default function ColorSwatches() {
  return (
    <ul className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-7">
      {siteConfig.colorways.map((color) => (
        <li key={color.name} className="flex flex-col items-center text-center">
          <span
            className="h-12 w-12 rounded-full ring-1 ring-inset ring-charcoal/10 sm:h-14 sm:w-14"
            style={{ backgroundColor: color.hex }}
            aria-hidden="true"
          />
          <span className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-charcoal">
            {color.name}
          </span>
        </li>
      ))}
    </ul>
  );
}
