import { cache } from "react";

import type { PortfolioProject } from "@prisma/client";

import { prisma } from "@/lib/db/prisma";

export const getComboPortfolioProjects = cache(
  async (
    serviceSlug: string,
    searchNames: string[],
  ): Promise<{ projects: PortfolioProject[]; hasLocalProjects: boolean }> => {
    try {
      const local = await prisma.portfolioProject.findMany({
        where: {
          isPublished: true,
          serviceSlug,
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

      if (local.length > 0) {
        return { projects: local, hasLocalProjects: true };
      }

      const fallback = await prisma.portfolioProject.findMany({
        where: {
          isPublished: true,
          serviceSlug,
        },
        take: 4,
        orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      });

      return { projects: fallback, hasLocalProjects: false };
    } catch {
      return { projects: [], hasLocalProjects: false };
    }
  },
);

