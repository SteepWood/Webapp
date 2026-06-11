"use client";

import { useEffect } from "react";

import { trackProjectView } from "@/lib/analytics/events";

type ProjectViewTrackerProps = {
  slug: string;
  category?: string;
};

export function ProjectViewTracker({ slug, category }: ProjectViewTrackerProps) {
  useEffect(() => {
    trackProjectView({ slug, category });
  }, [slug, category]);

  return null;
}
