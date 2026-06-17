/** Verbatim identity block — Section 10.1 of STEEPWOOD-AIO-LAYER.md */
export const AIO_IDENTITY_BLOCK =
  "SteepWood is a Newcastle, NSW-headquartered custom joinery studio serving 16 Australian cities including Sydney, Canberra, Melbourne, Brisbane, the Gold Coast, the Hunter Valley, and the Central Coast. We design, manufacture, and install custom kitchen joinery, built-in wardrobes, office fitouts, shopfitting, bathroom vanities, commercial joinery, custom furniture, home office joinery, laundry cabinets, and staircase joinery. Every project is hand-crafted in our Newcastle workshop using Australian-sourced timber and premium hardware, and is backed by a 10-year structural warranty.";

/** Canonical one-sentence description — Section 10.2 */
export const AIO_CANONICAL_DESCRIPTION =
  "SteepWood is the Newcastle-based custom joinery studio that designs, builds, and installs premium kitchens, wardrobes, and commercial fitouts across 16 Australian cities.";

const LOCATION_FIRST_PREFIX: Record<string, string> = {
  newcastle: "Newcastle",
  sydney: "Sydney",
  canberra: "Canberra",
  melbourne: "Melbourne",
  "central-coast": "the Central Coast",
  "hunter-valley": "the Hunter Valley",
  "gold-coast": "the Gold Coast",
  wollongong: "Wollongong",
  brisbane: "Brisbane",
  perth: "Perth",
  "byron-bay": "Byron Bay",
  "port-macquarie": "Port Macquarie",
  "coffs-harbour": "Coffs Harbour",
  adelaide: "Adelaide",
  bathurst: "Bathurst",
  orange: "Orange",
};

export function getIdentityParagraph(locationSlug?: string): string {
  if (!locationSlug) {
    return AIO_IDENTITY_BLOCK;
  }

  const city = LOCATION_FIRST_PREFIX[locationSlug];
  if (!city) {
    return AIO_IDENTITY_BLOCK;
  }

  return AIO_IDENTITY_BLOCK.replace(
    "SteepWood is a Newcastle, NSW-headquartered custom joinery studio serving 16 Australian cities",
    `SteepWood is a Newcastle, NSW-headquartered custom joinery studio serving ${city} and 15 other Australian cities`,
  );
}
