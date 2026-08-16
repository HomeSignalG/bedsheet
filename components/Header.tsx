"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import { siteConfig } from "@/config/site";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/product" },
  { label: "Features", href: "/product#features" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href.includes("#") ? false : pathname === href;

  return (
    <header className="sticky top-0 z-40 border-b border-mist bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-6 sm:px-8">
        <Link
          href="/"
          aria-label={`${siteConfig.brandName} — home`}
          onClick={() => setMenuOpen(false)}
        >
          <Logo />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`text-sm font-medium uppercase tracking-[0.14em] transition-colors ${
                      active
                        ? "border-b-2 border-navy pb-1 text-navy"
                        : "text-navy/65 hover:text-navy"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          href="/contact"
          className="hidden bg-navy px-6 py-3 text-sm font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-navy-deep lg:inline-block"
        >
          Retailer Inquiry
        </Link>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center text-navy lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path d="M5 5l14 14M19 5L5 19" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-mist bg-white lg:hidden"
        >
          <ul className="px-6 py-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-3 text-sm font-medium uppercase tracking-[0.14em] ${
                    isActive(item.href) ? "text-navy" : "text-navy/65"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="block bg-navy px-6 py-3 text-center text-sm font-medium uppercase tracking-[0.14em] text-white"
              >
                Retailer Inquiry
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
