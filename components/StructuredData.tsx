import { pocketDepthProse, siteConfig } from "@/config/site";

/**
 * Site-wide JSON-LD: the organization behind the site, the site itself, and
 * the single product it sells. Everything is derived from `config/site.ts`,
 * so the structured data cannot drift from the page copy.
 *
 * Price and availability are deliberately absent — this is a wholesale site
 * with no published pricing, and inventing an `Offer` would misrepresent it.
 */
export default function StructuredData() {
  const organization = {
    "@type": "Organization",
    "@id": `${siteConfig.baseUrl}/#organization`,
    name: siteConfig.brandName,
    url: siteConfig.baseUrl,
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
