export type LocationRegion =
  | "NSW Coastal"
  | "NSW Inland"
  | "Capital City"
  | "Regional";

export type ServiceDefinition = {
  id: string;
  slug: string;
  /** Display name used in H1s and combo page titles */
  name: string;
  shortTitle: string;
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  shortDescription: string;
  longIntro: string;
  heroImagePath: string;
  ogImagePath: string;
  buildPriority: number;
};

export type LocationDefinition = {
  id: string;
  slug: string;
  name: string;
  state: string;
  region: LocationRegion;
  tier: 1 | 2 | 3;
  areaDescription: string;
  populationServed: string;
  driveTimeFromNewcastle: string;
  /** Short form for meta descriptions, e.g. "2hr" or "freight-delivered" */
  driveTimeShort: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroImagePath: string;
  ogImagePath: string;
};

export type ResolvedService = ServiceDefinition & {
  projectCount: number;
};

export type ResolvedLocation = LocationDefinition & {
  projectCount: number;
};

export type ResolvedServiceLocation = {
  service: ResolvedService;
  location: ResolvedLocation;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string | null;
  bodyContent: string | null;
  heroImageUrl: string | null;
  heroImageAlt: string | null;
  isPublished: boolean;
};

export type ServiceLocationPair = {
  service: string;
  location: string;
};
