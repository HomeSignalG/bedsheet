import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

const destinations = [
  { label: "The product", href: "/product", copy: "How the two-part system works, sizes, and mattress depths." },
  { label: "About us", href: "/about", copy: "Why BackEasy Sheets exists, and who built it." },
  { label: "Contact", href: "/contact", copy: "Retail, distribution, press, and product questions." },
];

export default function NotFound() {
  return (
    <section className="bg-cream px-6 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-deep">
          404
        </p>
        <h1 className="font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
          We couldn&rsquo;t find that page.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-warmgray">
          The link may be out of date, or the address may have a typo in it.
          Here is where everything lives.
        </p>

        <ul className="mt-12 border-t border-stone">
          {destinations.map((item) => (
            <li key={item.href} className="border-b border-stone">
              <Link
                href={item.href}
                className="group flex items-center justify-between gap-6 py-6 transition-colors hover:bg-ivory"
              >
                <span>
                  <span className="block text-sm font-semibold uppercase tracking-[0.14em] text-charcoal">
                    {item.label}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-warmgray">
                    {item.copy}
                  </span>
                </span>
                <span className="shrink-0 text-slate" aria-hidden="true">
                  <ArrowRightIcon />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm leading-relaxed text-warmgray">
          Still stuck? Email us at{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-slate-deep underline underline-offset-4"
          >
            {siteConfig.email}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
