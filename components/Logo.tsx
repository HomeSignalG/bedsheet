import Image from "next/image";
import { siteConfig } from "@/config/site";

/**
 * Brand wordmark: swoosh mark + "EASY TOP / BED SHEET SYSTEM".
 * Uses `siteConfig.logo.image` instead when final artwork exists.
 */
export default function Logo({ onDark = false }: { onDark?: boolean }) {
  if (siteConfig.logo.image) {
    return (
      <Image
        src={siteConfig.logo.image}
        alt={siteConfig.logo.alt}
        width={180}
        height={48}
        priority
      />
    );
  }

  return (
    <span className={`flex items-center gap-3 ${onDark ? "text-white" : "text-navy"}`}>
      {/* Sheet-swoosh mark */}
      <svg
        width="40"
        height="28"
        viewBox="0 0 40 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M3 22 Q10 4 22 8 Q32 11 37 6" />
        <path d="M6 25 Q14 12 24 14 Q32 15.5 37 12" />
      </svg>
      <span className="leading-none">
        <span className="block font-serif text-xl tracking-[0.14em]">
          {siteConfig.brandShort.toUpperCase()}
        </span>
        <span
          className={`mt-1 block text-[0.6rem] font-medium tracking-[0.32em] ${
            onDark ? "text-mist" : "text-navy/70"
          }`}
        >
          {siteConfig.brandSubtitle.toUpperCase()}
        </span>
      </span>
    </span>
  );
}
