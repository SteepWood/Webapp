import { cache } from "react";

import { prisma } from "@/lib/db/prisma";

export const getServiceBySlug = cache(async (slug: string) => {
  return prisma.service.findUnique({
    where: { slug },
  });
});

export const getLocationBySlug = cache(async (slug: string) => {
  return prisma.location.findUnique({
    where: { slug },
  });
});

export const getServiceLocation = cache(
  async (serviceSlug: string, locationSlug: string) => {
    return prisma.serviceLocation.findFirst({
      where: {
        service: { slug: serviceSlug },
        location: { slug: locationSlug },
        isPublished: true,
      },
      include: {
        service: true,
        location: true,
      },
    });
  },
);

export const getAllServices = cache(async () => {
  return prisma.service.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });
});

export const getAllLocations = cache(async () => {
  return prisma.location.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });
});
