import { cache } from "react";

import type { BlogPost } from "@prisma/client";

import { prisma } from "@/lib/db/prisma";
import { LOCATIONS } from "@/lib/services-locations/locations";
import { SERVICES } from "@/lib/services-locations/services";
import { canonicalUrl } from "@/lib/seo/canonical";

export type SearchResultType = "service" | "location" | "blog";

export type SiteSearchResult = {
  type: SearchResultType;
  title: string;
  description: string;
  href: string;
  score: number;
};

const MAX_RESULTS = 24;
const MIN_QUERY_LENGTH = 2;

type SearchableItem = Omit<SiteSearchResult, "score">;

type ScoredSearchFields = Pick<SearchableItem, "title" | "description" | "type"> & {
  category?: string | null;
};

function normalizeQuery(query: string): string {
  return query.trim().toLowerCase();
}

function tokenize(query: string): string[] {
  return normalizeQuery(query)
    .split(/\s+/)
    .filter((term) => term.length >= 2);
}

function scoreText(text: string, terms: string[]): number {
  const haystack = text.toLowerCase();
  let score = 0;

  for (const term of terms) {
    if (haystack.includes(term)) {
      score += term.length >= 4 ? 3 : 2;
    }
  }

  return score;
}

function buildStaticIndex(): SearchableItem[] {
  const serviceResults: SearchableItem[] = SERVICES.map((service) => ({
    type: "service",
    title: service.name,
    description: service.shortDescription,
    href: canonicalUrl(`/${service.slug}/`),
  }));

  const locationResults: SearchableItem[] = LOCATIONS.map((location) => ({
    type: "location",
    title: `Custom joinery in ${location.name}`,
    description: location.metaDescription,
    href: canonicalUrl(`/locations/${location.slug}/`),
  }));

  return [...serviceResults, ...locationResults];
}

const getPublishedBlogPostsForSearch = cache(async (): Promise<BlogPost[]> => {
  try {
    return await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
});

function scoreItem(item: ScoredSearchFields, terms: string[]): number {
  let score =
    scoreText(item.title, terms) * 3 + scoreText(item.description, terms);

  if (item.type === "blog" && item.category) {
    score += scoreText(item.category, terms);
  }

  return score;
}

export function isValidSearchQuery(query: string | undefined): query is string {
  return typeof query === "string" && normalizeQuery(query).length >= MIN_QUERY_LENGTH;
}

export async function searchSite(query: string): Promise<SiteSearchResult[]> {
  const normalized = normalizeQuery(query);

  if (normalized.length < MIN_QUERY_LENGTH) {
    return [];
  }

  const terms = tokenize(normalized);

  if (terms.length === 0) {
    return [];
  }

  const staticItems = buildStaticIndex();
  const blogPosts = await getPublishedBlogPostsForSearch();

  const candidates: SiteSearchResult[] = [
    ...staticItems.map((item) => ({
      ...item,
      score: scoreItem(item, terms),
    })),
    ...blogPosts.map((post) => {
      const item: ScoredSearchFields = {
        type: "blog",
        title: post.title,
        description: post.excerpt ?? post.metaDescription ?? "",
        category: post.category,
      };

      return {
        type: "blog" as const,
        title: post.title,
        description: post.excerpt ?? post.metaDescription ?? "",
        href: canonicalUrl(`/blog/${post.slug}/`),
        score: scoreItem(item, terms),
      };
    }),
  ];

  return candidates
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, MAX_RESULTS);
}
