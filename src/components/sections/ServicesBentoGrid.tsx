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
    service.description ??
    "Bespoke joinery designed and made in-house."
  );
}

const cardClass =
  "group flex h-full overflow-hidden rounded-[12px] border border-[#e6d9c8] bg-white shadow-[0_14px_30px_-24px_rgba(42,28,19,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2";

function findService(
  services: HomepageService[],
  slug: string,
): HomepageService | undefined {
  return services.find((service) => service.slug === slug);
}

function ServicePhoto({
  src,
  alt,
  sizes,
}: {
  src: string | null;
  alt: string;
  sizes: string;
}) {
  return (
    <>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        />
      ) : (
        <span className="absolute inset-0 bg-ink-100" />
      )}
    </>
  );
}

function ServiceCardCopy({
  service,
  featured = false,
}: {
  service: HomepageService;
  featured?: boolean;
}) {
  return (
    <span
      className={cn(
        "flex min-w-0 flex-1 flex-col p-[14px] md:p-4",
        featured && "justify-center md:p-10",
      )}
    >
      <span
        className={cn(
          "font-serif text-[18px] leading-[1.25] text-ink-900 md:text-[21px] md:leading-tight",
          featured && "md:text-[34px]",
        )}
      >
        {service.name}
      </span>
      <span className="mt-2 text-sm leading-snug text-[#5c4a3c] md:text-[14.5px]">
        {serviceDescription(service)}
      </span>
      <span className="mt-3 text-sm font-semibold text-amber-500">Explore →</span>
    </span>
  );
}

function ServicePhotoCard({
  service,
  featured = false,
}: {
  service: HomepageService;
  featured?: boolean;
}) {
  const heroImageUrl = resolveServiceHeroImage(service);
  const alt =
    service.heroImageAlt ?? `${service.name} by SteepWood in Newcastle`;
  const sizes = featured
    ? "(max-width: 700px) 100vw, 60vw"
    : "(max-width: 700px) 120px, (max-width: 1024px) 50vw, 30vw";

  return (
    <ScrollRevealItem className="h-full min-h-0">
      <Link
        href={`/${service.slug}/`}
        className={cn(
          cardClass,
          featured
            ? "flex-col md:min-h-[420px] md:flex-row"
            : "flex-row md:flex-col",
        )}
      >
        <span
          className={cn(
            "relative block shrink-0 overflow-hidden",
            featured
              ? "h-[200px] w-full md:aspect-auto md:h-auto md:min-h-[420px] md:w-[60%]"
              : "min-h-[120px] w-[120px] self-stretch md:aspect-[4/3] md:h-auto md:w-full md:self-auto",
          )}
        >
          <ServicePhoto src={heroImageUrl} alt={alt} sizes={sizes} />
        </span>
        <ServiceCardCopy service={service} featured={featured} />
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
        {kitchen ? (
          <div className="mb-4">
            <ServicePhotoCard service={kitchen} featured />
          </div>
        ) : null}
        <ScrollRevealStagger className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {homes.map((service) => (
            <ServicePhotoCard key={service.slug} service={service} />
          ))}
        </ScrollRevealStagger>
      </div>

      <div>
        <GroupLabel>For businesses</GroupLabel>
        <ScrollRevealStagger className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {businesses.map((service) => (
            <ServicePhotoCard key={service.slug} service={service} />
          ))}
        </ScrollRevealStagger>
      </div>

      {extras.length > 0 ? (
        <ScrollRevealStagger className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {extras.map((service) => (
            <ServicePhotoCard key={service.slug} service={service} />
          ))}
        </ScrollRevealStagger>
      ) : null}
    </div>
  );
}
