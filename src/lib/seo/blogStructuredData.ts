import type { BlogPost } from "@prisma/client";

import { BLOG_DEFAULT_AUTHOR } from "@/lib/business";
import { env } from "@/env";
import { calculateReadingTime } from "@/lib/blog/readingTime";

const SITE_URL = env.NEXT_PUBLIC_SITE_URL;
const PUBLISHER_NAME = "SteepWood";

function absoluteImageUrl(url: string | null | undefined): string | undefined {
  if (!url) {
    return undefined;
  }

  return url.startsWith("http") ? url : `${SITE_URL.replace(/\/$/, "")}${url}`;
}

export function blogPostingStructuredData(post: BlogPost) {
  const path = `/blog/${post.slug}/`;
  const publishedAt = post.publishedAt ?? post.createdAt;
  const articleBody = post.content ?? post.excerpt ?? "";

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? post.metaDescription ?? undefined,
    image: absoluteImageUrl(post.coverImageUrl),
    datePublished: publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: post.authorName ?? BLOG_DEFAULT_AUTHOR,
    },
    publisher: {
      "@type": "Organization",
      name: PUBLISHER_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL.replace(/\/$/, "")}/brand/steepwood-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL.replace(/\/$/, "")}${path}`,
    },
    articleBody,
    wordCount: articleBody.split(/\s+/).filter(Boolean).length,
    timeRequired: `PT${calculateReadingTime(articleBody)}M`,
    url: `${SITE_URL.replace(/\/$/, "")}${path}`,
  };
}

export function blogBreadcrumbStructuredData(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
        item: `${SITE_URL}/blog/${post.slug}/`,
      },
    ],
  };
}
