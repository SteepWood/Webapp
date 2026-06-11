"use client";

import { motion, useReducedMotion } from "motion/react";

import Link from "@/components/ui/link";
import type { HomepageLocation } from "@/lib/db/homepage-page";
import { hoverSpring } from "@/lib/motion/presets";

export function LocationTeaserGrid({
  locations,
}: {
  locations: HomepageLocation[];
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <ul className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
      {locations.map((location) => (
        <li key={location.slug}>
          <motion.div
            whileHover={
              shouldReduceMotion ? undefined : { y: -2, transition: hoverSpring }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
            style={{ viewTransitionName: `location-${location.slug}` }}
          >
            <Link
              href={`/locations/${location.slug}/`}
              className="block rounded-md border border-ink-700/10 bg-ink-50 px-4 py-3 text-sm font-medium text-ink-900 transition-colors hover:border-amber-500/40 hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              {location.name}
            </Link>
          </motion.div>
        </li>
      ))}
    </ul>
  );
}
