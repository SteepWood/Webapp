import { MediaFrame } from "@/components/ui/media-frame";

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

/** Default markdown image handler — styled like editorial figures. */
export function MdxImage({
  src,
  alt,
  title,
}: {
  src?: string;
  alt?: string;
  title?: string;
}) {
  if (!src) {
    return null;
  }

  return (
    <figure className="not-prose my-stack-lg">
      <MediaFrame
        src={src}
        alt={alt ?? ""}
        width={1200}
        height={800}
        sizes="(max-width: 768px) 100vw, 720px"
        frameClassName="rounded-lg"
      />
      {title ? (
        <figcaption className="mt-3 text-center text-body-sm text-ink-800/65">
          {title}
        </figcaption>
      ) : null}
    </figure>
  );
}
