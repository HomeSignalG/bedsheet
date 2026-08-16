import Image from "next/image";

/**
 * Renders a clearly labeled placeholder image from /public/images.
 * All placeholder assets live in that directory so final photography can
 * be dropped in by replacing files (or updating the `src` paths) without
 * changing page code.
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
