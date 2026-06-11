import { getLocationContent } from "./locationContent";
import { getServiceContent } from "./serviceContent";
import type { ResolvedLocation, ResolvedService } from "./types";

export type ComboFaq = {
  id: string;
  question: string;
  answer: string;
};

export type ComboPageContent = {
  heroIntro: string;
  localContextParagraphs: string[];
  leadTime: string;
  faqs: ComboFaq[];
};

const STYLE_DESCRIPTORS: Record<string, string> = {
  newcastle:
    "homes and businesses — from Federation cottages in Hamilton to coastal residences in Merewether —",
  sydney:
    "homes — from Federation terraces in the Inner West, to Hamptons-style residences on the Northern Beaches, to handleless contemporary kitchens on the Lower North Shore —",
  canberra:
    "homes and businesses — from executive residences in Forrest and Yarralumla, to contemporary new builds in Wright and Coombs, to professional offices in Barton and Braddon —",
  melbourne:
    "homes — from Edwardian terraces in Fitzroy, to Hamptons kitchens in Brighton and Toorak, to warehouse conversions in Collingwood —",
  "central-coast":
    "homes — from beach-front properties at Avoca and Terrigal, to family residences in Gosford and Erina —",
  "hunter-valley":
    "homes and businesses — from country estates in Pokolbin, to family residences in Maitland and Cessnock, to cellar doors and hospitality venues —",
  "gold-coast":
    "homes — from beach-front apartments in Surfers Paradise, to canal estates in Mermaid Waters, to luxury coastal residences in Burleigh Heads —",
  wollongong:
    "homes — from escarpment-and-ocean properties in Thirroul and Austinmer, to established family residences across the Illawarra —",
  brisbane:
    "homes — from Queenslanders in Paddington and Bardon, to Hamptons-style residences in Chelmer and Bulimba, to contemporary apartments in Newstead —",
  perth:
    "homes — from coastal Hamptons-style residences in Cottesloe and Dalkeith, to executive homes in Subiaco and Floreat —",
  "byron-bay":
    "homes and businesses — from coastal lifestyle properties in Suffolk Park, to hospitality fitouts across the Northern Rivers —",
  "port-macquarie":
    "homes — from sea-change coastal properties at Town Beach and Lighthouse Beach, to new builds in Lake Cathie and Bonny Hills —",
  "coffs-harbour":
    "homes — from established brick residences in Coffs Harbour and Sawtell, to hinterland properties around Bellingen —",
  adelaide:
    "homes — from Federation and Tudor residences in North Adelaide and Unley, to coastal properties in Glenelg and Brighton —",
  bathurst:
    "homes — from Federation cottages in West Bathurst, to rural-residential country estates, to new-build executive homes in Kelso —",
  orange:
    "homes — from wine-country contemporary residences, to heritage Federation properties, to new-build executive homes in Bowen and East Orange —",
};

const DEMAND_PHRASES: Record<string, string> = {
  "custom-kitchen-joinery":
    "hold up to the area's most discerning design standards and the demands of daily family cooking",
  "built-in-wardrobes":
    "maximise bedroom storage without compromising ceiling height, proportions, or resale value",
  "office-fitout":
    "support productive teams, impress clients, and reflect a considered workplace brand",
  shopfitting:
    "translate brand identity into a physical retail environment that converts foot traffic",
  "custom-bathroom-vanity":
    "perform in humid wet-room environments while delivering a premium finished appearance",
  "commercial-joinery":
    "meet commercial durability standards, compliance requirements, and demanding daily use",
  "custom-furniture":
    "fit exact room dimensions with timber species and finishes suited to Australian living",
  "home-office-joinery":
    "support productive remote work with integrated storage, cable management, and a professional backdrop",
  "laundry-cabinets":
    "withstand daily moisture, steam, and utility use while maximising functional storage",
  "staircase-joinery":
    "combine structural compliance, safety, and a design feature worthy of the home's entrance",
};

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

function buildComboFaqs(
  service: ResolvedService,
  location: ResolvedLocation,
  serviceSlug: string,
  locationSlug: string,
): ComboFaq[] {
  const serviceContent = getServiceContent(serviceSlug);
  const locationContent = getLocationContent(locationSlug);
  const leadTime = LEAD_TIMES[locationSlug] ?? "8–14 weeks from deposit";

  const items: { question: string; answer: string }[] = [
    {
      question: `How much does ${service.shortTitle.toLowerCase()} cost in ${location.name}?`,
      answer:
        serviceContent?.faqs[0]?.answer ??
        `Project costs depend on scope, materials, and finish level. Contact us for a fixed-price quote tailored to your ${location.name} home or business.`,
    },
    {
      question: `What is the lead time for ${service.shortTitle.toLowerCase()} in ${location.name}?`,
      answer: `${leadTime}. We provide a detailed programme at quote stage, including design, manufacture in our Newcastle workshop, and install in ${location.name}.`,
    },
    {
      question: `Do you charge a travel fee for ${location.name} projects?`,
      answer:
        locationContent?.faqs[0]?.answer ??
        `We offer free in-home consultations and site measures on qualifying projects across ${location.name}.`,
    },
    {
      question:
        serviceContent?.faqs[1]?.question ??
        `How long does ${service.name.toLowerCase()} take to build?`,
      answer:
        serviceContent?.faqs[1]?.answer ??
        `Lead times vary by scope. Most ${service.shortTitle.toLowerCase()} projects in ${location.name} follow our standard Newcastle manufacture programme with local or freight delivery.`,
    },
    {
      question:
        locationContent?.faqs[1]?.question ??
        `Do you work with ${location.name} builders and architects?`,
      answer:
        locationContent?.faqs[1]?.answer ??
        `Yes — we work with homeowners, builders, and designers across ${location.name} and provide shop drawings on request.`,
    },
  ];

  return items.map((item, index) => ({
    id: `${serviceSlug}-${locationSlug}-faq-${index + 1}`,
    question: item.question,
    answer: item.answer,
  }));
}

export function getComboContent(
  service: ResolvedService,
  location: ResolvedLocation,
  dbIntro?: string | null,
): ComboPageContent {
  const serviceContent = getServiceContent(service.slug);
  const locationContent = getLocationContent(location.slug);

  const styleDescriptor =
    STYLE_DESCRIPTORS[location.slug] ??
    `homes and businesses across ${location.name} —`;
  const demandPhrase =
    DEMAND_PHRASES[service.slug] ??
    "demand joinery built to measure with premium materials and a fixed-price contract";
  const leadTime = LEAD_TIMES[location.slug] ?? "8–14 weeks from deposit";

  const serviceExcerpt =
    serviceContent?.whatIsParagraphs[0] ?? service.longIntro;
  const locationExcerpt =
    locationContent?.introParagraphs[0] ?? location.areaDescription;

  const heroIntro =
    dbIntro ??
    `Bespoke ${service.shortTitle.toLowerCase()} for ${location.name} homes and businesses. Designed in our Newcastle workshop, delivered ${location.driveTimeShort === "local" ? "locally" : "Australia-wide"}. Fixed-price quotes, free consultations.`;

  const openingParagraph = `${location.name} ${styleDescriptor} demand joinery that ${demandPhrase}. SteepWood services ${location.name} from our Newcastle workshop${location.slug === "newcastle" ? "" : ` — ${location.driveTimeFromNewcastle}`} — with the design literacy of a premium boutique joiner and the pricing flexibility of Hunter-based manufacturing.`;

  const serviceParagraph = serviceExcerpt;

  const closingParagraph =
    location.slug === "newcastle"
      ? `Free in-home consultation across Greater Newcastle. Fixed-price quote within 5 working days of measure. Manufacturing ${leadTime}. Install by our own local teams.`
      : `Free consultation for qualifying ${location.name} projects. Fixed-price quote within 5 working days of measure. Manufacturing ${leadTime}. Install by our own teams or vetted local partners.`;

  return {
    heroIntro,
    localContextParagraphs: [
      openingParagraph,
      serviceParagraph,
      closingParagraph,
    ],
    leadTime,
    faqs: buildComboFaqs(service, location, service.slug, location.slug),
  };
}
