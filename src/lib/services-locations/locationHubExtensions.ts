/** City-specific logistics and context for location hub pages (Phase 2 §9.1). */
export type LocationHubExtension = {
  localContext: string;
  leadTime: string;
  freight: string;
  architecture: string[];
};

export const LOCATION_HUB_EXTENSIONS: Record<string, LocationHubExtension> = {
  sydney: {
    localContext:
      "Sydney is Australia's largest joinery market and one of the most discerning. Sydney clients typically brief 2-pac doors with sintered-stone or natural-stone benchtops, Blum drawer-led storage and integrated Miele or Gaggenau appliances. Heritage approvals are common in the Inner West and Eastern Suburbs.",
    leadTime:
      "10–14 weeks from deposit; install programmed Tuesday–Thursday outside Sydney peak-hour traffic windows.",
    freight:
      "Newcastle to Sydney delivery via dedicated furniture freight; ~2 hours road transit. Material samples couriered next-business-day.",
    architecture: [
      "Federation terrace (Paddington, Balmain, Newtown)",
      "Inter-war brick (Eastern Suburbs, Lower North Shore)",
      "Mid-century modern (Castle Cove, Killara)",
      "Hamptons (Mosman, Cremorne, Manly)",
      "Contemporary coastal (Northern Beaches)",
      "Warehouse apartment (Pyrmont, Ultimo, Surry Hills)",
      "Modern executive (Hills District)",
    ],
  },
  canberra: {
    localContext:
      "Canberra projects often involve diplomatic and senior-public-service homes with formal entertaining requirements — butler's pantries, walk-in robes with island benches, and integrated home-office joinery. Frost and dry-summer climate make timber-veneer movement allowances important.",
    leadTime:
      "12–16 weeks from deposit allowing for freight scheduling and trades co-ordination across the ACT–NSW border.",
    freight:
      "Newcastle to Canberra via dedicated furniture freight; 1-day road transit. Two delivery windows per fortnight.",
    architecture: [
      "Inter-war Garden City (Reid, Ainslie, Forrest)",
      "Mid-century government house (Yarralumla, Red Hill)",
      "1970s brick veneer (Belconnen, Tuggeranong)",
      "Contemporary apartment (Kingston, New Acton)",
      "Diplomatic-quarter custom (Yarralumla, Deakin)",
    ],
  },
  melbourne: {
    localContext:
      "Melbourne briefs lean heritage-conscious — moulded shaker doors, period-correct skirting and architraves, deep tongue-and-groove paneling on islands, and natural-stone benchtops with traditional edge profiles.",
    leadTime:
      "14–18 weeks from deposit factoring interstate freight and install windows.",
    freight:
      "Newcastle to Melbourne via dedicated furniture freight; 1–2 day road transit. Weekly freight slot.",
    architecture: [
      "Victorian terrace (Carlton, Fitzroy, Albert Park)",
      "Edwardian (Hawthorn, Camberwell)",
      "Inter-war brick (Toorak, Malvern)",
      "Mid-century modern (Mount Eliza, Beaumaris)",
      "Contemporary bayside (Brighton, Elwood)",
    ],
  },
  "central-coast": {
    localContext:
      "Central Coast briefs emphasise moisture resistance, salt-air durability and timber finishes that hide sandy traffic. Tasmanian Oak and Spotted Gum veneers feature heavily; Polytec SYNC textured woodgrain is popular for the textured-but-wipe-clean finish.",
    leadTime:
      "10–14 weeks from deposit; installs combined with Newcastle and Sydney route trips.",
    freight: "Direct Newcastle install team — no freight required.",
    architecture: [
      "Coastal contemporary (Terrigal, Avoca, Wamberal)",
      "Beach shack renovation (Killcare, Pearl Beach)",
      "1980s brick veneer (Erina, Gosford)",
      "Hamptons-coastal (Bateau Bay, Forresters)",
      "Family weekender",
    ],
  },
  "hunter-valley": {
    localContext:
      "Hunter Valley work skews to vineyard cellar-door joinery, rural farmhouse kitchens, and country-home fitouts. Briefs favour solid Australian timber (Blackbutt, Spotted Gum), large island benches with natural-stone tops, and integrated commercial-style appliances.",
    leadTime:
      "8–12 weeks from deposit; same-day site visits from our Newcastle workshop.",
    freight: "Direct Newcastle install team — no freight required.",
    architecture: [
      "Rural farmhouse renovation",
      "Vineyard cellar-door fitouts",
      "Federation country home",
      "Modern country (large glazing, raked ceilings)",
      "Heritage homestead",
    ],
  },
  "gold-coast": {
    localContext:
      "Gold Coast briefs prioritise saltwater corrosion resistance, full-height moisture-resistant joinery and tropical-climate hardware specification. Sintered-stone benchtops are favoured for UV stability around large glazing.",
    leadTime:
      "14–18 weeks from deposit allowing for QLD freight scheduling.",
    freight:
      "Newcastle to Gold Coast via dedicated furniture freight; 2-day road transit. Weekly freight slot via Brisbane hub.",
    architecture: [
      "Beachfront contemporary (Mermaid, Burleigh)",
      "Canal-front modern (Sanctuary Cove, Hope Island)",
      "1970s brick (Robina, Nerang)",
      "Hamptons-coastal (Palm Beach, Currumbin)",
      "Mid-century beach house",
    ],
  },
  wollongong: {
    localContext:
      "Wollongong work spans Illawarra coastal homes and escarpment contemporary projects. Saltwater proximity drives moisture-resistant carcassing specification; raked-ceiling brief is common.",
    leadTime:
      "10–14 weeks from deposit; combined install routes with Sydney South.",
    freight:
      "Direct Newcastle install team or combined Sydney run — no separate freight.",
    architecture: [
      "Federation cottage (Bulli, Thirroul)",
      "Inter-war brick (Wollongong, Figtree)",
      "Beach cottage renovation (Austinmer, Coalcliff)",
      "Escarpment contemporary (Mount Keira)",
      "1970s brick",
    ],
  },
  brisbane: {
    localContext:
      "Brisbane briefs frequently involve Queenslander renovations — VJ panel detail, high-set joinery, sub-floor access cabinetry and verandah-integrated outdoor joinery. Sub-tropical climate makes ventilation gaps and moisture-resistant board essential.",
    leadTime:
      "14–18 weeks from deposit factoring freight and trades scheduling.",
    freight:
      "Newcastle to Brisbane via dedicated furniture freight; 2-day road transit. Weekly freight slot.",
    architecture: [
      "Queenslander (Paddington, Bardon, Wilston)",
      "Inter-war character home (Ascot, Hamilton)",
      "Post-war timber (Camp Hill, Bulimba)",
      "Contemporary riverside (New Farm, Teneriffe)",
      "Hamptons-Queensland fusion",
    ],
  },
  perth: {
    localContext:
      "Perth projects often involve coastal contemporary or modernist limestone homes. Material specification accounts for high-UV exposure (sintered stone and porcelain over engineered surfaces) and the Perth design preference for handleless cabinetry in deep neutrals.",
    leadTime:
      "16–20 weeks from deposit allowing for WA freight transit.",
    freight:
      "Newcastle to Perth via dedicated furniture freight; 3–5 day road transit. Fortnightly freight slot.",
    architecture: [
      "Federation (Subiaco, Mount Lawley)",
      "Inter-war bungalow (Nedlands, Floreat)",
      "Mid-century coastal (Cottesloe, City Beach)",
      "Modern contemporary (Peppermint Grove, Dalkeith)",
      "Limestone restoration",
    ],
  },
  "byron-bay": {
    localContext:
      "Northern Rivers work emphasises coastal moisture resistance, biophilic timber selections (Spotted Gum, Blackbutt) and pared-back palettes. Heritage-overlay restrictions apply in parts of Bangalow and central Byron.",
    leadTime: "14–18 weeks from deposit factoring freight.",
    freight:
      "Newcastle to Byron via dedicated furniture freight; 2-day road transit. Weekly freight slot via Brisbane hub.",
    architecture: [
      "Beach-house contemporary (Byron, Suffolk Park)",
      "Hinterland modern (Federal, Coorabell)",
      "Federation cottage (Bangalow, Mullumbimby)",
      "Tropical contemporary (Lennox)",
      "Surf-shack renovation",
    ],
  },
  "port-macquarie": {
    localContext:
      "Mid-North-Coast briefs focus on coastal moisture resistance and accessible-design joinery (lower drawer banks, side-opening ovens, pull-out pantries) for retirees downsizing from Sydney.",
    leadTime: "10–14 weeks from deposit; direct Newcastle install routes.",
    freight: "Direct Newcastle install team — no freight.",
    architecture: [
      "Coastal contemporary",
      "1980s brick veneer",
      "Beach cottage renovation",
      "Lakeside contemporary (Lake Cathie, Camden Haven)",
      "Retirement-village interiors",
    ],
  },
  "coffs-harbour": {
    localContext:
      "Coffs and Bellingen work balances coastal saltwater exposure with hinterland-rainforest humidity. Material selection emphasises HMR carcassing, sealed timber veneers, and sintered-stone benchtops.",
    leadTime:
      "12–14 weeks from deposit; combined Newcastle install routes.",
    freight:
      "Direct install via Newcastle team — combined Port Macquarie / Coffs routes.",
    architecture: [
      "Coastal contemporary (Sawtell, Korora)",
      "Federation hinterland (Bellingen, Dorrigo)",
      "Beachside cottage (Woolgoolga)",
      "1970s brick veneer",
      "Tropical modern",
    ],
  },
  adelaide: {
    localContext:
      "Adelaide briefs commonly involve sandstone or bluestone villa renovations with strict heritage-overlay constraints. Joinery is specified to complement period detail — moulded shaker doors, deep architraves, recessed appliances.",
    leadTime:
      "16–18 weeks from deposit allowing for SA freight transit.",
    freight:
      "Newcastle to Adelaide via dedicated furniture freight; 2–3 day road transit. Fortnightly freight slot.",
    architecture: [
      "Sandstone villa (North Adelaide, Walkerville)",
      "Bluestone bungalow (Unley, Goodwood)",
      "Inter-war (Hyde Park, Prospect)",
      "Hills modern (Stirling, Aldgate)",
      "Coastal mid-century (Glenelg)",
    ],
  },
  bathurst: {
    localContext:
      "Central West work includes Bathurst CBD heritage homes (under conservation overlay) and rural acreage builds across Brewongle and O'Connell. Joinery specification often involves solid Australian timber and natural-stone benchtops to suit period architecture.",
    leadTime:
      "12–14 weeks from deposit; direct Newcastle install routes via the Blue Mountains.",
    freight: "Direct Newcastle install team — combined Bathurst / Orange routes.",
    architecture: [
      "Federation (Bathurst CBD, Kelso)",
      "Inter-war brick",
      "Rural farmhouse (Sofala, O'Connell)",
      "Contemporary acreage",
      "Heritage Bathurst conservation overlay",
    ],
  },
  orange: {
    localContext:
      "Central West wine-country briefs frequently combine residential kitchens and small commercial cellar-door joinery. Cool-climate material specification favours solid timber and warm-toned natural stone.",
    leadTime:
      "12–14 weeks from deposit; combined Bathurst / Orange install routes.",
    freight: "Direct Newcastle install team.",
    architecture: [
      "Federation (Orange CBD, Bletchington)",
      "Inter-war (East Orange)",
      "Rural farmhouse renovation",
      "Vineyard cellar-door fitouts",
      "Cool-climate contemporary",
    ],
  },
};
