import type { BlogPost } from "@prisma/client";

import { BlogImagePlaceholder } from "@/components/blog/BlogImagePlaceholder";
import { MediaFrame } from "@/components/ui/media-frame";
import { BLOG_DEFAULT_AUTHOR } from "@/lib/business";

type BlogPostHeroProps = {
  post: BlogPost;
  publishedLabel: string;
  readingTime: number;
};

export function BlogPostHero({
  post,
  publishedLabel,
  readingTime,
}: BlogPostHeroProps) {
  const placeholderLabel = post.coverImageAlt ?? post.title;

  return (
    <div className="relative bg-ink-900">
      <div className="mx-auto max-w-7xl px-container-x py-6 md:py-8">
        <div className="relative overflow-hidden md:rounded-lg">
          {post.coverImageUrl ? (
            <MediaFrame
              src={post.coverImageUrl}
              alt={post.coverImageAlt ?? post.title}
              width={1600}
              height={1000}
              priority
              fetchPriority="high"
              sizes="100vw"
              frameClassName="rounded-none md:rounded-lg"
            />
          ) : (
            <BlogImagePlaceholder
              label={placeholderLabel}
              aspectClassName="aspect-[16/10] max-h-[min(72vh,720px)] w-full rounded-none md:rounded-lg"
              className="mb-0"
            />
          )}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/50 to-ink-950/10"
          />
          <div className="absolute inset-x-0 bottom-0 max-w-4xl px-6 pb-8 pt-20 md:px-10 md:pb-10">
            {post.category ? (
              <p className="mb-stack-sm font-mono text-caption uppercase tracking-widest text-amber-400">
                {post.category}
              </p>
            ) : null}
            <h1 className="font-serif text-[clamp(1.75rem,5vw,3.25rem)] leading-tight text-ink-50">
              {post.title}
            </h1>
            <p className="mt-4 text-body text-ink-100/85">
              {post.authorName ?? BLOG_DEFAULT_AUTHOR} · {publishedLabel} ·{" "}
              {readingTime} min read
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
