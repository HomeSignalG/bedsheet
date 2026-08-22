import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

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

export function pageMetadata({
  title,
  description,
  path,
}: {
  /** Page title. Omit on the home page, which uses the layout default. */
  title?: string;
  description: string;
  /** Route path, e.g. `/product`. Use `/` for the home page. */
  path: string;
}): Metadata {
  // The home page keeps the full default title; inner pages get the
  // `%s | Brand` template applied by the layout, so Open Graph has to
  // spell out the same composed string itself.
  const composed = title
    ? `${title} | ${siteConfig.brandName}`
    : `${siteConfig.brandName} — ${siteConfig.tagline}`;

  return {
    ...(title ? { title } : {}),
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
