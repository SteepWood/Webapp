import { cache } from "react";

import type { BlogPost } from "@prisma/client";

import { prisma } from "@/lib/db/prisma";

export const BLOG_PAGE_SIZE = 12;

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
      const tags = Array.isArray(post.tags) ? (post.tags as string[]) : [];

      if (!tags.includes(filters.tag)) {
        return false;
      }
    }

    return true;
  });
}

export const getPublishedBlogSlugs = cache(async (): Promise<string[]> => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
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
    try {
      return await prisma.blogPost.findFirst({
        where: { slug, isPublished: true },
      });
    } catch {
      return null;
    }
  },
);

export const getBlogIndexData = cache(
  async (filters: BlogListFilters): Promise<BlogListResult> => {
    const page = Math.max(1, filters.page ?? 1);

    try {
      const allPosts = await prisma.blogPost.findMany({
        where: { isPublished: true },
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      });

      const filtered = applyBlogFilters(allPosts, filters);
      const featured = page === 1 && !filters.category && !filters.tag
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
      where: { isPublished: true, category: { not: null } },
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
      where: { isPublished: true },
      select: { tags: true },
    });

    const counts = new Map<string, number>();

    for (const post of posts) {
      const tags = Array.isArray(post.tags) ? (post.tags as string[]) : [];

      for (const tag of tags) {
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
    if (!post.category) {
      return [];
    }

    try {
      return await prisma.blogPost.findMany({
        where: {
          isPublished: true,
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
