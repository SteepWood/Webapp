import type { MetadataRoute } from "next";

import { prisma } from "@/lib/db/prisma";
import {
  getAllLocationSlugs,
  getAllServiceLocationPairs,
  getAllServiceSlugs,
} from "@/lib/services-locations/resolvers";
import { canonicalUrl } from "@/lib/seo/canonical";

export const revalidate = 3600;

const now = () => new Date();

function sitemapEntry(
  path: string,
  options: {
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
    lastModified?: Date;
  },
): MetadataRoute.Sitemap[number] {
  return {
    url: canonicalUrl(path),
    lastModified: options.lastModified ?? now(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
  };
}

async function getDynamicPages(): Promise<MetadataRoute.Sitemap> {
  try {
    const [blogPosts, portfolioProjects] = await Promise.all([
      prisma.blogPost.findMany({
        where: { isPublished: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.portfolioProject.findMany({
        where: { isPublished: true },
        select: { slug: true, updatedAt: true },
      }),
    ]);

    return [
      ...blogPosts.map((post) =>
        sitemapEntry(`/blog/${post.slug}/`, {
          lastModified: post.updatedAt,
          changeFrequency: "monthly",
          priority: 0.6,
        }),
      ),
      ...portfolioProjects.map((project) =>
        sitemapEntry(`/portfolio/${project.slug}/`, {
          lastModified: project.updatedAt,
          changeFrequency: "monthly",
          priority: 0.7,
        }),
      ),
    ];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    sitemapEntry("/", { changeFrequency: "weekly", priority: 1.0 }),
    sitemapEntry("/about/", { changeFrequency: "monthly", priority: 0.8 }),
    sitemapEntry("/contact/", { changeFrequency: "monthly", priority: 0.7 }),
    sitemapEntry("/quote/", { changeFrequency: "monthly", priority: 0.9 }),
    sitemapEntry("/portfolio/", { changeFrequency: "weekly", priority: 0.8 }),
    sitemapEntry("/blog/", { changeFrequency: "weekly", priority: 0.7 }),
    sitemapEntry("/locations/", { changeFrequency: "weekly", priority: 0.8 }),
    sitemapEntry("/legal/privacy/", {
      changeFrequency: "yearly",
      priority: 0.3,
    }),
    sitemapEntry("/legal/terms/", { changeFrequency: "yearly", priority: 0.3 }),
    sitemapEntry("/legal/consumer-rights/", {
      changeFrequency: "yearly",
      priority: 0.3,
    }),
  ];

  const servicePages: MetadataRoute.Sitemap = getAllServiceSlugs().map((slug) =>
    sitemapEntry(`/${slug}/`, {
      changeFrequency: "weekly",
      priority: 0.9,
    }),
  );

  const locationHubPages: MetadataRoute.Sitemap = getAllLocationSlugs().map(
    (slug) =>
      sitemapEntry(`/locations/${slug}/`, {
        changeFrequency: "weekly",
        priority: 0.8,
      }),
  );

  const serviceLocationPages: MetadataRoute.Sitemap =
    getAllServiceLocationPairs().map(({ service, location }) =>
      sitemapEntry(`/${service}/${location}/`, {
        changeFrequency: "weekly",
        priority: 0.85,
      }),
    );

  const dynamicPages = await getDynamicPages();

  return [
    ...staticPages,
    ...servicePages,
    ...locationHubPages,
    ...serviceLocationPages,
    ...dynamicPages,
  ];
}
