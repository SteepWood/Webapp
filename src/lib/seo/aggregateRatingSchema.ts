import type { Testimonial } from "@prisma/client";

import type { AggregateRatingStats } from "@/lib/testimonials/aggregateRating";

type PageRatingSchemaInput = {
  entityId: string;
  entityName: string;
  entityType?: "LocalBusiness" | "Service" | "HomeAndConstructionBusiness";
  pageUrl: string;
  aggregateRating: AggregateRatingStats | null;
  testimonials: Testimonial[];
};

const MAX_INDIVIDUAL_REVIEWS = 10;

export function buildAggregateRatingBlock(stats: AggregateRatingStats) {
  return {
    "@type": "AggregateRating",
    ratingValue: stats.ratingValue,
    reviewCount: stats.reviewCount,
    bestRating: stats.bestRating,
    worstRating: stats.worstRating,
  };
}

export function buildPageReviewStructuredData({
  entityId,
  entityName,
  entityType = "LocalBusiness",
  pageUrl,
  aggregateRating,
  testimonials,
}: PageRatingSchemaInput) {
  const schemas: Record<string, unknown>[] = [];

  if (aggregateRating) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": entityType,
      "@id": entityId,
      name: entityName,
      url: pageUrl,
      aggregateRating: buildAggregateRatingBlock(aggregateRating),
    });
  }

  if (testimonials.length > 0 && testimonials.length < MAX_INDIVIDUAL_REVIEWS) {
    schemas.push(
      ...testimonials.map((testimonial) => ({
        "@context": "https://schema.org",
        "@type": "Review",
        itemReviewed: {
          "@type": entityType,
          "@id": entityId,
          name: entityName,
        },
        author: {
          "@type": "Person",
          name: testimonial.authorName,
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: testimonial.rating,
          bestRating: 5,
          worstRating: 1,
        },
        reviewBody: testimonial.quote,
        ...(testimonial.sourceUrl ? { url: testimonial.sourceUrl } : {}),
      })),
    );
  }

  return schemas;
}
