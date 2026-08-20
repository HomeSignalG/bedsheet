/**
 * Central business configuration.
 *
 * All changeable business information lives here so that the brand name,
 * logo, email, patent details, domain, and product specifications can be
 * updated in one place without touching page code.
 */

export const siteConfig = {
  /** Full brand name. */
  brandName: "SWAP Bedding System",

  /** Short brand name used in the wordmark. */
  brandShort: "SWAP",

  /** Wordmark subtitle line. */
  brandSubtitle: "Bedding System",

  /** Core brand idea used across the site. */
  tagline: "Made for Real Life",

  /** Short brand statement used in the footer. */
  brandStatement:
    "The two-part bed sheet system that stays put—so you can change your sheets the easy way.",

  /** Center footer line. */
  footerMotto: "Patented innovation designed to make life easier—every day.",

  /**
   * Logo configuration. The wordmark is rendered from text plus an inline
   * mark. When final logo artwork is ready, set `logo.image` to its path
   * in /public and components will use it instead.
   */
  logo: {
    image: null as string | null,
    alt: "SWAP Bedding System logo",
  },

  /** Contact email. */
  email: "info@easytopbedding.com",

  /**
   * Placeholder base URL used for canonical URLs, Open Graph metadata,
   * robots.txt and sitemap.xml. Update once a domain is purchased.
   */
  baseUrl: "https://www.example.com",

  /** Founder attribution shown on the About page. */
  founder: {
    name: "Staci Thomas",
    title: "Founder & Inventor",
  },

  /**
   * Patent / intellectual property configuration.
   * `number` must remain null until real patent details are supplied by
   * legal review — never publish an invented patent number.
   */
  patent: {
    number: null as string | null,
    /** Short notice used in the footer while `number` is null. */
    shortNotice: "Patent information available upon final legal review.",
    /** Statement used on the Legal & Privacy Policy page. */
    statement:
      "SWAP™ Bedding System and its products and designs are protected by U.S. patents and patents pending.",
  },

  /**
   * Current target pocket-depth specification, in inches.
   * Treated as the working spec; update here if the range changes.
   */
  pocketDepth: {
    min: 10,
    max: 22,
    unit: '"',
  },

  /** Mattress size range callout. */
  sizeRange: "Twin through California King",

  /**
   * Size & pocket-depth specification table.
   * Pocket depth is derived from `pocketDepth` at render time.
   */
  sizes: [
    { size: "Twin", dimensions: '38" × 75"' },
    { size: "Twin XL", dimensions: '38" × 80"' },
    { size: "Full", dimensions: '54" × 75"' },
    { size: "Queen", dimensions: '60" × 80"' },
    { size: "King", dimensions: '76" × 80"' },
    { size: "California King", dimensions: '72" × 84"' },
  ],

  /**
   * What's included in one set. Configurable in case packaging changes.
   */
  whatsIncluded: [
    { item: "1 Removable Bottom Sheet", note: null as string | null },
    { item: "1 Fitted Base", note: "With secure elasticized pocket" },
    { item: "2 Pillowcases", note: null as string | null },
  ],

  /**
   * Contents of the system, listed in the Home page's bedding-system
   * section. Kept separate from `whatsIncluded`, which drives the Product
   * page's What's Included list — see README note about keeping the two
   * in agreement.
   */
  systemContents: [
    { quantity: 1, item: "Fitted Mattress Base Sheet" },
    { quantity: 2, item: "Removable Bottom Sheets" },
    { quantity: 1, item: "Top Sheet" },
    { quantity: 2, item: "Pillowcases" },
  ],

  /** Copyright holder shown in the footer. */
  copyrightHolder: "SWAP Bedding System",

  /**
   * "Last Updated" date shown on the Legal & Privacy Policy page.
   * Update whenever the policy text changes.
   */
  legalLastUpdated: "August 16, 2026",

  /**
   * Social links rendered in the footer. Point these at real profiles
   * once the accounts exist.
   */
  socialLinks: [
    { label: "Instagram", href: null as string | null },
    { label: "LinkedIn", href: null as string | null },
    { label: "Email", href: "mailto:info@easytopbedding.com" as string | null },
  ],
} as const;

/** Formatted pocket-depth range, e.g. `10"–22"`. */
export function pocketDepthRange(): string {
  const { min, max, unit } = siteConfig.pocketDepth;
  return `${min}${unit}–${max}${unit}`;
}

/** Prose version of the pocket-depth range, e.g. `10–22 inches`. */
export function pocketDepthProse(): string {
  const { min, max } = siteConfig.pocketDepth;
  return `${min}–${max} inches`;
}
