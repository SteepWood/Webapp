export const PHASE2_AREA_SERVED = [
  {
    name: "Newcastle",
    type: "City" as const,
    "@id": "https://en.wikipedia.org/wiki/Newcastle,_New_South_Wales",
  },
  {
    name: "Sydney",
    type: "City" as const,
    "@id": "https://en.wikipedia.org/wiki/Sydney",
  },
  {
    name: "Canberra",
    type: "City" as const,
    "@id": "https://en.wikipedia.org/wiki/Canberra",
  },
  {
    name: "Melbourne",
    type: "City" as const,
    "@id": "https://en.wikipedia.org/wiki/Melbourne",
  },
  {
    name: "Central Coast",
    type: "AdministrativeArea" as const,
    "@id": "https://en.wikipedia.org/wiki/Central_Coast_(New_South_Wales)",
  },
  {
    name: "Hunter Valley",
    type: "AdministrativeArea" as const,
    "@id": "https://en.wikipedia.org/wiki/Hunter_Valley",
  },
  {
    name: "Gold Coast",
    type: "City" as const,
    "@id": "https://en.wikipedia.org/wiki/Gold_Coast,_Queensland",
  },
  {
    name: "Wollongong",
    type: "City" as const,
    "@id": "https://en.wikipedia.org/wiki/Wollongong",
  },
  {
    name: "Brisbane",
    type: "City" as const,
    "@id": "https://en.wikipedia.org/wiki/Brisbane",
  },
  {
    name: "Perth",
    type: "City" as const,
    "@id": "https://en.wikipedia.org/wiki/Perth",
  },
  {
    name: "Byron Bay",
    type: "Place" as const,
    "@id": "https://en.wikipedia.org/wiki/Byron_Bay",
  },
  {
    name: "Port Macquarie",
    type: "City" as const,
    "@id": "https://en.wikipedia.org/wiki/Port_Macquarie",
  },
  {
    name: "Coffs Harbour",
    type: "City" as const,
    "@id": "https://en.wikipedia.org/wiki/Coffs_Harbour",
  },
  {
    name: "Adelaide",
    type: "City" as const,
    "@id": "https://en.wikipedia.org/wiki/Adelaide",
  },
  {
    name: "Bathurst",
    type: "City" as const,
    "@id": "https://en.wikipedia.org/wiki/Bathurst,_New_South_Wales",
  },
  {
    name: "Orange",
    type: "City" as const,
    "@id": "https://en.wikipedia.org/wiki/Orange,_New_South_Wales",
  },
] as const;

export function schemaAreaServed() {
  return PHASE2_AREA_SERVED.map((location) => ({
    "@type": location.type,
    name: location.name,
    "@id": location["@id"],
  }));
}
