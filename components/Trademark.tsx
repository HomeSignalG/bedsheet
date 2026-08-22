/**
 * Superscript ™ used immediately after the BackEasy Sheets wordmark in prominent
 * brand references.
 *
 * Positioned with `relative` rather than `vertical-align: super` so it can
 * never change a heading's line height, sized relative to the surrounding
 * text, and with letter-spacing reset so it sits tight against the name in
 * the wide-tracked headings and wordmark. Color and font are inherited.
 */
export default function Trademark() {
  return (
    <span className="relative -top-[0.45em] text-[0.55em] tracking-normal">
      &trade;
    </span>
  );
}
