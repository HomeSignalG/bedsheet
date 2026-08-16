import type { ReactNode } from "react";

/**
 * Product feature / benefit card used on Home and Product pages.
 */
export default function FeatureCard({
  title,
  children,
  icon,
}: {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="border border-mist bg-white p-8">
      {icon && <div className="mb-5 text-accent" aria-hidden="true">{icon}</div>}
      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">
        {title}
      </h3>
      <p className="mt-4 leading-relaxed text-navy/75">{children}</p>
    </div>
  );
}
