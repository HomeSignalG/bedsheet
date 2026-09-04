import { siteConfig } from "@/config/site";

/**
 * `BreadcrumbList` JSON-LD for an inner page.
 *
 * The site is one level deep — the header links Home, Product, About Us and
 * Contact, and the footer adds Legal — so every trail is Home → this page,
 * which is the path a visitor actually takes. `name` should be the label the
 * page is linked by in that navigation, so the markup describes the same
 * hierarchy the page shows. Rendered nowhere visibly: there is no breadcrumb
 * trail to draw on a flat site, and Google does not require one.
 *
 * The home page gets no breadcrumb — a single-item trail describes nothing.
 */
export default function BreadcrumbStructuredData({
  name,
  path,
}: {
  /** The page's label in the site navigation, e.g. `About Us`. */
  name: string;
  /** Route path, e.g. `/about`. */
  path: string;
}) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: `${siteConfig.baseUrl}${path}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Escaped for the one sequence that can break out of a script element.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c"),
      }}
    />
  );
}
