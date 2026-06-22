"use client";

import type { BlogPost } from "@prisma/client";

import {
  ScrollReveal,
  ScrollRevealItem,
  ScrollRevealStagger,
} from "@/components/motion/ScrollReveal";
import {
  MediaCard,
  MediaCardAction,
  MediaCardContent,
  MediaCardDescription,
  MediaCardImage,
  MediaCardLink,
  MediaCardMeta,
  MediaCardPlaceholder,
  MediaCardTitle,
} from "@/components/ui/media-card";
import { BLOG_DEFAULT_AUTHOR } from "@/lib/business";
import { calculateReadingTime } from "@/lib/blog/readingTime";
import { cn } from "@/lib/utils";

type BlogGridProps = {
  posts: BlogPost[];
  featured?: BlogPost | null;
};

function formatPostDate(date: Date | null | undefined): string {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function BlogCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  const readingTime = calculateReadingTime(post.content ?? post.excerpt ?? "");
  const publishedAt = post.publishedAt ?? post.createdAt;

  return (
    <MediaCard className={cn(featured && "lg:flex lg:flex-row")}>
      <MediaCardLink
        href={`/blog/${post.slug}/`}
        className={cn(featured && "lg:flex lg:min-h-0 lg:flex-1 lg:flex-row")}
      >
        <div
          className={cn(
            featured
              ? "lg:min-h-0 lg:w-[min(52%,520px)] lg:shrink-0"
              : "min-w-0",
          )}
        >
          {post.coverImageUrl ? (
            <MediaCardImage
              src={post.coverImageUrl}
              alt={post.coverImageAlt ?? post.title}
              width={1600}
              height={featured ? 1000 : 800}
              sizes={
                featured
                  ? "(max-width: 1024px) 100vw, 520px"
                  : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              }
              loading={featured ? "eager" : "lazy"}
              areaClassName={featured ? "aspect-[16/10]" : undefined}
            />
          ) : (
            <MediaCardPlaceholder label={post.title} />
          )}
        </div>
        <MediaCardContent
          className={cn(
            "min-w-0 flex-1",
            featured && "justify-center lg:px-8 lg:py-8",
          )}
        >
          {post.category ? (
            <p className="mb-2 font-mono text-caption uppercase tracking-widest text-amber-600">
              {post.category}
            </p>
          ) : null}
          <MediaCardTitle
            as="h2"
            className={cn(
              featured
                ? "mb-3 line-clamp-3 text-h2 md:text-display-2"
                : "line-clamp-2",
            )}
          >
            {post.title}
          </MediaCardTitle>
          <MediaCardMeta>
            {post.authorName ?? BLOG_DEFAULT_AUTHOR} · {formatPostDate(publishedAt)} ·{" "}
            {readingTime} min read
          </MediaCardMeta>
          {post.excerpt ? (
            <MediaCardDescription clamp={!featured}>
              {post.excerpt}
            </MediaCardDescription>
          ) : null}
          <MediaCardAction className="mt-auto pt-4">Read article</MediaCardAction>
        </MediaCardContent>
      </MediaCardLink>
    </MediaCard>
  );
}

export function BlogGrid({ posts, featured }: BlogGridProps) {
  if (!featured && posts.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-ink-700/20 bg-ink-50/60 px-6 py-16 text-center">
        <p className="font-serif text-h4 text-ink-900">No posts found</p>
        <p className="mt-2 text-body text-ink-800/70">
          Try another category or check back soon for new articles.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {featured ? (
        <ScrollReveal>
          <BlogCard post={featured} featured />
        </ScrollReveal>
      ) : null}
      {posts.length > 0 ? (
        <ScrollRevealStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <ScrollRevealItem key={post.slug} className="h-full min-w-0">
              <BlogCard post={post} />
            </ScrollRevealItem>
          ))}
        </ScrollRevealStagger>
      ) : null}
    </div>
  );
}
