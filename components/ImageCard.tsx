import PlaceholderImage from "@/components/PlaceholderImage";

/**
 * Image with a titled caption, used for lifestyle panels and
 * construction-detail sections.
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
    <figure className="flex h-full flex-col bg-white">
      <PlaceholderImage src={src} alt={alt} width={800} height={600} />
      <figcaption className="flex-1 border border-t-0 border-mist p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">
          {title}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-navy/75">{caption}</p>
      </figcaption>
    </figure>
  );
}
