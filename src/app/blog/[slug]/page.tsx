import type { Metadata } from "next";
import Link from "@/components/ui/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { BlogReadDepthTracker } from "@/components/analytics/BlogReadDepthTracker";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { BlogMobileToc } from "@/components/blog/BlogMobileToc";
import { BlogPostHero } from "@/components/blog/BlogPostHero";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { BlogVisualStrip } from "@/components/blog/BlogVisualStrip";
import { TableOfContents } from "@/components/blog/TableOfContents";
import {
  DarkCtaPanel,
  DarkCtaSection,
} from "@/components/sections/dark-cta-section";
import {
  SectionShell,
  contentSubheadingClass,
} from "@/components/sections/section-shell";
import { Button } from "@/components/ui/button";
import { BLOG_DEFAULT_AUTHOR } from "@/lib/business";
import { extractHeadings } from "@/lib/blog/headings";
import { renderBlogMdx } from "@/lib/blog/renderMdx";
import { calculateReadingTime } from "@/lib/blog/readingTime";
import {
  getBlogCategories,
  getBlogPostBySlug,
  getPopularBlogTags,
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

  const [mdxContent, relatedPosts, categories, tags] = await Promise.all([
    renderBlogMdx(post.content),
    getRelatedBlogPosts(post),
    getBlogCategories(),
    getPopularBlogTags(),
  ]);

  const headings = extractHeadings(post.content);
  const readingTime = calculateReadingTime(post.content);
  const publishedAt = post.publishedAt ?? post.createdAt;
  const publishedLabel = formatPostDate(publishedAt);
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
            <li className="max-w-[min(100%,20rem)] truncate font-medium text-ink-900">
              {post.title}
            </li>
          </ol>
        </nav>
      </SectionShell>

      <BlogPostHero
        post={post}
        publishedLabel={publishedLabel}
        readingTime={readingTime}
      />

      <SectionShell>
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[220px_minmax(0,1fr)_280px] xl:items-start">
          <div className="hidden min-w-0 xl:block">
            <TableOfContents headings={headings} />
          </div>

          <article className="min-w-0">
            <BlogMobileToc headings={headings} />

            {post.excerpt ? (
              <p className="mb-stack-lg border-l-4 border-amber-500/70 bg-ink-50 px-5 py-4 font-serif text-h4 leading-snug text-ink-800/90">
                {post.excerpt}
              </p>
            ) : null}

            <BlogVisualStrip
              slug={post.slug}
              variant="pair"
              imageAlts={
                post.coverImageAlt
                  ? [
                      `${post.coverImageAlt} — detail`,
                      `${post.coverImageAlt} — context`,
                    ]
                  : undefined
              }
            />

            <div id="blog-article-body" className="prose-steepwood max-w-none">
              {mdxContent}
            </div>

            <BlogVisualStrip
              slug={post.slug}
              variant="wide"
              imageAlts={
                post.coverImageAlt ? [`${post.coverImageAlt} — feature`] : undefined
              }
            />

            <aside className="mt-stack-xl rounded-lg border border-ink-700/10 bg-ink-50 p-6 md:p-8">
              <h2 className={contentSubheadingClass}>
                About {post.authorName ?? BLOG_DEFAULT_AUTHOR}
              </h2>
              <p className="text-body text-ink-800/80">
                SteepWood is a Newcastle-based custom joinery workshop serving
                homes and businesses across Australia. Our team shares practical
                design guidance drawn from two decades at the bench.
              </p>
            </aside>
          </article>

          <div className="min-w-0 xl:sticky xl:top-28 xl:self-start">
            <Suspense
              fallback={
                <div
                  className="h-64 animate-pulse rounded-lg bg-ink-700/10"
                  aria-hidden
                />
              }
            >
              <BlogSidebar categories={categories} tags={tags} compact />
            </Suspense>
          </div>
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

      <DarkCtaSection>
        <DarkCtaPanel>
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
        </DarkCtaPanel>
      </DarkCtaSection>
    </>
  );
}
