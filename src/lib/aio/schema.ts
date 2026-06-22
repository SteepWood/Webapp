import { env } from "@/env";
import { FOUNDER_JOB_TITLE, FOUNDER_NAME } from "@/lib/business";
import { PHASE2_AREA_SERVED } from "@/lib/seo/areaServed";
import type { ResolvedLocation, ResolvedService } from "@/lib/services-locations/types";

const SITE_URL = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");

export const FOUNDER_PERSON_ID = `${SITE_URL}/#founder`;

const FOUNDER_KNOWS_ABOUT = [
  "Custom joinery",
  "Cabinet making",
  "Commercial fitout",
  "Australian timber species",
] as const;

export function founderPersonStructuredData() {
  return {
    "@type": "Person",
    "@id": FOUNDER_PERSON_ID,
    name: FOUNDER_NAME,
    jobTitle: FOUNDER_JOB_TITLE,
    worksFor: { "@id": `${SITE_URL}/#organization` },
    knowsAbout: [...FOUNDER_KNOWS_ABOUT],
    url: `${SITE_URL}/about/`,
  };
}

type ProcessStep = {
  title: string;
  description: string;
};

export function placeStructuredData(location: ResolvedLocation) {
  const wikiEntry = PHASE2_AREA_SERVED.find(
    (entry) => entry.name.toLowerCase() === location.name.toLowerCase(),
  );

  return {
    "@context": "https://schema.org",
    "@type": "Place",
    ...(wikiEntry?.["@id"] ? { "@id": wikiEntry["@id"] } : {}),
    name: `${location.name}, New South Wales`,
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: `${location.state ?? "NSW"}, Australia`,
    },
  };
}

const HOW_TO_SERVICES = new Set([
  "custom-kitchen-joinery",
  "built-in-wardrobes",
  "office-fitout",
  "shopfitting",
]);

export function howToStructuredData(
  service: ResolvedService,
  processSteps: ProcessStep[],
) {
  if (!HOW_TO_SERVICES.has(service.slug) || processSteps.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How SteepWood designs and installs ${service.name.toLowerCase()}`,
    step: processSteps.map((step) => ({
      "@type": "HowToStep",
      name: step.title,
      text: step.description,
    })),
  };
}

export function speakableStructuredData(pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    speakable: {
      "@type": "SpeakableSpecification",
      xpath: [
        "//section[@id='faq']//*[contains(@class,'answer-first')]",
        "[data-aio='identity-block']",
      ],
    },
  };
}

export function aioGraphStructuredData(
  blocks: Record<string, unknown>[],
): Record<string, unknown>[] {
  return blocks.filter((block): block is Record<string, unknown> => block !== null);
}

export { SITE_URL as aioSiteUrl };
