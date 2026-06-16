"use client";

import {
  ScrollRevealItem,
  ScrollRevealStagger,
} from "@/components/motion/ScrollReveal";
import {
  MediaCard,
  MediaCardAction,
  MediaCardContent,
  MediaCardDescription,
  MediaCardImage,
  MediaCardLink,
  MediaCardPlaceholder,
  MediaCardTitle,
} from "@/components/ui/media-card";
import type { HomepageService } from "@/lib/db/homepage-page";

type ServicesBentoGridProps = {
  services: HomepageService[];
};

export function ServicesBentoGrid({ services }: ServicesBentoGridProps) {
  return (
    <ScrollRevealStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ScrollRevealItem key={service.slug} className="h-full">
          <MediaCard>
            <MediaCardLink href={`/${service.slug}/`}>
              {service.heroImageUrl ? (
                <MediaCardImage
                  src={service.heroImageUrl}
                  alt={
                    service.heroImageAlt ??
                    `${service.name} by SteepWood in Newcastle`
                  }
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <MediaCardPlaceholder label={service.name} />
              )}
              <MediaCardContent>
                <MediaCardTitle>{service.name}</MediaCardTitle>
                <MediaCardDescription>
                  {service.shortDescription ??
                    service.description?.slice(0, 160) ??
                    "Bespoke joinery designed and built in our Newcastle workshop."}
                </MediaCardDescription>
                <MediaCardAction>
                  <span className="transition-colors group-hover:text-amber-700">
                    Explore →
                  </span>
                </MediaCardAction>
              </MediaCardContent>
            </MediaCardLink>
          </MediaCard>
        </ScrollRevealItem>
      ))}
    </ScrollRevealStagger>
  );
}
