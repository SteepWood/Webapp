import Link from "@/components/ui/link";
import type { SiteSearchResult } from "@/lib/search/siteSearch";

const TYPE_LABELS: Record<SiteSearchResult["type"], string> = {
  service: "Service",
  location: "Location",
  blog: "Blog article",
};

type SearchResultsProps = {
  query: string;
  hasQuery: boolean;
  results: SiteSearchResult[];
};

export function SearchResults({ query, hasQuery, results }: SearchResultsProps) {
  if (!hasQuery) {
    return (
      <p className="text-body text-ink-800/70">
        Enter at least two characters to search services, location pages, and blog
        articles.
      </p>
    );
  }

  if (results.length === 0) {
    return (
      <div className="space-y-4">
        <p className="font-serif text-h3 text-ink-900">
          No results for &ldquo;{query}&rdquo;
        </p>
        <p className="text-body text-ink-800/70">
          Try a service name such as &ldquo;kitchen&rdquo;, a city such as
          &ldquo;Sydney&rdquo;, or a topic from our{" "}
          <Link href="/blog/" className="font-medium text-amber-700 underline-offset-2 hover:underline">
            blog
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-stack-md text-body-sm text-ink-800/70">
        {results.length} result{results.length === 1 ? "" : "s"} for &ldquo;{query}
        &rdquo;
      </p>
      <ul className="divide-y divide-ink-700/10 border-y border-ink-700/10">
        {results.map((result) => (
          <li key={result.href} className="py-stack-md first:pt-0 last:pb-0">
            <article>
              <p className="mb-1 text-caption font-medium uppercase tracking-wide text-amber-600">
                {TYPE_LABELS[result.type]}
              </p>
              <h2 className="mb-2 font-serif text-h4 text-ink-900">
                <Link
                  href={result.href}
                  className="underline-offset-2 hover:text-amber-800 hover:underline"
                >
                  {result.title}
                </Link>
              </h2>
              {result.description ? (
                <p className="max-w-3xl text-body-sm leading-relaxed text-ink-800/80">
                  {result.description}
                </p>
              ) : null}
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
