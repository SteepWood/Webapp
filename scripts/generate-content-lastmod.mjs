/**
 * Writes src/lib/seo/content-lastmod.json from each file's last git commit date.
 * Commit the JSON so production builds do not depend on a full git history.
 */
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";

const FILES = [
  "src/app/page.tsx",
  "src/app/about/page.tsx",
  "src/app/contact/page.tsx",
  "src/app/quote/page.tsx",
  "src/app/portfolio/page.tsx",
  "src/app/blog/page.tsx",
  "src/app/search/page.tsx",
  "src/app/locations/page.tsx",
  "src/app/legal/privacy/page.tsx",
  "src/app/legal/terms/page.tsx",
  "src/app/legal/consumer-rights/page.tsx",
  "src/lib/services-locations/serviceContent.ts",
  "src/lib/services-locations/services.ts",
  "src/components/pages/ServicePillarPage.tsx",
  "src/lib/services-locations/locationContent.ts",
  "src/lib/services-locations/locationHubExtensions.ts",
  "src/lib/services-locations/locations.ts",
  "src/components/pages/LocationHubPage.tsx",
  "src/lib/services-locations/comboContent.ts",
  "src/components/pages/ServiceLocationPage.tsx",
];

const dates = {};

for (const relPath of FILES) {
  const iso = execFileSync(
    "git",
    ["log", "-1", "--format=%cI", "--", relPath],
    { encoding: "utf8" },
  ).trim();

  if (!/^\d{4}-\d{2}-\d{2}T/.test(iso)) {
    throw new Error(`No git commit date for ${relPath}.`);
  }

  dates[relPath] = iso.slice(0, 10);
  console.log(`${dates[relPath]}  ${relPath}`);
}

const outPath = path.join("src", "lib", "seo", "content-lastmod.json");
writeFileSync(outPath, `${JSON.stringify(dates, null, 2)}\n`, "utf8");
console.log(`Wrote ${outPath}`);
