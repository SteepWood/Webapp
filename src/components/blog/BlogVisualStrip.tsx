import { MediaThumb } from "@/components/ui/media-card";
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

export function BlogVisualStrip({
  slug,
  variant = "pair",
  className,
  imageAlts,
}: BlogVisualStripProps) {
  if (variant === "wide") {
    const alt = imageAlts?.[0] ?? DEFAULT_WIDE_ALT;

    return (
      <figure className={cn("not-prose my-stack-lg", className)}>
        <MediaThumb
          src={blogPostInlinePath(slug, "inline-wide")}
          alt={alt}
          width={1600}
          height={1000}
          sizes="(max-width: 768px) 100vw, 720px"
          areaClassName="aspect-[16/10] rounded-lg border border-ink-700/10"
          imageClassName="group-hover:scale-100"
        />
      </figure>
    );
  }

  const alts = imageAlts ?? [...DEFAULT_PAIR_ALTS];
  const variants = ["inline-01", "inline-02"] as const;

  return (
    <div
      className={cn(
        "not-prose my-stack-lg grid grid-cols-1 gap-4 sm:grid-cols-2",
        className,
      )}
    >
      {variants.map((inlineVariant, index) => (
        <figure key={inlineVariant} className="min-w-0">
          <MediaThumb
            src={blogPostInlinePath(slug, inlineVariant)}
            alt={alts[index] ?? DEFAULT_PAIR_ALTS[index] ?? DEFAULT_WIDE_ALT}
            width={1200}
            height={900}
            sizes="(max-width: 640px) 100vw, 50vw"
            areaClassName="aspect-[4/3] rounded-lg border border-ink-700/10"
            imageClassName="group-hover:scale-100"
          />
        </figure>
      ))}
    </div>
  );
}
