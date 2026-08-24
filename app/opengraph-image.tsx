import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

/**
 * Social share card, rendered at build time and served for every route that
 * does not define its own. Typographic rather than photographic: the product
 * photography is warm and low-contrast, and reads as a grey smear at
 * thumbnail size in a Slack or LinkedIn preview.
 */

export const alt = `${siteConfig.brandName} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand palette, mirroring app/globals.css.
const CREAM = "#fcfbf8";
const IVORY = "#f7f5f0";
const CHARCOAL = "#292c2d";
const WARMGRAY = "#6e6c67";
const SLATE = "#667789";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: CREAM,
          padding: "72px 80px",
          borderBottom: `24px solid ${CHARCOAL}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="50" viewBox="0 0 40 28" fill="none" stroke={CHARCOAL} strokeWidth="1.75" strokeLinecap="round">
            <path d="M3 22 Q10 4 22 8 Q32 11 37 6" />
            <path d="M6 25 Q14 12 24 14 Q32 15.5 37 12" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 38,
                letterSpacing: 6,
                color: CHARCOAL,
              }}
            >
              {siteConfig.brandShort.toUpperCase()}
            </div>
            <div
              style={{
                fontSize: 17,
                letterSpacing: 9,
                color: WARMGRAY,
                marginTop: 6,
              }}
            >
              {siteConfig.brandSubtitle.toUpperCase()}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.08,
              color: CHARCOAL,
              maxWidth: 900,
            }}
          >
            Change your sheets the easy way.
          </div>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.4,
              color: WARMGRAY,
              marginTop: 28,
              maxWidth: 820,
            }}
          >
            A fitted base that stays on your mattress. A removable bottom
            sheet that snaps on and off in seconds.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 24,
            letterSpacing: 3,
            color: SLATE,
            background: IVORY,
            padding: "16px 26px",
            alignSelf: "flex-start",
          }}
        >
          {siteConfig.tagline.toUpperCase()}
        </div>
      </div>
    ),
    size,
  );
}
