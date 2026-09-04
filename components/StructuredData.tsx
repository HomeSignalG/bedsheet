import { pocketDepthProse, siteConfig } from "@/config/site";

/**
 * Site-wide JSON-LD: the organization behind the site, the site itself, and
 * the single product it sells. Everything is derived from `config/site.ts`,
 * so the structured data cannot drift from the page copy.
 *
 * Price and availability are deliberately absent — this is a wholesale site
 * with no published pricing, and inventing an `Offer` would misrepresent it.
 */
/**
 * Photographs of the product itself, in the order a crawler should prefer
 * them: the system made up on a bed, then the snap that makes it a system.
 * Every entry must be a real photograph of the product that the site already
 * publishes — see `public/placeholders/README.md`.
 */
const productImages = [
  "/placeholders/bedroom-navy.webp",
  "/placeholders/bedroom-warm.webp",
  "/placeholders/snap-closeup.webp",
];

export default function StructuredData() {
  const organization = {
    "@type": "Organization",
    "@id": `${siteConfig.baseUrl}/#organization`,
    name: siteConfig.brandName,
    url: siteConfig.baseUrl,
    // The site's own mark, served from `app/icon.svg` at a stable URL.
    // `sameAs` is deliberately absent: there are no verified BackEasy Sheets
    // profiles to point at, and an invented one is worse than none.
    logo: `${siteConfig.baseUrl}/icon.svg`,
    description: siteConfig.brandStatement,
    email: siteConfig.email,
    founder: {
      "@type": "Person",
      name: siteConfig.founder.name,
      jobTitle: siteConfig.founder.title,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: siteConfig.email,
      url: `${siteConfig.baseUrl}/contact`,
      availableLanguage: "English",
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${siteConfig.baseUrl}/#website`,
    name: siteConfig.brandName,
    url: siteConfig.baseUrl,
    inLanguage: "en-US",
    publisher: { "@id": `${siteConfig.baseUrl}/#organization` },
  };

  const product = {
    "@type": "Product",
    "@id": `${siteConfig.baseUrl}/product#product`,
    name: siteConfig.brandName,
    url: `${siteConfig.baseUrl}/product`,
    description: siteConfig.brandStatement,
    image: productImages.map((path) => `${siteConfig.baseUrl}${path}`),
    brand: { "@type": "Brand", name: siteConfig.brandShort },
    manufacturer: { "@id": `${siteConfig.baseUrl}/#organization` },
    category: "Bed Sheets",
    isRelatedTo: siteConfig.systemContents.map((entry) => ({
      "@type": "Product",
      name: entry.item,
    })),
    hasMeasurement: siteConfig.sizes.map((size) => ({
      "@type": "QuantitativeValue",
      name: size.size,
      description: size.dimensions,
    })),
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Mattress depths",
        value: pocketDepthProse(),
      },
      {
        "@type": "PropertyValue",
        name: "Sizes",
        value: siteConfig.sizeRange,
      },
      {
        "@type": "PropertyValue",
        name: "Colors",
        value: siteConfig.colorways.map((color) => color.name).join(", "),
      },
    ],
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [organization, website, product],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped for the one sequence that can
      // break out of a script element.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
