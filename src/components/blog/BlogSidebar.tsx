"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { NewsletterSignupForm } from "@/components/forms/NewsletterSignupForm";
import { cn } from "@/lib/utils";

type BlogSidebarProps = {
  categories: string[];
  tags: string[];
};

export function BlogSidebar({ categories, tags }: BlogSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");
  const activeTag = searchParams.get("tag");

  function updateFilter(key: "category" | "tag", value: string) {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.get(key);

    if (current === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.delete("page");

    const query = params.toString();
    router.push(query ? `/blog/?${query}` : "/blog/");
  }

  return (
    <aside className="space-y-8">
      {categories.length > 0 ? (
        <section className="rounded-lg border border-ink-700/10 bg-ink-50 p-5">
          <h2 className="mb-4 font-serif text-h4 text-ink-900">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => updateFilter("category", category)}
                  className={cn(
                    "text-left text-body-sm transition-colors hover:text-amber-600",
                    activeCategory === category
                      ? "font-semibold text-amber-600"
                      : "text-ink-800/80",
                  )}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {tags.length > 0 ? (
        <section className="rounded-lg border border-ink-700/10 bg-ink-50 p-5">
          <h2 className="mb-4 font-serif text-h4 text-ink-900">Popular tags</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => updateFilter("tag", tag)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  activeTag === tag
                    ? "border-amber-500 bg-amber-100/70 text-amber-800"
                    : "border-ink-700/15 bg-white text-ink-800/80 hover:border-amber-400/60",
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>
      ) : null}

      <section className="rounded-lg border border-ink-700/10 bg-ink-900 p-5 text-ink-50">
        <h2 className="mb-2 font-serif text-h4">Workshop insights</h2>
        <p className="mb-4 text-body-sm text-ink-100/80">
          Occasional design inspiration and project stories from the SteepWood
          team. No spam — unsubscribe any time.
        </p>
        <NewsletterSignupForm
          inputId="blog-newsletter-email"
          layout="stacked"
          placeholder="you@example.com"
          inputClassName="border-ink-700/30 bg-ink-800 text-ink-50 placeholder:text-ink-100/50"
          messageClassName="text-amber-300"
        />
      </section>
    </aside>
  );
}
