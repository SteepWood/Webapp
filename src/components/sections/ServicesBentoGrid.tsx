"use client";

import Image from "next/image";

import {
  ScrollRevealItem,
  ScrollRevealStagger,
} from "@/components/motion/ScrollReveal";
import Link from "@/components/ui/link";
import { cn } from "@/lib/utils";
import type { HomepageService } from "@/lib/db/homepage-page";
import { SERVICES } from "@/lib/services-locations/services";

type ServicesBentoGridProps = {
  services: HomepageService[];
};

const KITCHEN_SLUG = "custom-kitchen-joinery";

const HOME_SLUGS = [
  "built-in-wardrobes",
  "custom-bathroom-vanity",
  "laundry-cabinets",
  "home-office-joinery",
  "custom-furniture",
  "staircase-joinery",
] as const;

const BUSINESS_SLUGS = [
  "shopfitting",
  "office-fitout",
  "commercial-joinery",
] as const;

function resolveServiceHeroImage(service: HomepageService): string | null {
  return (
    service.heroImageUrl ??
    SERVICES.find((entry) => entry.slug === service.slug)?.heroImagePath ??
    null
  );
}

function serviceDescription(service: HomepageService): string {
  return (
    service.shortDescription ??
    service.description?.slice(0, 160) ??
    "Bespoke joinery designed and made in-house."
  );
}

function findService(
  services: HomepageService[],
  slug: string,
): HomepageService | undefined {
  return services.find((service) => service.slug === slug);
}

function ServicePhotoCard({
  service,
  sizes,
  className,
  compact = false,
}: {
  service: HomepageService;
  sizes: string;
  className?: string;
  compact?: boolean;
}) {
  const heroImageUrl = resolveServiceHeroImage(service);
  const alt =
    service.heroImageAlt ?? `${service.name} by SteepWood in Newcastle`;

  return (
    <ScrollRevealItem className={cn("h-full min-h-0", className)}>
      <Link
        href={`/${service.slug}/`}
        className="group relative flex h-full min-h-[190px] overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
      >
        {heroImageUrl ? (
          <Image
            src={heroImageUrl}
            alt={alt}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
        ) : (
          <span className="absolute inset-0 bg-gradient-to-br from-ink-800 to-ink-950" />
        )}
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[rgba(30,20,13,0.88)] via-[rgba(30,20,13,0.15)] to-transparent"
        />
        <span className="relative mt-auto flex max-h-full w-full flex-col p-3 text-[#f7f2ea] sm:p-4">
          <span
            className={cn(
              "font-serif leading-tight",
              compact ? "text-base" : "text-xl lg:text-2xl",
            )}
          >
            {service.name}
          </span>
          <span
            className={cn(
              "mt-1 line-clamp-2 leading-snug text-[#f7f2ea]/85",
              compact ? "text-xs" : "text-sm",
            )}
          >
            {serviceDescription(service)}
          </span>
          <span className={cn("mt-1.5 text-[#f7f2ea]/80", compact ? "text-xs" : "text-sm")}>
            Explore →
          </span>
        </span>
      </Link>
    </ScrollRevealItem>
  );
}

function GroupLabel({ children }: { children: string }) {
  return (
    <div className="mb-4 flex items-center gap-4">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-800">
        {children}
      </p>
      <span aria-hidden className="h-px flex-1 bg-[#e6d9c8]" />
    </div>
  );
}

export function ServicesBentoGrid({ services }: ServicesBentoGridProps) {
  const kitchen = findService(services, KITCHEN_SLUG);
  const homes = HOME_SLUGS.map((slug) => findService(services, slug)).filter(
    (service): service is HomepageService => Boolean(service),
  );
  const businesses = BUSINESS_SLUGS.map((slug) =>
    findService(services, slug),
  ).filter((service): service is HomepageService => Boolean(service));
  const placed = new Set<string>([
    KITCHEN_SLUG,
    ...HOME_SLUGS,
    ...BUSINESS_SLUGS,
  ]);
  const extras = services.filter((service) => !placed.has(service.slug));

  return (
    <div className="flex flex-col gap-12">
      <div>
        <GroupLabel>For homes</GroupLabel>
        <ScrollRevealStagger className="grid grid-cols-2 auto-rows-[190px] gap-3 lg:grid-cols-3 lg:auto-rows-[250px]">
          {kitchen ? (
            <ServicePhotoCard
              service={kitchen}
              sizes="(max-width: 1024px) 100vw, 34vw"
              className="col-span-2 row-span-2 h-full lg:col-span-1 lg:col-start-1 lg:row-span-3 lg:row-start-1"
            />
          ) : null}
          {homes.map((service) => (
            <ServicePhotoCard
              key={service.slug}
              service={service}
              sizes="(max-width: 1024px) 50vw, 22vw"
              compact
            />
          ))}
        </ScrollRevealStagger>
      </div>

      <div>
        <GroupLabel>For businesses</GroupLabel>
        <ScrollRevealStagger className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {businesses.map((service) => (
            <ServicePhotoCard
              key={service.slug}
              service={service}
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="h-[220px] lg:h-[330px]"
            />
          ))}
        </ScrollRevealStagger>
      </div>

      {extras.length > 0 ? (
        <ScrollRevealStagger className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {extras.map((service) => (
            <ServicePhotoCard
              key={service.slug}
              service={service}
              sizes="(max-width: 640px) 100vw, 50vw"
              className="h-[220px]"
            />
          ))}
        </ScrollRevealStagger>
      ) : null}
    </div>
  );
}
