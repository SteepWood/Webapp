import { MediaFrame } from "@/components/ui/media-frame";

export function BlogWideImage({
  src,
  alt,
  caption,
  width = 1600,
  height = 1000,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="not-prose my-stack-lg">
      <MediaFrame
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 720px"
        frameClassName="rounded-lg"
      />
      {caption ? (
        <figcaption className="mt-3 text-center text-body-sm text-ink-800/65">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
