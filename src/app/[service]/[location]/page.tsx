import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceLocationPage } from "@/components/pages/ServiceLocationPage";
import { getComboPortfolioProjects } from "@/lib/db/service-location";
import { getComboTestimonials } from "@/lib/db/testimonials";
import { getAggregateRating } from "@/lib/testimonials/aggregateRating";
import { getComboContent } from "@/lib/services-locations/comboContent";
import { getLocationContent } from "@/lib/services-locations/locationContent";
import {
  getAllServiceLocationPairs,
  resolveServiceLocation,
} from "@/lib/services-locations/resolvers";
import { buildServiceLocationMetadata } from "@/lib/seo/metadataBuilders";

export const dynamicParams = false;
export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllServiceLocationPairs().map(({ service, location }) => ({
    service,
    location,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string; location: string }>;
}): Promise<Metadata> {
  const { service: serviceSlug, location: locationSlug } = await params;
  const combo = await resolveServiceLocation(serviceSlug, locationSlug);

  if (!combo) {
    return {};
  }

  return buildServiceLocationMetadata(combo);
}

export default async function ServiceLocationRoute({
  params,
}: {
  params: Promise<{ service: string; location: string }>;
}) {
  const { service: serviceSlug, location: locationSlug } = await params;
  const combo = await resolveServiceLocation(serviceSlug, locationSlug);

  if (!combo || !combo.isPublished) {
    notFound();
  }

  const locationContent = getLocationContent(locationSlug);

  if (!locationContent) {
    notFound();
  }

  const content = getComboContent(
    combo.service,
    combo.location,
    combo.intro,
  );

  const [{ projects, hasLocalProjects }, testimonials, aggregateRating] =
    await Promise.all([
      getComboPortfolioProjects(
        serviceSlug,
        locationContent.portfolioSearchNames,
      ),
      getComboTestimonials(
        serviceSlug,
        locationSlug,
        combo.location.name,
      ),
      getAggregateRating({
        serviceSlug,
        locationSlug,
      }),
    ]);

  return (
    <ServiceLocationPage
      combo={combo}
      content={content}
      projects={projects}
      testimonials={testimonials}
      aggregateRating={aggregateRating}
      hasLocalProjects={hasLocalProjects}
    />
  );
}
