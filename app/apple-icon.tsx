import { ImageResponse } from "next/og";

/** Home-screen icon for iOS. Mirrors app/icon.svg at the size Apple asks for. */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#292c2d",
        }}
      >
        <svg width="132" height="92" viewBox="0 0 40 28" fill="none" strokeWidth="2.4" strokeLinecap="round">
          <path d="M3 20 Q11 6 22 9 Q31 11.5 37 7" stroke="#fcfbf8" />
          <path d="M6 24 Q14 13 24 15 Q32 16.5 37 13" stroke="#667789" />
        </svg>
      </div>
    ),
    size,
  );
}
