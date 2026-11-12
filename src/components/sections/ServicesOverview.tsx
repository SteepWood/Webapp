"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ServicesBentoGrid } from "@/components/sections/ServicesBentoGrid";
import {
  homepageHeadingClass,
  homepageInnerClass,
  homepageSectionClass,
} from "@/components/sections/homepageStyles";
import { AIO_IDENTITY_BLOCK } from "@/lib/aio/constants";
import type { HomepageService } from "@/lib/db/homepage-page";

const HOMEPAGE_INTRO = AIO_IDENTITY_BLOCK.replace(
  "Every project is hand-crafted in our Newcastle workshop",
  "Every project is hand-crafted in-house",
);

export function ServicesOverview({
  services,
}: {
  services: HomepageService[];
}) {
  return (
    <section id="services" className={homepageSectionClass}>
      <div className={homepageInnerClass}>
        <ScrollReveal className="mb-10 max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-amber-700">
            What we build
          </p>
          <h2 className={`${homepageHeadingClass} mb-4`}>
            Joinery for homes and businesses
          </h2>
          <p className="text-lg leading-relaxed text-ink-800">
            From custom kitchens to commercial fitouts, we design and make every
            piece in-house.
          </p>
        </ScrollReveal>

        <ServicesBentoGrid services={services} />

        <p
          className="mt-12 max-w-3xl rounded-[14px] bg-white p-[18px] text-[15px] leading-[1.6] text-[#5c4a3c] md:rounded-none md:bg-transparent md:p-0 md:text-base md:leading-relaxed md:text-ink-800"
          data-aio="identity-block"
        >
          {HOMEPAGE_INTRO}
        </p>
      </div>
    </section>
  );
}
