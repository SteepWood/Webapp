"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import Link from "@/components/ui/link";
import type { HomepageService } from "@/lib/db/homepage-page";
import { hoverSpring } from "@/lib/motion/presets";
import { cn } from "@/lib/utils";

const FEATURED_SLUGS = new Set([
  "custom-kitchen-joinery",
  "built-in-wardrobes",
  "office-fitout",
  "shopfitting",
]);

function bentoClassName(slug: string, index: number): string {
  if (FEATURED_SLUGS.has(slug)) {
    return "sm:col-span-2 lg:row-span-2";
  }

  if (index % 5 === 0) {
    return "sm:col-span-2";
  }

  return "";
}

type ServicesBentoGridProps = {
  services: HomepageService[];
};

export function ServicesBentoGrid({ services }: ServicesBentoGridProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {services.map((service, index) => (
        <motion.article
          key={service.slug}
          className={cn(
            "group relative overflow-hidden rounded-xl border border-ink-700/10 bg-ink-50 shadow-sm transition-shadow hover:shadow-lg",
            bentoClassName(service.slug, index),
          )}
          whileHover={
            shouldReduceMotion
              ? undefined
              : { y: -4, transition: hoverSpring }
          }
          whileTap={shouldReduceMotion ? undefined : { scale: 0.995 }}
          style={{ viewTransitionName: `service-${service.slug}` }}
        >
          <div
            className={cn(
              "flex w-full items-center justify-center bg-ink-100 p-2",
              FEATURED_SLUGS.has(service.slug)
                ? "min-h-[14rem] sm:min-h-[18rem]"
                : "min-h-[12rem] sm:min-h-[14rem]",
            )}
          >
            {service.heroImageUrl ? (
              <Image
                src={service.heroImageUrl}
                alt={
                  service.heroImageAlt ??
                  `${service.name} by SteepWood in Newcastle`
                }
                width={800}
                height={600}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="h-auto max-h-64 w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
            ) : (
              <div
                className="flex h-full min-h-[12rem] w-full items-end rounded-md bg-gradient-to-br from-ink-800 to-ink-900 p-4"
                aria-hidden
              >
                <span className="font-serif text-lg text-ink-50/80">
                  {service.name}
                </span>
              </div>
            )}
          </div>
          <div className="p-5">
            <h3 className="mb-2 font-serif text-h4 text-ink-900">
              {service.name}
            </h3>
            <p className="mb-4 text-body-sm leading-relaxed text-ink-800/80">
              {service.shortDescription ??
                service.description?.slice(0, 160) ??
                "Bespoke joinery designed and built in our Newcastle workshop."}
            </p>
            <Link
              href={`/${service.slug}/`}
              className="inline-flex text-sm font-medium text-amber-600 transition-colors hover:text-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              Explore →
            </Link>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
