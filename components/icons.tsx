/**
 * Small inline line-icon set used for benefit rows.
 * All icons are decorative (aria-hidden is applied by consumers).
 */

const iconProps = {
  width: 32,
  height: 32,
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Person with highlighted back — "Easier on your back". */
export function BackIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="16" cy="7" r="3.5" />
      <path d="M11 28v-7a5 5 0 0 1 10 0v7" />
      <path d="M9 18c1.5-2.5 3-4 7-4s5.5 1.5 7 4" />
    </svg>
  );
}

/** Child face — "Easy enough for kids". */
export function ChildIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="16" cy="16" r="10" />
      <circle cx="12.5" cy="14" r="0.5" fill="currentColor" />
      <circle cx="19.5" cy="14" r="0.5" fill="currentColor" />
      <path d="M12 20c1 1.3 2.4 2 4 2s3-.7 4-2" />
    </svg>
  );
}

/** House — "Made for real life". */
export function HouseIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M6 14 16 6l10 8" />
      <path d="M8.5 12.5V26h15V12.5" />
      <path d="M13.5 26v-7h5v7" />
    </svg>
  );
}
