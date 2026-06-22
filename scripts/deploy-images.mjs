import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const manifest = JSON.parse(
  readFileSync(join(root, "docs", "pictures", "manifest.json"), "utf8"),
);

const SOURCE_ROOTS = [
  join(root, "docs", "pictures", "steepwood-p0-images"),
  join(root, "docs", "pictures", "steepwood-p1-p2-images"),
];

/** Manifest source paths that differ from files in the P1/P2 pack. */
const SOURCE_ALIASES = {
  "05-team/team-james-mitchell-portrait.jpg": "05-team/team-portrait-01.jpg",
  "05-team/team-sarah-chen-portrait.jpg": "05-team/team-portrait-02.jpg",
  "05-team/team-tom-walsh-portrait.jpg": "05-team/team-portrait-03.jpg",
  "05-team/team-elena-rossi-portrait.jpg": "05-team/team-portrait-04.jpg",
};

const PORTFOLIO_PATTERN = /^project-(.+)-(after|before|g\d+)\.jpg$/;
const SERVICE_PAGE_IMAGE_PATTERN =
  /^service-.+-(what-is|section-\d{2}|process-\d{2})\.jpg$/;

const priorityArg = process.argv.find((arg) => arg.startsWith("--priority="));
const priorityFilter = priorityArg?.split("=")[1]?.split(",") ?? null;

function resolveSourcePath(source) {
  const relative = (SOURCE_ALIASES[source] ?? source).replace(/\//g, "\\");

  for (const base of SOURCE_ROOTS) {
    const candidate = join(base, relative);
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

function deployFile(sourcePath, deployTo) {
  const destPath = join(root, deployTo.replace(/\//g, "\\"));
  mkdirSync(dirname(destPath), { recursive: true });
  copyFileSync(sourcePath, destPath);
  return deployTo;
}

function shouldInclude(priority) {
  if (!priorityFilter) return true;
  return priorityFilter.includes(priority);
}

let deployed = 0;
const missing = [];

for (const asset of manifest.assets) {
  if (!shouldInclude(asset.priority)) continue;
  if (!asset.deployTo?.startsWith("public/")) continue;

  const sourcePath = resolveSourcePath(asset.source);
  if (!sourcePath) {
    missing.push(asset.source);
    continue;
  }

  deployFile(sourcePath, asset.deployTo);
  deployed++;

  if (asset.ogSource && asset.ogDeployTo?.startsWith("public/")) {
    const ogSourcePath = resolveSourcePath(asset.ogSource);
    if (ogSourcePath) {
      deployFile(ogSourcePath, asset.ogDeployTo);
      deployed++;
    } else {
      missing.push(asset.ogSource);
    }
  }
}

const portfolioProjects = manifest.portfolioGalleryPattern?.projects ?? [];
const portfolioVariants = [
  "after",
  "before",
  "g01",
  "g02",
  "g03",
  "g04",
  "g05",
];

if (shouldInclude("P0") || shouldInclude("P1")) {
  for (const slug of portfolioProjects) {
    for (const variant of portfolioVariants) {
      const file = `project-${slug}-${variant}.jpg`;
      const match = file.match(PORTFOLIO_PATTERN);
      if (!match) continue;

      const sourcePath = resolveSourcePath(`04-portfolio/${file}`);
      if (!sourcePath) {
        missing.push(`04-portfolio/${file}`);
        continue;
      }

      deployFile(
        sourcePath,
        `public/images/portfolio/${slug}/${variant}.jpg`,
      );
      deployed++;
    }
  }
}

const BLOG_POST_SLUGS = [
  "custom-kitchen-cost-nsw-2026",
  "flat-pack-vs-custom-kitchen-australia",
  "2pac-laminate-timber-veneer-kitchen-finishes-nsw",
  "walk-in-robe-built-in-wardrobe-cost-guide-nsw",
  "questions-to-ask-custom-joiner-australia",
  "benchtop-guide-engineered-stone-ban-nsw",
];

const BLOG_INLINE_VARIANTS = [
  { suffix: "hero", dest: "hero.jpg" },
  { suffix: "og", dest: "og.jpg" },
  { suffix: "inline-01", dest: "inline-01.jpg" },
  { suffix: "inline-02", dest: "inline-02.jpg" },
  { suffix: "inline-wide", dest: "inline-wide.jpg" },
];

if (shouldInclude("P0") || shouldInclude("P1") || shouldInclude("P2") || !priorityFilter) {
  const blogDir = join(
    root,
    "docs",
    "pictures",
    "steepwood-p1-p2-images",
    "08-blog",
  );

  if (existsSync(blogDir)) {
    const indexHero = join(blogDir, "blog-index-hero.jpg");
    if (existsSync(indexHero)) {
      deployFile(indexHero, "public/images/blog/blog-index-hero.jpg");
      deployed++;
    }

    for (const slug of BLOG_POST_SLUGS) {
      for (const { suffix, dest } of BLOG_INLINE_VARIANTS) {
        const file = `blog-${slug}-${suffix}.jpg`;
        const sourcePath = join(blogDir, file);
        if (!existsSync(sourcePath)) {
          missing.push(`08-blog/${file}`);
          continue;
        }

        deployFile(sourcePath, `public/blog/${slug}/${dest}`);
        deployed++;
      }
    }
  }
}

if (shouldInclude("P2")) {
  const servicesDir = join(
    root,
    "docs",
    "pictures",
    "steepwood-p1-p2-images",
    "02-services",
  );

  if (existsSync(servicesDir)) {
    for (const file of readdirSync(servicesDir)) {
      if (!SERVICE_PAGE_IMAGE_PATTERN.test(file)) {
        continue;
      }

      const sourcePath = join(servicesDir, file);
      const deployName = file.replace(/^service-/, "");
      deployFile(sourcePath, `public/images/services/${deployName}`);
      deployed++;
    }
  }
}

if (missing.length > 0) {
  console.warn(`Skipped ${missing.length} missing source file(s):`);
  for (const item of missing) {
    console.warn(`  - ${item}`);
  }
}

const label = priorityFilter ? priorityFilter.join(", ") : "P0–P2";
console.log(`Deployed ${deployed} image(s) to public/ (${label})`);
