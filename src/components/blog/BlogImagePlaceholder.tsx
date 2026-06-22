import { cn } from "@/lib/utils";

type BlogImagePlaceholderProps = {
  label: string;
  aspectClassName?: string;
  className?: string;
  caption?: string;
};

export function BlogImagePlaceholder({
  label,
  aspectClassName = "aspect-[16/10]",
  className,
  caption,
}: BlogImagePlaceholderProps) {
  return (
    <figure className={cn("not-prose", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border border-dashed border-ink-700/20 bg-gradient-to-br from-ink-800 to-ink-950",
          aspectClassName,
        )}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
          <span className="font-mono text-caption uppercase tracking-widest text-amber-400/80">
            Image placeholder
          </span>
          <span className="line-clamp-4 font-serif text-lg text-ink-50/90">
            {label}
          </span>
        </div>
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-body-sm text-ink-800/65">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
