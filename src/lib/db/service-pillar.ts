import { cache } from "react";

import type { Faq, PortfolioProject } from "@prisma/client";

import { prisma } from "@/lib/db/prisma";
import type { ServiceFaq } from "@/lib/services-locations/serviceContent";

export const getServicePortfolioProjects = cache(
  async (serviceSlug: string): Promise<PortfolioProject[]> => {
    try {
      return await prisma.portfolioProject.findMany({
        where: {
          isPublished: true,
          serviceSlug,
        },
        take: 4,
        orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      });
    } catch {
      return [];
    }
  },
);

export const getServiceFaqs = cache(
  async (
    serviceSlug: string,
    fallback: ServiceFaq[],
  ): Promise<ServiceFaq[]> => {
    try {
      const dbFaqs: Faq[] = await prisma.faq.findMany({
        where: {
          isPublished: true,
          category: serviceSlug,
        },
        take: 8,
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
      // Fall back to Section 9.4 content when DB is unavailable.
    }

    return fallback;
  },
);
