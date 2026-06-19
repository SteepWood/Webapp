import { cache } from "react";

import { prisma } from "@/lib/db/prisma";
import { staticFeaturedProjects } from "@/lib/portfolio/staticProjects";

export const getFeaturedPortfolioProjects = cache(async () => {
  try {
    const projects = await prisma.portfolioProject.findMany({
      where: { isPublished: true },
      take: 3,
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });

    return projects.length > 0 ? projects : staticFeaturedProjects();
  } catch {
    return staticFeaturedProjects();
  }
});


export const getHomepageFaqs = cache(async () => {
  return prisma.faq.findMany({
    where: {
      isPublished: true,
      category: "homepage",
    },
    take: 5,
    orderBy: { displayOrder: "asc" },
  });
});

