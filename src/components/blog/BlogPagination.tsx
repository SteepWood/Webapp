import Link from "@/components/ui/link";

import { Button } from "@/components/ui/button";

type BlogPaginationProps = {
  page: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
};

function buildPageHref(
  page: number,
  searchParams: Record<string, string | undefined>,
): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (value && key !== "page") {
      params.set(key, value);
    }
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();
  return query ? `/blog/?${query}` : "/blog/";
}

export function BlogPagination({
  page,
  totalPages,
  searchParams,
}: BlogPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-stack-lg flex items-center justify-between gap-4">
      {page > 1 ? (
        <Button asChild variant="outline">
          <Link href={buildPageHref(page - 1, searchParams)}>Previous</Link>
        </Button>
      ) : (
        <span />
      )}
      <p className="text-body-sm text-ink-800/70">
        Page {page} of {totalPages}
      </p>
      {page < totalPages ? (
        <Button asChild variant="outline">
          <Link href={buildPageHref(page + 1, searchParams)}>Next</Link>
        </Button>
      ) : (
        <span />
      )}
    </div>
  );
}
