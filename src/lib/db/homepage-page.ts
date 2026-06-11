import { getAllLocations, getAllServices } from "@/lib/db/cached";
import {
  getFeaturedPortfolioProjects,
  getHomepageFaqs,
} from "@/lib/db/homepage";
import { LOCATIONS, SERVICES } from "@/lib/navigation";

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
    name: service.label,
    shortDescription: service.preview,
    description: null,
    heroImageUrl: null,
    heroImageAlt: null,
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
      projects,
      faqs,
    };
  } catch {
    return {
      services: staticServices(),
      locations: staticLocations(),
      projects: [],
      faqs: [],
    };
  }
}
