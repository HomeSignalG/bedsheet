import Link from "next/link";
import { ArrowRightIcon, StoreIcon } from "@/components/icons";

/** Navy retailer call-to-action band used at the bottom of pages. */
export default function CtaBand({
  title,
  copy,
}: {
  title: string;
  copy: string;
}) {
  return (
    <section aria-label={title} className="bg-navy px-6 py-12 text-white sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-5">
          <span className="mt-1 hidden shrink-0 text-mist sm:block" aria-hidden="true">
            <StoreIcon />
          </span>
          <div>
            <h2 className="font-serif text-2xl tracking-wide md:text-3xl">{title}</h2>
            <p className="mt-2 max-w-xl leading-relaxed text-mist">{copy}</p>
          </div>
        </div>
        <Link
          href="/contact"
          className="inline-flex shrink-0 items-center gap-3 border border-white px-8 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-navy"
        >
          Retailer Inquiry
          <ArrowRightIcon />
        </Link>
      </div>
    </section>
  );
}
