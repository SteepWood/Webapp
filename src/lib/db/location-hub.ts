import { cache } from "react";

import type { Faq, PortfolioProject } from "@prisma/client";

import { prisma } from "@/lib/db/prisma";
import type { LocationFaq } from "@/lib/services-locations/locationContent";

export const getLocationPortfolioProjects = cache(
  async (searchNames: string[]): Promise<PortfolioProject[]> => {
    if (searchNames.length === 0) {
      return [];
    }

    try {
      return await prisma.portfolioProject.findMany({
        where: {
          isPublished: true,
          OR: searchNames.map((name) => ({
            locationName: {
              contains: name,
              mode: "insensitive" as const,
            },
          })),
        },
        take: 4,
        orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      });
    } catch {
      return [];
    }
  },
);

export const getLocationFaqs = cache(
  async (
    locationSlug: string,
    fallback: LocationFaq[],
  ): Promise<LocationFaq[]> => {
    try {
      const dbFaqs: Faq[] = await prisma.faq.findMany({
        where: {
          isPublished: true,
          category: `location-${locationSlug}`,
        },
        take: 6,
        orderBy: { displayOrder: "asc" },
      });

      if (dbFaqs.length > 0) {
        return dbFaqs.map((faq) => ({
          id: faq.id,
          question: faq.question,
          answer: faq.answer,
        }));
      }
    } catch {
      // Fall back to Section 9.5 content when DB is unavailable.
    }

    return fallback;
  },
);
