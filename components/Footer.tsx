import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

const footerLinks = [
  { label: "Product", href: "/product" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Legal & Privacy Policy", href: "/legal" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-deep text-white">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr]">
          <div>
            <p className="font-serif text-xl tracking-wide">
              {siteConfig.logo.image ? (
                <Image
                  src={siteConfig.logo.image}
                  alt={siteConfig.logo.alt}
                  width={160}
                  height={40}
                />
              ) : (
                siteConfig.logo.text
              )}
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-mist">
              {siteConfig.brandStatement}
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-mist/80">
              {siteConfig.tagline}
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="space-y-3">
              {footerLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-mist transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 border-t border-white/15 pt-8">
          <p className="text-xs text-mist/80">{siteConfig.patent.shortNotice}</p>
          <p className="mt-3 text-xs text-mist/80">
            © {year} {siteConfig.copyrightHolder}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
