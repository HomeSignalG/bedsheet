import Link from "next/link";
import { ArrowRightIcon, StoreIcon } from "@/components/icons";

/** Charcoal retailer call-to-action band used at the bottom of pages. */
export default function CtaBand({
  title,
  copy,
}: {
  title: string;
  copy: string;
}) {
  return (
    <section aria-label={title} className="bg-charcoal px-6 py-12 text-cream sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-5">
          <span className="mt-1 hidden shrink-0 text-stone sm:block" aria-hidden="true">
            <StoreIcon />
          </span>
          <div>
            <h2 className="text-xl font-bold uppercase tracking-[0.08em] md:text-2xl">
              {title}
            </h2>
            <p className="mt-2 max-w-xl leading-relaxed text-stone">{copy}</p>
          </div>
        </div>
        <Link
          href="/contact"
          className="inline-flex shrink-0 items-center gap-3 rounded-md border border-cream px-8 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-cream transition-colors hover:bg-cream hover:text-charcoal"
        >
          Retailer Inquiry
          <ArrowRightIcon />
        </Link>
      </div>
    </section>
  );
}
