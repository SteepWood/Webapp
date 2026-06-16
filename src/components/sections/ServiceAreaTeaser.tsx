"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { LocationTeaserGrid } from "@/components/sections/LocationTeaserGrid";
import { SectionShell } from "@/components/sections/section-shell";
import type { HomepageLocation } from "@/lib/db/homepage-page";

export function ServiceAreaTeaser({
  locations,
}: {
  locations: HomepageLocation[];
}) {
  return (
    <SectionShell className="surface-section relative overflow-hidden">
      <svg
        viewBox="0 0 200 120"
        aria-hidden
        className="pointer-events-none absolute top-8 right-0 w-64 opacity-[0.07] lg:w-96"
      >
        <path
          d="M30 80 C45 40, 70 20, 95 25 C115 30, 130 15, 155 30 C170 40, 185 55, 175 75 C165 95, 140 100, 120 90 C95 78, 70 95, 50 88 C38 84, 28 88, 30 80 Z"
          fill="currentColor"
          className="text-ink-900"
        />
      </svg>

      <ScrollReveal className="relative max-w-3xl">
        <h2 className="mb-stack-sm font-serif text-h2 text-ink-900">
          Crafted in Newcastle. Delivered Australia-wide.
        </h2>
        <p className="mb-stack-lg text-body-lg text-ink-800">
          We service 16 Australian cities and regions. From our Newcastle
          workshop we travel for free consultations across NSW and ACT, and
          deliver via dedicated furniture freight to QLD, VIC, WA, and SA.
        </p>
      </ScrollReveal>

      <LocationTeaserGrid locations={locations} />
    </SectionShell>
  );
}
