/**
 * Build-time SEO linter — enforces cannibalisation rules from CURSOR_PROMPT_V3_SITEWIDE.
 * Run: pnpm seo:lint
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { getComboContent } from "../src/lib/services-locations/comboContent";
import { getLocationContent } from "../src/lib/services-locations/locationContent";
import { getLocationDefinition } from "../src/lib/services-locations/locations";
import { getServiceContent } from "../src/lib/services-locations/serviceContent";
import { getServiceDefinition } from "../src/lib/services-locations/services";
import {
  ALL_CITIES,
  ALL_SERVICES,
  CITY_LABEL,
  type City,
  type Service,
} from "../src/lib/seo-graph";

type Violation = { file: string; rule: string; detail: string };

const violations: Violation[] = [];

function countLabelMentions(text: string, label: string): number {
  const regex = new RegExp(`\\b${label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
  return (text.match(regex) ?? []).length;
}

function collectServiceHubText(slug: Service): string {
  const content = getServiceContent(slug);
  if (!content) {
    return "";
  }

  const parts: string[] = [
    content.heroIntro,
    ...content.whatIsParagraphs,
    ...content.materials,
    ...content.bodySections.flatMap((section) => [
      section.title,
      ...section.paragraphs,
    ]),
    ...content.processSteps.map((step) => `${step.title} ${step.description}`),
    ...content.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ];

  return parts.join("\n");
}

function collectLocationHubText(city: City): string {
  const content = getLocationContent(city);
  if (!content) {
    return "";
  }

  const parts: string[] = [
    content.heroIntro,
    ...content.introParagraphs,
    content.architecturalStyles,
    content.localContext ?? "",
    ...content.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ];

  return parts.join("\n");
}

function collectComboText(service: Service, city: City): string {
  const serviceDef = getServiceDefinition(service);
  const locationDef = getLocationDefinition(city);

  if (!serviceDef || !locationDef) {
    return "";
  }

  const resolvedService = { ...serviceDef, projectCount: 0 };
  const resolvedLocation = { ...locationDef, projectCount: 0 };
  const content = getComboContent(resolvedService, resolvedLocation);

  const parts: string[] = [
    content.heroIntro,
    ...content.localContextParagraphs,
    ...content.locationFeatureSections.flatMap((section) => [
      section.title,
      ...section.paragraphs,
    ]),
    ...content.localizedMaterials,
    content.leadTime,
    ...content.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ];

  return parts.join("\n");
}

function walkPageFiles(dir: string): string[] {
  const out: string[] = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const filePath = join(dir, entry.name);

    if (entry.isDirectory()) {
      out.push(...walkPageFiles(filePath));
    } else if (
      /^page\.(tsx|mdx)$/.test(entry.name) ||
      /Page\.tsx$/.test(entry.name) ||
      /Hero\.tsx$/.test(entry.name)
    ) {
      out.push(filePath);
    }
  }

  return out;
}

// Rule: combo pages must not mention other cities in body content
for (const service of ALL_SERVICES) {
  for (const city of ALL_CITIES) {
    const text = collectComboText(service, city);
    const url = `/${service}/${city}/`;

    for (const otherCity of ALL_CITIES) {
      if (otherCity === city) {
        continue;
      }

      const label = CITY_LABEL[otherCity];
      const count = countLabelMentions(text, label);

      if (count > 0) {
        violations.push({
          file: url,
          rule: "combo-no-other-cities",
          detail: `Mentions ${label} (${count}x) on combo page`,
        });
      }
    }
  }
}

// Rule: service hub — each city at most once in body copy
for (const service of ALL_SERVICES) {
  const text = collectServiceHubText(service);
  const url = `/${service}/`;

  for (const city of ALL_CITIES) {
    const label = CITY_LABEL[city];
    const count = countLabelMentions(text, label);

    if (count > 1) {
      violations.push({
        file: url,
        rule: "hub-city-once",
        detail: `${label} appears ${count}x on service hub (max 1)`,
      });
    }
  }
}

// Rule: location hub — must not mention other cities (except nearby section is ok with links)
// Flag other-city mentions in intro/body (excluding owning city)
for (const city of ALL_CITIES) {
  const text = collectLocationHubText(city);
  const url = `/locations/${city}/`;
  const ownLabel = CITY_LABEL[city];

  for (const otherCity of ALL_CITIES) {
    if (otherCity === city) {
      continue;
    }

    const label = CITY_LABEL[otherCity];
    const count = countLabelMentions(text, label);

    if (count > 0) {
      violations.push({
        file: url,
        rule: "location-no-other-cities",
        detail: `Mentions ${label} (${count}x) on city hub (owner: ${ownLabel})`,
      });
    }
  }
}

// Rule: exactly one <h1> per page component / route file
const h1ScanRoots = [
  join(process.cwd(), "src", "app"),
  join(process.cwd(), "src", "components", "pages"),
  join(process.cwd(), "src", "components", "sections", "about"),
];

for (const root of h1ScanRoots) {
  for (const file of walkPageFiles(root)) {
    const txt = readFileSync(file, "utf8");
    const h1Count = (txt.match(/<h1[\s>]/g) ?? []).length;

    if (h1Count !== 1 && h1Count > 0) {
      violations.push({
        file,
        rule: "one-h1",
        detail: `Found ${h1Count} <h1> tags (expected 1)`,
      });
    }
  }
}

if (violations.length) {
  console.error(`SEO lint: ${violations.length} violation(s)`);
  for (const violation of violations) {
    console.error(`  [${violation.rule}] ${violation.file} — ${violation.detail}`);
  }
  process.exit(1);
} else {
  console.log("SEO lint: clean");
}
