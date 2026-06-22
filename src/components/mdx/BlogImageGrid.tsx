import { MediaThumb } from "@/components/ui/media-card";
import { cn } from "@/lib/utils";

type BlogImageGridProps = {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  className?: string;
};

export function BlogImageGrid({ images, className }: BlogImageGridProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "not-prose my-stack-lg grid grid-cols-1 gap-4 sm:grid-cols-2",
        className,
      )}
    >
      {images.map((image) => (
        <figure key={`${image.src}-${image.alt}`} className="min-w-0">
          <MediaThumb
            src={image.src}
            alt={image.alt}
            width={800}
            height={600}
            sizes="(max-width: 640px) 100vw, 50vw"
            areaClassName="aspect-[4/3] rounded-lg border border-ink-700/10"
            imageClassName="group-hover:scale-100"
          />
          {image.caption ? (
            <figcaption className="mt-2 text-body-sm text-ink-800/65">
              {image.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}
