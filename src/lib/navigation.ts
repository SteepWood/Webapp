import { LOCATIONS as LOCATION_DEFINITIONS } from "@/lib/services-locations/locations";
import { SERVICES as SERVICE_DEFINITIONS } from "@/lib/services-locations/services";

export type NavService = {
  slug: string;
  label: string;
  preview: string;
};

export type NavLocation = {
  slug: string;
  label: string;
};

export const SERVICES: NavService[] = SERVICE_DEFINITIONS.map((service) => ({
  slug: service.slug,
  label: service.name,
  preview: service.shortDescription,
}));

export const LOCATIONS: NavLocation[] = LOCATION_DEFINITIONS.map((location) => ({
  slug: location.slug,
  label: location.name,
}));

export const PHONE_DISPLAY = "02 4000 0000";
export const PHONE_HREF = "tel:+61240000000";

export const PRIMARY_NAV_LINKS = [
  { href: "/portfolio/", label: "Projects" },
  { href: "/about/", label: "About" },
  { href: "/locations/", label: "Locations" },
  { href: "/blog/", label: "Blog" },
  { href: "/contact/", label: "Contact" },
] as const;
