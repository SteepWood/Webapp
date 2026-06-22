/**
 * Quick overlap check for combo pages using the same token logic as audit-content.ts.
 * Run: pnpm tsx scripts/audit-combo-sample.ts
 */
import { getComboContent, rotateForLocation } from "../src/lib/services-locations/comboContent";
import { getServiceContent } from "../src/lib/services-locations/serviceContent";
import { getLocationContent } from "../src/lib/services-locations/locationContent";
import { LOCATIONS } from "../src/lib/services-locations/locations";
import { SERVICES } from "../src/lib/services-locations/services";

const STOPWORDS = new Set(["the", "and", "for", "with", "from", "our", "your", "you", "this", "that", "are", "is", "in", "to", "of", "a", "we"]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOPWORDS.has(word));
}

function jaccard(a: Set<string>, b: Set<string>): number {
  let intersection = 0;
  for (const value of a) {
    if (b.has(value)) intersection += 1;
  }
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : (intersection / union) * 100;
}

function buildComboText(serviceSlug: string, locationSlug: string): string {
  const service = SERVICES.find((entry) => entry.slug === serviceSlug)! as import("../src/lib/services-locations/types").ResolvedService;
  const locationDef = LOCATIONS.find((entry) => entry.slug === locationSlug)!;
  const location = { ...locationDef, projectCount: 0 };
  const content = getComboContent(service, location);
  const serviceContent = getServiceContent(serviceSlug);
  const locationContent = getLocationContent(locationSlug);

  const chunks = [
    content.heroIntro,
    ...content.localContextParagraphs,
    ...content.locationFeatureSections.flatMap((section) => [
      section.title,
      ...section.paragraphs,
    ]),
    ...content.localizedMaterials,
    ...content.faqs.flatMap((faq) => [faq.question, faq.answer]),
    locationContent?.coveredSuburbs.join(" ") ?? "",
  ];

  if (serviceContent) {
    const includes = rotateForLocation(serviceContent.includes, locationSlug, 4);
    const processSteps = rotateForLocation(
      serviceContent.processSteps,
      locationSlug,
      3,
    );

    chunks.push(
      ...includes.flatMap((item) => [
        item.title,
        `${item.description} Typical for ${location.name} ${service.shortTitle.toLowerCase()} projects.`,
      ]),
      ...processSteps.flatMap((step) => [
        step.title,
        `${step.description} For ${location.name} projects, this step is scheduled within our ${content.leadTime} programme.`,
      ]),
    );
  }

  return chunks.join(" ");
}

const serviceSlug = "custom-kitchen-joinery";
const pairs = [
  ["newcastle", "orange"],
  ["sydney", "wollongong"],
  ["brisbane", "gold-coast"],
  ["perth", "adelaide"],
] as const;

for (const [a, b] of pairs) {
  const tokensA = new Set(tokenize(buildComboText(serviceSlug, a)));
  const tokensB = new Set(tokenize(buildComboText(serviceSlug, b)));
  const overlap = jaccard(tokensA, tokensB).toFixed(1);
  console.log(`${serviceSlug}/${a} ↔ ${serviceSlug}/${b}: ${overlap}% token overlap`);
}

const failures = pairs.filter(([a, b]) => {
  const tokensA = new Set(tokenize(buildComboText(serviceSlug, a)));
  const tokensB = new Set(tokenize(buildComboText(serviceSlug, b)));
  return jaccard(tokensA, tokensB) > 70;
});

if (failures.length > 0) {
  console.log(`\n${failures.length} sample pair(s) still above 70% threshold.`);
  process.exitCode = 1;
} else {
  console.log("\nAll sample pairs at or below 70% token overlap.");
}
