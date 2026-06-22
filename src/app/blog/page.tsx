import type { Metadata } from "next";
import { Suspense } from "react";

import { BlogGrid } from "@/components/blog/BlogGrid";
import { BlogTopicOverview } from "@/components/blog/BlogTopicOverview";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionShell } from "@/components/sections/section-shell";
import { MediaFrame } from "@/components/ui/media-frame";
import {
  getBlogCategories,
  getBlogIndexData,
  getPopularBlogTags,
} from "@/lib/db/blog";
import { BLOG_INDEX_HERO_IMAGE } from "@/lib/images";
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
    <>
      <SectionShell className="pb-0">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_min(42%,520px)] lg:gap-16">
          <ScrollReveal className="min-w-0">
            <p className="mb-stack-sm font-mono text-caption uppercase tracking-widest text-amber-600">
              Blog
            </p>
            <h1 className="mb-stack-sm font-serif text-display-2 text-ink-900">
              Insights from the workshop
            </h1>
            <p className="max-w-2xl text-body-lg text-ink-800/80">
              Design guidance, material choices, and lessons from two decades of
              custom joinery across Australia.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <MediaFrame
              src={BLOG_INDEX_HERO_IMAGE}
              alt="SteepWood joinery designer reviewing plans and material samples at the Newcastle workshop bench"
              sizes="(max-width: 1024px) 100vw, 520px"
            />
          </ScrollReveal>
        </div>
      </SectionShell>

      <SectionShell className="border-t border-ink-700/10 pt-0">
        <div className="prose-steepwood max-w-3xl text-body leading-relaxed text-ink-800">
          <h2 className="mb-stack-md font-serif text-h2 text-ink-900">
            Practical joinery guidance from our workshop
          </h2>
          <p>
            Our articles cover costing, materials, and project planning for
            Australian homeowners and trade partners. You will find NSW-focused
            price guides, comparisons between flat-pack and custom cabinetry,
            wardrobe planning advice, and checklists for choosing a joiner.
          </p>
          <p>
            Posts are written by our Newcastle design and production team and
            updated as regulations, material availability, and market conditions
            change. Use the category and tag filters to narrow topics, or browse
            the full archive below.
          </p>
          <p>
            Recent topics include NSW kitchen costing guides, comparisons between
            flat-pack and custom cabinetry, wardrobe planning for Australian
            homes, engineered stone regulations, and questions to ask before
        appointing a joiner. Each article links to relevant services and
        portfolio examples where applicable. Start with our launch articles on
        kitchen costs, benchtop regulations, and wardrobe planning if you are
        new to custom joinery.
          </p>
          <p>
            New posts are added as we document common client questions from
            consultations across Newcastle, Sydney, Canberra, and interstate
            cities. Subscribe via the sidebar if you would like occasional
            workshop updates — we do not share your email with third parties.
          </p>
          <p>
            Looking for a fixed-price quote instead of reading first? Start on
            our quote page with room dimensions and photos; most enquiries receive
            a response within one business day.
          </p>
        </div>
      </SectionShell>

      <BlogTopicOverview />

      <SectionShell>
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-start">
          <div className="min-w-0">
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
    </>
  );
}
