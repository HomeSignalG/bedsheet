import Link from "next/link";
import Logo from "@/components/Logo";
import { MailIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

const infoLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Patent", href: "/legal#patent" },
  { label: "Privacy Policy", href: "/legal#privacy" },
];

function SocialIcon({ label }: { label: string }) {
  if (label === "Instagram") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (label === "LinkedIn") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.5 3.5A1.75 1.75 0 1 1 4.5 7a1.75 1.75 0 0 1 0-3.5ZM3 9h3v12H3Zm6 0h2.8v1.7h.1c.4-.75 1.5-1.9 3.4-1.9 3 0 4.2 1.8 4.2 4.9V21h-3v-6.4c0-1.5-.4-2.6-1.8-2.6-1.5 0-2.2 1-2.2 2.6V21H9Z" />
      </svg>
    );
  }
  return <MailIcon size={18} />;
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-deep text-cream">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_auto_auto] md:gap-12">
          <div>
            <Link href="/" aria-label={`${siteConfig.brandName} — home`}>
              <Logo onDark />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-stone">
              {siteConfig.brandStatement}
            </p>
          </div>

          <p className="self-center text-sm leading-relaxed text-stone">
            {siteConfig.footerMotto}
          </p>

          <nav aria-label="Info">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone/70">
              Info
            </p>
            <ul className="mt-4 space-y-2.5">
              {infoLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-stone transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col justify-between gap-8">
            <nav aria-label="Legal">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone/70">
                Legal
              </p>
              <ul className="mt-4 space-y-2.5">
                {legalLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-stone transition-colors hover:text-cream"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <ul className="flex gap-3" aria-label="Social links">
              {siteConfig.socialLinks.map((social) => (
                <li key={social.label}>
                  {social.href ? (
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-stone transition-colors hover:border-cream hover:text-cream"
                    >
                      <SocialIcon label={social.label} />
                    </a>
                  ) : (
                    // role="img": the icon inside is aria-hidden, so this span
                    // is the graphic. A span has no implicit role, and ARIA
                    // prohibits aria-label there — img supports naming, so the
                    // "coming soon" state reaches assistive tech.
                    <span
                      role="img"
                      aria-label={`${social.label} (coming soon)`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-stone/50"
                    >
                      <SocialIcon label={social.label} />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-cream/15 pt-6 text-xs text-stone/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.copyrightHolder}. All rights reserved.
          </p>
          <p>{siteConfig.patent.number ?? siteConfig.patent.shortNotice}</p>
        </div>
      </div>
    </footer>
  );
}
