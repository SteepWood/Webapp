const SERVICE_SLUGS = [
  "custom-kitchen-joinery",
  "built-in-wardrobes",
  "office-fitout",
  "shopfitting",
  "custom-bathroom-vanity",
  "commercial-joinery",
  "custom-furniture",
  "home-office-joinery",
  "laundry-cabinets",
  "staircase-joinery",
] as const;

function bespokeServiceImage(slug: string, variant: string): string {
  return `/images/services/${slug}-${variant}.jpg`;
}

export function getServiceWhatIsImage(slug: string): string {
  return bespokeServiceImage(slug, "what-is");
}

export function getServiceSectionImage(slug: string, index: number): string {
  return bespokeServiceImage(
    slug,
    `section-${String(index + 1).padStart(2, "0")}`,
  );
}

export function getServiceProcessImage(slug: string, index: number): string {
  return bespokeServiceImage(
    slug,
    `process-${String(index + 1).padStart(2, "0")}`,
  );
}

export function getServiceIncludesImage(slug: string, index: number): string {
  return getServiceSectionImage(slug, index);
}

export function getAllServiceSlugsWithSectionImages(): readonly string[] {
  return SERVICE_SLUGS;
}
