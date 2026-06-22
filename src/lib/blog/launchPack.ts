import { readFileSync, readdirSync } from "node:fs";
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

const LAUNCH_PACK_SLUGS = [
  "custom-kitchen-cost-nsw-2026",
  "flat-pack-vs-custom-kitchen-australia",
  "2pac-laminate-timber-veneer-kitchen-finishes-nsw",
  "walk-in-robe-built-in-wardrobe-cost-guide-nsw",
  "questions-to-ask-custom-joiner-australia",
  "benchtop-guide-engineered-stone-ban-nsw",
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
  faq: Array<{ question: string; answer: string }>;
  relatedPosts: string[];
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

function normaliseRelatedPosts(relatedPosts: string[] | undefined): string[] {
  if (!relatedPosts?.length) {
    return [];
  }

  return relatedPosts
    .map((slug) => RETIRED_BLOG_SLUG_MAP[slug] ?? slug)
    .filter((slug) => LAUNCH_PACK_SLUGS.includes(slug as (typeof LAUNCH_PACK_SLUGS)[number]));
}

export function parseLaunchPackPostFile(filePath: string): LaunchPackBlogPost {
  const raw = readFileSync(filePath, "utf8");
  const { frontmatter, body } = splitFrontmatter(raw);
  const data = parseYaml(frontmatter) as LaunchPackFrontmatter;

  if (!data.title || !data.slug || !data.description) {
    throw new Error(`Invalid launch pack frontmatter in ${filePath}.`);
  }

  const content = normaliseMdxContent(stripLeadingH1(body, data.title));

  return {
    slug: data.slug,
    title: data.title,
    excerpt: data.description,
    content,
    metaTitle: data.title.length <= 60 ? data.title : `${data.title.slice(0, 57)}…`,
    metaDescription: data.description,
    coverImageUrl: null,
    coverImageAlt: data.hero?.alt ?? null,
    authorName: data.author ?? BLOG_DEFAULT_AUTHOR,
    category: data.category ?? null,
    tags: data.tags ?? [],
    publishedAt: new Date(`${data.date}T09:00:00+10:00`),
    faq: data.faq ?? [],
    relatedPosts: normaliseRelatedPosts(data.relatedPosts),
  };
}

export function loadLaunchPackPosts(): LaunchPackBlogPost[] {
  const files = readdirSync(LAUNCH_PACK_POSTS_DIR).filter((file) =>
    file.endsWith(".md"),
  );

  const posts = files.map((file) =>
    parseLaunchPackPostFile(path.join(LAUNCH_PACK_POSTS_DIR, file)),
  );

  posts.sort(
    (left, right) => right.publishedAt.getTime() - left.publishedAt.getTime(),
  );

  return posts;
}

export {
  LAUNCH_PACK_POSTS_DIR,
  LAUNCH_PACK_SLUGS,
  RETIRED_BLOG_SLUGS,
  RETIRED_BLOG_SLUG_MAP,
};
