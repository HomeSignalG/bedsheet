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
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Set for above-the-fold images; everything else lazy-loads. */
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={`h-auto w-full ${className.includes("rounded") ? "" : "rounded-xl"} ${className}`}
    />
  );
}
