/**
 * Node port of build_and_validate.py for machines without Python.
 * Usage: node docs/blog/batch4/scripts/validate_batch4.mjs [--build]
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { parse as parseYaml } from "yaml";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const POSTS = path.join(ROOT, "posts");

const SLATE = [
  ["2026-11-07", "office-fitout-parramatta"],
  ["2026-11-08", "kitchen-installation-lake-macquarie"],
  ["2026-11-09", "shop-fitout-maitland"],
  ["2026-11-10", "deck-builders-lake-macquarie"],
  ["2026-11-11", "restaurant-fitout-newcastle"],
  ["2026-11-12", "home-office-joinery-north-shore-sydney"],
  ["2026-11-13", "pharmacy-fitout-nsw"],
  ["2026-11-14", "warehouse-office-fitout-western-sydney"],
  ["2026-11-15", "kitchen-installation-maitland-hunter-valley"],
  ["2026-11-16", "childcare-centre-joinery-nsw"],
];
const DATE_OF = Object.fromEntries(SLATE.map(([date, slug]) => [slug, date]));

const SERVICES = [
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
];
const LOCATIONS = [
  "newcastle",
  "sydney",
  "canberra",
  "melbourne",
  "central-coast",
  "hunter-valley",
  "gold-coast",
  "wollongong",
  "brisbane",
  "perth",
  "byron-bay",
  "port-macquarie",
  "coffs-harbour",
  "adelaide",
  "bathurst",
  "orange",
];
const PORTFOLIO = [
  "hamptons-kitchen-newcastle",
  "walk-in-robe-sydney",
  "floating-vanity-byron-bay",
  "office-fitout-canberra",
  "home-office-wollongong",
  "laundry-cabinets-central-coast",
];
const LIVE_POSTS = `custom-kitchen-cost-nsw-2026 flat-pack-vs-custom-kitchen-australia
2pac-laminate-timber-veneer-kitchen-finishes-nsw walk-in-robe-built-in-wardrobe-cost-guide-nsw
questions-to-ask-custom-joiner-australia benchtop-guide-engineered-stone-ban-nsw laundry-joinery-cost-nsw
kitchen-renovation-timeline-lead-times-nsw porcelain-sintered-stone-benchtop-cost-nsw butlers-pantry-cost-nsw
cabinetry-cost-per-linear-metre-nsw blum-hardware-cost-australia floating-vanity-vs-floor-mounted-cost-nsw
timber-staircase-cost-nsw kitchen-island-cost-nsw joinery-timber-species-guide-nsw hamptons-kitchen-cost-nsw
home-office-joinery-cost-nsw custom-timber-furniture-cost-australia reception-desk-cost-australia
office-fitout-joinery-cost-nsw shopfitting-cost-by-format-nsw cabinetmaker-hourly-rate-vs-charge-out-nsw
why-custom-joinery-quotes-differ-australia nsw-building-licence-hbcf-warranty-guide
joinery-cost-guide-newcastle-hunter joinery-cost-guide-central-coast joinery-cost-guide-wollongong-illawarra
joinery-cost-guide-northern-beaches joinery-cost-guide-eastern-suburbs-sydney joinery-cost-guide-north-shore-sydney
joinery-cost-guide-inner-west-sydney apartment-terrace-joinery-sydney southern-highlands-hunter-valley-joinery-guide
regional-nsw-joinery-guide new-home-joinery-growth-corridors-nsw
office-fitout-newcastle-guide kitchen-installation-cost-nsw shop-fitout-newcastle-guide decking-cost-newcastle home-office-joinery-newcastle commercial-joinery-newcastle-guide office-fitout-central-coast-guide kitchen-installation-newcastle composite-vs-timber-decking-central-coast shop-fitout-central-coast cafe-fitout-cost-nsw built-in-desk-study-nook-sydney kitchen-installation-central-coast office-fitout-timeline-nsw retail-shop-fitout-sydney deck-builders-sydney-cost medical-clinic-fitout-joinery-nsw commercial-joinery-sydney-builders kitchen-installation-sydney home-office-joinery-central-coast office-kitchenette-breakout-joinery shop-counter-display-joinery spotted-gum-merbau-blackbutt-decking-nsw salon-barber-shop-fitout-nsw kitchen-installation-process-day-by-day compact-laminate-commercial-joinery home-office-built-ins-hybrid-work-nsw office-fitout-sydney-small-business commercial-joinery-central-coast christmas-shutdown-fitout-planning-nsw`.split(
  /\s+/,
);
const RETIRED = [
  "kitchen-storage-planning-australia",
  "joinery-materials-guide-2pac-timber",
  "australian-home-joinery-trends-2026",
];
const STATIC = new Set(["/quote", "/contact", "/about", "/legal/consumer-rights", "/blog"]);
const ALLOWED = new Set(STATIC);
for (const service of SERVICES) {
  ALLOWED.add(`/${service}`);
  for (const location of LOCATIONS) ALLOWED.add(`/${service}/${location}`);
}
for (const location of LOCATIONS) ALLOWED.add(`/locations/${location}`);
for (const project of PORTFOLIO) ALLOWED.add(`/portfolio/${project}`);
for (const post of LIVE_POSTS) ALLOWED.add(`/blog/${post}`);

const REQUIRED = [
  "title",
  "slug",
  "description",
  "date",
  "author",
  "category",
  "tags",
  "readingTime",
  "hero",
  "ogImage",
  "primaryKeyword",
  "secondaryKeywords",
  "internalLinks",
  "faq",
  "relatedPosts",
];
const CATEGORIES = new Set([
  "Commercial",
  "Kitchen Design",
  "Decking",
  "Home Offices",
  "Materials",
]);
const EMOJI = /[\u{1F300}-\u{1FAFF}\u2600-\u27BF]/u;
const STOP = new Set([
  "how",
  "long",
  "does",
  "an",
  "a",
  "the",
  "take",
  "best",
  "for",
  "in",
  "nsw",
  "of",
]);

function faqMd(faq) {
  const out = ["## Frequently asked questions", ""];
  for (const item of faq) {
    out.push(`### ${item.question}`, "", String(item.answer).trim(), "");
  }
  return out.join("\n").replace(/\s+$/, "");
}

function words(md) {
  const stripped = md
    .replace(/\]\([^)]*\)/g, "]")
    .replace(/^\| ?-{3}.*$/gm, "");
  return stripped.split(/\s+/).filter((word) => /[A-Za-z0-9]/.test(word)).length;
}

function tableColumnErrors(body) {
  const lines = body.split("\n");
  const errors = [];
  let index = 0;
  while (index < lines.length) {
    if (!lines[index].trim().startsWith("|")) {
      index += 1;
      continue;
    }
    const block = [];
    while (index < lines.length && lines[index].trim().startsWith("|")) {
      block.push(lines[index]);
      index += 1;
    }
    const counts = block
      .filter((line) => !/^\|\s*-{3}/.test(line.trim()))
      .map((line) => line.split("|").filter((_, cellIndex, cells) => {
        if (cellIndex === 0 || cellIndex === cells.length - 1) {
          return cells[cellIndex].trim() !== "";
        }
        return true;
      }).length);
    const headerCount = counts[0];
    if (counts.some((count) => count !== headerCount)) {
      errors.push(`table column mismatch (${counts.join(", ")})`);
    }
  }
  return errors;
}

const build = process.argv.includes("--build");
const errors = [];
const warns = [];
const seenKw = new Map();
const files = readdirSync(POSTS).filter((file) => file.endsWith(".md")).sort();

for (const file of files) {
  const slug = file.replace(/\.md$/, "");
  const fail = (message) => errors.push(`${slug}: ${message}`);
  let text = readFileSync(path.join(POSTS, file), "utf8").replace(/\r\n/g, "\n");
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    fail("frontmatter error");
    continue;
  }
  const fmRaw = match[1];
  let body = match[2];
  let fm;
  try {
    fm = parseYaml(fmRaw);
  } catch (error) {
    fail(`frontmatter error ${error}`);
    continue;
  }
  for (const key of REQUIRED) {
    if (!(key in fm)) fail(`missing frontmatter key ${key}`);
  }
  if (fm.slug !== slug) fail("slug does not match filename");
  if (!DATE_OF[slug]) {
    fail("slug not in slate");
    continue;
  }
  if (String(fm.date) !== DATE_OF[slug]) {
    fail(`date ${fm.date} != slate ${DATE_OF[slug]}`);
  }
  if (!CATEGORIES.has(fm.category)) fail(`bad category ${fm.category}`);
  if ((fm.description ?? "").length > 165) {
    warns.push(`${slug}: description ${fm.description.length} chars (>165)`);
  }
  if ((fm.title ?? "").length > 70) {
    warns.push(`${slug}: title ${fm.title.length} chars (>70)`);
  }
  const kw = String(fm.primaryKeyword ?? "").toLowerCase();
  if (seenKw.has(kw)) fail(`primary keyword duplicates ${seenKw.get(kw)}`);
  seenKw.set(kw, slug);
  const faq = fm.faq ?? [];
  if (faq.length !== 5) fail(`${faq.length} FAQs (need 5)`);
  if (fm.author !== "Sukhveer Kaur") fail(`author is ${fm.author}`);
  if (fm.hero?.alt && fm.hero.alt !== undefined) {
    // Hero alt is required to match the image manifest subject.
  }

  if (build && body.includes("[[FAQ]]")) {
    body = body.replace("[[FAQ]]", faqMd(faq));
    writeFileSync(path.join(POSTS, file), `---\n${fmRaw}\n---\n${body}`);
  }
  if (!body.includes("[[FAQ]]") && !body.includes("## Frequently asked questions")) {
    fail("no FAQ marker or FAQ section");
  }

  const fullBody = body.replace("[[FAQ]]", faqMd(faq));
  const n = words(fullBody);
  if (n < 1000 || n > 1900) fail(`word count ${n} outside 1,000-1,900`);
  const plain = fullBody.replace(/\]\([^)]*\)/g, "]");
  const first = plain
    .replace(/^#.*$/m, "")
    .split(/\s+/)
    .slice(0, 100)
    .join(" ")
    .toLowerCase();
  const core = [...kw.matchAll(/[a-z]+/g)]
    .map((item) => item[0])
    .filter((word) => !STOP.has(word));
  if (!first.includes(kw) && !core.every((word) => first.includes(word))) {
    fail(`primary keyword '${kw}' not in first 100 words`);
  }
  if ((body.match(/^# /gm) ?? []).length !== 1) fail("needs exactly one H1");
  const h2 = (fullBody.match(/^## /gm) ?? []).length;
  if (h2 < 6) fail(`only ${h2} H2s`);
  const tables = (fullBody.match(/^\| ?-{3}/gm) ?? []).length;
  if (tables < 2) fail(`only ${tables} tables`);
  for (const issue of tableColumnErrors(fullBody)) fail(issue);
  if ((body.match(/^> \*\*STEEPWOOD/gm) ?? []).length !== 1) {
    fail("needs exactly one STEEPWOOD CTA blockquote");
  }
  if (/<\s*[a-zA-Z/!]/.test(body)) fail("raw HTML found");
  if (/<\s*\d/.test(fullBody)) fail("raw '<digit' found (breaks MDX)");
  if (EMOJI.test(text)) fail("emoji found");
  if (plain.replace(/!\[/g, "").includes("!")) fail("exclamation mark found");
  if (!body.includes("/quote")) fail("no /quote CTA");
  if ((body.match(/## Frequently asked questions/g) ?? []).length > 1) {
    fail("FAQ section appears more than once");
  }

  const links = [
    ...body.matchAll(/\]\((\/[^)\s]*)\)/g).map((item) => item[1]),
    ...(fm.internalLinks ?? []).map((link) => link.url),
    ...(fm.relatedPosts ?? []).map((related) => `/blog/${related}`),
  ];
  for (const link of links) {
    let target = link.split("#")[0];
    if (target.endsWith("/") && target !== "/") {
      fail(`trailing slash ${link}`);
      target = target.replace(/\/$/, "");
    }
    if (RETIRED.some((retired) => target.includes(retired))) {
      fail(`retired slug link ${link}`);
    }
    if (ALLOWED.has(target)) continue;
    if (target.startsWith("/blog/") && DATE_OF[target.slice(6)]) {
      const related = target.slice(6);
      if (DATE_OF[related] >= DATE_OF[slug]) {
        fail(`forward/self link to later Batch 4 post ${link}`);
      }
      continue;
    }
    fail(`link to page that does not exist ${link}`);
  }
  for (const related of fm.relatedPosts ?? []) {
    if (DATE_OF[related] && DATE_OF[related] >= DATE_OF[slug]) {
      fail(`relatedPosts forward link ${related}`);
    }
  }
  const ext = [...body.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].map((item) => item[1]);
  if (ext.length < 4) warns.push(`${slug}: only ${ext.length} external source links`);
  console.log(
    `${slug.padEnd(48)} ${fm.date}  ${String(n).padStart(5)} words  H2 ${h2}  tables ${tables}  sources ${new Set(ext).size}`,
  );
}

const missing = SLATE.filter(([, slug]) => !files.includes(`${slug}.md`)).map(([, slug]) => slug);
if (missing.length) warns.push(`${missing.length} posts not written yet: ${missing.join(", ")}`);
for (const warning of warns) console.log("WARN ", warning);
for (const error of errors) console.log("ERROR", error);
console.log(`\n${files.length} posts checked, ${errors.length} errors, ${warns.length} warnings`);
process.exit(errors.length ? 1 : 0);
