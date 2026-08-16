import type { ReactNode } from "react";

/**
 * Clearly separated section on the Legal & Privacy Policy page.
 */
export default function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={`${id}-heading`} className="border-t border-mist pt-12">
      <h2 id={`${id}-heading`} className="font-serif text-2xl md:text-3xl">
        {title}
      </h2>
      <div className="mt-6 space-y-5 leading-relaxed text-navy/80">{children}</div>
    </section>
  );
}
