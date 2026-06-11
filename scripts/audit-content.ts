import * as cheerio from "cheerio";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { LOCATIONS } from "../src/lib/services-locations/locations";
import { SERVICES } from "../src/lib/services-locations/services";

const BASE_URL = (process.env.AUDIT_BASE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);
const MIN_WORDS = 800;
const MAX_DUPLICATE_OVERLAP = 70;
const CONCURRENCY = 8;
const OUTPUT_PATH = resolve(process.cwd(), "results.csv");

const COMBO_URLS = new Set(
  SERVICES.flatMap((service) =>
    LOCATIONS.map((location) => `/${service.slug}/${location.slug}/`),
  ),
);

const STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "has",
  "he",
  "in",
  "is",
  "it",
  "its",
  "of",
  "on",
  "or",
  "that",
  "the",
  "to",
  "was",
  "were",
  "will",
  "with",
  "we",
  "our",
  "your",
  "you",
  "this",
  "these",
  "those",
  "their",
  "they",
  "them",
  "can",
  "all",
  "not",
  "but",
  "have",
  "been",
  "into",
  "more",
  "also",
  "about",
  "than",
  "when",
  "which",
  "who",
  "what",
  "how",
  "if",
  "each",
  "such",
  "through",
  "after",
  "before",
  "between",
  "over",
  "under",
  "while",
  "during",
  "within",
  "without",
  "across",
  "including",
]);

interface PageContent {
  url: string;
  status: number;
  totalWords: number;
  uniqueWords: number;
  uniqueRatio: number;
  wordSet: Set<string>;
  paragraphHashes: Set<string>;
  isCombo: boolean;
}

function buildAuditUrls(): string[] {
  const staticPaths = [
    "/",
    "/about/",
    "/contact/",
    "/quote/",
    "/portfolio/",
    "/blog/",
    "/legal/privacy/",
    "/legal/terms/",
    "/legal/consumer-rights/",
  ];

  const servicePaths = SERVICES.map((service) => `/${service.slug}/`);
  const locationPaths = LOCATIONS.map(
    (location) => `/locations/${location.slug}/`,
  );
  const comboPaths = SERVICES.flatMap((service) =>
    LOCATIONS.map(
      (location) => `/${service.slug}/${location.slug}/`,
    ),
  );

  return [...staticPaths, ...servicePaths, ...locationPaths, ...comboPaths];
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOPWORDS.has(word));
}

function normalizeParagraph(text: string): string {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function extractMainContent(html: string): {
  text: string;
  paragraphHashes: Set<string>;
} {
  const $ = cheerio.load(html);
  const main = $("main");

  if (!main.length) {
    return { text: "", paragraphHashes: new Set() };
  }

  const paragraphHashes = new Set<string>();

  main.find("p, h2, h3, h4, li").each((_, element) => {
    const paragraph = normalizeParagraph($(element).text());
    if (paragraph.length >= 30) {
      paragraphHashes.add(paragraph);
    }
  });

  const text = main.text().replace(/\s+/g, " ").trim();

  return { text, paragraphHashes };
}

function jaccardSimilarity(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) {
    return 100;
  }

  let intersection = 0;

  for (const value of a) {
    if (b.has(value)) {
      intersection += 1;
    }
  }

  const union = new Set([...a, ...b]).size;

  return union === 0 ? 0 : (intersection / union) * 100;
}

function paragraphOverlap(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) {
    return 100;
  }

  let shared = 0;

  for (const value of a) {
    if (b.has(value)) {
      shared += 1;
    }
  }

  const denominator = Math.min(a.size, b.size);

  return denominator === 0 ? 0 : (shared / denominator) * 100;
}

function duplicateOverlap(pageA: PageContent, pageB: PageContent): number {
  const wordOverlap = jaccardSimilarity(pageA.wordSet, pageB.wordSet);
  const paragraphDup = paragraphOverlap(
    pageA.paragraphHashes,
    pageB.paragraphHashes,
  );

  return Math.max(wordOverlap, paragraphDup);
}

async function fetchPage(
  url: string,
): Promise<{ html: string | null; status: number }> {
  const response = await fetch(`${BASE_URL}${url}`);

  if (!response.ok) {
    return { html: null, status: response.status };
  }

  return { html: await response.text(), status: response.status };
}

async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  mapper: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let index = 0;

  async function worker(): Promise<void> {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await mapper(items[current]!);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => worker()),
  );

  return results;
}

function escapeCsv(value: string | number): string {
  const text = String(value);

  if (text.includes(",") || text.includes('"') || text.includes("\n")) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

async function main(): Promise<void> {
  const urls = buildAuditUrls();
  console.log(`Auditing ${urls.length} URLs against ${BASE_URL}...`);

  const pages = await mapWithConcurrency(urls, CONCURRENCY, async (url) => {
    const { html, status } = await fetchPage(url);

    if (!html) {
      return {
        url,
        status,
        totalWords: 0,
        uniqueWords: 0,
        uniqueRatio: 0,
        wordSet: new Set<string>(),
        paragraphHashes: new Set<string>(),
        isCombo: COMBO_URLS.has(url),
      } satisfies PageContent;
    }

    const { text, paragraphHashes } = extractMainContent(html);
    const tokens = tokenize(text);
    const wordSet = new Set(tokens);
    const totalWords = text.split(/\s+/).filter(Boolean).length;
    const uniqueWords = wordSet.size;
    const uniqueRatio =
      totalWords === 0
        ? 0
        : Number(((uniqueWords / totalWords) * 100).toFixed(1));

    return {
      url,
      status,
      totalWords,
      uniqueWords,
      uniqueRatio,
      wordSet,
      paragraphHashes,
      isCombo: COMBO_URLS.has(url),
    } satisfies PageContent;
  });

  const comboPages = pages.filter(
    (page) => page.isCombo && page.status === 200 && page.totalWords > 0,
  );

  const rows = pages.map((page) => {
    let topDuplicate = "";
    let duplicateOverlapPercent = 0;

    if (page.isCombo) {
      for (const other of comboPages) {
        if (other.url === page.url) {
          continue;
        }

        const overlap = duplicateOverlap(page, other);

        if (overlap > duplicateOverlapPercent) {
          duplicateOverlapPercent = overlap;
          topDuplicate = other.url;
        }
      }
    }

    return {
      url: page.url,
      status: page.status,
      totalWords: page.totalWords,
      uniqueWords: page.uniqueWords,
      uniqueRatio: page.uniqueRatio,
      topDuplicate,
      duplicateOverlapPercent: Number(duplicateOverlapPercent.toFixed(1)),
    };
  });

  const header =
    "url,status,totalWords,uniqueWords,uniqueRatio,topDuplicate,duplicateOverlap%";
  const csv = [
    header,
    ...rows.map((row) =>
      [
        escapeCsv(row.url),
        row.status,
        row.totalWords,
        row.uniqueWords,
        row.uniqueRatio,
        escapeCsv(row.topDuplicate),
        row.duplicateOverlapPercent,
      ].join(","),
    ),
  ].join("\n");

  writeFileSync(OUTPUT_PATH, `${csv}\n`, "utf8");

  const missingPages = rows.filter((row) => row.status !== 200);
  const thinPages = rows.filter(
    (row) => row.status === 200 && row.totalWords < MIN_WORDS,
  );

  const highOverlapCombos = rows.filter(
    (row) =>
      pageIsCombo(row.url) && row.duplicateOverlapPercent > MAX_DUPLICATE_OVERLAP,
  );

  console.log(`\nWrote ${OUTPUT_PATH}`);
  console.log(`Pages audited: ${rows.length}`);
  console.log(`Combo pages: ${comboPages.length}`);
  console.log(`Missing pages (non-200): ${missingPages.length}`);
  console.log(`Thin pages (<${MIN_WORDS} words): ${thinPages.length}`);
  console.log(
    `High-overlap combos (>${MAX_DUPLICATE_OVERLAP}%): ${highOverlapCombos.length}`,
  );

  if (missingPages.length > 0) {
    console.log("\nMissing pages:");
    for (const page of missingPages) {
      console.log(`  ${page.url} — HTTP ${page.status}`);
    }
  }

  if (thinPages.length > 0) {
    console.log("\nThin pages:");
    for (const page of thinPages.slice(0, 20)) {
      console.log(`  ${page.url} — ${page.totalWords} words`);
    }

    if (thinPages.length > 20) {
      console.log(`  ...and ${thinPages.length - 20} more`);
    }
  }

  if (highOverlapCombos.length > 0) {
    console.log("\nHigh-overlap combo pages:");
    for (const page of highOverlapCombos.slice(0, 20)) {
      console.log(
        `  ${page.url} ↔ ${page.topDuplicate} — ${page.duplicateOverlapPercent}%`,
      );
    }

    if (highOverlapCombos.length > 20) {
      console.log(`  ...and ${highOverlapCombos.length - 20} more`);
    }
  }

  if (
    missingPages.length > 0 ||
    thinPages.length > 0 ||
    highOverlapCombos.length > 0
  ) {
    process.exitCode = 1;
  }
}

function pageIsCombo(url: string): boolean {
  return COMBO_URLS.has(url);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
