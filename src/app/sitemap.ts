import type { MetadataRoute } from "next";

import {
  blogPublishedCutoff,
  RETIRED_BLOG_SLUGS,
} from "@/lib/blog/launchPackShared";
import { prisma } from "@/lib/db/prisma";
import {
  getAllLocationSlugs,
  getAllServiceLocationPairs,
  getAllServiceSlugs,
} from "@/lib/services-locations/resolvers";
import { canonicalUrl } from "@/lib/seo/canonical";
import {
  contentLastmod,
  latestContentDate,
  sydneyDate,
} from "@/lib/seo/sitemapMtime";

export const revalidate = 3600;

const SERVICE_LASTMOD = contentLastmod(
  "src/lib/services-locations/serviceContent.ts",
  "src/lib/services-locations/services.ts",
  "src/components/pages/ServicePillarPage.tsx",
);
const LOCATION_LASTMOD = contentLastmod(
  "src/lib/services-locations/locationContent.ts",
  "src/lib/services-locations/locationHubExtensions.ts",
  "src/lib/services-locations/locations.ts",
  "src/components/pages/LocationHubPage.tsx",
);
const COMBO_LASTMOD = contentLastmod(
  "src/lib/services-locations/comboContent.ts",
  "src/lib/services-locations/serviceContent.ts",
  "src/lib/services-locations/locationContent.ts",
  "src/components/pages/ServiceLocationPage.tsx",
);

function blogLastmod(updatedAt: Date, publishedAt: Date | null): string {
  const modified =
    updatedAt.getTime() >= (publishedAt?.getTime() ?? 0)
      ? updatedAt
      : (publishedAt ?? updatedAt);
  return sydneyDate(modified);
}

function sitemapEntry(
  path: string,
  options: {
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
    lastModified: string;
  },
): MetadataRoute.Sitemap[number] {
  return {
    url: canonicalUrl(path),
    lastModified: options.lastModified,
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
          OR: [
            { publishedAt: null },
            { publishedAt: { lte: blogPublishedCutoff() } },
          ],
        },
        select: { slug: true, updatedAt: true, publishedAt: true },
      }),
      prisma.portfolioProject.findMany({
        where: { isPublished: true },
        select: { slug: true, updatedAt: true },
      }),
    ]);

    return [
      ...blogPosts.map((post) =>
        sitemapEntry(`/blog/${post.slug}/`, {
          lastModified: blogLastmod(post.updatedAt, post.publishedAt),
          changeFrequency: "monthly",
          priority: 0.6,
        }),
      ),
      ...portfolioProjects.map((project) =>
        sitemapEntry(`/portfolio/${project.slug}/`, {
          lastModified: sydneyDate(project.updatedAt),
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
  const dynamicPages = await getDynamicPages();
  const blogPostDates = dynamicPages
    .filter((entry) => entry.url.includes("/blog/"))
    .map((entry) =>
      typeof entry.lastModified === "string" ? entry.lastModified : "",
    );
  const portfolioDates = dynamicPages
    .filter(
      (entry) =>
        entry.url.includes("/portfolio/") &&
        entry.url !== canonicalUrl("/portfolio/"),
    )
    .map((entry) =>
      typeof entry.lastModified === "string" ? entry.lastModified : "",
    );

  const staticPages: MetadataRoute.Sitemap = [
    sitemapEntry("/", {
      lastModified: contentLastmod("src/app/page.tsx"),
      changeFrequency: "weekly",
      priority: 1.0,
    }),
    sitemapEntry("/about/", {
      lastModified: contentLastmod("src/app/about/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.8,
    }),
    sitemapEntry("/contact/", {
      lastModified: contentLastmod("src/app/contact/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
    sitemapEntry("/quote/", {
      lastModified: contentLastmod("src/app/quote/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.9,
    }),
    sitemapEntry("/portfolio/", {
      lastModified: latestContentDate([
        contentLastmod("src/app/portfolio/page.tsx"),
        ...portfolioDates,
      ]),
      changeFrequency: "weekly",
      priority: 0.8,
    }),
    sitemapEntry("/blog/", {
      lastModified: latestContentDate([
        contentLastmod("src/app/blog/page.tsx"),
        ...blogPostDates,
      ]),
      changeFrequency: "weekly",
      priority: 0.7,
    }),
    sitemapEntry("/search/", {
      lastModified: contentLastmod("src/app/search/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.4,
    }),
    sitemapEntry("/locations/", {
      lastModified: contentLastmod("src/app/locations/page.tsx"),
      changeFrequency: "weekly",
      priority: 0.8,
    }),
    sitemapEntry("/legal/privacy/", {
      lastModified: contentLastmod("src/app/legal/privacy/page.tsx"),
      changeFrequency: "yearly",
      priority: 0.3,
    }),
    sitemapEntry("/legal/terms/", {
      lastModified: contentLastmod("src/app/legal/terms/page.tsx"),
      changeFrequency: "yearly",
      priority: 0.3,
    }),
    sitemapEntry("/legal/consumer-rights/", {
      lastModified: contentLastmod("src/app/legal/consumer-rights/page.tsx"),
      changeFrequency: "yearly",
      priority: 0.3,
    }),
  ];

  const servicePages: MetadataRoute.Sitemap = getAllServiceSlugs().map((slug) =>
    sitemapEntry(`/${slug}/`, {
      lastModified: SERVICE_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.9,
    }),
  );

  const locationHubPages: MetadataRoute.Sitemap = getAllLocationSlugs().map(
    (slug) =>
      sitemapEntry(`/locations/${slug}/`, {
        lastModified: LOCATION_LASTMOD,
        changeFrequency: "weekly",
        priority: 0.8,
      }),
  );

  const serviceLocationPages: MetadataRoute.Sitemap =
    getAllServiceLocationPairs().map(({ service, location }) =>
      sitemapEntry(`/${service}/${location}/`, {
        lastModified: COMBO_LASTMOD,
        changeFrequency: "weekly",
        priority: 0.85,
      }),
    );

  return [
    ...staticPages,
    ...servicePages,
    ...locationHubPages,
    ...serviceLocationPages,
    ...dynamicPages,
  ];
}
