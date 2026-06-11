"use client";

import { useEffect } from "react";

import { trackBlogReadDepth } from "@/lib/analytics/events";

type BlogReadDepthTrackerProps = {
  slug: string;
  targetId?: string;
};

const DEPTH_THRESHOLDS = [25, 50, 75, 100] as const;

export function BlogReadDepthTracker({
  slug,
  targetId = "blog-article-body",
}: BlogReadDepthTrackerProps) {
  useEffect(() => {
    const element = document.getElementById(targetId);

    if (!element) {
      return;
    }

    const fired = new Set<number>();

    function updateDepth() {
      const rect = element!.getBoundingClientRect();
      const viewportBottom = window.innerHeight;
      const readPixels = Math.min(
        rect.height,
        Math.max(0, viewportBottom - rect.top),
      );
      const progress = Math.round((readPixels / rect.height) * 100);

      for (const threshold of DEPTH_THRESHOLDS) {
        if (progress >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          trackBlogReadDepth({ slug, depth: threshold });
        }
      }
    }

    updateDepth();
    window.addEventListener("scroll", updateDepth, { passive: true });
    window.addEventListener("resize", updateDepth);

    return () => {
      window.removeEventListener("scroll", updateDepth);
      window.removeEventListener("resize", updateDepth);
    };
  }, [slug, targetId]);

  return null;
}
