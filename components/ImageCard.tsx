import PlaceholderImage from "@/components/PlaceholderImage";

/**
 * Image-topped card with titled caption, used for the product
 * feature cards.
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
      <PlaceholderImage src={src} alt={alt} width={800} height={600} className="rounded-lg" />
      <figcaption className="flex-1 pt-5">
      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-navy">
          {title}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-navy/70">{caption}</p>
      </figcaption>
    </figure>
  );
}
