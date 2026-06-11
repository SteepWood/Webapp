import type { Metadata } from "next";
import { Suspense } from "react";

import { ProjectFilter } from "@/components/portfolio/ProjectFilter";
import { ProjectGrid } from "@/components/portfolio/ProjectGrid";
import { ProjectLoadMore } from "@/components/portfolio/ProjectLoadMore";
import { SectionShell } from "@/components/sections/section-shell";
import { getFilteredPortfolioProjects } from "@/lib/db/portfolio";
import { canonicalUrl } from "@/lib/seo/canonical";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Our Projects — Custom Joinery Portfolio | SteepWood",
  description:
    "Explore SteepWood's custom joinery portfolio — kitchens, wardrobes, vanities, and commercial fitouts crafted in Newcastle and delivered across Australia.",
  alternates: {
    canonical: canonicalUrl("/portfolio/"),
    languages: {
      "en-AU": canonicalUrl("/portfolio/"),
    },
  },
  openGraph: {
    title: "Our Projects — Custom Joinery Portfolio | SteepWood",
    description:
      "Explore SteepWood's custom joinery portfolio — kitchens, wardrobes, vanities, and commercial fitouts crafted in Newcastle and delivered across Australia.",
    url: canonicalUrl("/portfolio/"),
    siteName: "SteepWood",
    locale: "en_AU",
    type: "website",
  },
};

type PortfolioPageProps = {
  searchParams: Promise<{
    category?: string;
    location?: string;
    year?: string;
    page?: string;
  }>;
};

export default async function PortfolioPage({
  searchParams,
}: PortfolioPageProps) {
  const params = await searchParams;
  const page = Number(params.page ?? "1");
  const result = await getFilteredPortfolioProjects({
    category: params.category,
    location: params.location,
    year: params.year,
    page: Number.isNaN(page) ? 1 : page,
  });

  return (
    <SectionShell>
      <header className="mb-stack-lg max-w-3xl">
        <p className="mb-stack-sm font-mono text-caption uppercase tracking-widest text-amber-600">
          Portfolio
        </p>
        <h1 className="mb-stack-sm font-serif text-display-2 text-ink-900">
          Selected works
        </h1>
        <p className="text-body-lg text-ink-800/80">
          Custom joinery crafted in our Newcastle workshop — from kitchens and
          wardrobes to commercial fitouts across Australia.
        </p>
      </header>

      <Suspense
        fallback={
          <div
            className="mb-stack-lg h-24 animate-pulse rounded-lg bg-ink-700/10"
            aria-hidden
          />
        }
      >
        <ProjectFilter />
      </Suspense>

      <p className="mb-stack-md text-body-sm text-ink-800/70">
        Showing {result.projects.length} of {result.total} projects
      </p>

      <ProjectGrid projects={result.projects} />

      <Suspense fallback={null}>
        <ProjectLoadMore hasMore={result.hasMore} page={result.page} />
      </Suspense>
    </SectionShell>
  );
}
