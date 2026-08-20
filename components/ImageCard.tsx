import PlaceholderImage from "@/components/PlaceholderImage";

/**
 * Image-topped card with a titled caption, used for the product feature
 * cards. Images fill a shared 4:3 tile so every card in a row lines up;
 * `objectPosition` sets the crop focus for photos that aren't 4:3.
 */
export default function ImageCard({
  src,
  alt,
  title,
  caption,
  objectPosition,
}: {
  src: string;
  alt: string;
  title: string;
  caption: string;
  objectPosition?: string;
}) {
  return (
    <figure className="flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
        <PlaceholderImage
          src={src}
          alt={alt}
          width={800}
          height={600}
          objectPosition={objectPosition}
          className="absolute inset-0 h-full w-full rounded-none object-cover"
        />
      </div>
      <figcaption className="flex-1 pt-5">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-navy">
          {title}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-navy/70">{caption}</p>
      </figcaption>
    </figure>
  );
}
