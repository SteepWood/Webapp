import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/ui/link";
import { notFound } from "next/navigation";

import { BlogReadDepthTracker } from "@/components/analytics/BlogReadDepthTracker";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { SectionShell } from "@/components/sections/section-shell";
import { Button } from "@/components/ui/button";
import { BLOG_DEFAULT_AUTHOR } from "@/lib/business";
import { extractHeadings } from "@/lib/blog/headings";
import { renderBlogMdx } from "@/lib/blog/renderMdx";
import { calculateReadingTime } from "@/lib/blog/readingTime";
import {
  getBlogPostBySlug,
  getPublishedBlogSlugs,
  getRelatedBlogPosts,
} from "@/lib/db/blog";
import { canonicalUrl } from "@/lib/seo/canonical";
import {
  blogBreadcrumbStructuredData,
  blogPostingStructuredData,
} from "@/lib/seo/blogStructuredData";

export const dynamicParams = false;
export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getPublishedBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  const title = post.metaTitle ?? `${post.title} | SteepWood Blog`;
  const description =
    post.metaDescription ?? post.excerpt ?? "Insights from the SteepWood workshop.";
  const path = `/blog/${post.slug}/`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl(path),
      languages: {
        "en-AU": canonicalUrl(path),
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl(path),
      siteName: "SteepWood",
      locale: "en_AU",
      type: "article",
      publishedTime: (post.publishedAt ?? post.createdAt).toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.authorName ?? BLOG_DEFAULT_AUTHOR],
      ...(post.coverImageUrl
        ? {
            images: [
              {
                url: post.coverImageUrl.startsWith("http")
                  ? post.coverImageUrl
                  : canonicalUrl(post.coverImageUrl),
                alt: post.coverImageAlt ?? post.title,
              },
            ],
          }
        : {}),
    },
  };
}

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function formatPostDate(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || !post.content) {
    notFound();
  }

  const [mdxContent, relatedPosts] = await Promise.all([
    renderBlogMdx(post.content),
    getRelatedBlogPosts(post),
  ]);

  const headings = extractHeadings(post.content);
  const readingTime = calculateReadingTime(post.content);
  const publishedAt = post.publishedAt ?? post.createdAt;
  const postingSchema = blogPostingStructuredData(post);
  const breadcrumbSchema = blogBreadcrumbStructuredData(post);

  return (
    <>
      <BlogReadDepthTracker slug={post.slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <SectionShell className="pb-0">
        <nav aria-label="Breadcrumb" className="mb-stack-md">
          <ol className="flex flex-wrap items-center gap-2 text-body-sm text-ink-800/70">
            <li>
              <Link href="/" className="hover:text-amber-600">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/blog/" className="hover:text-amber-600">
                Blog
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-ink-900">{post.title}</li>
          </ol>
        </nav>
      </SectionShell>

      {post.coverImageUrl ? (
        <div className="flex w-full items-center justify-center bg-ink-100 px-container-x py-6">
          <Image
            src={post.coverImageUrl}
            alt={post.coverImageAlt ?? post.title}
            width={1600}
            height={1000}
            priority
            fetchPriority="high"
            sizes="100vw"
            className="h-auto max-h-[70vh] w-full max-w-7xl object-contain"
          />
        </div>
      ) : null}

      <SectionShell>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_220px]">
          <div className="hidden lg:block">
            <TableOfContents headings={headings} />
          </div>

          <article>
            {post.category ? (
              <p className="mb-stack-sm font-mono text-caption uppercase tracking-widest text-amber-600">
                {post.category}
              </p>
            ) : null}
            <h1 className="mb-stack-md font-serif text-display-2 text-ink-900">
              {post.title}
            </h1>
            <p className="mb-stack-lg text-body text-ink-800/70">
              {post.authorName ?? BLOG_DEFAULT_AUTHOR} ·{" "}
              {formatPostDate(publishedAt)} · {readingTime} min read
            </p>

            <div id="blog-article-body" className="prose prose-ink max-w-none">
              {mdxContent}
            </div>

            <div className="mt-stack-xl rounded-lg border border-ink-700/10 bg-ink-50 p-6">
              <h2 className="mb-2 font-serif text-h4 text-ink-900">
                About {post.authorName ?? BLOG_DEFAULT_AUTHOR}
              </h2>
              <p className="text-body text-ink-800/80">
                SteepWood is a Newcastle-based custom joinery workshop serving
                homes and businesses across Australia. Our team shares practical
                design guidance drawn from two decades at the bench.
              </p>
            </div>
          </article>
        </div>
      </SectionShell>

      {relatedPosts.length > 0 ? (
        <SectionShell className="border-t border-ink-700/10">
          <h2 className="mb-stack-lg font-serif text-h2 text-ink-900">
            Related articles
          </h2>
          <BlogGrid posts={relatedPosts} />
        </SectionShell>
      ) : null}

      <SectionShell className="border-t border-ink-700/10">
        <div className="mx-auto max-w-3xl rounded-lg border border-amber-400/40 bg-ink-800 px-8 py-10 text-center shadow-xl ring-1 ring-ink-50/15 md:px-12">
          <h2 className="mb-stack-sm font-serif text-h2 text-ink-50">
            Planning a project? Get a free measure &amp; quote
          </h2>
          <p className="mb-stack-lg text-body text-ink-100/90">
            Tell us about your joinery brief and we&apos;ll arrange a
            no-obligation in-home visit.
          </p>
          <Button asChild size="lg">
            <Link href="/quote/">Get a Free Measure &amp; Quote</Link>
          </Button>
        </div>
      </SectionShell>
    </>
  );
}
