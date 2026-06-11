import Image from "next/image";

export function ImageWithCaption({
  src,
  alt,
  caption,
  width = 1200,
  height = 800,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="my-8 not-prose">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 768px"
        className="h-auto w-full rounded-lg border border-ink-700/10"
      />
      {caption ? (
        <figcaption className="mt-3 text-center text-body-sm text-ink-800/70">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
