/**
 * Central business configuration.
 *
 * All changeable business information lives here so that the brand name,
 * logo, email, patent details, domain, and product specifications can be
 * updated in one place without touching page code.
 */

export const siteConfig = {
  /**
   * The final company name has not been chosen yet.
   * Replace this placeholder once branding is finalized.
   */
  brandName: "[BRAND NAME]",

  /** Core brand idea used across the site. */
  tagline: "Made for Real Life",

  /** Short brand statement used in the footer. */
  brandStatement:
    "A two-part bed-sheet system with a fitted base that stays put and a removable top that comes off for washing.",

  /**
   * Logo configuration. The logo is currently a text placeholder.
   * When a final logo is ready, set `logo.image` to its path in /public
   * and components will use it instead of the text mark.
   */
  logo: {
    text: "[BRAND NAME]",
    image: null as string | null,
    alt: "[BRAND NAME] logo",
  },

  /**
   * Placeholder contact email. Not a live inbox yet — replace once the
   * real address exists.
   */
  email: "hello@example.com",

  /**
   * Placeholder base URL used for canonical URLs, Open Graph metadata,
   * robots.txt and sitemap.xml. Update once a domain is purchased.
   */
  baseUrl: "https://www.example.com",

  /**
   * Patent / intellectual property placeholders.
   * Never publish an invented patent number — replace these strings only
   * with information supplied after legal review.
   */
  patent: {
    /** Short notice used in the footer. */
    shortNotice: "Patent information available upon final legal review.",
    /** Longer statement used on the Legal & Privacy Policy page. */
    statement:
      "The two-part bed-sheet system described on this website is the subject of patent protection. Specific patent details will be published here upon final legal review.",
  },

  /**
   * Current target pocket-depth specification, in inches.
   * Treated as the working spec; update here if the range changes.
   */
  pocketDepth: {
    min: 8,
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
  whatsIncluded: ["1 fitted base", "1 removable top"],

  /** Copyright holder shown in the footer. */
  copyrightHolder: "[BRAND NAME]",

  /**
   * "Last Updated" date shown on the Legal & Privacy Policy page.
   * Update whenever the policy text changes.
   */
  legalLastUpdated: "August 16, 2026",

  /**
   * Social links. None are in use yet; add entries here
   * (e.g. { label: "Instagram", href: "https://..." }) when accounts exist.
   */
  socialLinks: [] as { label: string; href: string }[],
} as const;

/** Formatted pocket-depth range, e.g. `8"–22"`. */
export function pocketDepthRange(): string {
  const { min, max, unit } = siteConfig.pocketDepth;
  return `${min}${unit}–${max}${unit}`;
}

/** Prose version of the pocket-depth range, e.g. `8–22 inches`. */
export function pocketDepthProse(): string {
  const { min, max } = siteConfig.pocketDepth;
  return `${min}–${max} inches`;
}
