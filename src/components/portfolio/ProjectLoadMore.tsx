"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

type ProjectLoadMoreProps = {
  hasMore: boolean;
  page: number;
};

export function ProjectLoadMore({ hasMore, page }: ProjectLoadMoreProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!hasMore) {
    return null;
  }

  function loadMore() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page + 1));
    router.push(`/portfolio/?${params.toString()}`);
  }

  return (
    <div className="mt-stack-lg flex justify-center">
      <Button type="button" size="lg" variant="outline" onClick={loadMore}>
        Load more projects
      </Button>
    </div>
  );
}
