import type { ReactNode } from "react";

/**
 * Row of small icon + title + copy columns used inside hero sections
 * (Home, About, Contact) per the design mockups.
 */
export default function BenefitStrip({
  items,
}: {
  items: { icon: ReactNode; title: string; copy: string }[];
}) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-mist">
      {items.map((item) => (
        <li key={item.title} className="text-center sm:px-5 first:sm:pl-0 last:sm:pr-0">
          <span className="mb-3 inline-flex text-accent" aria-hidden="true">
            {item.icon}
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy">
            {item.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-navy/70">{item.copy}</p>
        </li>
      ))}
    </ul>
  );
}
