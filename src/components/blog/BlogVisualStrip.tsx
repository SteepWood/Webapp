import { MediaThumb } from "@/components/ui/media-card";
import {
  getBlogImageMeta,
  type BlogImageSlot,
} from "@/lib/blog/batch2ImageMeta";
import { blogPostInlinePath } from "@/lib/images";
import { cn } from "@/lib/utils";

type BlogVisualStripProps = {
  slug: string;
  variant?: "pair" | "wide";
  className?: string;
  imageAlts?: string[];
};

const DEFAULT_PAIR_ALTS = [
  "Supporting detail image for this article",
  "Supporting context image for this article",
] as const;

const DEFAULT_WIDE_ALT = "Wide feature image for this article";

const PAIR_SLOTS = ["inline-01", "inline-02"] as const satisfies BlogImageSlot[];

export function BlogVisualStrip({
  slug,
  variant = "pair",
  className,
  imageAlts,
}: BlogVisualStripProps) {
  if (variant === "wide") {
    const meta = getBlogImageMeta(slug, "inline-wide");
    const alt = meta?.alt ?? imageAlts?.[0] ?? DEFAULT_WIDE_ALT;

    return (
      <figure className={cn("not-prose my-stack-lg", className)}>
        <MediaThumb
          src={blogPostInlinePath(slug, "inline-wide")}
          alt={alt}
          title={meta?.title_attr}
          width={meta?.width ?? 1600}
          height={meta?.height ?? 1000}
          sizes={meta?.sizes ?? "(max-width: 768px) 100vw, 720px"}
          loading="lazy"
          unoptimized
          areaClassName="aspect-[16/10] rounded-lg border border-ink-700/10"
          imageClassName="group-hover:scale-100"
        />
        {meta?.caption ? (
          <figcaption className="mt-3 text-body-sm leading-relaxed text-ink-800/70">
            {meta.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <div
      className={cn(
        "not-prose my-stack-lg grid grid-cols-1 gap-4 sm:grid-cols-2",
        className,
      )}
    >
      {PAIR_SLOTS.map((slot, index) => {
        const meta = getBlogImageMeta(slug, slot);
        const alt =
          meta?.alt ??
          imageAlts?.[index] ??
          DEFAULT_PAIR_ALTS[index] ??
          DEFAULT_WIDE_ALT;

        return (
          <figure key={slot} className="min-w-0">
            <MediaThumb
              src={blogPostInlinePath(slug, slot)}
              alt={alt}
              title={meta?.title_attr}
              width={meta?.width ?? 1200}
              height={meta?.height ?? 900}
              sizes={meta?.sizes ?? "(max-width: 640px) 100vw, 50vw"}
              loading="lazy"
              unoptimized
              areaClassName="aspect-[4/3] rounded-lg border border-ink-700/10"
              imageClassName="group-hover:scale-100"
            />
            {meta?.caption ? (
              <figcaption className="mt-3 text-body-sm leading-relaxed text-ink-800/70">
                {meta.caption}
              </figcaption>
            ) : null}
          </figure>
        );
      })}
    </div>
  );
}
