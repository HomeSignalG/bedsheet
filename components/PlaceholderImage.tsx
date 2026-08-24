import Image from "next/image";

/**
 * Renders an image from /public/placeholders — either final photography
 * or a clearly labeled placeholder block. Keeping every asset in that one
 * directory means final photos can be dropped in by updating the `src`
 * path, without touching layout code.
 *
 * Photos are never cropped: where a fixed-size tile is involved the image
 * is scaled down to fit inside it (`object-contain`), so the whole frame —
 * snaps, grommets, hems — stays visible.
 */
export default function PlaceholderImage({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes,
  className = "",
  bare = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Set for above-the-fold images; everything else lazy-loads. */
  priority?: boolean;
  /**
   * Rendered width of the image, as a CSS `sizes` value. Without it the
   * browser assumes full viewport width and picks a needlessly large
   * candidate for any image that renders smaller than that.
   */
  sizes?: string;
  className?: string;
  /**
   * Skips the default `h-auto w-full rounded-xl` sizing so the caller can
   * size the image itself. Set it wherever `className` already supplies
   * width or height, since two competing utilities for the same property
   * resolve by stylesheet order rather than by which was written last.
   */
  bare?: boolean;
}) {
  const base = bare
    ? ""
    : `h-auto w-full ${className.includes("rounded") ? "" : "rounded-xl"}`;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className={`${base} ${className}`.trim()}
    />
  );
}

/** Shape of a photograph, so its alt text is written exactly once. */
export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}
