"use client";

import Link from "@/components/ui/link";

import {
  ScrollRevealItem,
  ScrollRevealStagger,
} from "@/components/motion/ScrollReveal";
import type { HomepageLocation } from "@/lib/db/homepage-page";

export function LocationTeaserGrid({
  locations,
}: {
  locations: HomepageLocation[];
}) {
  return (
    <ScrollRevealStagger
      as="ul"
      className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
    >
      {locations.map((location) => (
        <ScrollRevealItem key={location.slug} as="li">
          <Link
            href={`/locations/${location.slug}/`}
            className="surface-card block h-full rounded-lg px-4 py-3 text-sm font-medium text-ink-900 transition-colors hover:border-amber-500/40 hover:text-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            style={{ viewTransitionName: `location-${location.slug}` }}
          >
            {location.name}
          </Link>
        </ScrollRevealItem>
      ))}
    </ScrollRevealStagger>
  );
}
