import type { Prisma } from "@prisma/client";

import { prisma } from "@/lib/db/prisma";
import type { QuoteStatus } from "@/lib/validations/admin/quotes";

export type QuoteListFilters = {
  status?: QuoteStatus;
  from?: string;
  to?: string;
};

export async function listAdminQuotes(filters: QuoteListFilters = {}) {
  const where: Prisma.QuoteRequestWhereInput = {};

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.from || filters.to) {
    where.createdAt = {};

    if (filters.from) {
      where.createdAt.gte = new Date(filters.from);
    }

    if (filters.to) {
      const toDate = new Date(filters.to);
      toDate.setHours(23, 59, 59, 999);
      where.createdAt.lte = toDate;
    }
  }

  try {
    return await prisma.quoteRequest.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export async function getAdminQuoteById(id: string) {
  try {
    return await prisma.quoteRequest.findUnique({ where: { id } });
  } catch {
    return null;
  }
}

export async function listAdminTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      orderBy: [{ updatedAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export async function getAdminTestimonialById(id: string) {
  try {
    return await prisma.testimonial.findUnique({ where: { id } });
  } catch {
    return null;
  }
}

export async function listAdminBlogPosts() {
  try {
    return await prisma.blogPost.findMany({
      orderBy: [{ updatedAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export async function getAdminBlogPostById(id: string) {
  try {
    return await prisma.blogPost.findUnique({ where: { id } });
  } catch {
    return null;
  }
}

export async function listAdminProjects() {
  try {
    return await prisma.portfolioProject.findMany({
      orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export async function getAdminProjectById(id: string) {
  try {
    return await prisma.portfolioProject.findUnique({ where: { id } });
  } catch {
    return null;
  }
}

export type ServiceLocationComboRow = {
  serviceSlug: string;
  serviceName: string;
  locationSlug: string;
  locationName: string;
  hasCustomIntro: boolean;
  isPublished: boolean;
};

export async function listServiceLocationCombos(): Promise<
  ServiceLocationComboRow[]
> {
  try {
    const [services, locations, rows] = await Promise.all([
      prisma.service.findMany({
        where: { isActive: true },
        orderBy: { displayOrder: "asc" },
      }),
      prisma.location.findMany({
        where: { isActive: true },
        orderBy: { displayOrder: "asc" },
      }),
      prisma.serviceLocation.findMany({
        select: {
          intro: true,
          isPublished: true,
          service: { select: { slug: true } },
          location: { select: { slug: true } },
        },
      }),
    ]);

    const rowMap = new Map(
      rows.map((row) => [
        `${row.service.slug}:${row.location.slug}`,
        row,
      ]),
    );

    const combos: ServiceLocationComboRow[] = [];

    for (const service of services) {
      for (const location of locations) {
        const key = `${service.slug}:${location.slug}`;
        const row = rowMap.get(key);

        combos.push({
          serviceSlug: service.slug,
          serviceName: service.name,
          locationSlug: location.slug,
          locationName: location.name,
          hasCustomIntro: Boolean(row?.intro?.trim()),
          isPublished: row?.isPublished ?? true,
        });
      }
    }

    return combos;
  } catch {
    return [];
  }
}

export async function getServiceLocationCombo(
  serviceSlug: string,
  locationSlug: string,
) {
  try {
    return await prisma.serviceLocation.findFirst({
      where: {
        service: { slug: serviceSlug },
        location: { slug: locationSlug },
      },
      include: {
        service: { select: { slug: true, name: true } },
        location: { select: { slug: true, name: true } },
      },
    });
  } catch {
    return null;
  }
}
