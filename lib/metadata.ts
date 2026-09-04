import type { Metadata } from "next";
// Relative, not the `@/` alias: the title composition below is unit tested,
// and the test runner resolves imports without tsconfig's path mapping.
import { siteConfig } from "../config/site.ts";

/**
 * Builds a page's metadata.
 *
 * Next merges the `metadata` export shallowly, one top-level key at a time:
 * a page that exports its own `openGraph` object replaces the layout's
 * entirely, silently dropping `siteName`, `type` and `locale`. Routing every
 * page through this helper keeps those shared fields on every response.
 */
/**
 * The share card from `app/opengraph-image.tsx`.
 *
 * Referenced explicitly rather than left to file-based inheritance: Next
 * attaches an `opengraph-image` file to its own route segment, and nested
 * routes that declare their own `openGraph` do not pick it up — so
 * everything but the home page would share with no image at all.
 */
const shareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.brandName} — ${siteConfig.tagline}`,
};

/**
 * Composes the title exactly as it will appear in a search result:
 * the page's own words, then the short brand name.
 */
export function composeTitle(title: string): string {
  return `${title} | ${siteConfig.brandShort}`;
}

export function pageMetadata({
  title,
  description,
  path,
}: {
  /** Page-specific part of the title, without the brand suffix. */
  title: string;
  description: string;
  /** Route path, e.g. `/product`. Use `/` for the home page. */
  path: string;
}): Metadata {
  const composed = composeTitle(title);

  // The layout's `%s | brand` template applies to child segments only, and
  // the home page shares the layout's own segment — so it has to carry the
  // composed string itself. Inner pages pass the bare title and let the
  // template add the suffix, which keeps it in one place.
  const isHome = path === "/";

  return {
    title: isHome ? composed : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      siteName: siteConfig.brandName,
      type: "website",
      locale: "en_US",
      title: composed,
      description,
      url: path,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: composed,
      description,
      images: [shareImage],
    },
  };
}
