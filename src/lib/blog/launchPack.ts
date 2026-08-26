import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

import { parse as parseYaml } from "yaml";

import { BLOG_DEFAULT_AUTHOR } from "@/lib/business";

const LAUNCH_PACK_POSTS_DIR = path.join(
  process.cwd(),
  "docs",
  "steepwood-blog-launch-pack",
  "steepwood-blog-pack",
  "posts",
);

const BATCH2_POSTS_DIR = path.join(
  process.cwd(),
  "docs",
  "steepwood-blog-batch2",
  "posts",
);

const BATCH2_RESEARCH_DIR = path.join(
  process.cwd(),
  "docs",
  "steepwood-blog-batch2",
  "research",
);

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

/**
 * Hard blocks from TOPIC_SLATE — must not go live until owner confirmation.
 * Seeded as unpublished drafts; cron will not publish without a publishedAt.
 */
export const BATCH2_HARD_BLOCK_SLUGS = [
  "porcelain-sintered-stone-benchtop-cost-nsw",
  "nsw-building-licence-hbcf-warranty-guide",
] as const;

export const ALL_SEEDED_BLOG_SLUGS = [
  ...LAUNCH_PACK_SLUGS,
  ...BATCH2_BLOG_SLUGS,
] as const;

const RETIRED_BLOG_SLUGS = [
  "kitchen-storage-planning-australia",
  "joinery-materials-guide-2pac-timber",
  "australian-home-joinery-trends-2026",
] as const;

/** Map retired blog slugs to the closest post in the launch batch. */
const RETIRED_BLOG_SLUG_MAP: Record<string, string> = {
  "kitchen-storage-planning-australia":
    "walk-in-robe-built-in-wardrobe-cost-guide-nsw",
  "joinery-materials-guide-2pac-timber":
    "benchtop-guide-engineered-stone-ban-nsw",
  "australian-home-joinery-trends-2026": "flat-pack-vs-custom-kitchen-australia",
};

export const FAQ_TAG_PREFIX = "faqjson:";
export const IMAGE_ALT_TAG_PREFIX = "imgalt:";
export const LOCATION_FOCUS_TAG_PREFIX = "locfocus:";

type LaunchPackFrontmatter = {
  title: string;
  slug: string;
  description: string;
  date: string;
  author?: string;
  category?: string;
  tags?: string[];
  hero?: {
    src?: string;
    alt?: string;
  };
  faq?: Array<{ question: string; answer: string }>;
  relatedPosts?: string[];
  locationFocus?: string | string[];
  primaryKeyword?: string;
  secondaryKeywords?: string[];
};

export type BlogImageAltManifest = {
  hero: string;
  og: string;
  "inline-01": string;
  "inline-02": string;
  "inline-wide": string;
};

export type LaunchPackBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  coverImageUrl: null;
  coverImageAlt: string | null;
  authorName: string;
  category: string | null;
  tags: string[];
  publishedAt: Date;
  /** When false, seed as draft (hard blocks / held posts). */
  shouldPublishWhenDue: boolean;
  faq: Array<{ question: string; answer: string }>;
  relatedPosts: string[];
  locationFocus: string[];
  imageAlts: BlogImageAltManifest;
  primaryKeyword: string | null;
  secondaryKeywords: string[];
};

function splitFrontmatter(raw: string): { frontmatter: string; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

  if (!match) {
    throw new Error("Launch pack post is missing YAML frontmatter.");
  }

  return {
    frontmatter: match[1] ?? "",
    body: match[2] ?? "",
  };
}

function stripLeadingH1(body: string, title: string): string {
  const lines = body.replace(/^\uFEFF/, "").split(/\r?\n/);
  let index = 0;

  while (index < lines.length && lines[index]?.trim() === "") {
    index += 1;
  }

  const firstLine = lines[index]?.trim() ?? "";

  if (firstLine.startsWith("# ")) {
    const heading = firstLine.slice(2).trim();

    if (heading === title || heading.startsWith(title.slice(0, 40))) {
      index += 1;

      while (index < lines.length && lines[index]?.trim() === "") {
        index += 1;
      }
    }
  }

  return lines.slice(index).join("\n").trimStart();
}

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

function isKnownSeedSlug(slug: string): boolean {
  return (ALL_SEEDED_BLOG_SLUGS as readonly string[]).includes(slug);
}

function normaliseRelatedPosts(relatedPosts: string[] | undefined): string[] {
  if (!relatedPosts?.length) {
    return [];
  }

  return relatedPosts
    .map((slug) => RETIRED_BLOG_SLUG_MAP[slug] ?? slug)
    .filter((slug) => isKnownSeedSlug(slug));
}

function normaliseLocationFocus(
  locationFocus: string | string[] | undefined,
): string[] {
  if (!locationFocus) {
    return [];
  }

  if (Array.isArray(locationFocus)) {
    return locationFocus.map((entry) => entry.trim()).filter(Boolean);
  }

  return [locationFocus.trim()].filter(Boolean);
}

function defaultImageAlts(
  slug: string,
  heroAlt: string | null,
): BlogImageAltManifest {
  const base = heroAlt ?? `SteepWood joinery article — ${slug}`;

  return {
    hero: base,
    og: base,
    "inline-01": `${base} — detail`,
    "inline-02": `${base} — context`,
    "inline-wide": `${base} — feature`,
  };
}

export function loadResearchImageAlts(
  slug: string,
): Partial<BlogImageAltManifest> {
  const researchPath = path.join(BATCH2_RESEARCH_DIR, `RESEARCH-${slug}.md`);

  if (!existsSync(researchPath)) {
    return {};
  }

  const raw = readFileSync(researchPath, "utf8");
  const alts: Partial<BlogImageAltManifest> = {};
  const patterns: Array<[keyof BlogImageAltManifest, RegExp]> = [
    ["hero", /\*\*hero:\*\*\s*(.+)/i],
    ["og", /\*\*og:\*\*\s*(.+)/i],
    ["inline-01", /\*\*inline-01:\*\*\s*(.+)/i],
    ["inline-02", /\*\*inline-02:\*\*\s*(.+)/i],
    ["inline-wide", /\*\*inline-wide:\*\*\s*(.+)/i],
  ];

  for (const [key, pattern] of patterns) {
    const match = raw.match(pattern);
    if (match?.[1]) {
      alts[key] = match[1].trim();
    }
  }

  return alts;
}

export function parseLaunchPackPostFile(filePath: string): LaunchPackBlogPost {
  const raw = readFileSync(filePath, "utf8");
  const { frontmatter, body } = splitFrontmatter(raw);
  const data = parseYaml(frontmatter) as LaunchPackFrontmatter;

  if (!data.title || !data.slug || !data.description) {
    throw new Error(`Invalid launch pack frontmatter in ${filePath}.`);
  }

  const content = normaliseMdxContent(stripLeadingH1(body, data.title));
  const researchAlts = loadResearchImageAlts(data.slug);
  const heroAlt = researchAlts.hero ?? data.hero?.alt ?? null;
  const defaults = defaultImageAlts(data.slug, heroAlt);
  const imageAlts: BlogImageAltManifest = {
    ...defaults,
    ...researchAlts,
    hero: researchAlts.hero ?? heroAlt ?? defaults.hero,
  };

  const hardBlocked = (BATCH2_HARD_BLOCK_SLUGS as readonly string[]).includes(
    data.slug,
  );
  const isBatch1 = (LAUNCH_PACK_SLUGS as readonly string[]).includes(data.slug);
  const publishHour = isBatch1 ? "09:00:00" : "07:00:00";

  return {
    slug: data.slug,
    title: data.title,
    excerpt: data.description,
    content,
    metaTitle:
      data.title.length <= 60 ? data.title : `${data.title.slice(0, 57)}…`,
    metaDescription: data.description,
    coverImageUrl: null,
    coverImageAlt: imageAlts.hero,
    authorName: data.author ?? BLOG_DEFAULT_AUTHOR,
    category: data.category ?? null,
    tags: data.tags ?? [],
    // Batch 1 keeps historical 09:00; Batch 2 schedule is 07:00 Australia/Sydney.
    publishedAt: new Date(`${data.date}T${publishHour}+10:00`),
    shouldPublishWhenDue: !hardBlocked,
    faq: data.faq ?? [],
    relatedPosts: normaliseRelatedPosts(data.relatedPosts),
    locationFocus: normaliseLocationFocus(data.locationFocus),
    imageAlts,
    primaryKeyword: data.primaryKeyword ?? null,
    secondaryKeywords: data.secondaryKeywords ?? [],
  };
}

function loadPostsFromDirectory(directory: string): LaunchPackBlogPost[] {
  if (!existsSync(directory)) {
    return [];
  }

  const files = readdirSync(directory).filter((file) => file.endsWith(".md"));

  return files.map((file) =>
    parseLaunchPackPostFile(path.join(directory, file)),
  );
}

export function loadLaunchPackPosts(): LaunchPackBlogPost[] {
  const batch1 = loadPostsFromDirectory(LAUNCH_PACK_POSTS_DIR);
  const batch2 = loadPostsFromDirectory(BATCH2_POSTS_DIR);

  const bySlug = new Map<string, LaunchPackBlogPost>();

  for (const post of [...batch1, ...batch2]) {
    bySlug.set(post.slug, post);
  }

  const posts = [...bySlug.values()];

  posts.sort(
    (left, right) => right.publishedAt.getTime() - left.publishedAt.getTime(),
  );

  return posts;
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

export function parseDisplayTags(tags: unknown): string[] {
  if (!Array.isArray(tags)) {
    return [];
  }

  return (tags as string[]).filter(
    (tag) =>
      !tag.startsWith("related:") &&
      !tag.startsWith(FAQ_TAG_PREFIX) &&
      !tag.startsWith(IMAGE_ALT_TAG_PREFIX) &&
      !tag.startsWith(LOCATION_FOCUS_TAG_PREFIX),
  );
}

export {
  LAUNCH_PACK_POSTS_DIR,
  BATCH2_POSTS_DIR,
  RETIRED_BLOG_SLUGS,
  RETIRED_BLOG_SLUG_MAP,
};
