/** Additional fan-out FAQ questions per service — additive to existing combo FAQs. */

const FANOUT_BY_SERVICE: Record<string, string[]> = {
  "custom-kitchen-joinery": [
    "What is the best timber for kitchen cabinetry in Australia's climate?",
    "Do you need council approval for a kitchen renovation?",
    "Is custom joinery worth it compared with flat-pack kitchens?",
  ],
  "built-in-wardrobes": [
    "What is the minimum size for a walk-in robe in Australia?",
    "Are sliding or hinged wardrobe doors better for small bedrooms?",
    "Can you add integrated lighting and charging to a built-in wardrobe?",
  ],
  "office-fitout": [
    "What is included in a typical office fitout contract?",
    "How long does council approval take for an office fitout?",
    "Can you match existing brand colours in office joinery?",
  ],
  shopfitting: [
    "How long does a retail shopfit take from design to opening?",
    "Do you work with shopping centre landlord design guidelines?",
    "Can shopfitting joinery be replicated across multiple store locations?",
  ],
  "custom-bathroom-vanity": [
    "What is the best material for a bathroom vanity in a wet area?",
    "How much clearance is needed under a wall-hung vanity?",
    "Can you integrate a shaver cabinet with a custom vanity?",
  ],
  "commercial-joinery": [
    "What fire-rating documentation do commercial joinery projects need?",
    "Do you supply shop drawings for builder and certifier approval?",
    "Can commercial joinery be manufactured in batches for rollout sites?",
  ],
  "custom-furniture": [
    "What Australian timbers are best for a dining table?",
    "How long does a custom dining table take to build?",
    "Can you match an existing timber finish in bespoke furniture?",
  ],
  "home-office-joinery": [
    "What desk depth is recommended for a two-monitor home office?",
    "Can home office joinery include concealed cable management?",
    "Do you build study nooks for small apartments?",
  ],
  "laundry-cabinets": [
    "What bench height is needed above a front-loader washer?",
    "Are pull-out hampers worth it in a laundry renovation?",
    "Can laundry joinery include a broom cupboard and ironing board storage?",
  ],
  "staircase-joinery": [
    "What is the minimum stair width under the National Construction Code?",
    "Can you retrofit a timber staircase in an existing home?",
    "What timber species is best for staircase treads in Australia?",
  ],
};

export function getFanoutQuestions(serviceSlug: string): string[] {
  return FANOUT_BY_SERVICE[serviceSlug] ?? [];
}

export function localizeFanoutQuestion(
  question: string,
  locationName: string,
): string {
  if (question.includes("Australia's climate")) {
    return question.replace("Australia's climate", `${locationName}'s climate`);
  }

  if (question.includes(" in Australia")) {
    return question.replace(" in Australia", ` in ${locationName}`);
  }

  if (!question.toLowerCase().includes(locationName.toLowerCase())) {
    return `${question.replace(/\?$/, "")} in ${locationName}?`;
  }

  return question;
}

export function buildFanoutAnswer(
  serviceName: string,
  locationName: string,
): string {
  return `Yes — SteepWood provides ${serviceName.toLowerCase()} in ${locationName} with fixed-price quotes, Newcastle workshop manufacture, and a 10-year structural warranty. Contact us for a free consultation tailored to your ${locationName} project.`;
}
