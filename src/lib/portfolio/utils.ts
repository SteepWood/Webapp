import type { PortfolioProject } from "@prisma/client";

import { LOCATIONS } from "@/lib/services-locations/locations";
import { SERVICES } from "@/lib/services-locations/services";

export type PortfolioGalleryImage = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

const DEFAULT_HERO_WIDTH = 1600;
const DEFAULT_HERO_HEIGHT = 1000;
const DEFAULT_GALLERY_WIDTH = 1200;
const DEFAULT_GALLERY_HEIGHT = 800;

export function parseGalleryImages(value: unknown): PortfolioGalleryImage[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is Record<string, unknown> =>
        typeof item === "object" && item !== null && "url" in item,
    )
    .map((item) => ({
      url: String(item.url),
      alt: typeof item.alt === "string" ? item.alt : "",
      width:
        typeof item.width === "number" ? item.width : DEFAULT_GALLERY_WIDTH,
      height:
        typeof item.height === "number" ? item.height : DEFAULT_GALLERY_HEIGHT,
    }));
}

export function getProjectHeroImage(
  project: PortfolioProject,
): PortfolioGalleryImage | null {
  const heroUrl = project.afterImageUrl ?? project.beforeImageUrl;

  if (heroUrl) {
    return {
      url: heroUrl,
      alt: project.title,
      width: DEFAULT_HERO_WIDTH,
      height: DEFAULT_HERO_HEIGHT,
    };
  }

  const gallery = parseGalleryImages(project.galleryImages);
  return gallery[0] ?? null;
}

export function getProjectGalleryImages(
  project: PortfolioProject,
): PortfolioGalleryImage[] {
  const gallery = parseGalleryImages(project.galleryImages);

  if (gallery.length > 0) {
    return gallery;
  }

  const hero = getProjectHeroImage(project);
  return hero ? [hero] : [];
}

export function getServiceLabel(serviceSlug: string | null | undefined): string {
  if (!serviceSlug) {
    return "Custom joinery";
  }

  return (
    SERVICES.find((service) => service.slug === serviceSlug)?.shortTitle ??
    serviceSlug
  );
}

export function getLocationLabel(locationName: string | null | undefined): string {
  if (!locationName) {
    return "Australia";
  }

  const matched = LOCATIONS.find(
    (location) =>
      location.name.toLowerCase() === locationName.toLowerCase() ||
      locationName.toLowerCase().includes(location.name.toLowerCase()),
  );

  return matched?.name ?? locationName;
}

export function anonymisedClient(locationName: string | null | undefined): string {
  const label = getLocationLabel(locationName);

  if (label === "Australia") {
    return "Australian homeowners";
  }

  return `${label} homeowners`;
}

export function getProjectClient(project: {
  clientDisplayName?: string | null;
  locationName?: string | null;
}): string {
  if (project.clientDisplayName?.trim()) {
    return project.clientDisplayName.trim();
  }

  return anonymisedClient(project.locationName);
}

export function formatCompletionDate(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    month: "long",
    year: "numeric",
  }).format(date);
}

export function getRecentCompletionYears(count = 5): number[] {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: count }, (_, index) => currentYear - index);
}

export function matchesLocationFilter(
  project: PortfolioProject,
  locationSlug: string,
): boolean {
  const location = LOCATIONS.find((entry) => entry.slug === locationSlug);

  if (!location || !project.locationName) {
    return false;
  }

  const projectLocation = project.locationName.toLowerCase();
  return (
    projectLocation.includes(location.name.toLowerCase()) ||
    projectLocation.includes(location.slug)
  );
}
