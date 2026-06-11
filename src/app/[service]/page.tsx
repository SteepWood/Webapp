import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServicePillarPage } from "@/components/pages/ServicePillarPage";
import { getServiceTestimonials } from "@/lib/db/testimonials";
import {
  getServiceFaqs,
  getServicePortfolioProjects,
} from "@/lib/db/service-pillar";
import { getAggregateRating } from "@/lib/testimonials/aggregateRating";
import { getServiceContent } from "@/lib/services-locations/serviceContent";
import {
  getAllServiceSlugs,
  resolveService,
} from "@/lib/services-locations/resolvers";
import { buildServiceMetadata } from "@/lib/seo/metadataBuilders";

export const dynamicParams = false;
export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllServiceSlugs().map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: slug } = await params;
  const resolved = await resolveService(slug);

  if (!resolved) {
    return {};
  }

  return buildServiceMetadata(resolved);
}

export default async function ServicePillarRoute({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: slug } = await params;
  const service = await resolveService(slug);

  if (!service) {
    notFound();
  }

  const content = getServiceContent(slug);

  if (!content) {
    notFound();
  }

  const [projects, testimonials, faqs, aggregateRating] = await Promise.all([
    getServicePortfolioProjects(slug),
    getServiceTestimonials(slug),
    getServiceFaqs(slug, content.faqs),
    getAggregateRating({ serviceSlug: slug }),
  ]);

  return (
    <ServicePillarPage
      service={service}
      content={{ ...content, faqs }}
      projects={projects}
      testimonials={testimonials}
      aggregateRating={aggregateRating}
    />
  );
}
