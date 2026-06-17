const SERVICE_WHAT_IS: Record<string, string> = {
  "custom-kitchen-joinery":
    "Custom kitchen joinery is cabinetry designed and built to your exact layout, storage needs, and finish — not flatpack sizing. SteepWood manufactures every kitchen in our Newcastle workshop using premium 2-pac, stone benchtops, and Blum hardware, with fixed-price quotes across 16 Australian cities.",
  "built-in-wardrobes":
    "Built-in wardrobes and walk-in robes are made-to-measure storage systems fitted wall-to-wall in your bedroom or dressing room. SteepWood designs every wardrobe around how you actually dress and store — with soft-close drawers, hanging zones, and mirror panels manufactured in Newcastle.",
  "office-fitout":
    "An office fitout is the complete workplace joinery package — reception desks, breakout kitchens, meeting room cabinetry, and storage walls — designed for how your team works. SteepWood plans and delivers commercial fitouts from our Newcastle workshop with fixed-price contracts and documented programmes.",
  "shopfitting":
    "Shopfitting is custom retail joinery — display shelving, counters, fitting rooms, and service desks — built to your brand planogram and landlord requirements. SteepWood manufactures shopfit components in Newcastle for boutique, hospitality, pharmacy, and medical tenants Australia-wide.",
  "custom-bathroom-vanity":
    "Custom bathroom vanity joinery is wall-hung or freestanding cabinetry built with moisture-resistant HMR construction and premium stone or timber finishes. SteepWood designs and installs vanities across Australia from our Newcastle workshop, with sealed edges rated for wet-area use.",
  "commercial-joinery":
    "Commercial joinery covers reception desks, hospitality bars, healthcare cabinetry, and durable service counters built for heavy daily use. SteepWood supplies fire-rated board options, shop drawings, and batch production from Newcastle for builders, architects, and tenants.",
  "custom-furniture":
    "Custom and bespoke furniture is timber pieces designed to your room dimensions — dining tables, entertainment units, bedheads, and shelving — not catalogue sizing. SteepWood hand-finishes every piece in Newcastle using Australian hardwoods and oil or 2-pac coatings.",
  "home-office-joinery":
    "Home office joinery is built-in desks, overhead cabinets, and library walls with integrated cable management for residential workspaces. SteepWood manufactures WFH joinery in Newcastle with soft-close drawers, power grommets, and finishes matched to your home.",
  "laundry-cabinets":
    "Laundry cabinet joinery is overhead, base, and tall utility storage built with HMR moisture-resistant board for Australian laundry rooms. SteepWood designs bench runs over appliances, broom cupboards, and butler's pantries from our Newcastle workshop.",
  "staircase-joinery":
    "Timber staircase joinery is custom-designed stair runs — straight, floating, or curved — engineered to NCC requirements with premium handrails and balustrades. SteepWood manufactures and installs staircases in American oak, Tasmanian oak, and Spotted Gum from Newcastle.",
};

const SERVICE_MATERIALS: Record<string, string> = {
  "custom-kitchen-joinery":
    "SteepWood kitchens use Laminex and Polytec panels, 2-pac sprayed doors, Caesarstone and Smartstone benchtops, and Blum soft-close hardware as standard on premium specifications. Material samples are co-ordinated during design so door colour, benchtop, and splashback are locked before manufacture.",
  "built-in-wardrobes":
    "Wardrobe interiors use Polytec and Laminex melamine, optional 2-pac or veneer fronts, and Blum soft-close runners and LED lighting. Mirror panels, cedar strips, and full-extension drawers are specified per room during the design consultation.",
  "office-fitout":
    "Commercial office joinery uses grade laminate and compact panels, solid surface benchtops, and Blum or Häfele hardware rated for high-cycle use. Acoustic and privacy treatments are co-ordinated with the joinery installation programme.",
  "shopfitting":
    "Retail joinery uses commercial-grade Laminex and Polytec, CNC-routed MDF profiles, solid surface counters, and custom metal fixtures where the brief requires them. Finishes are selected for durability under daily customer traffic.",
  "custom-bathroom-vanity":
    "Bathroom vanities use HMR moisture-resistant carcasses, timber veneer or 2-pac drawer fronts, and stone or porcelain benchtops integrated with your plumber's rough-in. All wet-area edges are sealed in our Newcastle workshop before dispatch.",
  "commercial-joinery":
    "Commercial scopes use fire-rated board where required, compact laminate service counters, stainless kick plates, and commercial-grade hinges. Shop drawings document every material specification for certifier review.",
  "custom-furniture":
    "Bespoke furniture is built from Tasmanian oak, Spotted Gum, American oak, and walnut with hand-applied oil or lacquer finishes. Timber species and grain direction are selected during design and sample approval.",
  "home-office-joinery":
    "Home office joinery combines 2-pac and timber desktops, integrated cable trays, power grommets, and soft-close drawer banks. Finishes are matched to existing home cabinetry where required.",
  "laundry-cabinets":
    "Laundry joinery uses HMR white or colour-matched board, moisture-sealed edges, and benchtops rated for appliance heat and humidity. Pull-out hampers and tall broom cupboards are standard options.",
  "staircase-joinery":
    "Staircases are built from structural-grade American oak, Tasmanian oak, or Spotted Gum with oil or polyurethane finishes. Engineering drawings confirm rise, going, and balustrade compliance before workshop manufacture.",
};

const LOCATION_INTRO: Record<string, string> = {
  newcastle:
    "SteepWood is headquartered in Newcastle and services Greater Newcastle, Lake Macquarie, Maitland, and Port Stephens directly from our workshop — with free consultations and install by our own local teams.",
  sydney:
    "SteepWood services Sydney from our Newcastle workshop, 162 km north via the M1, covering the Inner West, Eastern Suburbs, Lower North Shore, and Northern Beaches with free consultations on qualifying projects.",
  canberra:
    "SteepWood services Canberra and the ACT from Newcastle — approximately 425 km south-west — with design, manufacture, and install co-ordinated for homes and commercial tenancies across Queanbeyan.",
  melbourne:
    "SteepWood accepts premium Melbourne kitchen and joinery projects with dedicated interstate freight from our Newcastle workshop, specialising in Hamptons and contemporary shaker specifications.",
  "central-coast":
    "SteepWood services the Central Coast from Newcastle — approximately 45 minutes north of Gosford — with coastal family home kitchens, wardrobes, and renovation joinery across the region.",
  "hunter-valley":
    "SteepWood is based at the gateway to the Hunter Valley wine region, supplying estate kitchens, cellar joinery, and premium residential projects across Pokolbin, Lovedale, and Cessnock.",
  "gold-coast":
    "SteepWood delivers Gold Coast joinery via dedicated freight from Newcastle, including high-rise apartment kitchens and coastal new-build specifications across the metropolitan area.",
  wollongong:
    "SteepWood services Wollongong and the Illawarra from Newcastle — approximately 1 hour 45 minutes north — with escarpment-view home kitchens and renovation joinery.",
  brisbane:
    "SteepWood services Brisbane and South East Queensland via interstate freight from Newcastle, with Queenslander and subtropical open-plan kitchen expertise.",
  perth:
    "SteepWood accepts premium Perth joinery projects with westbound dedicated freight from Newcastle, specialising in wide-light modern home specifications.",
  "byron-bay":
    "SteepWood services Byron Bay and the Northern Rivers from Newcastle with coastal timber-forward kitchens, floating vanities, and renovation joinery.",
  "port-macquarie":
    "SteepWood services Port Macquarie and the Mid North Coast from Newcastle — approximately 1 hour 40 minutes north — with family home and coastal renovation projects.",
  "coffs-harbour":
    "SteepWood services Coffs Harbour from Newcastle with regular northbound freight runs for coastal family kitchens and renovation joinery.",
  adelaide:
    "SteepWood accepts premium Adelaide and Adelaide Hills projects with southbound freight from Newcastle, including stone-and-timber kitchen specifications.",
  bathurst:
    "SteepWood services Bathurst and the Central West from Newcastle with heritage country home kitchens and cool-climate joinery palettes.",
  orange:
    "SteepWood services Orange and Central West NSW estates from Newcastle with cool-toned kitchen and country renovation joinery.",
};

export function getServiceWhatIsPrefix(slug: string): string | null {
  return SERVICE_WHAT_IS[slug] ?? null;
}

export function getServiceMaterialsPrefix(slug: string): string | null {
  return SERVICE_MATERIALS[slug] ?? null;
}

export function getLocationIntroPrefix(slug: string): string | null {
  return LOCATION_INTRO[slug] ?? null;
}
