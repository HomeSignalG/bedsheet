/**
 * Simple layered diagram of the two-part system:
 * removable top, fitted base, mattress underneath.
 * Built with styled layers (not photography) so it reads clearly at any size.
 */

const layers = [
  {
    number: 1,
    name: "Removable washable top",
    description:
      "The sleeping surface. Detaches from the base, goes in the wash, and reattaches — this is the part you change regularly.",
    className: "bg-white border-accent text-navy",
  },
  {
    number: 2,
    name: "Fitted base",
    description:
      "Stays securely installed on the mattress. Install it once — it doesn't come off on laundry day.",
    className: "bg-beige border-beige text-navy",
  },
  {
    number: 3,
    name: "Mattress underneath",
    description: "Any standard mattress, Twin through California King.",
    className: "bg-mist border-mist text-navy",
  },
];

export default function SystemDiagram() {
  return (
    <ol className="space-y-3">
      {layers.map((layer, index) => (
        <li
          key={layer.name}
          className={`border ${layer.className} p-6 sm:p-8`}
          style={{
            marginLeft: `${index * 1.25}rem`,
            marginRight: `${index * 1.25}rem`,
          }}
        >
          <div className="flex items-baseline gap-4">
            <span className="font-serif text-2xl text-accent" aria-hidden="true">
              {layer.number}
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em]">
                {layer.name}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-navy/75">
                {layer.description}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
