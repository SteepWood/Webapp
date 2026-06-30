// Single source of truth for SEO page graph — services, cities, keywords, internal links.

export const ALL_SERVICES = [
  "built-in-wardrobes",
  "commercial-joinery",
  "custom-bathroom-vanity",
  "custom-furniture",
  "custom-kitchen-joinery",
  "home-office-joinery",
  "laundry-cabinets",
  "office-fitout",
  "shopfitting",
  "staircase-joinery",
] as const;

export type Service = (typeof ALL_SERVICES)[number];

export const ALL_CITIES = [
  "adelaide",
  "bathurst",
  "brisbane",
  "byron-bay",
  "canberra",
  "central-coast",
  "coffs-harbour",
  "gold-coast",
  "hunter-valley",
  "melbourne",
  "newcastle",
  "orange",
  "perth",
  "port-macquarie",
  "sydney",
  "wollongong",
] as const;

export type City = (typeof ALL_CITIES)[number];

export const SERVICE_LABEL: Record<Service, string> = {
  "built-in-wardrobes": "Built-in Wardrobes",
  "commercial-joinery": "Commercial Joinery",
  "custom-bathroom-vanity": "Custom Bathroom Vanities",
  "custom-furniture": "Custom Furniture",
  "custom-kitchen-joinery": "Custom Kitchen Joinery",
  "home-office-joinery": "Home Office Joinery",
  "laundry-cabinets": "Laundry Cabinets",
  "office-fitout": "Office Fit-Outs",
  shopfitting: "Shopfitting",
  "staircase-joinery": "Staircase Joinery",
};

export const SERVICE_SINGULAR: Record<Service, string> = {
  "built-in-wardrobes": "built-in wardrobe",
  "commercial-joinery": "commercial joinery project",
  "custom-bathroom-vanity": "custom bathroom vanity",
  "custom-furniture": "custom furniture piece",
  "custom-kitchen-joinery": "custom kitchen",
  "home-office-joinery": "home office joinery fit-out",
  "laundry-cabinets": "laundry cabinetry",
  "office-fitout": "office fit-out",
  shopfitting: "shopfitting project",
  "staircase-joinery": "staircase joinery",
};

export const CITY_LABEL: Record<City, string> = {
  adelaide: "Adelaide",
  bathurst: "Bathurst",
  brisbane: "Brisbane",
  "byron-bay": "Byron Bay",
  canberra: "Canberra",
  "central-coast": "Central Coast",
  "coffs-harbour": "Coffs Harbour",
  "gold-coast": "Gold Coast",
  "hunter-valley": "Hunter Valley",
  melbourne: "Melbourne",
  newcastle: "Newcastle",
  orange: "Orange",
  perth: "Perth",
  "port-macquarie": "Port Macquarie",
  sydney: "Sydney",
  wollongong: "Wollongong",
};

export const CITY_STATE: Record<City, string> = {
  adelaide: "SA",
  bathurst: "NSW",
  brisbane: "QLD",
  "byron-bay": "NSW",
  canberra: "ACT",
  "central-coast": "NSW",
  "coffs-harbour": "NSW",
  "gold-coast": "QLD",
  "hunter-valley": "NSW",
  melbourne: "VIC",
  newcastle: "NSW",
  orange: "NSW",
  perth: "WA",
  "port-macquarie": "NSW",
  sydney: "NSW",
  wollongong: "NSW",
};

export const NEARBY_CITIES: Record<City, City[]> = {
  adelaide: ["melbourne", "perth", "sydney"],
  bathurst: ["orange", "canberra", "sydney"],
  brisbane: ["gold-coast", "byron-bay", "sydney"],
  "byron-bay": ["gold-coast", "coffs-harbour", "brisbane"],
  canberra: ["wollongong", "bathurst", "sydney"],
  "central-coast": ["newcastle", "sydney", "hunter-valley"],
  "coffs-harbour": ["port-macquarie", "byron-bay", "newcastle"],
  "gold-coast": ["brisbane", "byron-bay", "sydney"],
  "hunter-valley": ["newcastle", "central-coast", "port-macquarie"],
  melbourne: ["adelaide", "sydney", "canberra"],
  newcastle: ["central-coast", "hunter-valley", "sydney"],
  orange: ["bathurst", "canberra", "sydney"],
  perth: ["adelaide", "melbourne", "sydney"],
  "port-macquarie": ["coffs-harbour", "newcastle", "hunter-valley"],
  sydney: ["central-coast", "wollongong", "newcastle"],
  wollongong: ["sydney", "canberra", "central-coast"],
};

export const RELATED_SERVICES: Record<Service, Service[]> = {
  "built-in-wardrobes": ["custom-kitchen-joinery", "custom-bathroom-vanity"],
  "commercial-joinery": ["office-fitout", "shopfitting"],
  "custom-bathroom-vanity": ["laundry-cabinets", "built-in-wardrobes"],
  "custom-furniture": ["custom-kitchen-joinery", "staircase-joinery"],
  "custom-kitchen-joinery": ["built-in-wardrobes", "laundry-cabinets"],
  "home-office-joinery": ["custom-furniture", "built-in-wardrobes"],
  "laundry-cabinets": ["custom-kitchen-joinery", "custom-bathroom-vanity"],
  "office-fitout": ["commercial-joinery", "home-office-joinery"],
  shopfitting: ["commercial-joinery", "office-fitout"],
  "staircase-joinery": ["custom-furniture", "custom-kitchen-joinery"],
};

export const SERVICE_PRIMARY_KEYWORD: Record<Service, string> = {
  "built-in-wardrobes": "built-in wardrobes",
  "commercial-joinery": "commercial joinery",
  "custom-bathroom-vanity": "custom bathroom vanities",
  "custom-furniture": "custom furniture",
  "custom-kitchen-joinery": "custom kitchen joinery",
  "home-office-joinery": "home office joinery",
  "laundry-cabinets": "laundry cabinets",
  "office-fitout": "office fit-out",
  shopfitting: "shopfitting",
  "staircase-joinery": "staircase joinery",
};

export const SERVICE_SECONDARY_KEYWORDS: Record<Service, string[]> = {
  "built-in-wardrobes": [
    "walk-in wardrobes",
    "sliding door wardrobes",
    "custom robes",
    "bedroom storage",
  ],
  "commercial-joinery": [
    "commercial cabinetry",
    "fit-out joinery",
    "retail joinery",
    "hospitality joinery",
  ],
  "custom-bathroom-vanity": [
    "bathroom cabinetry",
    "vanity units",
    "ensuite vanities",
    "powder room vanities",
  ],
  "custom-furniture": [
    "bespoke furniture",
    "designer furniture",
    "made-to-measure furniture",
    "timber furniture",
  ],
  "custom-kitchen-joinery": [
    "custom kitchens",
    "bespoke kitchens",
    "kitchen cabinetry",
    "designer kitchens",
  ],
  "home-office-joinery": [
    "home office cabinetry",
    "study joinery",
    "built-in desks",
    "home office storage",
  ],
  "laundry-cabinets": [
    "laundry joinery",
    "laundry cabinetry",
    "custom laundry",
    "butler pantries",
  ],
  "office-fitout": [
    "office fitouts",
    "commercial office joinery",
    "workplace fit-outs",
    "corporate fit-outs",
  ],
  shopfitting: [
    "retail fitouts",
    "shop fitouts",
    "retail joinery",
    "cafe fitouts",
  ],
  "staircase-joinery": [
    "custom staircases",
    "timber staircases",
    "staircase balustrades",
    "stair joinery",
  ],
};

export function isService(slug: string): slug is Service {
  return (ALL_SERVICES as readonly string[]).includes(slug);
}

export function isCity(slug: string): slug is City {
  return (ALL_CITIES as readonly string[]).includes(slug);
}
