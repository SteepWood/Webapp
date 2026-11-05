import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

import { parse as parseYaml } from "yaml";

import { BLOG_DEFAULT_AUTHOR } from "@/lib/business";
import {
  ALL_SEEDED_BLOG_SLUGS,
  BATCH2_BLOG_SLUGS,
  BATCH2_HARD_BLOCK_SLUGS,
  BATCH3_BLOG_SLUGS,
  LAUNCH_PACK_SLUGS,
  RETIRED_BLOG_SLUG_MAP,
  RETIRED_BLOG_SLUGS,
  sydneyOffsetForDate,
  type BlogImageAltManifest,
  normaliseMdxContent,
} from "@/lib/blog/launchPackShared";

export * from "@/lib/blog/launchPackShared";

const LAUNCH_PACK_POSTS_DIR = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  "docs",
  "steepwood-blog-launch-pack",
  "steepwood-blog-pack",
  "posts",
);

const BATCH2_POSTS_DIR = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  "docs",
  "steepwood-blog-batch2",
  "posts",
);

const BATCH3_POSTS_DIR = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  "docs",
  "blog",
  "batch3",
  "posts",
);

const BATCH2_RESEARCH_DIR = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  "docs",
  "steepwood-blog-batch2",
  "research",
);

const BATCH3_RESEARCH_DIR = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  "docs",
  "blog",
  "batch3",
  "research",
);

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
  aboutService: string | null;
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

function resolveResearchPath(slug: string): string | null {
  const candidates = [
    path.join(BATCH3_RESEARCH_DIR, `RESEARCH-${slug}.md`),
    path.join(BATCH2_RESEARCH_DIR, `RESEARCH-${slug}.md`),
  ];

  return candidates.find((candidate) => existsSync(candidate)) ?? null;
}

export function loadResearchImageAlts(
  slug: string,
): Partial<BlogImageAltManifest> {
  const researchPath = resolveResearchPath(slug);

  if (!researchPath) {
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

export function loadResearchAboutService(slug: string): string | null {
  const researchPath = resolveResearchPath(slug);
  if (!researchPath) {
    return null;
  }

  const raw = readFileSync(researchPath, "utf8");
  const match = raw.match(/Service node\s*\(`?about`?\):\s*(.+)/i);
  return match?.[1]?.trim() || null;
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
  const offset = isBatch1 ? "+10:00" : sydneyOffsetForDate(data.date);
  const aboutService = loadResearchAboutService(data.slug);

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
    publishedAt: new Date(`${data.date}T${publishHour}${offset}`),
    shouldPublishWhenDue: !hardBlocked,
    faq: data.faq ?? [],
    relatedPosts: normaliseRelatedPosts(data.relatedPosts),
    locationFocus: normaliseLocationFocus(data.locationFocus),
    imageAlts,
    primaryKeyword: data.primaryKeyword ?? null,
    secondaryKeywords: data.secondaryKeywords ?? [],
    aboutService,
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
  const batch3 = loadPostsFromDirectory(BATCH3_POSTS_DIR);

  const bySlug = new Map<string, LaunchPackBlogPost>();

  for (const post of [...batch1, ...batch2, ...batch3]) {
    bySlug.set(post.slug, post);
  }

  const posts = [...bySlug.values()];

  posts.sort(
    (left, right) => right.publishedAt.getTime() - left.publishedAt.getTime(),
  );

  return posts;
}

export {
  LAUNCH_PACK_POSTS_DIR,
  BATCH2_POSTS_DIR,
  BATCH3_POSTS_DIR,
  BATCH2_BLOG_SLUGS,
  BATCH3_BLOG_SLUGS,
  LAUNCH_PACK_SLUGS,
  RETIRED_BLOG_SLUGS,
  RETIRED_BLOG_SLUG_MAP,
};
