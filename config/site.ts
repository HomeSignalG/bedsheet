/**
 * Central business configuration.
 *
 * All changeable business information lives here so that the brand name,
 * logo, email, patent details, domain, and product specifications can be
 * updated in one place without touching page code.
 */

/** Contact email. Referenced below so it is only ever written once. */
const EMAIL = "info@backeasysheets.com";

/**
 * Public origin of the site, without a trailing slash.
 *
 * Set `NEXT_PUBLIC_SITE_URL` per environment (preview deployments, staging)
 * to override the production default.
 */
const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.backeasysheets.com"
).replace(/\/$/, "");

export const siteConfig = {
  /** Full brand name. */
  brandName: "BackEasy Sheets Bedding System",

  /** Short brand name used in the wordmark. */
  brandShort: "BackEasy Sheets",

  /** Wordmark subtitle line. */
  brandSubtitle: "Bedding System",

  /** Core brand idea used across the site. */
  tagline: "Made for Real Life",

  /** Short brand statement used in the footer. */
  brandStatement:
    "The two-part bed sheet system that stays put—so you can change your sheets the easy way.",

  /**
   * Logo configuration. The wordmark is rendered from text plus an inline
   * mark. When final logo artwork is ready, set `logo.image` to its path
   * in /public and components will use it instead.
   */
  logo: {
    image: null as string | null,
    alt: "BackEasy Sheets Bedding System logo",
  },

  /** Contact email. */
  email: EMAIL,

  /**
   * Public origin used for canonical URLs, Open Graph metadata,
   * robots.txt and sitemap.xml.
   */
  baseUrl: BASE_URL,

  /** Founder attribution shown on the About page. */
  founder: {
    name: "Staci Thomas",
    title: "Founder & Inventor",
  },

  /**
   * Patent / intellectual property configuration.
   *
   * Every patent claim the site makes is written here, so legal review can
   * adjust the wording in one place. `number` must remain null until real
   * patent details are supplied — never publish an invented patent number.
   */
  patent: {
    number: null as string | null,
    /** Statement used on the Legal & Privacy Policy page. */
    statement:
      "BackEasy Sheets™ Bedding System and its products and designs are protected by U.S. patents and patents pending.",
    /** Heading of the badge shown on the Home and Product heroes. */
    badgeTitle: "Patented",
    /** Supporting lines of that badge. */
    badgeCopy: ["Engineered for a better bed.", "Designed for real life."],
    /** Claim used in running copy on the About page. */
    prose: "our patented two-part bed sheet system",
    /** Center footer line. */
    footerMotto:
      "Patented innovation designed to make life easier—every day.",
  },

  /**
   * Range of mattress depths the fitted base is offered in, in inches.
   * The customer selects a depth the way they select a size — a single
   * base does not span this whole range. Update here if the range changes.
   */
  pocketDepth: {
    min: 10,
    max: 22,
    unit: '"',
  },

  /** Mattress size range callout. */
  sizeRange: "Twin through California King",

  /**
   * Mattress sizes offered. Depth is a separate selection, see
   * `pocketDepth`.
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
   * Colorways offered, in the order they are presented on the Product page.
   *
   * `hex` drives the swatch fill only — these are web-display values, not
   * manufacturer color codes. White, Taupe, and Coastal Blue reuse the
   * approved brand palette tokens from `app/globals.css` (ivory, taupe,
   * slate). The remaining values are provisional stand-ins chosen to sit
   * in the same neutral family; replace them here once the physical fabric
   * colors are finalized. This array is the only place they are defined.
   */
  colorways: [
    { name: "White", hex: "#f7f5f0" },
    { name: "Flax", hex: "#ded3bc" },
    { name: "Taupe", hex: "#b4a99b" },
    { name: "Silver Gray", hex: "#a9adb2" },
    { name: "Coastal Blue", hex: "#667789" },
    { name: "Navy", hex: "#2f4256" },
    { name: "Sage", hex: "#a8b5a2" },
  ],

  /**
   * Contents of one complete system, listed in the bedding-system section
   * on Home and in "What's Included" on Product. Single source of truth for
   * package contents.
   *
   * `featured` marks the item Product leads with — the pair of removable
   * bottom sheets is the point of the system, not one line item among four.
   * `note` carries a qualifier that must travel with the quantity wherever
   * it is shown.
   */
  systemContents: [
    { quantity: 1, item: "Fitted Mattress Base Sheet", featured: false, note: null as string | null },
    { quantity: 2, item: "Removable Bottom Sheets", featured: true, note: null as string | null },
    { quantity: 1, item: "Top Sheet", featured: false, note: null as string | null },
    { quantity: 4, item: "Pillowcases", featured: false, note: "2 with Twin & Twin XL" as string | null },
  ],

  /** Copyright holder shown in the footer. */
  copyrightHolder: "BackEasy Sheets Bedding System",

  /**
   * Privacy-policy facts that the page text is generated from, so the
   * policy can never describe behaviour the site does not have.
   *
   * `usesCookies` stays false while the site sets no cookies, runs no
   * analytics, and embeds no third-party scripts. Flip it — and say what
   * they are — before adding any of those.
   */
  privacy: {
    usesCookies: false,
    /** How long contact-form submissions are kept. */
    retention: "24 months",
    /** Where privacy requests should be sent. */
    requestEmail: EMAIL,
  },

  /**
   * "Last Updated" date shown on the Legal & Privacy Policy page.
   * Update whenever the policy text changes.
   */
  legalLastUpdated: "August 22, 2026",

  /**
   * Social links rendered in the footer. Point these at real profiles
   * once the accounts exist.
   */
  socialLinks: [
    { label: "Instagram", href: null as string | null },
    { label: "LinkedIn", href: null as string | null },
    { label: "Email", href: `mailto:${EMAIL}` as string | null },
  ],
} as const;

/** Formatted range of available mattress depths, e.g. `10"–22"`. */
export function pocketDepthRange(): string {
  const { min, max, unit } = siteConfig.pocketDepth;
  return `${min}${unit}–${max}${unit}`;
}

/** Prose version of the available depth range, e.g. `10–22 inches`. */
export function pocketDepthProse(): string {
  const { min, max } = siteConfig.pocketDepth;
  return `${min}–${max} inches`;
}
