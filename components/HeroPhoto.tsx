import type { ReactNode } from "react";
import PlaceholderImage, { type Photo } from "@/components/PlaceholderImage";

/**
 * The large-screen half of a page hero: a photograph occupying the right
 * edge of the section, beside the hero copy.
 *
 * The frame takes the photograph's own aspect ratio, so the shot fills it
 * exactly — nothing is cropped, and nothing letterboxes. That is what lets
 * `children` be positioned against the photograph itself: an overlay placed
 * on a panel the photo only partly fills ends up on background, pointing at
 * nothing, and does it differently at every viewport width.
 *
 * The width cap keeps the derived height inside the hero's minimum height on
 * ultrawide displays, where 46% of the viewport would otherwise be taller
 * than the section itself.
 */
export default function HeroPhoto({
  photo,
  children,
}: {
  photo: Photo;
  children?: ReactNode;
}) {
  return (
    <div className="absolute inset-y-0 right-0 hidden w-[46%] max-w-[800px] items-center justify-center lg:flex">
      <div
        className="relative w-full"
        style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      >
        <PlaceholderImage
          {...photo}
          priority
          bare
          sizes="(min-width: 1740px) 800px, 46vw"
          className="h-full w-full object-cover"
        />
        {children}
      </div>
    </div>
  );
}
