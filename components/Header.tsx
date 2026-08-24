"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import { siteConfig } from "@/config/site";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/product" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const isActive = (href: string) => pathname === href;

  /** Closes the menu and hands focus back to the control that opened it. */
  const closeMenu = useCallback((returnFocus = false) => {
    setMenuOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Close on navigation. Link clicks close the panel themselves; this also
  // catches a back/forward step, which would otherwise leave it open over
  // the new page. Adjusted during render rather than in an effect, so the
  // panel never paints once against the page it no longer belongs to.
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  // The panel covers the page beneath it, so while it is open: Escape
  // dismisses it, Tab cycles within it rather than wandering into the
  // hidden content behind, and the page underneath does not scroll.
  useEffect(() => {
    if (!menuOpen) return;

    // Both elements: the root layout gives <html> a height, which makes it
    // the scrollport, so locking the body alone leaves the page scrolling.
    const root = document.documentElement;
    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }

      if (event.key !== "Tab") return;

      const toggle = toggleRef.current;
      const panel = panelRef.current;
      if (!toggle || !panel) return;

      const focusable = [
        toggle,
        ...panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      root.style.overflow = previousRootOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [menuOpen, closeMenu]);

  return (
    <header className="sticky top-0 z-40 border-b border-stone bg-cream/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-6 sm:px-8">
        <Link
          href="/"
          aria-label={`${siteConfig.brandName} — home`}
          onClick={() => closeMenu()}
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
                        ? "border-b-2 border-charcoal pb-1 text-charcoal"
                        : "text-warmgray hover:text-charcoal"
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
          className="hidden rounded-md bg-charcoal px-6 py-3 text-sm font-medium uppercase tracking-[0.14em] text-cream transition-colors hover:bg-charcoal-deep lg:inline-block"
        >
          Retailer Inquiry
        </Link>

        {/* Mobile menu toggle */}
        <button
          ref={toggleRef}
          type="button"
          className="flex h-11 w-11 items-center justify-center text-charcoal lg:hidden"
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
          ref={panelRef}
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-stone bg-cream lg:hidden"
        >
          <ul className="px-6 py-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => closeMenu()}
                  className={`block py-3 text-sm font-medium uppercase tracking-[0.14em] ${
                    isActive(item.href) ? "text-charcoal" : "text-warmgray"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Link
                href="/contact"
                onClick={() => closeMenu()}
                className="block rounded-md bg-charcoal px-6 py-3 text-center text-sm font-medium uppercase tracking-[0.14em] text-cream"
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
