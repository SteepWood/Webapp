import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LocationHubPage } from "@/components/pages/LocationHubPage";
import {
  getLocationFaqs,
  getLocationPortfolioProjects,
} from "@/lib/db/location-hub";
import { getLocationTestimonials } from "@/lib/db/testimonials";
import { getAggregateRating } from "@/lib/testimonials/aggregateRating";
import { getLocationContent } from "@/lib/services-locations/locationContent";
import {
  getAllLocationSlugs,
  resolveLocation,
} from "@/lib/services-locations/resolvers";
import { buildLocationMetadata } from "@/lib/seo/metadataBuilders";

export const dynamicParams = false;
export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllLocationSlugs().map((location) => ({ location }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location: slug } = await params;
  const resolved = await resolveLocation(slug);

  if (!resolved) {
    return {};
  }

  return buildLocationMetadata(resolved);
}

export default async function LocationHubRoute({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: slug } = await params;
  const location = await resolveLocation(slug);

  if (!location) {
    notFound();
  }

  const content = getLocationContent(slug);

  if (!content) {
    notFound();
  }

  const [projects, testimonials, faqs, aggregateRating] = await Promise.all([
    getLocationPortfolioProjects(content.portfolioSearchNames),
    getLocationTestimonials(slug, location.name),
    getLocationFaqs(slug, content.faqs),
    getAggregateRating({ locationSlug: slug }),
  ]);

  return (
    <LocationHubPage
      location={location}
      content={{ ...content, faqs }}
      projects={projects}
      testimonials={testimonials}
      aggregateRating={aggregateRating}
    />
  );
}
