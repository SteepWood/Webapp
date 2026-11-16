import { cache } from "react";

import type { BlogPost } from "@prisma/client";

import {
  BATCH4_BLOG_SLUGS,
  blogPublishedCutoff,
  parseDisplayTags,
} from "@/lib/blog/launchPackShared";
import { prisma } from "@/lib/db/prisma";

export const BLOG_PAGE_SIZE = 12;
const RELATED_TAG_PREFIX = "related:";

function parsePostTags(tags: unknown): string[] {
  return Array.isArray(tags) ? (tags as string[]) : [];
}

function extractRelatedSlugs(tags: unknown): string[] {
  return parsePostTags(tags)
    .filter((tag) => tag.startsWith(RELATED_TAG_PREFIX))
    .map((tag) => tag.slice(RELATED_TAG_PREFIX.length))
    .filter(Boolean);
}

function extractDisplayTags(tags: unknown): string[] {
  return parseDisplayTags(tags);
}

const BATCH4_SLUG_SET = new Set<string>(BATCH4_BLOG_SLUGS);

/** Surface one Batch 4 guide on earlier posts in the same category. */
async function prependSameCategoryBatch4Post(
  post: BlogPost,
  ordered: BlogPost[],
): Promise<BlogPost[]> {
  if (BATCH4_SLUG_SET.has(post.slug) || !post.category) {
    return ordered;
  }

  if (ordered.some((entry) => BATCH4_SLUG_SET.has(entry.slug))) {
    return ordered;
  }

  const batch4Related = await prisma.blogPost.findFirst({
    where: {
      ...publishedWhere(),
      category: post.category,
      slug: { in: [...BATCH4_BLOG_SLUGS] },
    },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });

  if (!batch4Related || batch4Related.slug === post.slug) {
    return ordered;
  }

  return [batch4Related, ...ordered];
}

export type BlogListFilters = {
  category?: string;
  tag?: string;
  page?: number;
};

export type BlogListResult = {
  featured: BlogPost | null;
  posts: BlogPost[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

function applyBlogFilters(posts: BlogPost[], filters: BlogListFilters): BlogPost[] {
  return posts.filter((post) => {
    if (filters.category && post.category !== filters.category) {
      return false;
    }

    if (filters.tag) {
      if (!extractDisplayTags(post.tags).includes(filters.tag)) {
        return false;
      }
    }

    return true;
  });
}

function publishedWhere(now = new Date()) {
  return {
    isPublished: true as const,
    OR: [
      { publishedAt: null },
      { publishedAt: { lte: blogPublishedCutoff(now) } },
    ],
  };
}

export const getPublishedBlogSlugs = cache(async (): Promise<string[]> => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: publishedWhere(),
      select: { slug: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    });

    return posts.map((post) => post.slug);
  } catch {
    return [];
  }
});

export const getBlogPostBySlug = cache(
  async (slug: string): Promise<BlogPost | null> => {
    // Rethrow database errors. Returning null makes the page call notFound(),
    // and a transient pooler failure then gets cached as a 404.
    return prisma.blogPost.findFirst({
      where: { slug, ...publishedWhere() },
    });
  },
);

export const getBlogIndexData = cache(
  async (filters: BlogListFilters): Promise<BlogListResult> => {
    const page = Math.max(1, filters.page ?? 1);

    try {
      const allPosts = await prisma.blogPost.findMany({
        where: publishedWhere(),
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      });

      const filtered = applyBlogFilters(allPosts, filters);
      const featured =
        page === 1 && !filters.category && !filters.tag
          ? (filtered[0] ?? null)
          : null;
      const listPosts =
        featured && page === 1 ? filtered.slice(1) : filtered;
      const total = listPosts.length;
      const totalPages = Math.max(1, Math.ceil(total / BLOG_PAGE_SIZE));
      const offset = (page - 1) * BLOG_PAGE_SIZE;

      return {
        featured,
        posts: listPosts.slice(offset, offset + BLOG_PAGE_SIZE),
        total,
        page,
        pageSize: BLOG_PAGE_SIZE,
        totalPages,
      };
    } catch {
      return {
        featured: null,
        posts: [],
        total: 0,
        page,
        pageSize: BLOG_PAGE_SIZE,
        totalPages: 1,
      };
    }
  },
);

export const getBlogCategories = cache(async (): Promise<string[]> => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { ...publishedWhere(), category: { not: null } },
      select: { category: true },
    });

    return [
      ...new Set(
        posts
          .map((post) => post.category)
          .filter((category): category is string => Boolean(category)),
      ),
    ].sort();
  } catch {
    return [];
  }
});

export const getPopularBlogTags = cache(async (limit = 8): Promise<string[]> => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: publishedWhere(),
      select: { tags: true },
    });

    const counts = new Map<string, number>();

    for (const post of posts) {
      for (const tag of extractDisplayTags(post.tags)) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }

    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([tag]) => tag);
  } catch {
    return [];
  }
});

export const getRelatedBlogPosts = cache(
  async (post: BlogPost, limit = 3): Promise<BlogPost[]> => {
    const relatedSlugs = extractRelatedSlugs(post.tags);

    try {
      if (relatedSlugs.length > 0) {
        const related = await prisma.blogPost.findMany({
          where: {
            ...publishedWhere(),
            slug: { in: relatedSlugs },
          },
        });

        const ordered = relatedSlugs
          .map((slug) => related.find((entry) => entry.slug === slug))
          .filter((entry): entry is BlogPost => Boolean(entry));

        const withBatch4 = await prependSameCategoryBatch4Post(post, ordered);
        if (withBatch4.length > 0) {
          return withBatch4.slice(0, limit);
        }
      }

      if (!post.category) {
        return [];
      }

      return await prisma.blogPost.findMany({
        where: {
          ...publishedWhere(),
          category: post.category,
          slug: { not: post.slug },
        },
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        take: limit,
      });
    } catch {
      return [];
    }
  },
);
