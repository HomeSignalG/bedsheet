import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { lastCommitDate } from "@/lib/last-modified";

/**
 * Indexable routes, each with the file whose commit history dates it.
 *
 * The page file only — not the components or the config it reads — so the
 * date is a floor rather than a guess: a page whose copy moved into a shared
 * component reports the older date, which understates freshness instead of
 * claiming a change that may not have touched it. `lastModified` is dropped
 * for any route whose date cannot be read (see `lastCommitDate`), because a
 * sitemap that stamps every page with the build date teaches crawlers to
 * ignore the field.
 *
 * `/legal` is listed: it is a real, linked, indexable page. Nothing under
 * `/api` appears, and `robots.txt` disallows it.
 */
const routes = [
  { path: "/", source: "app/page.tsx" },
  { path: "/product", source: "app/product/page.tsx" },
  { path: "/about", source: "app/about/page.tsx" },
  { path: "/contact", source: "app/contact/page.tsx" },
  { path: "/legal", source: "app/legal/page.tsx" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, source }) => {
    const lastModified = lastCommitDate(source);

    return {
      url: `${siteConfig.baseUrl}${path === "/" ? "" : path}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: "monthly",
      priority: path === "/" ? 1 : 0.8,
    };
  });
}
