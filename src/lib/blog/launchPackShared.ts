/** Blog pack constants + tag helpers — safe for App Router (no node:fs). */

/** Batch 1 — already live. Never rewrite or republish these files. */
export const LAUNCH_PACK_SLUGS = [
  "custom-kitchen-cost-nsw-2026",
  "flat-pack-vs-custom-kitchen-australia",
  "2pac-laminate-timber-veneer-kitchen-finishes-nsw",
  "walk-in-robe-built-in-wardrobe-cost-guide-nsw",
  "questions-to-ask-custom-joiner-australia",
  "benchtop-guide-engineered-stone-ban-nsw",
] as const;

/** Batch 2 — 30-day NSW local SEO programme. */
export const BATCH2_BLOG_SLUGS = [
  "laundry-joinery-cost-nsw",
  "kitchen-renovation-timeline-lead-times-nsw",
  "porcelain-sintered-stone-benchtop-cost-nsw",
  "butlers-pantry-cost-nsw",
  "cabinetry-cost-per-linear-metre-nsw",
  "blum-hardware-cost-australia",
  "floating-vanity-vs-floor-mounted-cost-nsw",
  "timber-staircase-cost-nsw",
  "kitchen-island-cost-nsw",
  "joinery-timber-species-guide-nsw",
  "hamptons-kitchen-cost-nsw",
  "home-office-joinery-cost-nsw",
  "custom-timber-furniture-cost-australia",
  "reception-desk-cost-australia",
  "office-fitout-joinery-cost-nsw",
  "shopfitting-cost-by-format-nsw",
  "cabinetmaker-hourly-rate-vs-charge-out-nsw",
  "why-custom-joinery-quotes-differ-australia",
  "nsw-building-licence-hbcf-warranty-guide",
  "joinery-cost-guide-newcastle-hunter",
  "joinery-cost-guide-central-coast",
  "joinery-cost-guide-wollongong-illawarra",
  "joinery-cost-guide-northern-beaches",
  "joinery-cost-guide-eastern-suburbs-sydney",
  "joinery-cost-guide-north-shore-sydney",
  "joinery-cost-guide-inner-west-sydney",
  "apartment-terrace-joinery-sydney",
  "southern-highlands-hunter-valley-joinery-guide",
  "regional-nsw-joinery-guide",
  "new-home-joinery-growth-corridors-nsw",
] as const;

/** Batch 3 — commercial / install / decking programme (24 Aug–6 Nov 2026). */
export const BATCH3_BLOG_SLUGS = [
  "office-fitout-newcastle-guide",
  "kitchen-installation-cost-nsw",
  "shop-fitout-newcastle-guide",
  "decking-cost-newcastle",
  "home-office-joinery-newcastle",
  "commercial-joinery-newcastle-guide",
  "office-fitout-central-coast-guide",
  "kitchen-installation-newcastle",
  "composite-vs-timber-decking-central-coast",
  "shop-fitout-central-coast",
  "cafe-fitout-cost-nsw",
  "built-in-desk-study-nook-sydney",
  "kitchen-installation-central-coast",
  "office-fitout-timeline-nsw",
  "retail-shop-fitout-sydney",
  "deck-builders-sydney-cost",
  "medical-clinic-fitout-joinery-nsw",
  "commercial-joinery-sydney-builders",
  "kitchen-installation-sydney",
  "home-office-joinery-central-coast",
  "office-kitchenette-breakout-joinery",
  "shop-counter-display-joinery",
  "spotted-gum-merbau-blackbutt-decking-nsw",
  "salon-barber-shop-fitout-nsw",
  "kitchen-installation-process-day-by-day",
  "compact-laminate-commercial-joinery",
  "home-office-built-ins-hybrid-work-nsw",
  "office-fitout-sydney-small-business",
  "commercial-joinery-central-coast",
  "christmas-shutdown-fitout-planning-nsw",
] as const;

export const BATCH2_HARD_BLOCK_SLUGS = [
  "porcelain-sintered-stone-benchtop-cost-nsw",
  "nsw-building-licence-hbcf-warranty-guide",
] as const;

export const ALL_SEEDED_BLOG_SLUGS = [
  ...LAUNCH_PACK_SLUGS,
  ...BATCH2_BLOG_SLUGS,
  ...BATCH3_BLOG_SLUGS,
] as const;

export const RETIRED_BLOG_SLUGS = [
  "kitchen-storage-planning-australia",
  "joinery-materials-guide-2pac-timber",
  "australian-home-joinery-trends-2026",
] as const;

export const RETIRED_BLOG_SLUG_MAP: Record<string, string> = {
  "kitchen-storage-planning-australia":
    "walk-in-robe-built-in-wardrobe-cost-guide-nsw",
  "joinery-materials-guide-2pac-timber":
    "benchtop-guide-engineered-stone-ban-nsw",
  "australian-home-joinery-trends-2026": "flat-pack-vs-custom-kitchen-australia",
};

export const FAQ_TAG_PREFIX = "faqjson:";
export const IMAGE_ALT_TAG_PREFIX = "imgalt:";
export const LOCATION_FOCUS_TAG_PREFIX = "locfocus:";
export const ABOUT_SERVICE_TAG_PREFIX = "aboutservice:";

export type BlogImageAltManifest = {
  hero: string;
  og: string;
  "inline-01": string;
  "inline-02": string;
  "inline-wide": string;
};

export function normaliseMdxContent(content: string): string {
  let next = content;

  // Prevent MDX from treating comparison-style markup (e.g. "<1%") as JSX tags.
  next = next.replace(/<(\d)/g, "&lt;$1");

  for (const [retiredSlug, replacementSlug] of Object.entries(
    RETIRED_BLOG_SLUG_MAP,
  )) {
    next = next.replaceAll(
      `/blog/${retiredSlug}`,
      `/blog/${replacementSlug}`,
    );
  }

  return next;
}

export function encodeFaqTag(
  faq: Array<{ question: string; answer: string }>,
): string | null {
  if (!faq.length) {
    return null;
  }

  return `${FAQ_TAG_PREFIX}${JSON.stringify(faq)}`;
}

export function encodeImageAltTag(alts: BlogImageAltManifest): string {
  return `${IMAGE_ALT_TAG_PREFIX}${JSON.stringify(alts)}`;
}

export function encodeLocationFocusTags(locations: string[]): string[] {
  return locations.map(
    (location) => `${LOCATION_FOCUS_TAG_PREFIX}${location}`,
  );
}

export function encodeAboutServiceTag(serviceType: string): string {
  return `${ABOUT_SERVICE_TAG_PREFIX}${serviceType}`;
}

export function parseFaqFromTags(
  tags: unknown,
): Array<{ question: string; answer: string }> {
  if (!Array.isArray(tags)) {
    return [];
  }

  const encoded = (tags as string[]).find((tag) =>
    tag.startsWith(FAQ_TAG_PREFIX),
  );

  if (!encoded) {
    return [];
  }

  try {
    const parsed = JSON.parse(encoded.slice(FAQ_TAG_PREFIX.length)) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (entry): entry is { question: string; answer: string } =>
        typeof entry === "object" &&
        entry !== null &&
        typeof (entry as { question?: unknown }).question === "string" &&
        typeof (entry as { answer?: unknown }).answer === "string",
    );
  } catch {
    return [];
  }
}

export function parseImageAltsFromTags(
  tags: unknown,
): BlogImageAltManifest | null {
  if (!Array.isArray(tags)) {
    return null;
  }

  const encoded = (tags as string[]).find((tag) =>
    tag.startsWith(IMAGE_ALT_TAG_PREFIX),
  );

  if (!encoded) {
    return null;
  }

  try {
    return JSON.parse(
      encoded.slice(IMAGE_ALT_TAG_PREFIX.length),
    ) as BlogImageAltManifest;
  } catch {
    return null;
  }
}

export function parseAboutServiceFromTags(tags: unknown): string | null {
  if (!Array.isArray(tags)) {
    return null;
  }

  for (const tag of tags) {
    if (typeof tag === "string" && tag.startsWith(ABOUT_SERVICE_TAG_PREFIX)) {
      const value = tag.slice(ABOUT_SERVICE_TAG_PREFIX.length).trim();
      if (value) {
        return value;
      }
    }
  }

  return null;
}

export function parseDisplayTags(tags: unknown): string[] {
  if (!Array.isArray(tags)) {
    return [];
  }

  return (tags as string[]).filter(
    (tag) =>
      !tag.startsWith("related:") &&
      !tag.startsWith(FAQ_TAG_PREFIX) &&
      !tag.startsWith(IMAGE_ALT_TAG_PREFIX) &&
      !tag.startsWith(LOCATION_FOCUS_TAG_PREFIX) &&
      !tag.startsWith(ABOUT_SERVICE_TAG_PREFIX),
  );
}

/** Australia/Sydney offset for a calendar date (AEDT from first Sunday of October 2026). */
export function sydneyOffsetForDate(isoDate: string): "+10:00" | "+11:00" {
  return isoDate >= "2026-10-04" ? "+11:00" : "+10:00";
}
