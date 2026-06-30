import { suburbsForCity } from "@/lib/city-suburbs";
import {
  ALL_CITIES,
  CITY_LABEL,
  CITY_STATE,
  SERVICE_LABEL,
  SERVICE_PRIMARY_KEYWORD,
  SERVICE_SECONDARY_KEYWORDS,
  isCity,
  isService,
  type City,
  type Service,
} from "@/lib/seo-graph";

import { getServiceContent } from "./serviceContent";
import type { ResolvedLocation, ResolvedService } from "./types";

export type ComboFaq = {
  id: string;
  question: string;
  answer: string;
};

export type ComboBodySection = {
  title: string;
  paragraphs: string[];
};

export type ComboPageContent = {
  heroIntro: string;
  localContextParagraphs: string[];
  locationFeatureSections: ComboBodySection[];
  localizedMaterials: string[];
  leadTime: string;
  faqs: ComboFaq[];
};

function locationSectionIndex(locationSlug: string, sectionCount: number): number {
  if (sectionCount === 0) {
    return 0;
  }

  let hash = 0;

  for (const char of locationSlug) {
    hash = (hash + char.charCodeAt(0)) % sectionCount;
  }

  return hash;
}

export function rotateForLocation<T>(items: readonly T[], locationSlug: string, take: number): T[] {
  if (items.length === 0) {
    return [];
  }

  const start = locationSectionIndex(locationSlug, items.length);
  const rotated = [...items.slice(start), ...items.slice(0, start)];

  return rotated.slice(0, Math.min(take, rotated.length));
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function sanitizeComboText(
  text: string,
  owningCity: City,
): string {
  let out = text;

  if (owningCity !== "newcastle") {
    out = out
      .replace(/\bNewcastle workshop\b/gi, "our workshop")
      .replace(/\bour Newcastle workshop\b/gi, "our workshop")
      .replace(/\bfrom Newcastle\b/gi, "from our workshop")
      .replace(/\bNewcastle-crafted\b/gi, "workshop-crafted")
      .replace(/\bNewcastle-based\b/gi, "workshop-based")
      .replace(/\bHunter-based\b/gi, "workshop-based")
      .replace(/\bHunter workshop\b/gi, "our workshop")
      .replace(/\bnot freighted from Sydney\b/gi, "not freighted interstate")
      .replace(/\bNewcastle manufacture programme\b/gi, "standard manufacture programme")
      .replace(/\bmanufacture in our Newcastle workshop\b/gi, "manufacture in our workshop")
      .replace(/\bbuilt in our local workshop\b/gi, "built in our workshop")
      .replace(/\bDesigned in our Newcastle workshop\b/gi, "Designed in our workshop");
  }

  for (const city of ALL_CITIES) {
    if (city === owningCity) {
      continue;
    }

    const label = CITY_LABEL[city];
    const re = new RegExp(`\\b${escapeRegExp(label)}\\b`, "g");
    out = out.replace(re, "");
  }

  return out
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.;])/g, "$1")
    .replace(/,\s*,/g, ",")
    .trim();
}

function sanitizeComboContent(
  content: ComboPageContent,
  city: City,
): ComboPageContent {
  return {
    heroIntro: sanitizeComboText(content.heroIntro, city),
    localContextParagraphs: content.localContextParagraphs.map((p) =>
      sanitizeComboText(p, city),
    ),
    locationFeatureSections: content.locationFeatureSections.map((section) => ({
      title: sanitizeComboText(section.title, city),
      paragraphs: section.paragraphs.map((p) => sanitizeComboText(p, city)),
    })),
    localizedMaterials: content.localizedMaterials.map((p) =>
      sanitizeComboText(p, city),
    ),
    leadTime: sanitizeComboText(content.leadTime, city),
    faqs: content.faqs.map((faq) => ({
      ...faq,
      question: sanitizeComboText(faq.question, city),
      answer: sanitizeComboText(faq.answer, city),
    })),
  };
}

function buildComboHeroIntro(service: Service, city: City): string {
  const svcKw = SERVICE_PRIMARY_KEYWORD[service];
  const cityLbl = CITY_LABEL[city];
  const state = CITY_STATE[city];

  if (service === "office-fitout" && city === "newcastle") {
    return `SteepWood delivers office fit-out in ${cityLbl} ${state}. Reception desks, boardroom credenzas, breakout kitchens, and storage walls for ${cityLbl} CBD and inner-city tenancies — designed, manufactured and installed by our team since 2014 (NSW Carpentry Contractor Licence 489553C).`;
  }

  return `SteepWood delivers ${svcKw} in ${cityLbl} ${state}. Every ${svcKw} project for ${cityLbl} clients is drawn, manufactured and installed by our team — operating since 2014 as Pavit Cabinetry Pty Ltd (NSW Carpentry Contractor Licence 489553C).`;
}

function buildComboServiceDetail(service: Service, city: City): string {
  const svcKw = SERVICE_PRIMARY_KEYWORD[service];
  const secondary = SERVICE_SECONDARY_KEYWORDS[service];
  const cityLbl = CITY_LABEL[city];

  return `Our ${cityLbl} ${svcKw} projects include ${secondary[0]}, ${secondary[1]}, ${secondary[2]} and ${secondary[3]}. Each ${cityLbl} installation uses Polytec, Laminex, Caesarstone, Smartstone, Blum and Häfele components. Drawings, measure and quote are fixed before manufacture begins.`;
}

function buildComboProcessSection(service: Service, city: City, leadTime: string): ComboBodySection {
  const svcLabel = SERVICE_LABEL[service];
  const cityLbl = CITY_LABEL[city];

  return {
    title: `How we work in ${cityLbl}`,
    paragraphs: [
      `We programme ${svcLabel.toLowerCase()} in ${cityLbl} from initial measure through install. Typical lead time: ${leadTime}. Free consultations are offered on qualifying ${cityLbl} projects, with fixed-price quotes within five working days of measurement.`,
      `Install in ${cityLbl} is completed by our own teams or vetted local partners. Every ${cityLbl} project includes shop drawings, material schedules, and our 10-year structural joinery warranty.`,
    ],
  };
}

function buildComboFaqsV3(
  service: Service,
  city: City,
  leadTime: string,
): ComboFaq[] {
  const svcKw = SERVICE_PRIMARY_KEYWORD[service];
  const cityLbl = CITY_LABEL[city];
  const state = CITY_STATE[city];
  const serviceSlug = service;
  const locationSlug = city;

  const costRanges: Partial<Record<Service, string>> = {
    "custom-kitchen-joinery": "$25,000 to $60,000+",
    "built-in-wardrobes": "$8,000 to $18,000",
    "office-fitout": "$80,000 to $250,000",
    "custom-bathroom-vanity": "$4,500 to $12,000",
    "laundry-cabinets": "$3,500 to $9,000",
  };

  const costRange = costRanges[service] ?? "$15,000 to $75,000";

  return [
    {
      id: `${serviceSlug}-${locationSlug}-faq-1`,
      question: `How much does ${svcKw} cost in ${cityLbl}?`,
      answer: `${svcKw} pricing in ${cityLbl} ranges from ${costRange} for a fully installed project, depending on size, materials and finish.`,
    },
    {
      id: `${serviceSlug}-${locationSlug}-faq-2`,
      question: `Do you service all ${cityLbl} suburbs?`,
      answer: `Yes — SteepWood delivers ${svcKw} across greater ${cityLbl} ${state}.`,
    },
    {
      id: `${serviceSlug}-${locationSlug}-faq-3`,
      question: `How long does a ${svcKw} project take in ${cityLbl}?`,
      answer: `From measure to install, typically ${leadTime.replace(" from deposit", "")} for a ${cityLbl} ${svcKw} project.`,
    },
  ];
}

function buildLocalizedMaterials(
  service: ResolvedService,
  location: ResolvedLocation,
): string[] {
  const serviceContent = getServiceContent(service.slug);

  if (!serviceContent || !isService(service.slug) || !isCity(location.slug)) {
    return [];
  }

  const cityLbl = CITY_LABEL[location.slug];
  const svcKw = SERVICE_PRIMARY_KEYWORD[service.slug];

  return [
    `For ${cityLbl} ${svcKw} projects, material selection balances appearance, durability, and local conditions. We specify Polytec, Laminex, 2pac, stone benchtops, and Blum hardware on every ${cityLbl} installation.`,
    ...serviceContent.materials.slice(0, 2).map((paragraph) =>
      sanitizeComboText(paragraph, location.slug as City),
    ),
  ].filter(Boolean);
}

function buildSuburbsSection(service: Service, city: City): ComboBodySection {
  const svcLabel = SERVICE_LABEL[service];
  const cityLbl = CITY_LABEL[city];

  return {
    title: `${cityLbl} suburbs we service`,
    paragraphs: [
      `SteepWood delivers ${svcLabel.toLowerCase()} across ${suburbsForCity(city)} and surrounding ${cityLbl} areas.`,
    ],
  };
}

const LEAD_TIMES: Record<string, string> = {
  newcastle: "8–12 weeks from deposit",
  sydney: "8–14 weeks from deposit",
  canberra: "9–13 weeks from deposit (includes ACT delivery logistics)",
  melbourne: "12–16 weeks from deposit including freight and install scheduling",
  "central-coast": "8–12 weeks from deposit",
  "hunter-valley": "8–12 weeks from deposit",
  "gold-coast": "12–16 weeks from deposit including freight and install scheduling",
  wollongong: "9–13 weeks from deposit",
  brisbane: "12–16 weeks from deposit including freight and install scheduling",
  perth: "14–18 weeks from deposit including freight and install scheduling",
  "byron-bay": "12–16 weeks from deposit including freight and install scheduling",
  "port-macquarie": "10–13 weeks from deposit",
  "coffs-harbour": "11–14 weeks from deposit",
  adelaide: "12–15 weeks from deposit",
  bathurst: "11–14 weeks from deposit",
  orange: "11–14 weeks from deposit",
};

export function getComboContent(
  service: ResolvedService,
  location: ResolvedLocation,
  dbIntro?: string | null,
): ComboPageContent {
  if (!isService(service.slug) || !isCity(location.slug)) {
    const leadTime = LEAD_TIMES[location.slug] ?? "8–14 weeks from deposit";
    return {
      heroIntro: dbIntro ?? service.longIntro,
      localContextParagraphs: [service.longIntro],
      locationFeatureSections: [],
      localizedMaterials: [],
      leadTime,
      faqs: [],
    };
  }

  const serviceKey = service.slug;
  const city = location.slug;
  const leadTime = LEAD_TIMES[city] ?? "6–10 weeks from deposit";

  const raw: ComboPageContent = {
    heroIntro: dbIntro ?? buildComboHeroIntro(serviceKey, city),
    localContextParagraphs: [buildComboServiceDetail(serviceKey, city)],
    locationFeatureSections: [
      buildSuburbsSection(serviceKey, city),
      buildComboProcessSection(serviceKey, city, leadTime),
    ],
    localizedMaterials: buildLocalizedMaterials(service, location),
    leadTime,
    faqs: buildComboFaqsV3(serviceKey, city, leadTime),
  };

  return sanitizeComboContent(raw, city);
}
