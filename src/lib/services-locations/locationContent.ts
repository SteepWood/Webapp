import { LOCATIONS } from "./locations";
import type { LocationDefinition } from "./types";

export type LocationFaq = {
  id: string;
  question: string;
  answer: string;
};

export type LocationHubContent = {
  heroIntro: string;
  introParagraphs: string[];
  coveredSuburbs: string[];
  architecturalStyles: string;
  nearbyLocationSlugs: string[];
  portfolioSearchNames: string[];
  faqs: LocationFaq[];
};

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function buildFaqs(
  slug: string,
  items: { question: string; answer: string }[],
): LocationFaq[] {
  return items.map((item, index) => ({
    id: `${slug}-faq-${index + 1}`,
    question: item.question,
    answer: item.answer,
  }));
}

function suburbs(...names: string[]): string[] {
  return names.slice(0, 15);
}

const LOCATION_CONTENT: Record<string, LocationHubContent> = {};

function defineLocation(
  slug: string,
  content: Omit<LocationHubContent, "faqs"> & {
    faqs: { question: string; answer: string }[];
  },
): void {
  LOCATION_CONTENT[slug] = {
    ...content,
    faqs: buildFaqs(slug, content.faqs),
  };
}

defineLocation("newcastle", {
  heroIntro:
    "Newcastle is where SteepWood lives and works. Our workshop and design studio are based here, which means every piece of joinery we make for a Newcastle home or business is built within driving distance of the people who will use it.",
  introParagraphs: splitParagraphs(
    `Newcastle is where SteepWood lives and works. Our workshop and design studio are based here, which means every piece of joinery we make for a Newcastle home or business is built within driving distance of the people who will use it. That matters: it means faster consultations, on-the-spot site measures, and the ability to call past clients for a reference walk-through within the same suburb. We are not a Sydney joinery business with a "service area" pin dropped on Newcastle — we are Newcastle joiners, with a Newcastle workshop, working on Newcastle homes.

We design and build for the full range of Newcastle housing: Federation cottages in Hamilton and Cooks Hill that need joinery to suit period detail; coastal homes in Merewether, Bar Beach, and Newcastle East where moisture resistance and finish durability matter most; family homes across the Hunter region from Maryland to Lake Macquarie; and apartment renovations in Newcastle West and Honeysuckle where every centimetre of cabinetry has to earn its place.

We also serve Newcastle's commercial market: cafes and restaurants along Beaumont and Darby Street, retail tenancies in Marketown and Charlestown Square, professional offices around the CBD, and hospitality fitouts across the Hunter.`,
  ),
  coveredSuburbs: suburbs(
    "Newcastle CBD",
    "Newcastle East",
    "Newcastle West",
    "Hamilton",
    "Cooks Hill",
    "The Hill",
    "Merewether",
    "Bar Beach",
    "Charlestown",
    "Adamstown",
    "New Lambton",
    "Mayfield",
    "Stockton",
    "Wickham",
    "Islington",
  ),
  architecturalStyles:
    "Federation weatherboard, Californian bungalow, Inter-war brick, post-war fibro renovation, contemporary coastal, mid-century brick, beach-front contemporary, Hamilton terrace, industrial conversion (Honeysuckle).",
  nearbyLocationSlugs: [
    "hunter-valley",
    "central-coast",
    "sydney",
    "wollongong",
    "port-macquarie",
  ],
  portfolioSearchNames: ["Newcastle", "Merewether", "Hamilton", "Lake Macquarie"],
  faqs: [
    {
      question: "Where is SteepWood's workshop in Newcastle?",
      answer:
        "Our workshop is in Newcastle, NSW. We host design consultations by appointment.",
    },
    {
      question: "Do you do joinery for heritage and Federation Newcastle homes?",
      answer:
        "Yes — we routinely match period mouldings, architraves, and door profiles for Hamilton, Cooks Hill, and The Hill heritage renovations.",
    },
    {
      question: "What is the typical lead time for a Newcastle kitchen?",
      answer:
        "8–12 weeks from deposit. Faster than Sydney/Melbourne projects because we don't need interstate logistics.",
    },
    {
      question: "Do you work with Newcastle builders and architects?",
      answer:
        "Yes — we provide architect-grade shop drawings on request and work with local builders across the Hunter.",
    },
    {
      question:
        "Can you replace just the kitchen doors and benchtop without changing carcasses?",
      answer:
        "Yes — door + benchtop refresh is a common Newcastle project, ~$8,000–$18,000.",
    },
    {
      question: "What suburbs of Newcastle do you cover for free in-home consultations?",
      answer:
        "All Newcastle LGA, Lake Macquarie, Maitland, Cessnock LGAs at no charge. Hunter Valley and Central Coast: free for projects over $20,000.",
    },
  ],
});

defineLocation("sydney", {
  heroIntro:
    "Sydney is Australia's largest joinery market and one of the most discerning. SteepWood services Sydney from our Newcastle workshop — two hours up the M1 — which means we bring high-end Sydney design sensibilities together with the manufacturing capacity and pricing of a Hunter-based workshop.",
  introParagraphs: splitParagraphs(
    `Sydney is Australia's largest joinery market and one of the most discerning. From Hamptons-style kitchens on the Northern Beaches, to handleless contemporary cabinetry in Mosman and the Eastern Suburbs, to Federation restorations in the Inner West, Sydney homeowners expect a level of finish and design literacy that goes beyond the average joinery brand. SteepWood services Sydney from our Newcastle workshop — two hours up the M1 — which means we bring high-end Sydney design sensibilities together with the manufacturing capacity and pricing of a Hunter-based workshop.

We work with Sydney homeowners, builders, architects, and interior designers across the entire metropolitan area. Our project list includes new builds in the Hills and St George region, full renovations in the Eastern Suburbs and Inner West, kitchen-only refurbishments across the Lower North Shore, and luxury apartment fitouts in the CBD and Pyrmont.

Our model for Sydney clients: a free in-home consultation in the first week, a fixed-price quote within 5 working days, and a manufacturing lead time of 8–14 weeks. Installations are managed by our own teams; we do not subcontract to external trades.`,
  ),
  coveredSuburbs: suburbs(
    "Mosman",
    "Cremorne",
    "Neutral Bay",
    "North Sydney",
    "Chatswood",
    "Bondi",
    "Double Bay",
    "Paddington",
    "Balmain",
    "Manly",
    "Dee Why",
    "Castle Hill",
    "Strathfield",
    "Surry Hills",
    "Pyrmont",
  ),
  architecturalStyles:
    "Federation, Inter-war brick, mid-century modern, contemporary coastal (Northern Beaches), Hamptons (Mosman, Cremorne, Manly), industrial conversion (Surry Hills, Alexandria), warehouse apartment (Pyrmont, Ultimo), traditional terrace (Paddington, Balmain), modern executive (Hills District).",
  nearbyLocationSlugs: [
    "wollongong",
    "central-coast",
    "newcastle",
    "canberra",
    "gold-coast",
  ],
  portfolioSearchNames: ["Sydney", "Mosman", "Bondi", "Northern Beaches"],
  faqs: [
    {
      question: "Do you charge a travel fee for Sydney projects?",
      answer:
        "No — all in-home consultations and site measures are free, anywhere in metropolitan Sydney.",
    },
    {
      question: "How does manufacturing in Newcastle work for a Sydney install?",
      answer:
        "We manufacture in our Newcastle workshop and deliver via our own truck. Two-hour drive — no different from an outer-Sydney manufacturer.",
    },
    {
      question: "Do you carry European hardware brands for premium projects?",
      answer:
        "Yes — Blum, Häfele, Salice, Hettich all routinely supplied. Specify in your brief.",
    },
    {
      question: "Can you handle multi-trade renovation projects in Sydney?",
      answer:
        "We do supply-and-install for joinery, and can recommend trusted Sydney builders, plumbers, and electricians from our network for full renovations.",
    },
    {
      question: "Are you registered to work on Sydney apartment buildings (strata-managed)?",
      answer:
        "Yes — we hold the required public liability and worker's compensation, and we work with strata building managers on access, hours, and protection requirements.",
    },
    {
      question: "What is your turnaround for a Sydney kitchen quote?",
      answer:
        "Site measure within 5–10 days of enquiry; fixed-price quote within 5 working days of measure.",
    },
  ],
});

defineLocation("canberra", {
  heroIntro:
    "Canberra is a high-income, design-literate market with a notable shortage of premium joinery options. SteepWood services Canberra from our Newcastle workshop with the same fixed-price contract, materials palette, and manufacturing standards we apply to local projects.",
  introParagraphs: splitParagraphs(
    `Canberra is a high-income, design-literate market with a notable shortage of premium joinery options. The ACT median household income outpaces every other state and territory, and Canberra homeowners — whether in new-build developments in Coombs and Wright, established executive homes in Red Hill, Forrest, and Yarralumla, or apartment fitouts in Kingston and Braddon — increasingly seek custom joinery as a differentiator rather than a flat-pack solution.

SteepWood services Canberra from our Newcastle workshop. We manage the logistics; you get the same fixed-price contract, the same materials palette, and the same manufacturing standards we apply to a Newcastle local project. For larger Canberra projects (kitchens + multiple wardrobes + study joinery), we co-ordinate a single delivery and on-site install over 3–5 days.

We work across the ACT's varied housing stock — from the contemporary architecture of Wright and Coombs, to the established 1960s–1980s homes of Aranda, Cook, and Curtin, to the new luxury apartments of Campbell and the Kingston Foreshore.`,
  ),
  coveredSuburbs: suburbs(
    "Braddon",
    "Reid",
    "Campbell",
    "Forrest",
    "Red Hill",
    "Deakin",
    "Yarralumla",
    "Kingston",
    "Griffith",
    "Curtin",
    "Wright",
    "Coombs",
    "Belconnen",
    "Gungahlin",
    "Queanbeyan",
  ),
  architecturalStyles:
    "Y. Burley Griffin style, Robin Boyd-school modernist, post-war public housing renovation, contemporary new-build (Wright, Coombs), executive Inter-war and post-war brick (Forrest, Yarralumla), high-density contemporary apartment (Braddon, Kingston Foreshore).",
  nearbyLocationSlugs: ["sydney", "wollongong", "bathurst", "orange", "newcastle"],
  portfolioSearchNames: ["Canberra", "ACT", "Queanbeyan"],
  faqs: [
    {
      question: "Do you travel to Canberra for site measures?",
      answer:
        "Yes — for projects over $15,000 we attend free of charge. Smaller projects: design via video consultation and submitted measurements.",
    },
    {
      question: "What is the typical project lead time for Canberra?",
      answer:
        "Add 1 week to our standard lead time for delivery logistics. So a kitchen that's 10 weeks in Newcastle is 11 weeks in Canberra.",
    },
    {
      question: "Do you work with Canberra builders and architects?",
      answer:
        "Yes — we hold ACT-recognised trade licensing and routinely work with Canberra-based builders for new builds and renovations.",
    },
    {
      question: "Can you match joinery for heritage Canberra homes (Forrest, Yarralumla, Reid)?",
      answer:
        "Yes — we replicate period mouldings, panel doors, and timber profiles for early-Canberra heritage homes.",
    },
    {
      question: "How do you handle delivery and installation in Canberra?",
      answer:
        "Single delivery via our truck; install by our own team over 3–5 days for a typical kitchen + wardrobe project.",
    },
    {
      question: "Do you provide joinery for ACT government, university, or commercial projects?",
      answer:
        "Yes — we work on commercial fitouts and have experience with ACT government procurement requirements.",
    },
  ],
});

defineLocation("melbourne", {
  heroIntro:
    "Melbourne is Australia's most design-saturated joinery market. SteepWood services Melbourne with a model built around freight delivery and metro-Melbourne install teams — we are not a local Melbourne joiner, but we are the Melbourne-aware alternative to the city's saturated and often heavily-booked local joinery market.",
  introParagraphs: splitParagraphs(
    `Melbourne is Australia's most design-saturated joinery market. From Hamptons kitchens in Toorak and Brighton, to Scandi-inspired apartments in Carlton and Fitzroy, to Federation restorations in Hawthorn and Camberwell, Melburnians treat joinery as part of the design conversation, not just functional storage. SteepWood services Melbourne with a model built around freight delivery and metro-Melbourne install teams.

We work with Melbourne homeowners, builders, architects, and interior designers across the entire metropolitan area. Our material palette includes everything Melbourne projects typically demand: 2pac polyurethane in any colour, Caesarstone and Smartstone benchtops, Polytec and Laminex panel options, Blum and Häfele hardware, and solid timber in Tasmanian oak, Victorian ash, Spotted Gum, Blackbutt, American oak, and walnut.

Logistics for Melbourne: design and quote remotely (video consultation, supplied measurements, and we can travel for projects over $30,000), manufacture in Newcastle (8–12 weeks), freight to Melbourne, install by our nominated Melbourne contractor team. Total programme: typically 12–16 weeks from deposit.`,
  ),
  coveredSuburbs: suburbs(
    "Toorak",
    "South Yarra",
    "Brighton",
    "Hawthorn",
    "Camberwell",
    "Kew",
    "Malvern",
    "St Kilda",
    "Carlton",
    "Fitzroy",
    "Richmond",
    "Collingwood",
    "Brunswick",
    "Doncaster",
    "Box Hill",
  ),
  architecturalStyles:
    "Edwardian terrace, Federation weatherboard, Inter-war brick, Californian bungalow, mid-century modernist (Beaumaris school), Victorian terrace, contemporary inner-city warehouse conversion, Hamptons (Brighton, Toorak), Italianate (Carlton, Fitzroy).",
  nearbyLocationSlugs: ["sydney", "canberra", "adelaide", "wollongong", "gold-coast"],
  portfolioSearchNames: ["Melbourne", "Toorak", "Brighton", "Hawthorn"],
  faqs: [
    {
      question: "Do you have a Melbourne showroom?",
      answer:
        "Not yet — our workshop and showroom are in Newcastle. For Melbourne projects we conduct video consultations and travel for projects over $30,000.",
    },
    {
      question: "How does freight work for a Melbourne kitchen install?",
      answer:
        "We crate and freight via dedicated furniture carrier. 1-day transit. Insurance included.",
    },
    {
      question: "Do you work with Melbourne builders?",
      answer:
        "Yes — current relationships across Bayside, Stonnington, Boroondara, and Yarra council areas.",
    },
    {
      question: "Why use SteepWood vs a local Melbourne joiner?",
      answer:
        "Pricing, lead time predictability, and the option to combine kitchen + multiple wardrobes + vanity in a single coordinated project.",
    },
    {
      question: "Can you match local Melbourne kitchen styles (Hamptons, mid-century, contemporary)?",
      answer:
        "Yes — our portfolio includes all major Melbourne style vocabularies.",
    },
    {
      question: "What is the warranty on Melbourne projects?",
      answer:
        "Same 10-year structural warranty + 25-year Blum hardware warranty as Newcastle projects. We attend warranty calls in Melbourne via our install partner.",
    },
  ],
});

defineLocation("central-coast", {
  heroIntro:
    "The Central Coast is one of SteepWood's most natural service regions — an hour down the motorway from our Newcastle workshop, and home to the kind of coastal lifestyle properties where premium custom joinery is most appreciated.",
  introParagraphs: splitParagraphs(
    `The Central Coast is one of SteepWood's most natural service regions — an hour down the motorway from our Newcastle workshop, and home to the kind of coastal lifestyle properties where premium custom joinery is most appreciated. Whether you live in a beach-front home at Avoca, Terrigal, or Macmasters, a family residence in Gosford or Erina, a lakeside property on Tuggerah, or a new build in the Woy Woy peninsula, we are within easy driving distance for site measures, install, and warranty support.

Coastal climate and coastal materials are second nature to us. We specify HMR moisture-resistant boards, marine-grade polyurethane finishes where appropriate, and corrosion-resistant Blum hardware that holds up to salt-air conditions.

Beyond residential work, we service the Central Coast's commercial fitout market — cafes and restaurants in The Entrance and Terrigal, retail tenancies in Erina Fair, and professional offices around the Gosford CBD.`,
  ),
  coveredSuburbs: suburbs(
    "Gosford",
    "Terrigal",
    "Avoca Beach",
    "Wamberal",
    "Erina",
    "The Entrance",
    "Long Jetty",
    "Umina Beach",
    "Woy Woy",
    "Ettalong Beach",
    "Killcare",
    "Bateau Bay",
    "Wyong",
    "Tuggerah",
    "Budgewoi",
  ),
  architecturalStyles:
    "Coastal contemporary, beach shack revival, mid-century brick, post-war fibro, new-build executive (Avoca, Wamberal, Killcare), Hamptons-style (Terrigal, Avoca), lakeside contemporary (Tuggerah Lake).",
  nearbyLocationSlugs: ["newcastle", "sydney", "hunter-valley", "wollongong", "port-macquarie"],
  portfolioSearchNames: ["Central Coast", "Gosford", "Terrigal", "Avoca"],
  faqs: [
    { question: "Do you charge a travel fee for Central Coast projects?", answer: "No — Central Coast is a free service area for in-home consultations and site measures." },
    { question: "What is the typical lead time for a Central Coast kitchen?", answer: "8–12 weeks from deposit. Install scheduled around builder/plumber programme." },
    { question: "Do you do beach-front and lakeside projects?", answer: "Yes — extensive experience with coastal joinery, including specifying salt-air resistant materials." },
    { question: "Do you work with Central Coast builders?", answer: "Yes — active trade relationships across the LGA." },
    { question: "Can you handle a holiday-rental property reno with tight turnaround?", answer: "Yes — we can prioritise short-lead schedules where the design is straightforward." },
    { question: "Where can I see a recent Central Coast project?", answer: "We have a portfolio page on the site, and on request we provide drive-by references for Central Coast clients." },
  ],
});

defineLocation("hunter-valley", {
  heroIntro:
    "The Hunter Valley is wine country, country estates, boutique cellar doors, and family homes built around rural lifestyle. It is also one of our closest service regions — a 45-minute drive from our Newcastle workshop.",
  introParagraphs: splitParagraphs(
    `The Hunter Valley is wine country, country estates, boutique cellar doors, and family homes built around rural lifestyle. It is also one of our closest service regions — a 45-minute drive from our Newcastle workshop, which makes us the natural choice for premium custom joinery in the area. We work on rural homes in Pokolbin, Lovedale, and Broke; family residences in Maitland, Cessnock, and Singleton; and commercial fitouts for the region's hospitality and tourism industry.

Hunter Valley projects often have a particular character: a stronger emphasis on natural timber finishes, country-style kitchens with shaker doors and Caesarstone or Smartstone tops, butler's pantries that handle the realities of entertaining, and joinery that ages with the home.

Commercial projects: cellar door fitouts, restaurant joinery, B&B and accommodation cabinetry.`,
  ),
  coveredSuburbs: suburbs(
    "Pokolbin",
    "Lovedale",
    "Cessnock",
    "Maitland",
    "Singleton",
    "Rutherford",
    "Branxton",
    "Medowie",
    "Nelson Bay",
    "Shoal Bay",
    "Raymond Terrace",
    "Thornton",
    "East Maitland",
    "Rothbury",
    "Wollombi",
  ),
  architecturalStyles:
    "Country homestead, post-war fibro, rural contemporary, French Provincial (Lovedale, Pokolbin), Hamptons coastal (Port Stephens), federation farmhouse, modern rural new-build, cellar-door commercial.",
  nearbyLocationSlugs: ["newcastle", "central-coast", "port-macquarie", "sydney", "bathurst"],
  portfolioSearchNames: ["Hunter Valley", "Pokolbin", "Maitland", "Cessnock", "Nelson Bay"],
  faqs: [
    { question: "Do you do cellar door and winery commercial joinery?", answer: "Yes — extensive experience with Hunter Valley cellar doors, tasting rooms, and restaurant fitouts." },
    { question: "Do you charge travel for Hunter Valley?", answer: "No — all in-home consultations free across the Hunter LGAs." },
    { question: "Can you supply French Provincial or Hamptons country style joinery?", answer: "Yes — both styles are core SteepWood capabilities." },
    { question: "What is your relationship with Hunter Valley builders?", answer: "Active trade relationships with builders and suppliers across Cessnock, Singleton, and Maitland LGAs." },
    { question: "Do you build for the short-term accommodation / Airbnb market?", answer: "Yes — multiple completed projects for Hunter Valley accommodation businesses." },
    { question: "What is the lead time for a rural Hunter Valley project?", answer: "Standard 8–12 weeks; rural delivery may add 2–3 days." },
  ],
});

defineLocation("gold-coast", {
  heroIntro:
    "The Gold Coast combines high-income coastal lifestyle with a saturated local joinery market — leaving room for a Newcastle-based premium alternative that offers the same craftsmanship at competitive pricing.",
  introParagraphs: splitParagraphs(
    `The Gold Coast combines high-income coastal lifestyle with a saturated local joinery market — leaving room for a Newcastle-based premium alternative that offers the same craftsmanship at competitive pricing. SteepWood services the Gold Coast from beach-front apartments in Surfers Paradise and Broadbeach, through to single-residence luxury homes in Mermaid Beach, Tugun, Currumbin, Burleigh Heads, and the canal estates of Sovereign Islands and Mermaid Waters.

Coastal materials are central to our approach for Gold Coast projects: HMR boards, marine-grade finishes, salt-air resistant Blum hardware, and timber species that perform in QLD humidity (Spotted Gum, Blackbutt, Jarrah).

Project model: design via video consultation, on-site travel for projects over $25,000, manufacture in Newcastle (8–12 weeks), freight to QLD, install by our nominated Gold Coast contractor team. Total programme: 12–16 weeks.`,
  ),
  coveredSuburbs: suburbs(
    "Surfers Paradise",
    "Broadbeach",
    "Mermaid Beach",
    "Burleigh Heads",
    "Palm Beach",
    "Currumbin",
    "Coolangatta",
    "Robina",
    "Hope Island",
    "Sanctuary Cove",
    "Southport",
    "Nerang",
    "Varsity Lakes",
    "Runaway Bay",
    "Labrador",
  ),
  architecturalStyles:
    "Coastal contemporary, Hamptons (Mermaid Beach, Broadbeach Waters), Mediterranean villa (Sovereign Islands, Hope Island), modern executive, high-rise apartment fitout (Surfers Paradise, Broadbeach), tropical contemporary (Currumbin, Tugun).",
  nearbyLocationSlugs: ["brisbane", "byron-bay", "sydney", "wollongong", "newcastle"],
  portfolioSearchNames: ["Gold Coast", "Surfers Paradise", "Broadbeach", "Burleigh"],
  faqs: [
    { question: "Do you have a Gold Coast showroom?", answer: "No — design via video consultation, with on-site travel for larger projects. Material samples couriered free for any active project." },
    { question: "How does freight to the Gold Coast work?", answer: "Dedicated furniture carrier from Newcastle workshop. Insurance included. 1–2 day transit." },
    { question: "Do you specify salt-air resistant materials?", answer: "Yes — coastal/beach-front projects use marine-grade finishes and corrosion-resistant Blum hardware as standard." },
    { question: "Can you handle Gold Coast high-rise apartment fitouts?", answer: "Yes — we co-ordinate with strata managers, building access requirements, and apartment-specific install constraints." },
    { question: "Are you licensed to work in Queensland?", answer: "Yes — we hold the required QBCC licensing for QLD residential joinery work." },
    { question: "What is the typical Gold Coast project lead time?", answer: "12–16 weeks from deposit including freight and install scheduling." },
  ],
});

defineLocation("wollongong", {
  heroIntro:
    "Wollongong and the Illawarra are characterised by escarpment-and-ocean homes, family residences in Wollongong's established suburbs, and a growing premium coastal market in the Northern Illawarra towns of Thirroul, Austinmer, and Coalcliff.",
  introParagraphs: splitParagraphs(
    `Wollongong and the Illawarra are characterised by escarpment-and-ocean homes, family residences in Wollongong's established suburbs, and a growing premium coastal market in the Northern Illawarra towns of Thirroul, Austinmer, and Coalcliff. SteepWood services the region from our Newcastle workshop — 3.5 hours up the coast — with material delivery and on-site install scheduled together for efficiency.

We work on a mix of housing: post-war brick homes in Wollongong's mid-band suburbs (Mangerton, Mt Pleasant, Keiraville), beach-front and escarpment homes in the Northern Illawarra, family homes across the Shellharbour and Kiama LGAs, and the newer developments in Calderwood, Tullimbar, and Horsley.`,
  ),
  coveredSuburbs: suburbs(
    "Wollongong CBD",
    "North Wollongong",
    "Fairy Meadow",
    "Thirroul",
    "Austinmer",
    "Bulli",
    "Corrimal",
    "Figtree",
    "Shellharbour",
    "Kiama",
    "Gerringong",
    "Helensburgh",
    "Mangerton",
    "Keiraville",
    "Warilla",
  ),
  architecturalStyles:
    "Post-war brick, mid-century, Federation, beach-front contemporary (Northern Illawarra), escarpment contemporary, new-build executive (Calderwood, Tullimbar), Federation cottage (Kiama, Gerringong), surf-shack revival (Thirroul, Austinmer).",
  nearbyLocationSlugs: ["sydney", "central-coast", "newcastle", "canberra", "hunter-valley"],
  portfolioSearchNames: ["Wollongong", "Illawarra", "Thirroul", "Kiama"],
  faqs: [
    { question: "Do you charge a travel fee for Wollongong?", answer: "No — all Illawarra in-home consultations are free for projects above $10,000." },
    { question: "What is the lead time for a Wollongong project?", answer: "9–13 weeks from deposit. Slightly longer than Newcastle local due to delivery scheduling." },
    { question: "Do you work with Illawarra builders?", answer: "Yes — active trade relationships, particularly in the Thirroul–Austinmer corridor and Kiama LGA." },
    { question: "Can you do escarpment-side homes (Helensburgh, Otford)?", answer: "Yes — we manage access and site delivery logistics for difficult-access properties." },
    { question: "Do you supply joinery for UOW staff/student rental fitouts?", answer: "Yes — multiple completed projects in Keiraville and Gwynneville rental properties." },
    { question: "Where is your nearest base to Wollongong?", answer: "Newcastle workshop. Site visits scheduled to combine multiple jobs in a single trip where possible." },
  ],
});

defineLocation("brisbane", {
  heroIntro:
    "Brisbane is one of Australia's fastest-growing premium joinery markets, with established inner-ring suburbs and a rising mid-ring of design-aware homeowners. SteepWood services Brisbane from our Newcastle workshop with freight delivery and a nominated Brisbane install team.",
  introParagraphs: splitParagraphs(
    `Brisbane is one of Australia's fastest-growing premium joinery markets, with established inner-ring suburbs (New Farm, Teneriffe, Bulimba, Hawthorne, Paddington, Bardon) and a rising mid-ring of design-aware homeowners (Chelmer, Indooroopilly, Holland Park, Camp Hill, Coorparoo). SteepWood services Brisbane from our Newcastle workshop with freight delivery and a nominated Brisbane install team — combining the craftsmanship of a premium boutique joiner with the pricing flexibility of Newcastle manufacturing.

Brisbane's climate dictates particular material choices: HMR boards as default, marine-grade finishes for any wet-area joinery, and timber species suited to QLD humidity (Spotted Gum, Blackbutt, Jarrah, Crow's Ash).

Project model: design via video consultation, on-site travel for projects over $30,000, manufacture in Newcastle (8–12 weeks), freight to QLD, install by our nominated Brisbane contractor team. Total programme: 12–16 weeks.`,
  ),
  coveredSuburbs: suburbs(
    "New Farm",
    "Teneriffe",
    "Paddington",
    "Bardon",
    "Bulimba",
    "Hawthorne",
    "Chelmer",
    "Indooroopilly",
    "Coorparoo",
    "Camp Hill",
    "Ascot",
    "Hamilton",
    "West End",
    "Kangaroo Point",
    "Manly",
  ),
  architecturalStyles:
    "Queenslander (Paddington, Bardon, New Farm), post-war brick, mid-century brick-and-tile, Inter-war Spanish mission (Ascot, Hamilton), Hamptons (Chelmer, Bulimba), contemporary new-build, high-rise apartment (Newstead, Hamilton, South Brisbane).",
  nearbyLocationSlugs: ["gold-coast", "byron-bay", "sydney", "newcastle", "melbourne"],
  portfolioSearchNames: ["Brisbane", "New Farm", "Paddington", "Bulimba"],
  faqs: [
    { question: "Do you renovate Queenslander homes?", answer: "Yes — extensive experience with raised timber Queenslander joinery, including replacing tongue-and-groove cupboards and adapting to existing floor levels." },
    { question: "How does freight to Brisbane work?", answer: "Dedicated furniture carrier from Newcastle. 1–2 day transit, insurance included." },
    { question: "Are you QBCC licensed?", answer: "Yes — we hold the required Queensland Building and Construction Commission licensing for residential joinery." },
    { question: "What materials suit Brisbane's climate?", answer: "HMR board, 2pac polyurethane, Caesarstone/Smartstone tops, hardwood timber species suited to QLD humidity." },
    { question: "Can you do Brisbane new-build joinery for builders?", answer: "Yes — we partner with several Brisbane new-build companies for kitchen, wardrobe, and bathroom joinery packages." },
    { question: "What is the typical project lead time for Brisbane?", answer: "12–16 weeks from deposit including freight and install scheduling." },
  ],
});

defineLocation("perth", {
  heroIntro:
    "Perth's premium joinery market is built around the western suburbs — Cottesloe, Mosman Park, Peppermint Grove, Dalkeith, Nedlands, Floreat, City Beach — and the eastern suburb corridor of Subiaco, Shenton Park, and West Perth.",
  introParagraphs: splitParagraphs(
    `Perth's premium joinery market is built around the western suburbs — Cottesloe, Mosman Park, Peppermint Grove, Dalkeith, Nedlands, Floreat, City Beach — and the eastern suburb corridor of Subiaco, Shenton Park, and West Perth. These are high-income, design-aware households where the standard kitchen builder rarely meets the brief, and where the local premium joiners are typically heavily booked.

SteepWood services Perth from our Newcastle workshop with sea or road freight delivery and a nominated Perth install team. The model gives Perth homeowners access to Newcastle pricing and SteepWood material relationships, with a Perth-based install crew handling on-site work.

Project model: design via video consultation, on-site travel for projects over $40,000, manufacture in Newcastle (8–12 weeks), freight (3–5 days), install by our nominated Perth contractor team. Total programme: 14–18 weeks.`,
  ),
  coveredSuburbs: suburbs(
    "Cottesloe",
    "Mosman Park",
    "Peppermint Grove",
    "Claremont",
    "Nedlands",
    "Dalkeith",
    "Subiaco",
    "Floreat",
    "City Beach",
    "West Perth",
    "Mt Lawley",
    "South Perth",
    "Fremantle",
    "Scarborough",
    "Como",
  ),
  architecturalStyles:
    "Federation, Inter-war Californian bungalow, post-war brick, mid-century, contemporary coastal (Cottesloe, Trigg), Hamptons (Dalkeith, Peppermint Grove), Mediterranean villa (Floreat, City Beach), modern executive new-build, high-density apartment.",
  nearbyLocationSlugs: ["adelaide", "melbourne", "sydney", "brisbane", "newcastle"],
  portfolioSearchNames: ["Perth", "Cottesloe", "Subiaco", "Dalkeith"],
  faqs: [
    { question: "Do you have a Perth showroom?", answer: "No — design via video consultation, material samples couriered free, on-site travel for projects over $40,000." },
    { question: "How does freight to Perth work?", answer: "Road or sea freight from Newcastle. 3–5 day transit. Insurance included for full value." },
    { question: "Are you licensed to work in WA?", answer: "Yes — we hold the required WA Building Services trade licensing for residential joinery." },
    { question: "Can you supply Perth-style coastal Hamptons joinery?", answer: "Yes — the white/stone/timber palette popular in Perth's western suburbs is one of our most common project types." },
    { question: "Who installs my joinery in Perth?", answer: "Our nominated Perth install team — vetted contractors who work to SteepWood's installation standards." },
    { question: "What is the typical project lead time for Perth?", answer: "14–18 weeks from deposit including freight and install scheduling." },
  ],
});

defineLocation("byron-bay", {
  heroIntro:
    "Byron Bay and the Northern Rivers are home to one of Australia's most distinctive design markets — premium coastal lifestyle properties, eco-conscious builds, hospitality fitouts, and Hamptons-coastal residences in Suffolk Park, Bangalow, and Newrybar.",
  introParagraphs: splitParagraphs(
    `Byron Bay and the Northern Rivers are home to one of Australia's most distinctive design markets — premium coastal lifestyle properties, eco-conscious builds, hospitality fitouts for the region's growing food-and-wellness economy, and Hamptons-coastal residences in Suffolk Park, Bangalow, and Newrybar. SteepWood services the region from our Newcastle workshop with freight delivery and on-site install via our nominated Northern Rivers contractor team.

Material choices for Byron-region projects skew toward natural finishes: feature timber (Spotted Gum, Blackbutt, recycled hardwood), oiled or hard-wax finishes, neutral 2pac in warm whites and stone tones, and a coastal-functional approach — joinery that handles salt air, sand, and the inevitable wear of a beach-orientated lifestyle.`,
  ),
  coveredSuburbs: suburbs(
    "Byron Bay",
    "Suffolk Park",
    "Lennox Head",
    "Ballina",
    "Bangalow",
    "Mullumbimby",
    "Brunswick Heads",
    "Ocean Shores",
    "Pottsville",
    "Kingscliff",
    "Casuarina",
    "Newrybar",
    "Federal",
    "Broken Head",
    "Alstonville",
  ),
  architecturalStyles:
    "Coastal contemporary, beach shack revival, sub-tropical contemporary, Federation cottage (Bangalow, Mullumbimby), Hamptons coastal (Suffolk Park, Lennox Head), eco-build/passive house, polished concrete and timber contemporary, hospitality and wellness commercial fitout.",
  nearbyLocationSlugs: ["gold-coast", "brisbane", "port-macquarie", "coffs-harbour", "sydney"],
  portfolioSearchNames: ["Byron Bay", "Northern Rivers", "Ballina", "Lennox Head"],
  faqs: [
    { question: "Do you do hospitality fitouts in Byron?", answer: "Yes — cafe, restaurant, wellness, and accommodation fitouts across the Northern Rivers." },
    { question: "What is the freight transit time to Byron Bay?", answer: "2 days from Newcastle workshop. Install scheduled to align with delivery." },
    { question: "Can you supply recycled or reclaimed timber?", answer: "Yes — we source recycled hardwood from Australian salvagers when projects call for it." },
    { question: "Do you charge travel for Byron site visits?", answer: "First measurement visit free for projects above $25,000. Subsequent visits prepaid against final invoice." },
    { question: "What is the typical lead time for a Byron project?", answer: "12–16 weeks from deposit including freight and install scheduling." },
    { question: "Are you licensed to work in NSW Northern Rivers?", answer: "Yes — same NSW residential joinery licensing as our local Newcastle work." },
  ],
});

defineLocation("port-macquarie", {
  heroIntro:
    "Port Macquarie is one of Australia's premier sea-change destinations and a strong growth market for premium custom joinery. SteepWood services the region from our Newcastle workshop, three hours up the Pacific Highway.",
  introParagraphs: splitParagraphs(
    `Port Macquarie is one of Australia's premier sea-change destinations and a strong growth market for premium custom joinery. Whether you are downsizing from Sydney to a coastal home in Town Beach, Lighthouse Beach, or Shelly Beach; building new in Lake Cathie, Bonny Hills, or Telegraph Point; or renovating an established home in West Port Macquarie or Settlement City — SteepWood services the region from our Newcastle workshop, three hours up the Pacific Highway.

Coastal materials and finishes are standard for Port Macquarie projects: HMR boards, marine-grade Blum hardware, and timber species (Spotted Gum, Blackbutt) that handle the local salt-air and humidity profile.`,
  ),
  coveredSuburbs: suburbs(
    "Port Macquarie CBD",
    "Town Beach",
    "Lighthouse Beach",
    "Shelly Beach",
    "Settlement City",
    "West Port Macquarie",
    "Lake Cathie",
    "Bonny Hills",
    "Laurieton",
    "Wauchope",
    "North Haven",
    "Camden Haven",
    "Telegraph Point",
    "Thrumster",
    "South West Rocks",
  ),
  architecturalStyles:
    "Sea-change coastal contemporary, established 1980s–1990s brick, post-war fibro, new-build executive (Lake Cathie, Bonny Hills), Hamptons coastal (Town Beach, Shelly Beach), country cottage (Wauchope), waterfront/canal estate.",
  nearbyLocationSlugs: ["coffs-harbour", "newcastle", "hunter-valley", "byron-bay", "sydney"],
  portfolioSearchNames: ["Port Macquarie", "Lake Cathie", "Wauchope"],
  faqs: [
    { question: "Do you charge a travel fee for Port Macquarie?", answer: "No — in-home consultation free for projects above $15,000." },
    { question: "Do you do retiree/downsizer projects?", answer: "Yes — large share of our Port Macquarie work is sea-change downsizer projects requiring high-storage, easy-clean joinery." },
    { question: "What is the lead time for a Port Macquarie project?", answer: "10–13 weeks from deposit including delivery and install scheduling." },
    { question: "Do you supply moisture-resistant joinery for Port's humid climate?", answer: "Yes — HMR boards standard; marine-grade finishes for any waterfront property." },
    { question: "Can you work with Port Macquarie builders on new builds?", answer: "Yes — active trade relationships with local builders." },
    { question: "Do you do commercial fitouts in Port Macquarie?", answer: "Yes — cafes, restaurants, and small retail in the CBD and Settlement City." },
  ],
});

defineLocation("coffs-harbour", {
  heroIntro:
    "Coffs Harbour and the Mid North Coast are home to a growing market of lifestyle property buyers, sea-change downsizers, and established families upgrading their primary residences. SteepWood services the region from our Newcastle workshop, five hours up the Pacific Highway.",
  introParagraphs: splitParagraphs(
    `Coffs Harbour and the Mid North Coast are home to a growing market of lifestyle property buyers, sea-change downsizers, and established families upgrading their primary residences. SteepWood services the region from our Newcastle workshop, five hours up the Pacific Highway, with deliveries and installations scheduled together for efficiency.

We work across the typical Mid North Coast housing stock: established brick homes in Coffs Harbour and Sawtell, new builds in Woolgoolga, Emerald Beach, and Boambee East, hinterland properties around Bellingen and Dorrigo, and the growing premium waterfront and acreage market in the Coffs and Bellinger valleys.`,
  ),
  coveredSuburbs: suburbs(
    "Coffs Harbour CBD",
    "Park Beach",
    "Jetty",
    "Sawtell",
    "Toormina",
    "Boambee",
    "Woolgoolga",
    "Emerald Beach",
    "Bellingen",
    "Urunga",
    "Nambucca Heads",
    "Macksville",
    "Dorrigo",
    "Valla Beach",
    "Moonee Beach",
  ),
  architecturalStyles:
    "Coastal contemporary, established brick (1970s–1990s), post-war fibro, mid-century, hinterland country (Bellingen, Dorrigo), eco-build, new-build coastal lifestyle.",
  nearbyLocationSlugs: ["port-macquarie", "byron-bay", "newcastle", "hunter-valley", "sydney"],
  portfolioSearchNames: ["Coffs Harbour", "Sawtell", "Woolgoolga", "Bellingen"],
  faqs: [
    { question: "Do you do hinterland projects (Bellingen, Dorrigo)?", answer: "Yes — hinterland delivery scheduled with the broader trip." },
    { question: "What is the typical lead time for a Coffs project?", answer: "11–14 weeks from deposit." },
    { question: "Do you supply joinery for the Coffs short-term rental market?", answer: "Yes — Airbnb and holiday rental joinery upgrades are a regular project type." },
    { question: "Can you co-ordinate with Coffs builders?", answer: "Yes — active trade relationships with builders in Coffs, Sawtell, Woolgoolga." },
    { question: "Do you charge travel for Coffs site visits?", answer: "Free first measurement for projects above $20,000; subsequent visits prepaid." },
    { question: "What is your warranty on Mid North Coast projects?", answer: "Same 10-year structural + Blum 25-year hardware warranty as Newcastle local projects." },
  ],
});

defineLocation("adelaide", {
  heroIntro:
    "Adelaide's premium joinery market is concentrated in the established eastern and southern suburbs — North Adelaide, Norwood, Unley, Hyde Park, Walkerville, Burnside — alongside the coastal corridor through Glenelg, Brighton, and Henley Beach.",
  introParagraphs: splitParagraphs(
    `Adelaide's premium joinery market is concentrated in the established eastern and southern suburbs — North Adelaide, Norwood, Unley, Hyde Park, Walkerville, Burnside, Toorak Gardens — alongside the coastal corridor through Glenelg, Brighton, and Henley Beach. SteepWood services Adelaide from our Newcastle workshop with road freight delivery and a nominated Adelaide install partner.

Adelaide's heritage stock (1900s–1930s Tudor, Federation, Inter-war stone homes) demands joinery that can replicate period detail; the city's contemporary market favours warm timber finishes and 2pac in heritage-respectful palettes. We work fluently in both idioms.`,
  ),
  coveredSuburbs: suburbs(
    "North Adelaide",
    "Norwood",
    "Unley",
    "Hyde Park",
    "Burnside",
    "Toorak Gardens",
    "Glenelg",
    "Brighton",
    "Henley Beach",
    "Parkside",
    "Goodwood",
    "Walkerville",
    "Mitcham",
    "Prospect",
    "Stirling",
  ),
  architecturalStyles:
    "Federation bluestone, Tudor revival, Inter-war stone-and-brick, post-war brick, Californian bungalow, Mediterranean villa (Toorak Gardens, Burnside), contemporary new-build, hills modernist (Stirling, Crafers).",
  nearbyLocationSlugs: ["melbourne", "sydney", "canberra", "perth", "newcastle"],
  portfolioSearchNames: ["Adelaide", "Norwood", "Unley", "Glenelg"],
  faqs: [
    { question: "Do you have an Adelaide showroom?", answer: "No — design via video consultation, material samples couriered free, on-site travel for projects over $35,000." },
    { question: "How does freight to Adelaide work?", answer: "Road freight via Newcastle–Adelaide carrier. 2–3 day transit. Insurance included." },
    { question: "Are you licensed to work in SA?", answer: "Yes — registered for SA residential joinery work." },
    { question: "Can you replicate Adelaide heritage detail (Federation, Tudor, Inter-war)?", answer: "Yes — moulding, architrave, panel door profile matching is core to our heritage work." },
    { question: "What is the typical Adelaide project lead time?", answer: "12–15 weeks from deposit." },
    { question: "Who installs the joinery in Adelaide?", answer: "Our nominated Adelaide install partner, vetted to SteepWood's installation standards." },
  ],
});

defineLocation("bathurst", {
  heroIntro:
    "Bathurst is one of NSW's most significant Central West growth zones — a city of established Federation and Inter-war housing, a strong rural-residential market, and a $20M NSW Government fast-track program driving new-build construction.",
  introParagraphs: splitParagraphs(
    `Bathurst is one of NSW's most significant Central West growth zones — a city of established Federation and Inter-war housing, a strong rural-residential market, and a $20M NSW Government fast-track program driving new-build construction. SteepWood services Bathurst from our Newcastle workshop, ~3.5 hours via the Bells Line of Road or the Great Western Highway, with delivery and install scheduled together.

Bathurst projects often have a particular character: heritage homes that need joinery to suit Federation and Inter-war detailing; rural-residential properties wanting country-functional kitchens with butler's pantry and feature timber; and new-build developments calling for contemporary but warm joinery vocabularies.`,
  ),
  coveredSuburbs: suburbs(
    "Bathurst CBD",
    "West Bathurst",
    "South Bathurst",
    "Kelso",
    "Eglinton",
    "Llanarth",
    "Mitchell",
    "Perthville",
    "Raglan",
    "O'Connell",
    "Blayney",
    "Millthorpe",
    "Carcoar",
    "Rockley",
    "Sofala",
  ),
  architecturalStyles:
    "Federation cottage and villa (West Bathurst, South Bathurst), Inter-war brick, Victorian terrace (Bathurst CBD), country homestead, rural-residential contemporary, new-build executive (Kelso, Eglinton, Mitchell).",
  nearbyLocationSlugs: ["orange", "hunter-valley", "newcastle", "canberra", "sydney"],
  portfolioSearchNames: ["Bathurst", "Central West", "Kelso"],
  faqs: [
    { question: "Do you charge travel for Bathurst?", answer: "First visit free for projects above $15,000; subsequent visits prepaid." },
    { question: "Can you match Federation heritage detail?", answer: "Yes — moulding, panel door, and architrave matching is core to our heritage capability." },
    { question: "What is the typical Bathurst project lead time?", answer: "11–14 weeks from deposit." },
    { question: "Do you supply rural-residential country kitchens?", answer: "Yes — country-functional kitchens with butler's pantry, deep storage, and Shaker-style cabinetry are a Bathurst specialty." },
    { question: "Do you work with Bathurst builders?", answer: "Yes — active trade relationships across Bathurst LGA and the Central West." },
    { question: "What is the warranty?", answer: "Same 10-year structural and Blum 25-year hardware warranty as Newcastle local projects." },
  ],
});

defineLocation("orange", {
  heroIntro:
    "Orange is a wine-country city with one of regional NSW's strongest design and lifestyle markets. SteepWood services Orange from our Newcastle workshop with delivery and install scheduled together, typically grouping Orange projects with nearby Bathurst, Blayney, and Millthorpe work.",
  introParagraphs: splitParagraphs(
    `Orange is a wine-country city with one of regional NSW's strongest design and lifestyle markets. Its median household income matches Bathurst at the upper end of regional NSW, and the local joinery market has minimal premium competition. SteepWood services Orange from our Newcastle workshop with delivery and install scheduled together, typically grouping Orange projects with nearby Bathurst, Blayney, and Millthorpe work for efficiency.

Orange projects often blend rural-residential brief with refined urban design vocabulary — country-style kitchens with butler's pantries, but executed in 2pac and Caesarstone rather than rustic timber; established heritage homes with carefully replicated period detail; and a steady stream of new-build executive homes in the Bowen and East Orange precincts.`,
  ),
  coveredSuburbs: suburbs(
    "Orange CBD",
    "North Orange",
    "East Orange",
    "South Orange",
    "West Orange",
    "Bowen",
    "Glenroi",
    "Calare",
    "Bletchington",
    "Lucknow",
    "Millthorpe",
    "Blayney",
    "Molong",
    "Borenore",
    "Spring Hill",
  ),
  architecturalStyles:
    "Federation, Inter-war brick, Victorian terrace (Orange CBD), country homestead, rural-residential contemporary, vineyard estate, new-build executive (Bowen, East Orange).",
  nearbyLocationSlugs: ["bathurst", "hunter-valley", "newcastle", "canberra", "sydney"],
  portfolioSearchNames: ["Orange", "Central West", "Millthorpe", "Blayney"],
  faqs: [
    { question: "Do you charge travel for Orange?", answer: "First visit free for projects above $15,000; subsequent visits prepaid." },
    { question: "Can you match Federation and Inter-war heritage detail?", answer: "Yes — heritage joinery matching is core SteepWood capability." },
    { question: "What is the typical Orange project lead time?", answer: "11–14 weeks from deposit." },
    { question: "Do you do vineyard estate and cellar-door commercial fitouts?", answer: "Yes — Hunter Valley experience translates directly to Orange wine-country commercial work." },
    { question: "Do you work with Orange builders and architects?", answer: "Yes — active trade relationships in the Central West." },
    { question: "What is the warranty?", answer: "10-year structural and Blum 25-year hardware warranty." },
  ],
});

export function getLocationContent(slug: string): LocationHubContent | undefined {
  return LOCATION_CONTENT[slug];
}

export function getNearbyLocations(slugs: string[]): LocationDefinition[] {
  return slugs
    .map((slug) => LOCATIONS.find((location) => location.slug === slug))
    .filter((location): location is LocationDefinition => Boolean(location));
}
