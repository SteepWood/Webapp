import type { Metadata } from "next";
import { Suspense } from "react";

import { BlogGrid } from "@/components/blog/BlogGrid";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { SectionShell } from "@/components/sections/section-shell";
import {
  getBlogCategories,
  getBlogIndexData,
  getPopularBlogTags,
} from "@/lib/db/blog";
import { canonicalUrl } from "@/lib/seo/canonical";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog — Joinery Insights & Design Tips | SteepWood",
  description:
    "Practical joinery advice, kitchen design tips, and Australian home trends from the SteepWood workshop in Newcastle.",
  alternates: {
    canonical: canonicalUrl("/blog/"),
    languages: {
      "en-AU": canonicalUrl("/blog/"),
    },
  },
  openGraph: {
    title: "Blog — Joinery Insights & Design Tips | SteepWood",
    description:
      "Practical joinery advice, kitchen design tips, and Australian home trends from the SteepWood workshop in Newcastle.",
    url: canonicalUrl("/blog/"),
    siteName: "SteepWood",
    locale: "en_AU",
    type: "website",
  },
};

type BlogPageProps = {
  searchParams: Promise<{
    category?: string;
    tag?: string;
    page?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = Number(params.page ?? "1");
  const [indexData, categories, tags] = await Promise.all([
    getBlogIndexData({
      category: params.category,
      tag: params.tag,
      page: Number.isNaN(page) ? 1 : page,
    }),
    getBlogCategories(),
    getPopularBlogTags(),
  ]);

  return (
    <SectionShell>
      <header className="mb-stack-lg max-w-3xl">
        <p className="mb-stack-sm font-mono text-caption uppercase tracking-widest text-amber-600">
          Blog
        </p>
        <h1 className="mb-stack-sm font-serif text-display-2 text-ink-900">
          Insights from the workshop
        </h1>
        <p className="text-body-lg text-ink-800/80">
          Design guidance, material choices, and lessons from two decades of
          custom joinery across Australia.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <BlogGrid posts={indexData.posts} featured={indexData.featured} />
          <BlogPagination
            page={indexData.page}
            totalPages={indexData.totalPages}
            searchParams={params}
          />
        </div>

        <Suspense
          fallback={
            <div
              className="h-64 animate-pulse rounded-lg bg-ink-700/10"
              aria-hidden
            />
          }
        >
          <BlogSidebar categories={categories} tags={tags} />
        </Suspense>
      </div>
    </SectionShell>
  );
}
