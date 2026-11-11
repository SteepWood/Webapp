"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { LocationTeaserGrid } from "@/components/sections/LocationTeaserGrid";
import {
  homepageHeadingClass,
  homepageInnerClass,
  homepageBandClass,
} from "@/components/sections/homepageStyles";
import type { HomepageLocation } from "@/lib/db/homepage-page";

export function ServiceAreaTeaser({
  locations,
}: {
  locations: HomepageLocation[];
}) {
  return (
    <section className={homepageBandClass}>
      <div className={homepageInnerClass}>
        <ScrollReveal className="relative max-w-3xl">
          <h2 className={`${homepageHeadingClass} mb-4`}>
            Cities we service across Australia
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-ink-800">
            We deliver from NSW to 16 Australian cities and regions. Free
            consultations across NSW and ACT; dedicated freight to QLD, VIC, WA,
            and SA.
          </p>
        </ScrollReveal>

        <LocationTeaserGrid locations={locations} />
      </div>
    </section>
  );
}
