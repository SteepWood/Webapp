import { cache } from "react";

import type { PortfolioProject } from "@prisma/client";

import { matchesLocationFilter } from "@/lib/portfolio/utils";
import { prisma } from "@/lib/db/prisma";

export const PORTFOLIO_PAGE_SIZE = 12;

export type PortfolioListFilters = {
  category?: string;
  location?: string;
  year?: string;
  page?: number;
};

export type PortfolioListResult = {
  projects: PortfolioProject[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
};

function applyPortfolioFilters(
  projects: PortfolioProject[],
  filters: PortfolioListFilters,
): PortfolioProject[] {
  return projects.filter((project) => {
    if (filters.category && project.serviceSlug !== filters.category) {
      return false;
    }

    if (filters.location && !matchesLocationFilter(project, filters.location)) {
      return false;
    }

    if (filters.year) {
      const year = Number(filters.year);

      if (!Number.isNaN(year) && project.createdAt.getFullYear() !== year) {
        return false;
      }
    }

    return true;
  });
}

export const getPublishedPortfolioSlugs = cache(async (): Promise<string[]> => {
  try {
    const projects = await prisma.portfolioProject.findMany({
      where: { isPublished: true },
      select: { slug: true },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });

    return projects.map((project) => project.slug);
  } catch {
    return [];
  }
});

export const getPortfolioProjectBySlug = cache(
  async (slug: string): Promise<PortfolioProject | null> => {
    try {
      return await prisma.portfolioProject.findFirst({
        where: { slug, isPublished: true },
      });
    } catch {
      return null;
    }
  },
);

export const getFilteredPortfolioProjects = cache(
  async (filters: PortfolioListFilters): Promise<PortfolioListResult> => {
    const page = Math.max(1, filters.page ?? 1);

    try {
      const allProjects = await prisma.portfolioProject.findMany({
        where: { isPublished: true },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      });

      const filtered = applyPortfolioFilters(allProjects, filters);
      const total = filtered.length;
      const limit = page * PORTFOLIO_PAGE_SIZE;

      return {
        projects: filtered.slice(0, limit),
        total,
        page,
        pageSize: PORTFOLIO_PAGE_SIZE,
        hasMore: limit < total,
      };
    } catch {
      return {
        projects: [],
        total: 0,
        page,
        pageSize: PORTFOLIO_PAGE_SIZE,
        hasMore: false,
      };
    }
  },
);

export const getSimilarPortfolioProjects = cache(
  async (
    project: PortfolioProject,
    limit = 3,
  ): Promise<PortfolioProject[]> => {
    try {
      const candidates = await prisma.portfolioProject.findMany({
        where: {
          isPublished: true,
          slug: { not: project.slug },
          OR: [
            project.serviceSlug
              ? { serviceSlug: project.serviceSlug }
              : { serviceSlug: { not: null } },
            project.locationName
              ? {
                  locationName: {
                    contains: project.locationName,
                    mode: "insensitive",
                  },
                }
              : { locationName: { not: null } },
          ],
        },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
        take: limit,
      });

      return candidates;
    } catch {
      return [];
    }
  },
);
