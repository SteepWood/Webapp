import { cache } from "react";

import { prisma } from "@/lib/db/prisma";

export type AggregateRatingFilter = {
  serviceSlug?: string;
  locationSlug?: string;
};

export type AggregateRatingStats = {
  ratingValue: number;
  reviewCount: number;
  bestRating: 5;
  worstRating: 1;
};

const MIN_REVIEWS_FOR_AGGREGATE = 5;

export const getAggregateRating = cache(
  async (
    filter?: AggregateRatingFilter,
  ): Promise<AggregateRatingStats | null> => {
    try {
      const testimonials = await prisma.testimonial.findMany({
        where: {
          isPublished: true,
          isVerified: true,
          ...(filter?.serviceSlug
            ? { serviceSlug: filter.serviceSlug }
            : {}),
          ...(filter?.locationSlug
            ? { locationSlug: filter.locationSlug }
            : {}),
        },
        select: { rating: true },
      });

      if (testimonials.length < MIN_REVIEWS_FOR_AGGREGATE) {
        return null;
      }

      const ratingSum = testimonials.reduce((sum, item) => sum + item.rating, 0);

      return {
        ratingValue: Math.round((ratingSum / testimonials.length) * 10) / 10,
        reviewCount: testimonials.length,
        bestRating: 5,
        worstRating: 1,
      };
    } catch {
      return null;
    }
  },
);
