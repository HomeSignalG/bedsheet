import PlaceholderImage from "@/components/PlaceholderImage";

/**
 * Image-topped card with a titled caption, used for the product feature
 * cards. Every card in a row shares a 4:3 tile so the captions line up;
 * the photo is scaled to fit inside that tile rather than cropped to it,
 * so no part of the image is cut off.
 */
export default function ImageCard({
  src,
  alt,
  title,
  caption,
}: {
  src: string;
  alt: string;
  title: string;
  caption: string;
}) {
  return (
    <figure className="flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-ivory">
        <PlaceholderImage
          src={src}
          alt={alt}
          width={800}
          height={600}
          bare
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>
      <figcaption className="flex-1 pt-5">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-charcoal">
          {title}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-warmgray">{caption}</p>
      </figcaption>
    </figure>
  );
}
