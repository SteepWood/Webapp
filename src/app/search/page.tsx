import type { Metadata } from "next";

import { SearchResults } from "@/components/search/SearchResults";
import { SectionShell } from "@/components/sections/section-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isValidSearchQuery, searchSite } from "@/lib/search/siteSearch";
import { canonicalUrl } from "@/lib/seo/canonical";
import { searchPageStructuredData } from "@/lib/seo/searchStructuredData";

export const revalidate = 3600;

const BASE_TITLE = "Search SteepWood — Services, Locations & Blog";
const BASE_DESCRIPTION =
  "Search SteepWood for joinery services, location pages, and workshop articles across Australia.";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = params.q?.trim();
  const hasQuery = isValidSearchQuery(query);
  const canonical = canonicalUrl("/search/");

  return {
    title: hasQuery ? `Search results for “${query}” | SteepWood` : BASE_TITLE,
    description: hasQuery
      ? `Results for “${query}” across SteepWood services, locations, and joinery blog articles.`
      : BASE_DESCRIPTION,
    alternates: {
      canonical,
      languages: {
        "en-AU": canonical,
      },
    },
    robots: hasQuery ? { index: false, follow: true } : undefined,
    openGraph: {
      title: hasQuery ? `Search results for “${query}”` : BASE_TITLE,
      description: BASE_DESCRIPTION,
      url: canonical,
      siteName: "SteepWood",
      locale: "en_AU",
      type: "website",
    },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const hasQuery = isValidSearchQuery(query);
  const results = hasQuery ? await searchSite(query) : [];
  const schemas = searchPageStructuredData();

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main>
        <SectionShell>
          <div className="max-w-3xl">
            <p className="mb-stack-sm font-mono text-caption uppercase tracking-widest text-amber-600">
              Search
            </p>
            <h1 className="mb-stack-md font-serif text-display-2 text-ink-900">
              Search SteepWood
            </h1>
            <p className="mb-stack-lg text-body-lg text-ink-800/80">
              Find joinery services, location pages, and workshop articles.
            </p>

            <form
              action="/search/"
              method="get"
              role="search"
              className="mb-stack-xl flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <label htmlFor="site-search" className="sr-only">
                Search SteepWood
              </label>
              <Input
                id="site-search"
                type="search"
                name="q"
                defaultValue={query}
                required
                minLength={2}
                autoComplete="off"
                placeholder="e.g. kitchen joinery, Sydney, wardrobes"
                className="h-11 flex-1 text-base"
              />
              <Button type="submit" size="lg" className="shrink-0">
                Search
              </Button>
            </form>
          </div>

          <SearchResults query={query} hasQuery={hasQuery} results={results} />
        </SectionShell>
      </main>
    </>
  );
}
