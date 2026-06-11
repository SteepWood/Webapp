import { cache } from "react";

import { prisma } from "@/lib/db/prisma";

export const getFeaturedPortfolioProjects = cache(async () => {
  return prisma.portfolioProject.findMany({
    where: { isPublished: true },
    take: 3,
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });
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

