import { cache } from "react";

import type { Prisma, Testimonial } from "@prisma/client";

import { prisma } from "@/lib/db/prisma";
import { staticFeaturedTestimonials } from "@/lib/testimonials/staticTestimonials";

export type TestimonialFilter = {
  serviceSlug?: string;
  locationSlug?: string;
  locationName?: string;
  featured?: boolean;
  limit?: number;
};

function buildVerifiedWhere(
  filter: TestimonialFilter,
): Prisma.TestimonialWhereInput {
  const where: Prisma.TestimonialWhereInput = {
    isPublished: true,
    isVerified: true,
  };

  if (filter.serviceSlug) {
    where.serviceSlug = filter.serviceSlug;
  }

  if (filter.locationSlug) {
    where.locationSlug = filter.locationSlug;
  } else if (filter.locationName) {
    where.authorLocation = {
      contains: filter.locationName,
      mode: "insensitive",
    };
  }

  if (filter.featured) {
    where.isFeatured = true;
  }

  return where;
}

async function fetchTestimonials(
  filter: TestimonialFilter,
): Promise<Testimonial[]> {
  const limit = filter.limit ?? 3;

  try {
    const exact = await prisma.testimonial.findMany({
      where: buildVerifiedWhere(filter),
      take: limit,
      orderBy: [{ isFeatured: "desc" }, { displayOrder: "asc" }],
    });

    if (exact.length > 0 || filter.locationSlug || filter.serviceSlug) {
      return exact;
    }

    return await prisma.testimonial.findMany({
      where: {
        isPublished: true,
        isVerified: true,
        ...(filter.featured ? { isFeatured: true } : {}),
      },
      take: limit,
      orderBy: [{ isFeatured: "desc" }, { displayOrder: "asc" }],
    });
  } catch {
    return [];
  }
}

export const getFeaturedTestimonials = cache(async (limit = 3) => {
  const testimonials = await fetchTestimonials({ featured: true, limit });
  return testimonials.length > 0
    ? testimonials
    : staticFeaturedTestimonials(limit);
});

export const getServiceTestimonials = cache(
  async (serviceSlug: string, limit = 3) => {
    return fetchTestimonials({ serviceSlug, limit });
  },
);

export const getLocationTestimonials = cache(
  async (locationSlug: string, locationName: string, limit = 3) => {
    const bySlug = await fetchTestimonials({ locationSlug, limit });

    if (bySlug.length > 0) {
      return bySlug;
    }

    return fetchTestimonials({ locationName, limit });
  },
);

export const getComboTestimonials = cache(
  async (
    serviceSlug: string,
    locationSlug: string,
    locationName: string,
    limit = 3,
  ) => {
    const exact = await fetchTestimonials({
      serviceSlug,
      locationSlug,
      limit,
    });

    if (exact.length > 0) {
      return exact;
    }

    const byLocation = await fetchTestimonials({ locationSlug, limit });

    if (byLocation.length > 0) {
      return byLocation;
    }

    return fetchTestimonials({ serviceSlug, limit });
  },
);
