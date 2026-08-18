import Image from "next/image";

/**
 * Renders an image from /public/placeholders — either final photography
 * or a clearly labeled placeholder block. Keeping every asset in that one
 * directory means final photos can be dropped in by updating the `src`
 * path, without touching layout code.
 */
export default function PlaceholderImage({
  src,
  alt,
  width,
  height,
  priority = false,
  objectPosition,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Set for above-the-fold images; everything else lazy-loads. */
  priority?: boolean;
  /** Crop focus when the image is cover-fitted into a fixed aspect box. */
  objectPosition?: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      style={objectPosition ? { objectPosition } : undefined}
      className={`h-auto w-full ${className.includes("rounded") ? "" : "rounded-xl"} ${className}`}
    />
  );
}
