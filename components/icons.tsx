/**
 * Small inline line-icon set used across benefit rows, lists, and cards.
 * All icons are decorative; consumers wrap them with aria-hidden.
 */

import type { ReactNode } from "react";

function Icon({ children, size = 32 }: { children: ReactNode; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** Person with highlighted back — "Easier on your back". */
export function BackIcon() {
  return (
    <Icon>
      <circle cx="16" cy="7" r="3.5" />
      <path d="M11 28v-7a5 5 0 0 1 10 0v7" />
      <path d="M9 18c1.5-2.5 3-4 7-4s5.5 1.5 7 4" />
    </Icon>
  );
}

/** Child face — "Easy enough for kids". */
export function ChildIcon() {
  return (
    <Icon>
      <circle cx="16" cy="16" r="10" />
      <circle cx="12.5" cy="14" r="0.5" fill="currentColor" />
      <circle cx="19.5" cy="14" r="0.5" fill="currentColor" />
      <path d="M12 20c1 1.3 2.4 2 4 2s3-.7 4-2" />
    </Icon>
  );
}

/** House — "Made for real life". */
export function HouseIcon() {
  return (
    <Icon>
      <path d="M6 14 16 6l10 8" />
      <path d="M8.5 12.5V26h15V12.5" />
      <path d="M13.5 26v-7h5v7" />
    </Icon>
  );
}

/** Shield with check — "Patented system" / trust. */
export function ShieldIcon() {
  return (
    <Icon>
      <path d="M16 4 26 8v7c0 6.5-4.2 11-10 13-5.8-2-10-6.5-10-13V8Z" />
      <path d="m11.5 15.5 3 3 6-6" />
    </Icon>
  );
}

/** Award badge — "Quality you can trust" / responsive. */
export function BadgeIcon() {
  return (
    <Icon>
      <circle cx="16" cy="13" r="7" />
      <path d="m12 19-2 9 6-3.5L22 28l-2-9" />
      <path d="m16 9.5 1.2 2.4 2.6.4-1.9 1.9.4 2.6-2.3-1.2-2.3 1.2.4-2.6-1.9-1.9 2.6-.4Z" />
    </Icon>
  );
}

/** Heart — care / thank you. */
export function HeartIcon() {
  return (
    <Icon>
      <path d="M16 26C9 21 4.5 16.8 4.5 12A5.5 5.5 0 0 1 16 9a5.5 5.5 0 0 1 11.5 3c0 4.8-4.5 9-11.5 14Z" />
    </Icon>
  );
}

/** Clock — time saved. */
export function ClockIcon() {
  return (
    <Icon>
      <circle cx="16" cy="16" r="11" />
      <path d="M16 9v7l5 3" />
    </Icon>
  );
}

/** Family / people — kid independence, personal. */
export function PeopleIcon() {
  return (
    <Icon>
      <circle cx="11" cy="11" r="3.5" />
      <circle cx="21" cy="12.5" r="2.8" />
      <path d="M4.5 26v-3.5a6.5 6.5 0 0 1 13 0V26" />
      <path d="M20 26v-2.8a5.2 5.2 0 0 1 7.5-4.6" />
    </Icon>
  );
}

/** Standing figure — for every stage. */
export function PersonIcon() {
  return (
    <Icon>
      <circle cx="16" cy="8" r="3.5" />
      <path d="M16 12v8m0 0-4 8m4-8 4 8M10 16h12" />
    </Icon>
  );
}

/** Leaf — sustainable choice. */
export function LeafIcon() {
  return (
    <Icon>
      <path d="M26 6C14 6 7 13 7 22c0 2 .5 3.5 1 4 .5-9 5-14 12-16-6 3.5-10 8.5-11 15 1.5 1 3.5 1.5 5.5 1.5C23 26.5 26 15 26 6Z" />
    </Icon>
  );
}

/** Diamond — built to last. */
export function DiamondIcon() {
  return (
    <Icon>
      <path d="M10 6h12l6 7-12 15L4 13Z" />
      <path d="M4 13h24M13 6l-2 7 5 13M19 6l2 7-5 13" />
    </Icon>
  );
}

/** Chat bubble with heart — "We're here for you". */
export function SupportIcon() {
  return (
    <Icon>
      <path d="M27 15a11 9.5 0 0 1-11 9.5c-1.5 0-3-.2-4.3-.7L5 26l1.8-5A9 9 0 0 1 5 15a11 9.5 0 0 1 22 0Z" />
      <path d="M16 19.5c-3-2.1-4.8-3.9-4.8-5.9A2.3 2.3 0 0 1 16 12a2.3 2.3 0 0 1 4.8 1.6c0 2-1.8 3.8-4.8 5.9Z" />
    </Icon>
  );
}

/** Envelope — email. */
export function MailIcon({ size = 32 }: { size?: number }) {
  return (
    <Icon size={size}>
      <rect x="4" y="8" width="24" height="17" rx="1.5" />
      <path d="m5 10 11 8 11-8" />
    </Icon>
  );
}

/** Storefront — retail partnership. */
export function StoreIcon() {
  return (
    <Icon>
      <path d="M5 12 7 5h18l2 7" />
      <path d="M5 12a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 4 2.8V27H7V14.8A3 3 0 0 0 5 12Z" />
      <path d="M12 27v-7h8v7" />
    </Icon>
  );
}

/** Ruler — sizing / fits real mattresses. */
export function RulerIcon() {
  return (
    <Icon>
      <rect x="3" y="18" width="26" height="8" rx="1" transform="rotate(-25 16 22)" />
      <path d="m9 21 1.5 2.5M13 19l1.5 2.5M17 17l1.5 2.5M21 15l1.5 2.5" />
    </Icon>
  );
}

/** Washing machine — care instructions. */
export function WashIcon() {
  return (
    <Icon>
      <rect x="6" y="4" width="20" height="24" rx="2" />
      <circle cx="16" cy="17" r="6.5" />
      <path d="M10.5 17c1.8-1.5 3.7 1.5 5.5 0s3.7 1.5 5.5 0" />
      <circle cx="10" cy="7.5" r="0.5" fill="currentColor" />
      <circle cx="13" cy="7.5" r="0.5" fill="currentColor" />
    </Icon>
  );
}

/** Fabric weave — premium fabrics. */
export function FabricIcon() {
  return (
    <Icon>
      <circle cx="16" cy="16" r="11" />
      <path d="M8 12h16M8 16h16M8 20h16M12 8v16M16 8v16M20 8v16" />
    </Icon>
  );
}

/** Lock — privacy. */
export function LockIcon() {
  return (
    <Icon>
      <rect x="8" y="14" width="16" height="12" rx="1.5" />
      <path d="M11 14v-3a5 5 0 0 1 10 0v3" />
      <circle cx="16" cy="20" r="1.2" fill="currentColor" />
    </Icon>
  );
}

/** Bed glyph — size icons row. */
export function BedIcon() {
  return (
    <Icon>
      <path d="M5 8v16M5 20h22v4M5 17h22v-3a2 2 0 0 0-2-2H12v5" />
      <path d="M7 12h3.5a1.5 1.5 0 0 1 0 3H7Z" />
    </Icon>
  );
}

/** Checkmark in circle — checklists. */
export function CheckIcon({ size = 22 }: { size?: number }) {
  return (
    <Icon size={size}>
      <circle cx="16" cy="16" r="12" />
      <path d="m10.5 16.5 4 4 7-8" />
    </Icon>
  );
}

/** Filled navy check circle — hero checklists. */
export function CheckSolidIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="13" />
      <path
        d="m10.5 16.5 4 4 7-8"
        fill="none"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Plain checkmark — solution list. */
export function CheckMarkIcon({ size = 18 }: { size?: number }) {
  return (
    <Icon size={size}>
      <path d="m6 17 6.5 6L26 9" />
    </Icon>
  );
}

/** Plain cross — problem list. */
export function CrossIcon({ size = 18 }: { size?: number }) {
  return (
    <Icon size={size}>
      <path d="M8 8l16 16M24 8 8 24" />
    </Icon>
  );
}

/** Arrow right — CTAs and step separators. */
export function ArrowRightIcon({ size = 18 }: { size?: number }) {
  return (
    <Icon size={size}>
      <path d="M5 16h22m-8-8 8 8-8 8" />
    </Icon>
  );
}
