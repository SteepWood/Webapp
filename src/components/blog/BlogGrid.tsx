import type { BlogPost } from "@prisma/client";
import Image from "next/image";
import Link from "@/components/ui/link";

import { mediaThumbAreaClass, mediaCardImageClass } from "@/components/ui/media-card";
import { mediaFrameAreaClass } from "@/components/ui/media-frame";
import { cn } from "@/lib/utils";
import { BLOG_DEFAULT_AUTHOR } from "@/lib/business";
import { calculateReadingTime } from "@/lib/blog/readingTime";

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
    <article
      className={
        featured
          ? "surface-card overflow-hidden rounded-lg lg:grid lg:grid-cols-2 lg:items-stretch"
          : "surface-card overflow-hidden rounded-lg"
      }
    >
      <Link
        href={`/blog/${post.slug}/`}
        className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
      >
        <div
          className={
            featured
              ? cn(mediaFrameAreaClass, "rounded-none")
              : mediaThumbAreaClass
          }
        >
          {post.coverImageUrl ? (
            <Image
              src={post.coverImageUrl}
              alt={post.coverImageAlt ?? post.title}
              width={1600}
              height={1000}
              sizes={
                featured
                  ? "(max-width: 1024px) 100vw, 50vw"
                  : "(max-width: 640px) 100vw, 33vw"
              }
              className={cn(mediaCardImageClass, "size-full")}
            />
          ) : (
            <div className="absolute inset-0 flex items-end bg-gradient-to-br from-ink-800 to-ink-950 p-6">
              <span className="font-serif text-2xl text-ink-50">{post.title}</span>
            </div>
          )}
        </div>
        <div className={featured ? "flex flex-col justify-center p-6 lg:p-8" : "p-5"}>
          {post.category ? (
            <p className="mb-2 font-mono text-caption uppercase tracking-widest text-amber-600">
              {post.category}
            </p>
          ) : null}
          <h2
            className={
              featured
                ? "mb-3 font-serif text-display-2 text-ink-900"
                : "mb-2 font-serif text-h4 text-ink-900"
            }
          >
            {post.title}
          </h2>
          {post.excerpt ? (
            <p
              className={
                featured
                  ? "mb-4 text-body-lg text-ink-800/80"
                  : "mb-3 text-body-sm leading-relaxed text-ink-800/80"
              }
            >
              {post.excerpt}
            </p>
          ) : null}
          <p className="text-body-sm text-ink-800/60">
            {post.authorName ?? BLOG_DEFAULT_AUTHOR} · {formatPostDate(publishedAt)} ·{" "}
            {readingTime} min read
          </p>
        </div>
      </Link>
    </article>
  );
}

export function BlogGrid({ posts, featured }: BlogGridProps) {
  if (!featured && posts.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-ink-700/20 px-6 py-16 text-center">
        <p className="font-serif text-h4 text-ink-900">No posts found</p>
        <p className="mt-2 text-body text-ink-800/70">
          Try another category or check back soon for new articles.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {featured ? <BlogCard post={featured} featured /> : null}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
