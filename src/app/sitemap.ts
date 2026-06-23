import type { MetadataRoute } from "next";

import { RETIRED_BLOG_SLUGS } from "@/lib/blog/launchPack";
import { prisma } from "@/lib/db/prisma";
import {
  getAllLocationSlugs,
  getAllServiceLocationPairs,
  getAllServiceSlugs,
} from "@/lib/services-locations/resolvers";
import { canonicalUrl } from "@/lib/seo/canonical";
import { fileMtime, maxMtime } from "@/lib/seo/sitemapMtime";

export const revalidate = 3600;

const SERVICE_CONTENT_MTIME = fileMtime(
  "src/lib/services-locations/serviceContent.ts",
);
const LOCATION_CONTENT_MTIME = maxMtime(
  "src/lib/services-locations/locationContent.ts",
  "src/lib/services-locations/locationHubExtensions.ts",
);
const LEGAL_MTIME = fileMtime("src/app/legal/privacy/page.tsx");

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
    lastModified: options.lastModified ?? new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
  };
}

async function getDynamicPages(): Promise<MetadataRoute.Sitemap> {
  try {
    const [blogPosts, portfolioProjects] = await Promise.all([
      prisma.blogPost.findMany({
        where: {
          isPublished: true,
          slug: { notIn: [...RETIRED_BLOG_SLUGS] },
        },
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
    sitemapEntry("/", {
      lastModified: fileMtime("src/app/page.tsx"),
      changeFrequency: "weekly",
      priority: 1.0,
    }),
    sitemapEntry("/about/", {
      lastModified: fileMtime("src/app/about/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.8,
    }),
    sitemapEntry("/contact/", {
      lastModified: fileMtime("src/app/contact/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
    sitemapEntry("/quote/", {
      lastModified: fileMtime("src/app/quote/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.9,
    }),
    sitemapEntry("/portfolio/", {
      lastModified: fileMtime("src/app/portfolio/page.tsx"),
      changeFrequency: "weekly",
      priority: 0.8,
    }),
    sitemapEntry("/blog/", {
      lastModified: fileMtime("src/app/blog/page.tsx"),
      changeFrequency: "weekly",
      priority: 0.7,
    }),
    sitemapEntry("/search/", {
      lastModified: fileMtime("src/app/search/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.4,
    }),
    sitemapEntry("/locations/", {
      lastModified: fileMtime("src/app/locations/page.tsx"),
      changeFrequency: "weekly",
      priority: 0.8,
    }),
    sitemapEntry("/legal/privacy/", {
      lastModified: LEGAL_MTIME,
      changeFrequency: "yearly",
      priority: 0.3,
    }),
    sitemapEntry("/legal/terms/", {
      lastModified: fileMtime("src/app/legal/terms/page.tsx"),
      changeFrequency: "yearly",
      priority: 0.3,
    }),
    sitemapEntry("/legal/consumer-rights/", {
      lastModified: fileMtime("src/app/legal/consumer-rights/page.tsx"),
      changeFrequency: "yearly",
      priority: 0.3,
    }),
  ];

  const servicePages: MetadataRoute.Sitemap = getAllServiceSlugs().map((slug) =>
    sitemapEntry(`/${slug}/`, {
      lastModified: SERVICE_CONTENT_MTIME,
      changeFrequency: "weekly",
      priority: 0.9,
    }),
  );

  const locationHubPages: MetadataRoute.Sitemap = getAllLocationSlugs().map(
    (slug) =>
      sitemapEntry(`/locations/${slug}/`, {
        lastModified: LOCATION_CONTENT_MTIME,
        changeFrequency: "weekly",
        priority: 0.8,
      }),
  );

  const serviceLocationPages: MetadataRoute.Sitemap =
    getAllServiceLocationPairs().map(({ service, location }) =>
      sitemapEntry(`/${service}/${location}/`, {
        lastModified: LOCATION_CONTENT_MTIME,
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
