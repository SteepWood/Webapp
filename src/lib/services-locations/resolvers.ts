import { cache } from "react";

import {
  buildComboH1,
  buildComboMetaDescription,
  buildComboMetaTitle,
} from "@/lib/seo/metadataBuilders";
import { prisma } from "@/lib/db/prisma";

import { getLocationDefinition, LOCATIONS } from "./locations";
import { getServiceDefinition, SERVICES } from "./services";
import type {
  ResolvedLocation,
  ResolvedService,
  ResolvedServiceLocation,
  ServiceLocationPair,
} from "./types";

async function countServiceProjects(slug: string): Promise<number> {
  try {
    return await prisma.portfolioProject.count({
      where: {
        isPublished: true,
        serviceSlug: slug,
      },
    });
  } catch {
    return 0;
  }
}

async function countLocationProjects(locationName: string): Promise<number> {
  try {
    return await prisma.portfolioProject.count({
      where: {
        isPublished: true,
        locationName: {
          contains: locationName,
          mode: "insensitive",
        },
      },
    });
  } catch {
    return 0;
  }
}

export const resolveService = cache(
  async (slug: string): Promise<ResolvedService | null> => {
    const definition = getServiceDefinition(slug);
    if (!definition) {
      return null;
    }

    const projectCount = await countServiceProjects(slug);

    return {
      ...definition,
      projectCount,
    };
  },
);

export const resolveLocation = cache(
  async (slug: string): Promise<ResolvedLocation | null> => {
    const definition = getLocationDefinition(slug);
    if (!definition) {
      return null;
    }

    const projectCount = await countLocationProjects(definition.name);

    return {
      ...definition,
      projectCount,
    };
  },
);

export const resolveServiceLocation = cache(
  async (
    serviceSlug: string,
    locationSlug: string,
  ): Promise<ResolvedServiceLocation | null> => {
    const service = await resolveService(serviceSlug);
    const location = await resolveLocation(locationSlug);

    if (!service || !location) {
      return null;
    }

    let row: {
      h1: string | null;
      intro: string | null;
      bodyContent: string | null;
      metaTitle: string | null;
      metaDescription: string | null;
      heroImageUrl: string | null;
      heroImageAlt: string | null;
      isPublished: boolean;
    } | null = null;

    try {
      row = await prisma.serviceLocation.findFirst({
        where: {
          service: { slug: serviceSlug },
          location: { slug: locationSlug },
        },
        select: {
          h1: true,
          intro: true,
          bodyContent: true,
          metaTitle: true,
          metaDescription: true,
          heroImageUrl: true,
          heroImageAlt: true,
          isPublished: true,
        },
      });
    } catch {
      row = null;
    }

    return {
      service,
      location,
      h1: row?.h1 ?? buildComboH1(service, location),
      metaTitle: row?.metaTitle ?? buildComboMetaTitle(service, location),
      metaDescription:
        row?.metaDescription ?? buildComboMetaDescription(service, location),
      intro: row?.intro ?? null,
      bodyContent: row?.bodyContent ?? null,
      heroImageUrl: row?.heroImageUrl ?? null,
      heroImageAlt: row?.heroImageAlt ?? null,
      isPublished: row?.isPublished ?? true,
    };
  },
);

export function getAllServiceSlugs(): string[] {
  return SERVICES.map((service) => service.slug);
}

export function getAllLocationSlugs(): string[] {
  return LOCATIONS.map((location) => location.slug);
}

export function getAllServiceLocationPairs(): ServiceLocationPair[] {
  const pairs: ServiceLocationPair[] = [];

  for (const service of SERVICES) {
    for (const location of LOCATIONS) {
      pairs.push({
        service: service.slug,
        location: location.slug,
      });
    }
  }

  return pairs;
}
