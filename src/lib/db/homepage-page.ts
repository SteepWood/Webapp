import { getAllLocations, getAllServices } from "@/lib/db/cached";
import {
  getFeaturedPortfolioProjects,
  getHomepageFaqs,
} from "@/lib/db/homepage";
import { LOCATIONS } from "@/lib/navigation";
import { staticFeaturedProjects } from "@/lib/portfolio/staticProjects";
import { SERVICES } from "@/lib/services-locations/services";

export type HomepageService = {
  slug: string;
  name: string;
  shortDescription: string | null;
  description: string | null;
  heroImageUrl: string | null;
  heroImageAlt: string | null;
};

export type HomepageLocation = {
  slug: string;
  name: string;
};

function staticServices(): HomepageService[] {
  return SERVICES.map((service) => ({
    slug: service.slug,
    name: service.name,
    shortDescription: service.shortDescription ?? null,
    description: service.longIntro ?? null,
    heroImageUrl: service.heroImagePath,
    heroImageAlt: `${service.name} by SteepWood in Newcastle`,
  }));
}

function staticLocations(): HomepageLocation[] {
  return LOCATIONS.map((location) => ({
    slug: location.slug,
    name: location.label,
  }));
}

export async function getHomepagePageData() {
  try {
    const [services, locations, projects, faqs] = await Promise.all([
      getAllServices(),
      getAllLocations(),
      getFeaturedPortfolioProjects(),
      getHomepageFaqs(),
    ]);

    return {
      services: services.length > 0 ? services : staticServices(),
      locations: locations.length > 0 ? locations : staticLocations(),
      projects: projects.length > 0 ? projects : staticFeaturedProjects(),
      faqs,
    };
  } catch {
    return {
      services: staticServices(),
      locations: staticLocations(),
      projects: staticFeaturedProjects(),
      faqs: [],
    };
  }
}
