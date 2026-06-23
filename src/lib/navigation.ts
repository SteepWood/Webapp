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

export const PHONE_DISPLAY = "0468 387 676";
export const PHONE_HREF = "tel:+61468387676";
/** Schema.org telephone format for JSON-LD blocks. */
export const PHONE_SCHEMA = "+61-468-387-676";

/** Public workshop location — street address withheld until published. */
export const WORKSHOP_LOCATION = "Newcastle, NSW";

/** Google Business Profile — leave-a-review link (verified GBP). */
export const GOOGLE_REVIEW_URL =
  "https://g.page/r/CbgiJ5KWkJ9vEAE/review";

/** Google Business Profile — public listing URL for schema sameAs. */
export const GOOGLE_BUSINESS_PROFILE_URL =
  "https://g.page/r/CbgiJ5KWkJ9vEAE";

export const CONTACT_HOURS_TABLE = [
  { days: "Monday – Friday", hours: "7:00am – 5:00pm" },
  { days: "Saturday", hours: "9:00am – 1:00pm (by appointment)" },
  { days: "Sunday", hours: "Closed" },
] as const;

export const PHONE_HOURS_LABEL = "Mon–Fri 7am–5pm AEST";
export const FOOTER_HOURS_LABEL = "Mon–Fri 7am–5pm · Sat by appointment";

export const PRIMARY_NAV_LINKS = [
  { href: "/portfolio/", label: "Projects" },
  { href: "/about/", label: "About" },
  { href: "/locations/", label: "Locations" },
  { href: "/blog/", label: "Blog" },
  { href: "/contact/", label: "Contact" },
] as const;
