import type { BlogPost } from "@prisma/client";

import { FOUNDER_PERSON_ID, aioSiteUrl } from "@/lib/aio/schema";
import {
  getBlogImageMeta,
  getBlogImageSchema,
} from "@/lib/blog/batch2ImageMeta";
import { BLOG_DEFAULT_AUTHOR, FOUNDER_JOB_TITLE } from "@/lib/business";
import { calculateReadingTime } from "@/lib/blog/readingTime";
import { parseFaqFromTags } from "@/lib/blog/launchPack";
import { env } from "@/env";
import { blogPostCoverPath, blogPostOgPath } from "@/lib/images";

const SITE_URL = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
const PUBLISHER_NAME = "SteepWood";

function absoluteImageUrl(url: string | null | undefined): string | undefined {
  if (!url) {
    return undefined;
  }

  return url.startsWith("http") ? url : `${SITE_URL}${url}`;
}

function stripMarkdownLinks(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

export function blogPostingStructuredData(post: BlogPost) {
  const path = `/blog/${post.slug}/`;
  const publishedAt = post.publishedAt ?? post.createdAt;
  const articleBody = post.content ?? post.excerpt ?? "";
  const readingMinutes = calculateReadingTime(articleBody);
  const packSchema = getBlogImageSchema(post.slug);
  const heroMeta = getBlogImageMeta(post.slug, "hero");
  const fallbackUrl = absoluteImageUrl(
    post.coverImageUrl ?? blogPostCoverPath(post.slug),
  );

  const image =
    packSchema?.image ??
    (fallbackUrl
      ? [
          {
            "@type": "ImageObject",
            "@id": `${SITE_URL}${path}#primaryimage`,
            url: fallbackUrl,
            width: 1600,
            height: 1000,
            caption: heroMeta?.caption ?? post.coverImageAlt ?? post.title,
          },
        ]
      : undefined);

  return {
    "@type": "BlogPosting",
    "@id": `${SITE_URL}${path}#article`,
    isPartOf: { "@id": `${SITE_URL}${path}#webpage` },
    headline: post.title,
    description: post.excerpt ?? post.metaDescription ?? undefined,
    datePublished: publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    inLanguage: "en-AU",
    articleSection: post.category ?? undefined,
    wordCount: articleBody.split(/\s+/).filter(Boolean).length,
    timeRequired: `PT${readingMinutes}M`,
    author:
      (post.authorName ?? BLOG_DEFAULT_AUTHOR) === BLOG_DEFAULT_AUTHOR
        ? {
            "@id": FOUNDER_PERSON_ID,
            "@type": "Person",
            name: BLOG_DEFAULT_AUTHOR,
            jobTitle: FOUNDER_JOB_TITLE,
            worksFor: { "@id": `${SITE_URL}/#organization` },
            url: `${SITE_URL}/about/`,
          }
        : {
            "@type": "Person",
            name: post.authorName ?? BLOG_DEFAULT_AUTHOR,
            url: aioSiteUrl,
          },
    publisher: { "@id": `${SITE_URL}/#organization` },
    image,
    ...(packSchema?.additionalImages?.length
      ? { associatedMedia: packSchema.additionalImages }
      : {}),
    mainEntityOfPage: { "@id": `${SITE_URL}${path}#webpage` },
    articleBody,
    url: `${SITE_URL}${path}`,
    isAccessibleForFree: true,
  };
}

export function blogWebPageStructuredData(post: BlogPost) {
  const path = `/blog/${post.slug}/`;

  return {
    "@type": "WebPage",
    "@id": `${SITE_URL}${path}#webpage`,
    url: `${SITE_URL}${path}`,
    name: post.metaTitle ?? post.title,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    breadcrumb: { "@id": `${SITE_URL}${path}#breadcrumb` },
    primaryImageOfPage: { "@id": `${SITE_URL}${path}#primaryimage` },
  };
}

export function blogBreadcrumbStructuredData(post: BlogPost) {
  const path = `/blog/${post.slug}/`;

  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${path}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
      },
    ],
  };
}

export function blogFaqPageStructuredData(post: BlogPost) {
  const faqs = parseFaqFromTags(post.tags);

  if (faqs.length === 0) {
    return null;
  }

  const path = `/blog/${post.slug}/`;

  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripMarkdownLinks(faq.answer),
      },
    })),
  };
}

export function blogPostJsonLdGraph(post: BlogPost) {
  const graph: Record<string, unknown>[] = [
    blogPostingStructuredData(post),
    blogWebPageStructuredData(post),
    blogBreadcrumbStructuredData(post),
  ];

  const faq = blogFaqPageStructuredData(post);
  if (faq) {
    graph.push(faq);
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function blogOpenGraphImageUrl(post: BlogPost): string {
  return (
    absoluteImageUrl(blogPostOgPath(post.slug)) ?? `${SITE_URL}/og-default.jpg`
  );
}

export function blogOpenGraphImageAlt(post: BlogPost): string {
  return (
    getBlogImageMeta(post.slug, "og")?.alt ?? post.coverImageAlt ?? post.title
  );
}

export { PUBLISHER_NAME };
