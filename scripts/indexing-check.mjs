/**
 * Indexing readiness for every blog URL in the live sitemap, plus the Batch 4 posts.
 * Node only. Exits non-zero when any check fails.
 *
 * Usage: node scripts/indexing-check.mjs [--out report.json]
 */

import { writeFileSync } from "node:fs";

const ORIGIN = "https://steepwood.com.au";
const SITEMAP_URL = `${ORIGIN}/sitemap.xml`;
const IMAGE_SITEMAP_URL = `${ORIGIN}/sitemap-images.xml`;

const BATCH4 = [
  "office-fitout-parramatta",
  "kitchen-installation-lake-macquarie",
  "shop-fitout-maitland",
  "deck-builders-lake-macquarie",
  "restaurant-fitout-newcastle",
  "home-office-joinery-north-shore-sydney",
  "pharmacy-fitout-nsw",
  "warehouse-office-fitout-western-sydney",
  "kitchen-installation-maitland-hunter-valley",
  "childcare-centre-joinery-nsw",
];

const IMAGE_SLOTS = ["hero", "og", "inline-01", "inline-02", "inline-wide"];
const REQUIRED_TYPES = ["BlogPosting", "BreadcrumbList", "FAQPage"];
const PAGE_CONCURRENCY = 2;
const ASSET_CONCURRENCY = 4;

const outFlag = process.argv.indexOf("--out");
const outPath = outFlag === -1 ? null : process.argv[outFlag + 1];

function postUrl(slug) {
  return `${ORIGIN}/blog/${slug}/`;
}

function normalisePageUrl(value) {
  const url = new URL(value, ORIGIN);
  url.hash = "";
  url.search = "";
  if (url.pathname !== "/" && !url.pathname.endsWith("/")) {
    url.pathname = `${url.pathname}/`;
  }
  return url.href;
}

function isPostUrl(pageUrl) {
  return /^https:\/\/steepwood\.com\.au\/blog\/[^/]+\/$/.test(pageUrl);
}

async function getPage(url) {
  let lastError = null;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        redirect: "manual",
        headers: { "user-agent": "SteepWoodIndexingCheck/1.0" },
        signal: AbortSignal.timeout(25000),
      });
      const html = response.status === 200 ? await response.text() : "";
      return { status: response.status, headers: response.headers, html, location: response.headers.get("location") };
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)));
    }
  }
  throw lastError;
}

async function statusOf(url) {
  let lastError = null;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        redirect: "follow",
        method: "GET",
        headers: { "user-agent": "SteepWoodIndexingCheck/1.0" },
        signal: AbortSignal.timeout(25000),
      });
      try {
        await response.body?.cancel();
      } catch {
        // The status is already known. Dropping the body is best-effort.
      }
      if (response.status === 429 || response.status >= 500) {
        await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
        lastError = new Error(`HTTP ${response.status}`);
        continue;
      }
      return response.status;
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)));
    }
  }
  return 0;
}

async function mapPool(items, limit, fn) {
  const results = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await fn(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return results;
}

function canonicalHref(html) {
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const tag = match[0];
    if (!/\brel=["']canonical["']/i.test(tag)) continue;
    const href = tag.match(/\bhref=["']([^"']+)["']/i);
    if (href?.[1]) return href[1];
  }
  return null;
}

function hasNoindex(html, headers) {
  const header = headers.get("x-robots-tag") ?? "";
  if (/noindex/i.test(header)) return true;
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = match[0];
    if (!/\bname=["'](?:robots|googlebot)["']/i.test(tag)) continue;
    const content = tag.match(/\bcontent=["']([^"']+)["']/i);
    if (content?.[1] && /noindex/i.test(content[1])) return true;
  }
  return false;
}

function hasPlaceholderImage(html) {
  if (html.includes("Image placeholder")) return true;
  for (const match of html.matchAll(/<(?:img|source)\b[^>]*>/gi)) {
    const src = match[0].match(/\b(?:src|srcset)=["']([^"']+)["']/i);
    if (src?.[1] && /placeholder/i.test(src[1])) return true;
  }
  return false;
}

function collectTypes(value, types) {
  if (Array.isArray(value)) {
    for (const item of value) collectTypes(item, types);
    return;
  }
  if (!value || typeof value !== "object") return;
  const type = value["@type"];
  if (typeof type === "string") types.add(type);
  if (Array.isArray(type)) {
    for (const entry of type) {
      if (typeof entry === "string") types.add(entry);
    }
  }
  for (const child of Object.values(value)) collectTypes(child, types);
}

function collectLegalNames(value, names) {
  if (Array.isArray(value)) {
    for (const item of value) collectLegalNames(item, names);
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    if (key === "legalName" && typeof child === "string") names.push(child);
    else collectLegalNames(child, names);
  }
}

function parseJsonLd(html) {
  const errors = [];
  const types = new Set();
  const legalNames = [];
  const blocks = [
    ...html.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];
  if (blocks.length === 0) errors.push("no JSON-LD blocks");
  for (const block of blocks) {
    try {
      const data = JSON.parse(block[1]);
      collectTypes(data, types);
      collectLegalNames(data, legalNames);
    } catch (error) {
      errors.push(`JSON-LD parse: ${error instanceof Error ? error.message : "invalid"}`);
    }
  }
  return { errors, types, legalNames };
}

function internalLinks(html, pageUrl) {
  const found = new Set();
  for (const match of html.matchAll(/\bhref=["']([^"']+)["']/gi)) {
    const href = match[1];
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:")
    ) {
      continue;
    }
    let url;
    try {
      url = new URL(href, pageUrl);
    } catch {
      continue;
    }
    if (url.hostname !== "steepwood.com.au") continue;
    if (
      url.pathname.startsWith("/_next/") ||
      url.pathname.startsWith("/api/") ||
      url.pathname.startsWith("/admin/")
    ) {
      continue;
    }
    if (/\.(?:jpe?g|png|gif|webp|avif|svg|css|js|mjs|woff2?|ico|xml|txt|pdf|map)$/i.test(url.pathname)) {
      continue;
    }
    url.hash = "";
    url.search = "";
    if (url.pathname !== "/" && !url.pathname.endsWith("/")) {
      url.pathname = `${url.pathname}/`;
    }
    const absolute = url.href;
    if (absolute !== pageUrl) found.add(absolute);
  }
  return [...found];
}

function imageUrls(slug) {
  return IMAGE_SLOTS.map((slot) => `${ORIGIN}/blog/${slug}/` + `${slot}.jpg`);
}

async function main() {
  const sitemapResponse = await fetch(SITEMAP_URL, { signal: AbortSignal.timeout(25000) });
  if (sitemapResponse.status !== 200) {
    throw new Error(`Sitemap HTTP ${sitemapResponse.status}`);
  }
  const sitemapXml = await sitemapResponse.text();
  const sitemapUrls = new Set(
    [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => normalisePageUrl(match[1])),
  );

  const imageResponse = await fetch(IMAGE_SITEMAP_URL, { signal: AbortSignal.timeout(25000) });
  if (imageResponse.status !== 200) {
    throw new Error(`Image sitemap HTTP ${imageResponse.status}`);
  }
  const imageXml = await imageResponse.text();
  const imageLocs = new Set(
    [...imageXml.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((match) => match[1].trim()),
  );

  const blogUrls = [...sitemapUrls].filter((url) => url.includes("/blog/"));
  const targets = [...new Set([...blogUrls, ...BATCH4.map(postUrl)])].sort();
  console.log(`Checking ${targets.length} blog URLs (${blogUrls.length} in sitemap).`);

  const pages = await mapPool(targets, PAGE_CONCURRENCY, async (pageUrl) => {
    try {
      const page = await getPage(pageUrl);
      return { pageUrl, ...page };
    } catch (error) {
      return {
        pageUrl,
        status: 0,
        headers: new Headers(),
        html: "",
        location: error instanceof Error ? error.message : "fetch failed",
      };
    }
  });

  const assetCache = new Map();
  async function cachedStatus(url) {
    const existing = assetCache.get(url);
    if (existing) return existing;
    const pending = statusOf(url);
    assetCache.set(url, pending);
    return pending;
  }

  const assetUrls = new Set();
  const linkUrls = new Set();
  const knownStatus = new Map(pages.map((page) => [page.pageUrl, Promise.resolve(page.status)]));
  const parsed = pages.map((page) => {
    const slug = page.pageUrl.match(/\/blog\/([^/]+)\/$/)?.[1] ?? null;
    const images = slug ? imageUrls(slug) : [];
    const links = page.html ? internalLinks(page.html, page.pageUrl) : [];
    for (const image of images) assetUrls.add(image);
    for (const link of links) {
      if (!knownStatus.has(link)) linkUrls.add(link);
    }
    return { ...page, slug, images, links };
  });
  for (const [url, status] of knownStatus) assetCache.set(url, status);

  await mapPool([...assetUrls, ...linkUrls], ASSET_CONCURRENCY, (url) => cachedStatus(url));

  const rows = [];
  for (const page of parsed) {
    const failures = [];
    const isPost = isPostUrl(page.pageUrl);

    if (page.status !== 200) {
      failures.push(
        `HTTP ${page.status}${page.location ? ` redirect ${page.location}` : ""}`,
      );
    }

    if (page.status === 200) {
      const canonical = canonicalHref(page.html);
      if (!canonical) failures.push("canonical missing");
      else if (normalisePageUrl(canonical) !== page.pageUrl) {
        failures.push(`canonical ${canonical}`);
      }

      if (hasNoindex(page.html, page.headers)) failures.push("noindex");

      if (!sitemapUrls.has(page.pageUrl)) failures.push("missing from sitemap.xml");

      if (hasPlaceholderImage(page.html)) failures.push("placeholder image");

      if (page.html.includes("Pavit Cabinetry")) failures.push('text contains "Pavit Cabinetry"');

      const jsonLd = parseJsonLd(page.html);
      for (const error of jsonLd.errors) failures.push(error);
      const badNames = jsonLd.legalNames.filter((name) => name !== "Pavit Pty Ltd");
      if (badNames.length > 0) failures.push(`legalName ${badNames.join(", ")}`);

      if (isPost) {
        for (const type of REQUIRED_TYPES) {
          if (!jsonLd.types.has(type)) failures.push(`missing ${type}`);
        }
        for (const image of page.images) {
          const listed = imageLocs.has(image);
          const onPage = page.html.includes(image.slice(ORIGIN.length));
          const status = await assetCache.get(image);
          if (!onPage) failures.push(`image not on page ${image}`);
          if (!listed) failures.push(`image not in sitemap-images.xml ${image}`);
          if (status !== 200) failures.push(`image HTTP ${status} ${image}`);
        }
      }

      if (page.links.length < 3) {
        failures.push(`only ${page.links.length} internal links`);
      }
      for (const link of page.links) {
        const status = await assetCache.get(link);
        if (status !== 200) failures.push(`link HTTP ${status} ${link}`);
      }
    }

    rows.push({
      url: page.pageUrl,
      ok: failures.length === 0,
      failures,
    });
  }

  const failed = rows.filter((row) => !row.ok);
  console.log("");
  console.log("url\tresult");
  for (const row of rows) {
    console.log(`${row.url}\t${row.ok ? "PASS" : "FAIL"}`);
  }
  console.log("");
  console.log(`${rows.length - failed.length}/${rows.length} passed.`);

  if (failed.length > 0) {
    console.log("");
    for (const row of failed) {
      console.log(`FAIL ${row.url}`);
      for (const failure of row.failures) console.log(`  - ${failure}`);
    }
  }

  if (outPath) {
    writeFileSync(outPath, JSON.stringify({ checked: rows.length, failed: failed.length, rows }, null, 2));
    console.log(`Wrote ${outPath}`);
  }

  if (failed.length > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
