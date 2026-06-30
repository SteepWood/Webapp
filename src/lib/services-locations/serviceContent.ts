import {
  ALL_CITIES,
  CITY_LABEL,
  RELATED_SERVICES,
  isService,
  type Service,
} from "@/lib/seo-graph";

export type ServiceFaq = {
  id: string;
  question: string;
  answer: string;
};

export type ServiceInclude = {
  title: string;
  description: string;
};

export type ServiceBodySection = {
  title: string;
  paragraphs: string[];
};

export type RelatedServiceLink = {
  slug: string;
  label: string;
};

export type ServicePillarContent = {
  heroIntro: string;
  whatIsParagraphs: string[];
  includes: ServiceInclude[];
  materials: string[];
  processSteps: { title: string; description: string }[];
  bodySections: ServiceBodySection[];
  faqs: ServiceFaq[];
  relatedServices: RelatedServiceLink[];
  portfolioBrowseLabel: string;
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
): ServiceFaq[] {
  return items.map((item, index) => ({
    id: `${slug}-faq-${index + 1}`,
    question: item.question,
    answer: item.answer,
  }));
}


const KITCHEN_WHAT_IS = splitParagraphs(
  `Custom kitchen joinery starts with a genuine understanding of how your household actually uses the kitchen. Are you cooking for a family of six, hosting dinner parties, or running a busy household that needs serious storage and hard-wearing surfaces? Every one of those scenarios demands different cabinet configurations, different hardware choices, and different door finishes. When you work with a custom kitchen joiner rather than a flatpack supplier, you get a team that measures your space precisely, designs around your life, and builds cabinetry that fits — floor to ceiling, wall to wall, corner to corner.

Our kitchens are manufactured in Newcastle using premium materials: Laminex and Polytec decorative panels, 2pac polyurethane door finishes, Caesarstone and Smartstone benchtops, and Blum hardware throughout. Whether you want a classic Hamptons kitchen with shaker profile doors and stone benchtops, a sleek contemporary space with handleless cabinetry in a deep charcoal, or a warm coastal kitchen built around natural timber tones and Tasmanian oak accents, we have the craftsmanship and the supplier relationships to make it happen.

We work across Newcastle, Sydney, Melbourne, Brisbane, Perth, and 12 more Australian cities — servicing new builds, full renovations, and kitchen-only refurbishments. Our process is straightforward: a free in-home consultation, a detailed design render, a fixed-price quote, and a manufacturing timeline you can plan around. Most custom kitchen projects are installed within 8 to 14 weeks of deposit.`,
);

const SERVICE_CONTENT: Record<string, ServicePillarContent> = {
  "custom-kitchen-joinery": {
    heroIntro:
      "A well-designed kitchen is the centrepiece of every Australian home — and getting the joinery right is what separates a kitchen that works beautifully from one that merely looks the part. At SteepWood we specialise in custom kitchen joinery built to your exact specifications: your layout, your storage needs, your materials, and your style. No catalogues, no compromises, no standard sizing squeezed into spaces that need something better.",
    whatIsParagraphs: KITCHEN_WHAT_IS,
    includes: [
      {
        title: "Custom cabinetry",
        description:
          "Floor-to-ceiling cabinetry designed around your layout, storage needs, and appliance schedule.",
      },
      {
        title: "Benchtops",
        description:
          "Caesarstone, Smartstone, Essastone, porcelain, and natural stone benchtops templated and installed.",
      },
      {
        title: "Splashbacks",
        description:
          "Co-ordinated splashback selections matched to door finishes and benchtop materials.",
      },
      {
        title: "Soft-close hardware",
        description:
          "Blum drawer runners, Hettich hinges, pull-out pantries, and soft-close doors as standard.",
      },
      {
        title: "Integrated appliances",
        description:
          "Joinery designed and built around your chosen ovens, dishwashers, fridges, and rangehoods.",
      },
      {
        title: "Finishing and install",
        description:
          "Professional installation by our own teams with structural warranty and supplier-backed hardware cover.",
      },
    ],
    materials: [
      "Our kitchens are manufactured in Newcastle using premium Laminex and Polytec decorative panels, 2-pac polyurethane door finishes sprayed in our workshop, natural timber veneer kitchen cabinets Australia-wide, and solid hardwood accents where the brief calls for warmth. We compare Polytec vs Laminex kitchen doors during design — including Polytec SYNC woodgrain kitchen doors and current Laminex colour trends 2025 2026 — so you see 2pac vs laminate kitchen Australia options side by side.",
      "Bench and work surfaces are available in Caesarstone, Smartstone, Essastone, Quantum Quartz, porcelain, and natural stone. Following the engineered stone ban in NSW, we specify stone benchtop ban Australia alternative surfaces — sintered stone, porcelain, and natural stone — with transparent Caesarstone benchtop cost Australia context where legacy engineered stone remains in existing homes.",
      "Hardware is Blum throughout — Blum soft close hardware quality is standard on every project, with pull-out pantries, integrated appliances kitchen design 2026 layouts, and lift mechanisms backed by a 25-year manufacturer warranty on residential projects.",
      "Planning a renovation? Our process follows a practical kitchen renovation checklist Australia homeowners can track week by week, with a custom kitchen timeline how long Australia clients can expect from deposit to install. We discuss flat pack vs custom kitchen Australia trade-offs openly — including flat pack kitchen IKEA vs custom worth it scenarios — and link to our blog for deeper guides on warm minimalism kitchen design Australia and kitchen design trends Australia 2026.",
    ],
    processSteps: [
      {
        title: "Free design consultation",
        description:
          "45–60 minutes in your home. We understand how you cook, entertain, and store — then measure your space precisely.",
      },
      {
        title: "Design render and fixed-price quote",
        description:
          "Within five working days of measure you receive drawings, material selections, and a fixed-price quote.",
      },
      {
        title: "Manufacture in Newcastle",
        description:
          "Most custom kitchen projects take 8–14 weeks from deposit: 2–3 weeks design, 6–8 weeks manufacture.",
      },
      {
        title: "Install by our own teams",
        description:
          "On-site installation typically takes 3–7 days. We co-ordinate plumbers and electricians where required.",
      },
    ],
    bodySections: [],
    faqs: buildFaqs("custom-kitchen-joinery", [
      {
        question: "How much does custom kitchen joinery cost in Australia?",
        answer:
          "Custom kitchens range from $15,000 for a small budget kitchen with laminate doors and laminate tops, through to $120,000+ for a luxury kitchen with 2pac doors, stone benchtops, and butler's pantry. Most SteepWood kitchens fall between $35,000 and $75,000.",
      },
      {
        question: "How long does it take to build a custom kitchen?",
        answer:
          "From deposit to installation: typically 8 to 14 weeks. Design and approvals take 2–3 weeks; manufacturing 6–8 weeks; installation 3–7 days.",
      },
      {
        question: "What is the difference between 2pac and polyurethane?",
        answer:
          '2pac is a two-pack polyurethane — the same family of finish, sprayed in our spray booth for a hard, uniform finish. "Polyurethane" generally refers to the same material; the term "2pac" is the trade name. Both are durable, washable, and available in any colour from Dulux, Resene, or Polytec palettes.',
      },
      {
        question: "Can you match my kitchen joinery to my benchtop material?",
        answer:
          "Yes. We carry samples from Caesarstone, Smartstone, Essastone, Quantum Quartz, Polytec, and Laminex, and we coordinate door colour, benchtop, and splashback during the design stage.",
      },
      {
        question: "Do you supply and install appliances?",
        answer:
          "We design around your chosen appliances (or recommend Westinghouse, Bosch, Miele, Smeg, Fisher & Paykel depending on budget) and install joinery to suit. Appliance supply is optional — many clients prefer to source independently.",
      },
      {
        question: "What warranties do you offer on kitchen joinery?",
        answer:
          "10-year structural warranty on joinery, 25-year Blum hardware warranty (manufacturer-backed), benchtop warranties per supplier (Caesarstone offers a 25-year residential warranty).",
      },
      {
        question:
          "Can you work with an existing floor plan, or does the whole kitchen need to change?",
        answer:
          "Both. We do straight cabinetry replacements within an existing footprint, and we also redesign full layouts in partnership with builders and architects.",
      },
      {
        question: "What is the minimum space needed for a kitchen island?",
        answer:
          "1,000 mm clear walkway on every side of the island is the practical minimum; 1,200 mm is ideal. Total island width including bench: from 900 mm for a small prep island, up to 1,500–1,800 mm for an island with seating.",
      },
      {
        question: "How much does a custom kitchen cost in Sydney in 2026?",
        answer:
          "Custom kitchen cost Sydney projects typically range from $45,000 to $95,000 for mid-to-high-spec 2-pac joinery with stone or porcelain benchtops. Kitchen renovation Sydney cost 2026 depends on scope — a straight cabinetry refresh is lower; a full layout change with butler's pantry joinery cost Australia clients often budget $75,000–$120,000.",
      },
      {
        question: "What is included in a custom joinery quote for kitchens?",
        answer:
          "Quotes cover design consultation, manufacture in our Newcastle workshop, delivery or install to your city, soft-close hardware, and our 10-year structural warranty. Custom joinery Sydney cost 2026 and interstate pricing both itemise cabinetry, benchtops, and installation separately so you can compare like for like.",
      },
    ]),
    relatedServices: [
      { slug: "built-in-wardrobes", label: "Built-In Wardrobes" },
      { slug: "custom-bathroom-vanity", label: "Custom Bathroom Vanity" },
      { slug: "laundry-cabinets", label: "Laundry Cabinets" },
    ],
    portfolioBrowseLabel: "Browse Kitchen Projects",
  },
};

function defineService(
  slug: string,
  content: Omit<ServicePillarContent, "bodySections">,
): void {
  SERVICE_CONTENT[slug] = {
    ...content,
    bodySections: [],
  };
}

defineService("built-in-wardrobes", {
  heroIntro:
    "A well-planned built-in wardrobe or walk-in robe does far more than store your clothes — it sets the tone for your bedroom, streamlines your morning routine, and adds measurable value to your property. At SteepWood we design and build custom wardrobe joinery across Australia: from compact bedroom built-ins that make every centimetre count, to luxury walk-in robes with island benches, integrated lighting, and full-height mirror panels.",
  whatIsParagraphs: splitParagraphs(
    `Every wardrobe we build is made to measure. That means no awkward gaps at the ceiling, no pre-determined shelf heights that don't suit your wardrobe, and no standard door widths that leave you fighting for the last few centimetres of hanging space. We start by understanding how you actually use your robe — how much hanging space you need, whether you fold or hang, and whether you'd like drawers inside the wardrobe or a separate freestanding chest. Then we design around that reality.

Our built-in wardrobes are manufactured using premium Polytec and Laminex panels, finished in melamine, 2pac gloss, matt, or veneer. Door styles include sliding, hinged, and bi-fold in a range of profiles — from frameless minimalist to full-profile Hamptons shaker. Internal fittings are sourced from Blum: their soft-close drawer runners, LED lighting systems, and pull-out accessories are the gold standard in Australian cabinetry for a reason.

For customers considering a walk-in robe, we help with layout planning from the outset — advising on the minimum width of 1,500 mm for a comfortable single-sided WIR, through to full U-shaped dressing rooms with island bench, mirrors, and charging stations. Walk-in robes in Australia typically start around $10,000 to $15,000 for a basic fit-out and scale up to $30,000 or more for a fully bespoke dressing room.

We serve homeowners, builders, and interior designers across Newcastle, Sydney, Melbourne, Brisbane, Perth, Adelaide, and 10 more cities. Free in-home consultation and design quote — no obligation.`,
  ),
  includes: [
    {
      title: "Built-in wardrobes",
      description:
        "Closed cabinetry with doors against a wall, maximising smaller bedrooms.",
    },
    {
      title: "Walk-in robe layouts",
      description:
        "L-shape, U-shape, and straight layouts from 1,500 mm minimum width with island bench options.",
    },
    {
      title: "Door styles",
      description: "Sliding, hinged, bi-fold, and frameless profiles in melamine, 2pac, or veneer.",
    },
    {
      title: "Internal fittings",
      description:
        "Short hang, long hang, drawers, jewellery inserts, shoe racks, and pull-out accessories.",
    },
    {
      title: "LED and mirror integration",
      description:
        "Blum SERVO-DRIVE LED, motion-sensor strip lighting, and full-height mirror panels.",
    },
    {
      title: "Installation",
      description:
        "Design to install in 4–8 weeks with on-site installation typically completed in 1–2 days.",
    },
  ],
  materials: [
    "Every SteepWood wardrobe is made to measure in our Newcastle workshop. Carcasses are built from Australian-made Polytec and Laminex melamine board, with fronts available in melamine, 2pac polyurethane, timber veneer, or solid timber to suit Hamptons, contemporary, and coastal interiors. For clients comparing supplier ranges, the Polytec vs Laminex kitchen doors question comes up constantly — both are excellent, and we hold full sample libraries of each so you can match wardrobe doors to kitchen and laundry joinery commissioned in the same project.",
    "Timber veneer kitchen cabinets Australia are increasingly popular for clients who want warmth without the cost or movement of solid hardwood. We stock and order in Tasmanian oak, American oak, Blackbutt, and Spotted Gum veneer pressed on premium HMR substrates, and we finish in matt or satin polyurethane in our workshop. Wardrobe fronts in the same timber veneer libraries cross over between wardrobes, kitchens, and feature joinery, which is the easiest way to co-ordinate a whole-home palette.",
    "Built in wardrobe design trends 2026 are leaning toward floor-to-ceiling fronts with no top reveal, integrated LED behind glass shelving, push-to-open hardware on minimalist door styles, and dressing-room layouts with island benches in walk-in robes. We are also seeing strong demand for warm timber veneer interiors paired with matt black or brushed brass handles, soft-curve profiles on bedhead-facing fronts, and walk in wardrobe design ideas Australia is borrowing from luxury hotel suites — full-height mirror panels, charging stations, jewellery drawers, and feature pendant lighting above the island.",
    "Internal hardware is Blum end-to-end. Blum soft close hardware quality is the reason we specify it as standard rather than as an upgrade: drawer runners that close softly under any load, LEGRABOX drawer systems for shoe drawers and jewellery inserts, and SERVO-DRIVE LED strip lighting that switches with the door — all backed by a 25-year manufacturer warranty on residential projects. Pull-out shoe racks, valet rails, trouser hangers, hamper drawers, and motion-sensor lights are configured per room during the design consultation.",
  ],
  processSteps: [
    {
      title: "Wardrobe consultation",
      description:
        "We map how you dress, store, and use the space — then measure ceiling heights and wall runs precisely.",
    },
    {
      title: "Layout design and quote",
      description:
        "Detailed internal layout, door style selection, and fixed-price quote within five working days.",
    },
    {
      title: "Manufacture in Newcastle",
      description: "Typical lead time 4–8 weeks from deposit to ready for install.",
    },
    {
      title: "Install",
      description:
        "On-site installation typically 1–2 days for built-ins; walk-in robes may take 2–3 days.",
    },
  ],
  faqs: buildFaqs("built-in-wardrobes", [
    {
      question: "How much does a built-in wardrobe cost in Australia?",
      answer:
        "Built in wardrobes cost Australia ranges typically run from $2,500 for a single-room hinged-door robe in melamine, through $4,000 to $8,000 for a larger built-in with 2pac fronts and Blum drawer banks, up to $10,000+ for floor-to-ceiling joinery with mirrored sliding doors, internal LED, and timber veneer fronts. Most three-bedroom homes we fit out across NSW sit between $7,000 and $15,000 for the whole house. Pricing is fixed before manufacture — we do not quote per linear metre, because every wardrobe is different.",
    },
    {
      question: "What is the minimum width for a walk-in robe?",
      answer:
        "A comfortable single-sided walk in robe needs about 1,500 mm of internal width. For a U-shape WIR with hanging on three sides, plan on 2,400 mm minimum. If you have the space, a walk in wardrobe with an island bench typically needs 3,000 mm width at the centre. For pricing context, our walk in robe cost guide Australia article — walk-in-robe-built-in-wardrobe-cost-guide-nsw — breaks down WIR pricing by layout, finish, and city.",
    },
    {
      question: "Is it cheaper to build custom wardrobes or buy flatpack?",
      answer:
        "Flatpack is cheaper on the supply price — usually 30 to 50 percent less than a custom robe of comparable scale. The trade-off is fit (flatpacks come in standard module sizes, leaving gaps at the ceiling or wall), finish (lower-grade hardware and edge banding), and longevity (most flatpack runners are not rated for the load and cycle count Blum runners carry). For a single shorter robe in a rental, flatpack can make sense. For your own home, a custom wardrobe with Blum soft-close hardware and made-to-measure dimensions pays off across the life of the home.",
    },
    {
      question: "How much does a walk-in robe cost in Newcastle, NSW?",
      answer:
        "Walk in wardrobe Newcastle NSW cost typically lands between $8,000 and $15,000 for a standard U-shape or L-shape WIR in melamine carcass with 2pac fronts, Blum drawers, and LED strip lighting. A premium dressing room with timber veneer fronts, an island bench, full-height mirrors, and motion-sensor lighting sits from $18,000 upward. Because we manufacture in Newcastle, there is no freight loading for Hunter, Central Coast, or Lower Hunter installs — quote includes site measure, design, build, delivery, and install.",
    },
    {
      question: "What are the built-in wardrobe design trends for 2026?",
      answer:
        "Built in wardrobe design trends 2026 are running in three clear directions. First, floor-to-ceiling fronts with no top reveal — the wardrobe disappears into the wall. Second, matt textures and warm timber veneer interiors replacing high-gloss whites. Third, dressing-room layouts inside larger walk-in robes — island benches, jewellery drawers, charging stations, and full-height mirrors are now standard requests for the master suite. We are also fitting more push-to-open Blum runners and SERVO-DRIVE LED systems for handleless minimalist styles.",
    },
    {
      question: "What materials are used for built-in wardrobes?",
      answer:
        "Carcasses: Laminex/Polytec melamine. Doors: 2pac polyurethane, melamine, veneer, or solid timber. Hardware: Blum drawer runners and hinges.",
    },
    {
      question: "How long does it take to install built-in wardrobes?",
      answer:
        "Design to install: 4–8 weeks. On-site installation typically 1–2 days.",
    },
    {
      question: "Do built-in wardrobes add value to a home?",
      answer:
        "Yes — agents consistently cite quality joinery as a value-add. A $5,000 wardrobe upgrade typically returns $8,000–$12,000 at sale in mid-tier markets.",
    },
    {
      question:
        "What is the difference between a built-in wardrobe and a walk-in robe?",
      answer:
        "A built-in wardrobe is closed cabinetry with doors against a wall; a walk-in robe is a dedicated room with internal joinery. Walk-ins suit larger bedrooms; built-ins maximise smaller rooms.",
    },
    {
      question: "Can I get a wardrobe with integrated lighting and charging points?",
      answer:
        "Yes — Blum SERVO-DRIVE LED, motion-sensor strip lighting, and integrated USB-C/AC power points are standard options.",
    },
  ]),
  relatedServices: [
    { slug: "custom-kitchen-joinery", label: "Custom Kitchen Joinery" },
    { slug: "custom-bathroom-vanity", label: "Custom Bathroom Vanity" },
    { slug: "custom-furniture", label: "Custom Furniture" },
  ],
  portfolioBrowseLabel: "Browse Wardrobe Projects",
});

// Additional services — compact definitions with full Section 9.4 copy
const REMAINING_SERVICES: Record<
  string,
  Omit<ServicePillarContent, "bodySections">
> = {
  "office-fitout": {
    heroIntro:
      "An office fitout is one of the most significant investments a business makes in its workplace culture and productivity. Done well, a fitout energises your team, impresses clients, and supports the way your people actually work. Done poorly — or chosen purely on the basis of lowest price — it can be a source of daily frustration, cramped spaces, inadequate storage, and a brand presentation that undersells your business.",
    whatIsParagraphs: splitParagraphs(
      `At SteepWood we plan and deliver complete office fitouts for businesses of all sizes across Australia: from start-ups fitting out their first space, to established firms relocating to new premises, to large corporates refurbishing existing offices to support new ways of working. Our team handles the full scope: workplace strategy, design, documentation, custom joinery, partitioning, flooring, lighting, and acoustic treatments.

We are specialists in the joinery elements that define a quality fitout — reception desks, breakout kitchen joinery, boardroom credenzas, storage walls, and meeting room cabinetry. These are the pieces that carry your brand identity and see the most daily use. We manufacture in Newcastle using commercial-grade Laminex and Polytec panels, solid surface tops, and Blum and Häfele hardware, and we finish to the same standard we bring to residential work.

Office fitout costs in Australia typically range from $800 to $3,000+ per square metre, depending on city, finish level, and the extent of structural work required. Sydney and Melbourne sit at the upper end; Perth and Adelaide offer slightly lower rates. A basic open-plan refresh may be achievable under $1,000 per sqm; a premium fitout with custom joinery, quality finishes, and advanced acoustic treatment will sit from $2,500 upward.

We provide fixed-price contracts, detailed project programmes, and a single point of contact for every project. Contact us to discuss your office fitout brief.`,
    ),
    includes: [
      { title: "Reception desks", description: "Brand-defining reception joinery designed for daily client-facing use." },
      { title: "Breakout joinery", description: "Kitchenettes, credenzas, and breakout storage for staff amenity zones." },
      { title: "Meeting room cabinetry", description: "Boardroom storage, AV integration, and display joinery." },
      { title: "Partitioning co-ordination", description: "Acoustic and privacy solutions integrated with joinery layouts." },
      { title: "Storage walls", description: "Floor-to-ceiling storage and filing systems for agile workplaces." },
      { title: "Project management", description: "Fixed-price contracts, programmes, and single point of contact." },
    ],
    materials: [
      "Office joinery from SteepWood is manufactured in Newcastle and installed Australia-wide. Carcasses and casework use commercial-grade Laminex and Polytec panels, compact phenolic where high-cycle wear is expected, and solid surface or stone bench tops on reception desks and breakout zones. Hardware is Blum and Häfele throughout — drawer runners, hinges, and lift mechanisms rated for the cycle counts a busy office produces.",
      "Commercial joinery fitout cost Australia varies more by inclusions than by size: a 200 sqm tenancy with a custom reception desk, two boardroom credenzas, a breakout kitchen, and four storage walls can land anywhere between $80,000 and $250,000 depending on finish level, freight to city, and programme compression. Sydney and Melbourne tenancies typically sit at the higher end; office fit out Newcastle projects benefit from our local workshop — no interstate freight loading, faster site revisits, and shorter programmes than Sydney tenants typically see. See /office-fitout/newcastle/ for Hunter-specific scope and pricing guidance.",
      "We also build home office fitout ideas built-in shelves elements — wall-to-wall bookcase joinery, integrated desks, and floor-to-ceiling storage — as part of larger residential commissions and for executives running serious home offices. The same workshop, the same Blum hardware, the same 2pac and veneer finishes carry across our commercial and residential work, which makes co-ordinating brand colour across head office and home study very straightforward.",
      "Joinery lead time Australia workshop schedules are the single biggest factor in office-fitout programmes that slip. Our standard workshop lead time is six to ten weeks from signed shop drawings to delivery for a mid-sized fitout, and we book site dates against the construction programme rather than pretending to deliver in unrealistic windows. We provide weekly progress photos, shop drawings for certifier review, and a single project manager from brief to handover.",
    ],
    processSteps: [
      { title: "Workplace brief", description: "We understand headcount, work styles, and brand requirements before measuring." },
      { title: "Design and documentation", description: "3–4 weeks for design, landlord approvals, and fixed-price contract." },
      { title: "Construction programme", description: "Manufacture in our Newcastle workshop runs in parallel with site partitioning and services. Joinery lead time Australia workshop schedules are typically six to ten weeks for a mid-sized commercial fitout, and we lock dates against the builder's programme at shop-drawing sign-off — not at deposit. Weekly photos from the workshop floor keep the project manager and tenant in the loop." },
      { title: "Handover", description: "Co-ordinated trades, defect period, and itemised depreciation schedule supplied." },
    ],
    faqs: buildFaqs("office-fitout", [
      { question: "How much does an office fitout cost per square metre in Australia?", answer: "Office fitout costs in Australia typically range from $800 to $3,000+ per square metre, depending on city, finish level, and the extent of structural work required. Sydney and Melbourne sit at the upper end; Perth, Adelaide, Canberra, and regional NSW offer lower rates because of trade availability and freight. A basic open-plan refresh may be achievable under $1,000 per sqm; a premium fitout with custom joinery, quality finishes, and advanced acoustic treatment will sit from $2,500 upward. Commercial joinery fitout cost Australia is the major driver inside that per-sqm figure on most projects." },
      { question: "Do you provide office fit out in Newcastle, NSW?", answer: "Yes. Office fit out Newcastle is our home market — our workshop and install teams are based here, which means the shortest lead times, direct site revisits during manufacture, and no interstate freight loading on Hunter tenancies. We fit out CBD offices, Honeysuckle professional suites, Hamilton creative spaces, and Charlestown commercial premises. Full scope, lead times, and fixed-price guidance: /office-fitout/newcastle/." },
      { question: "How does commercial joinery fitout cost compare across Australia?", answer: "Commercial joinery fitout cost Australia depends on three things: panel grade (commercial Laminex / Polytec vs decorative residential board), hardware tier (Blum and Häfele commercial-rated runners vs domestic), and the volume of custom shop-drawn elements vs off-the-shelf casework. As a rule of thumb, expect $1,200–$2,200 per linear metre for premium commercial joinery, plus separate line items for stone benchtops, integrated AV, and acoustic treatments. Freight to Sydney, Brisbane, Perth, and Adelaide is quoted separately so you can see exactly what the joinery itself costs." },
      { question: "Do you also handle shopfitting joinery, or just office fitouts?", answer: "We do both. Shopfitting joinery cost Australia tracks slightly lower per linear metre than office fitout because retail counters and shelving systems repeat across modules, while office reception and boardroom joinery are typically one-off. If your project is retail rather than office — POS counters, display fixtures, shelving systems — see our shopfitting service page at /shopfitting/. We are happy to scope mixed-use jobs (e.g. ground-floor retail with first-floor head office) under a single project programme." },
      { question: "Can SteepWood also build a home office to match my workplace joinery?", answer: "Yes. Many of our office-fitout clients ask us to deliver matching home office fitout ideas built-in shelves, integrated desks, and bookcase walls for their residences. Because we hold colour and timber samples on file from your commercial project, we can match decor finishes, brand colour, and hardware tier across both spaces. See our home office joinery service page at /home-office-joinery/ for residential scope." },
      { question: "What is included in an office fitout?", answer: "Demolition, partitioning, electrical, joinery (reception, kitchen, storage), flooring, ceiling, lighting, acoustic treatment, paint, signage, and IT cabling co-ordination." },
      { question: "How long does an office fitout take?", answer: "Typical 200–500 sqm fitout: 6–12 weeks from contract. Design and approvals: 3–4 weeks. Construction: 4–8 weeks. Large or council-permit-required: 16+ weeks." },
      { question: "What is the difference between a warm shell and cold shell fitout?", answer: "Cold shell: bare concrete, no services, no ceiling. Warm shell: services stubbed in, basic ceiling and floor. Turnkey: full fitout to occupancy." },
      { question: "Do I need a permit for an office fitout?", answer: "Cosmetic works (paint, carpet, joinery): usually no permit. Structural, fire-rated wall changes, or change-of-use: council development application required. We manage the certification process." },
      { question: "How do I find a reliable office fitout company?", answer: "Check HIA or MBA membership, public liability insurance ($20m minimum), commercial portfolio, fixed-price contract willingness, and direct trade references from completed projects." },
      { question: "What is agile workplace design?", answer: "A workplace where staff don't have fixed desks — instead, a mix of focus zones, collaboration areas, and quiet rooms. Suits hybrid-work organisations with <70% daily attendance." },
      { question: "Can I claim an office fitout as a tax deduction in Australia?", answer: "Fitout depreciation falls under Division 43 (capital works, 2.5% over 40 years) and Division 40 (plant & equipment, varying lives). Consult your accountant; we provide an itemised depreciation schedule with every project." },
    ]),
    relatedServices: [
      { slug: "commercial-joinery", label: "Commercial Joinery" },
      { slug: "shopfitting", label: "Shopfitting" },
      { slug: "home-office-joinery", label: "Home Office Joinery" },
    ],
    portfolioBrowseLabel: "Browse Office Fitout Projects",
  },
  shopfitting: {
    heroIntro:
      "Your retail environment is your brand made physical. Before a customer picks up a product or speaks to your staff, your shopfit has already communicated whether your brand is premium or budget, considered or careless, worth their time or just another shop. At SteepWood we design and build custom shopfitting and retail joinery for businesses across Australia — from boutique fashion stores and specialty cafes, to pharmacies, medical centres, beauty salons, and flagship retail spaces.",
    whatIsParagraphs: splitParagraphs(
      `Shopfitting is more than assembling shelves and a counter. It is the precise integration of custom joinery, lighting, flooring, signage, and customer flow — all executed to a brief that reflects your brand, meets your landlord's conditions, complies with council requirements, and opens on time. We manage the full process: initial concept design, documentation for landlord and council approval, manufacture of custom joinery, co-ordination of trades, and on-site installation.

Our retail joinery is manufactured in Newcastle using commercial-grade Laminex and Polytec panels, CNC-routed MDF profiles, solid surface counters, and custom metal fixtures where the brief demands them. We work to planograms and brand style guides, and we are experienced in replicating a fitout across multiple store locations when rollout consistency is required.

Shop fitout costs in Australia vary widely by scope and finish level. Basic retail fitouts: $400 to $800 per square metre; mid-range custom with bespoke joinery: $800 to $1,500 per sqm; premium luxury fitouts with imported finishes and architectural metalwork can exceed $3,000 per sqm. Most established retail fitouts fall in the mid-range tier.

Contact SteepWood to discuss your retail fitout brief. Free initial consultations, fixed-price quotes, clear programme timelines.`,
    ),
    includes: [
      { title: "POS counters", description: "Custom point-of-sale counters designed to brand standards and customer flow." },
      { title: "Display fixtures", description: "Fashion, pharmacy, beauty, and medical display units built to planogram." },
      { title: "Shelving systems", description: "Wall and freestanding shelving for retail, hospitality, and specialty tenants." },
      { title: "Showcases", description: "Product display showcases with lighting integration where required." },
      { title: "Back-of-house storage", description: "Staff storage, change rooms, and BOH cabinetry for retail operations." },
      { title: "Landlord approvals", description: "Documentation and co-ordination for landlord and council compliance." },
    ],
    materials: [
      "Shopfitting joinery cost Australia varies more by finish level than by floor area. Basic retail fitouts in melamine and laminate sit at $400 to $800 per square metre; mid-range custom retail joinery with bespoke counters, fixtures, and 2pac doors runs $800 to $1,500 per sqm; premium luxury fitouts with imported finishes, architectural metalwork, and feature lighting can exceed $3,000 per sqm. Most established retailers we work with land in the mid-range tier, and we provide a fixed-price quote against the planogram and brand style guide before manufacture starts.",
      "Our retail joinery is manufactured in Newcastle using commercial-grade Laminex and Polytec panels, CNC-routed MDF profiles, solid surface counters, and custom metal fixtures where the brief demands them. We work to planograms, brand style guides, CAD files, and brand-mandated suppliers, and we are experienced in replicating a fitout across multiple store locations when rollout consistency is required.",
      "Where projects cross between retail and head office or back-of-house — typical for flagship stores, hospitality groups, and clinic chains — we co-ordinate scope with our commercial joinery service. Commercial joinery fitout cost Australia tends to be a bit higher per linear metre than pure retail because boardroom, reception, and storage-wall pieces are one-off rather than modular. For mixed-scope or back-of-house work, see our commercial joinery service page at /commercial-joinery/.",
      "Every shopfit comes with a 10-year structural joinery warranty, a 12-month builders' warranty on workmanship, and the manufacturer's hardware warranty (25 years on Blum). Shop drawings, landlord documentation, and council compliance paperwork are co-ordinated by our project team — not handed back to the tenant.",
    ],
    processSteps: [
      { title: "Retail brief", description: "Sector, brand standards, landlord conditions, and opening date established upfront." },
      { title: "Concept and documentation", description: "Landlord and council documentation prepared before manufacture begins." },
      { title: "Manufacture", description: "Boutique fitout (50–150 sqm): 4–8 weeks. Flagship (>300 sqm): 10–16 weeks." },
      { title: "Install and fit-off", description: "On-site installation with co-ordinated trades and defect-free handover." },
    ],
    faqs: buildFaqs("shopfitting", [
      { question: "How much does a shop fitout cost in Australia?", answer: "Shopfitting joinery cost Australia varies widely by scope and finish level. Basic retail fitouts: $400 to $800 per square metre; mid-range custom with bespoke joinery: $800 to $1,500 per sqm; premium luxury fitouts with imported finishes and architectural metalwork can exceed $3,000 per sqm. Most established retail fitouts fall in the mid-range tier. For comparable budgets on office and head-office work, commercial joinery fitout cost Australia typically runs slightly higher per linear metre than retail because office reception and boardroom joinery pieces are one-off rather than modular." },
      { question: "What's included in a joinery quote from SteepWood?", answer: "The joinery quote what's included Australia question gets asked a lot, because tenants have been burned before by quotes that exclude freight, install, or scope creep. A SteepWood shopfitting quote always covers: shop drawings, panel and hardware supply, manufacture in our Newcastle workshop, freight to your site, installation, fit-off, snag and final clean, plus the 10-year structural joinery warranty. Excluded items are listed line-by-line — e.g. electrical, plumbing, signage, flooring, and any landlord-mandated trade restrictions in your lease — so you know exactly what is and isn't in the number." },
      { question: "Do you also do non-retail commercial joinery — offices, healthcare, hospitality?", answer: "Yes. We do all of it. If your scope crosses into office reception, boardroom credenzas, healthcare casework, or hospitality back-of-house, see our commercial joinery service page at /commercial-joinery/. Commercial joinery fitout cost Australia is quoted on the same basis as shopfitting — fixed-price against shop drawings, freight separately itemised, single project manager from brief to handover." },
      { question: "What is the difference between a shopfitter and a builder?", answer: "A shopfitter specialises in tenancy-scale fitouts, fixtures, joinery, and retail-specific compliance (POS, lighting, customer flow). A builder typically handles whole-building construction." },
      { question: "How long does a typical shop fitout take?", answer: "Boutique fitout (50–150 sqm): 4–8 weeks. Larger flagship (>300 sqm): 10–16 weeks. Cafe/hospitality with kitchen exhaust: add 2–4 weeks for council approvals." },
      { question: "Do I need council or landlord approval for a shop fitout?", answer: "Landlord approval is almost always required. Council DA only triggers for structural changes, signage above certain sizes, or change-of-use applications. We manage both." },
      { question: "What is included in custom retail joinery?", answer: "POS counter, display fixtures, shelving systems, wall panelling, back-of-house storage, change rooms (for fashion), product display showcases — all designed to brand standards." },
      { question: "How do I choose the right shopfitter?", answer: "Look for: completed retail portfolio in your sector, public liability $20m+, MBA or HIA membership, willingness to provide fixed-price quote, and references you can call directly." },
      { question: "Can a shopfitter work to a brand style guide?", answer: "Yes — we routinely receive brand bibles from franchise and chain retailers and execute to planogram. CAD files, colour codes, and brand-mandated suppliers all incorporated." },
      { question: "What warranty should I expect from a shopfitter?", answer: "10-year structural joinery, 12-month builders' warranty on workmanship, manufacturer warranties on hardware (Blum 25yr), and statutory warranties under Australian Consumer Law." },
    ]),
    relatedServices: [
      { slug: "commercial-joinery", label: "Commercial Joinery" },
      { slug: "office-fitout", label: "Office Fitout" },
      { slug: "custom-furniture", label: "Custom Furniture" },
    ],
    portfolioBrowseLabel: "Browse Shopfitting Projects",
  },
  "custom-bathroom-vanity": {
    heroIntro:
      "The bathroom vanity is the most demanding piece of joinery in any home. It lives in a permanently humid environment, it is used multiple times a day, and it is one of the first things buyers notice during an inspection. Getting it right — with the right materials, the right finish, and the right dimensions — makes a genuine difference to both daily life and property value.",
    whatIsParagraphs: splitParagraphs(
      `At SteepWood we build custom bathroom vanity joinery for homes across Australia. Every vanity is made to measure: your width, your height, your configuration, your finish. Whether you want a floating Hamptons-style double vanity in white 2pac with brushed-brass tapware and a Smartstone top, or a warm timber vanity in Tasmanian oak with an undermount basin and integrated storage, we have the joinery skills and material knowledge to deliver it.

Our vanities are built to last in wet environments. We use moisture-resistant HMR MDF or solid hardwood as the base material — never standard particleboard — and seal all surfaces before fitting. Door finishes include polyurethane, 2pac, and premium Laminex HMR panels, all of which resist the repeated humidity cycles that degrade lower-quality vanities within a few years. Hinges and drawer systems are Blum throughout, with soft-close as standard.

Custom bathroom vanity pricing in Australia starts at around $1,500 for a basic single vanity, through to $3,000–$5,000 for a larger custom design with a stone top. Comparable to or less than many off-the-shelf premium vanities, but made exactly to your space and style.

We coordinate directly with your plumber and tiler to ensure the joinery sequence works with the broader bathroom renovation timeline. Typical lead time from deposit to installation: three to six weeks.`,
    ),
    includes: [
      { title: "Vanity carcasses", description: "HMR MDF or solid hardwood carcasses — never standard particleboard." },
      { title: "Benchtops", description: "Caesarstone, Smartstone, Essastone, and Quantum Quartz templated to your basin." },
      { title: "Basin integration", description: "Undermount, semi-recessed, or above-counter basins to suit your plumber's specification." },
      { title: "Shaving cabinets", description: "Integrated mirror cabinets and storage tailored to your bathroom layout." },
      { title: "Floating and freestanding", description: "Wall-hung contemporary or floor-standing Hamptons and traditional profiles." },
      { title: "Plumber co-ordination", description: "Install sequenced with your plumber and tiler for a smooth renovation." },
    ],
    materials: [
      "Bathroom vanity custom joinery is built differently to kitchen casework because the room behaves differently. Every SteepWood vanity uses HMR (high moisture-resistant) MDF or solid hardwood carcasses — never standard particleboard — with all cut edges sealed in our Newcastle workshop before they leave for site. Door finishes are 2pac polyurethane, Laminex HMR panels, or timber veneer kitchen cabinets Australia-style facings pressed on HMR substrate. Blum soft-close hinges and runners are standard throughout, with a 25-year manufacturer warranty on hardware.",
      "Coastal home joinery materials humidity is a genuine engineering problem on the NSW coast — Newcastle, Central Coast, Sydney Northern Beaches, and the Hunter all see daily cycles of warm humid air against cool indoor surfaces. Standard particleboard absorbs that moisture at the unsealed edges and swells over time. HMR board, sealed edges, marine-grade adhesives, and stainless-steel hardware are the four things that keep a coastal vanity looking like new at the ten-year mark. We specify the same construction for inland clients too — humidity damage compounds quietly, and the upgrade cost is modest.",
      "MDF vs plywood kitchen substrate Australia is a question we hear often when clients are comparing quotes. For bathroom vanities specifically, our default is HMR MDF for carcasses (dimensional stability, takes a sealed edge cleanly, sands and finishes well) rather than marine plywood (better for fully-submerged or boat-build applications, but more expensive and less flat for cabinet doors). For high-spec coastal builds we sometimes step up to marine ply on plinths and any element within 200 mm of a wet floor. The right answer depends on the room — we show samples and explain trade-offs at design stage.",
      "Bench and basin combinations are templated to your plumber's rough-in. We work in Caesarstone, Smartstone, Essastone, Quantum Quartz, porcelain, and natural stone, with undermount, semi-recessed, or above-counter basin options. Timber-veneer fronts in Tasmanian oak, American oak, Blackbutt, and Spotted Gum bring warmth where the bathroom needs to feel like a sanctuary rather than a service room.",
    ],
    processSteps: [
      { title: "Site measure", description: "We measure your bathroom, confirm basin selection, and plan plumbing clearances." },
      { title: "Design and quote", description: "Fixed-price quote with finish samples and stone templating schedule." },
      { title: "Manufacture", description: "3–6 weeks from deposit in our Newcastle workshop." },
      { title: "Install", description: "Co-ordinated with plumber and tiler for a seamless bathroom sequence." },
    ],
    faqs: buildFaqs("custom-bathroom-vanity", [
      { question: "How much does a custom bathroom vanity cost in Australia?", answer: "Bathroom vanity custom joinery cost in Australia starts at around $1,500 for a basic single vanity in 2pac with a stone top, runs $2,500 to $4,000 for a 1,500 mm double vanity with timber veneer fronts and an undermount basin, and reaches $5,000+ for larger floating designs with integrated lighting, Smartstone tops, and matching shaving cabinets. These figures are comparable to or below many off-the-shelf premium vanities, but every piece is made exactly to your space and style." },
      { question: "MDF or plywood — what's the best substrate for a bathroom vanity in Australia?", answer: "MDF vs plywood kitchen substrate Australia debates apply to vanities too. For most residential bathrooms we recommend HMR MDF carcasses — it is dimensionally stable, takes a sealed edge cleanly, and resists the humidity cycles a typical Australian bathroom produces. Marine plywood is better for fully wet zones (boat builds, pool changing rooms, exposed external joinery) but it is more expensive and less flat for cabinet doors. For high-spec coastal home joinery materials humidity protection, we sometimes specify marine ply on the plinth and any element within 200 mm of a wet floor, while keeping HMR MDF for the door fronts and carcass. We will show samples of each at design stage." },
      { question: "What is the best wood for bathroom vanity cabinets in a humid climate?", answer: "For coastal home joinery materials humidity needs to drive the spec from day one. We default to HMR MDF carcasses with sealed edges, and offer timber veneer kitchen cabinets Australia-style fronts in Tasmanian oak, Blackbutt, Spotted Gum, or American oak — all pressed on HMR substrate and finished in marine-grade polyurethane. Solid hardwood vanities can also be built, but we will discuss panel orientation and finish carefully because solid timber moves more with humidity than veneer-on-HMR does." },
      { question: "Can a cabinet maker build a bathroom vanity with a stone top?", answer: "Yes — we partner with Caesarstone, Smartstone, Essastone, and Quantum Quartz fabricators to template, cut, and install stone tops as part of the vanity package." },
      { question: "What is the difference between a wall-hung and freestanding vanity?", answer: "Wall-hung (floating): cantilevered from the wall, creates an open visual base, suits contemporary bathrooms. Freestanding: rests on the floor, often with a kick plate, traditional or Hamptons styles." },
      { question: "How long does a custom bathroom vanity take to build?", answer: "3–6 weeks from deposit. We coordinate with your plumber and tiler so the install slots into the renovation sequence." },
      { question: "What finish is most durable for a bathroom cabinet?", answer: "2pac polyurethane and Laminex HMR panels are the most durable; both resist humidity, washing, and impact. Avoid vinyl wrap in wet rooms — it can lift over time." },
      { question: "Do bathroom vanities come with basins included?", answer: "Basins are usually supplied by the plumber or homeowner (Caroma, Reece, Roca, Catalano). We design the vanity to fit the chosen basin and cut the benchtop to suit." },
      { question: "What size should a bathroom vanity be for a standard bathroom?", answer: "Standard single vanity: 750 mm or 900 mm wide. Double vanity: 1,500 mm or 1,800 mm. Depth: 460–550 mm. Height: 850–900 mm to top of bench." },
    ]),
    relatedServices: [
      { slug: "custom-kitchen-joinery", label: "Custom Kitchen Joinery" },
      { slug: "laundry-cabinets", label: "Laundry Cabinets" },
      { slug: "custom-furniture", label: "Custom Furniture" },
    ],
    portfolioBrowseLabel: "Browse Bathroom Projects",
  },
  "commercial-joinery": {
    heroIntro:
      "Commercial joinery is the backbone of any well-fitted business interior — from the reception desk that creates a first impression, to the back-of-house cabinetry that makes a hospitality kitchen run smoothly, to the display fixtures that present a retail brand at its best. At SteepWood we design and manufacture commercial joinery for businesses, builders, architects, and interior designers across Australia.",
    whatIsParagraphs: splitParagraphs(
      `Our commercial joinery work spans the full range of sectors: hospitality venues including cafes, restaurants, bars, and hotels; healthcare facilities including medical clinics, dental practices, and allied health centres; education and institutional projects; corporate offices; and retail environments from boutiques to flagship stores. In each case, we bring the same commitment to precise manufacture, on-schedule delivery, and finishes that hold up under the demands of commercial use.

Commercial joinery differs from residential work in several important ways. Materials must meet higher durability and in some cases fire-resistance standards. Projects often require formal documentation, shop drawings, and co-ordination with architects, builders, project managers, and certification authorities. Lead times must be planned around construction programmes. And the stakes are higher: a delayed joinery installation can hold up an entire commercial project.

SteepWood has the experience and infrastructure to manage commercial joinery projects of scale. We provide full shop drawing documentation, work to your programme, and co-ordinate directly with your project manager and trades. Materials include commercial-grade Laminex and Polytec panels, solid surface and stone bench tops, Blum and Häfele commercial hardware, and fire-rated board where specifications require.

If you are a builder, interior designer, or business owner planning a commercial fit-out anywhere in Australia, contact us for a project consultation. We quote competitively on both supply-only and supply-and-install arrangements.`,
    ),
    includes: [
      { title: "Reception joinery", description: "First-impression desks and lobby cabinetry for corporate and healthcare tenants." },
      { title: "Display fixtures", description: "Retail and hospitality display joinery built to architect drawings." },
      { title: "Back-of-house cabinetry", description: "BOH storage, service counters, and hospitality kitchen joinery." },
      { title: "Shop drawings", description: "Full documentation for architect approval and building certification." },
      { title: "Fire-rated options", description: "Fire-rated MDF cores and intumescent finishes per NCC requirements." },
      { title: "Programme management", description: "Co-ordination with builders, PMs, and certification authorities." },
    ],
    materials: [
      "Commercial joinery fitout cost Australia is most usefully discussed per linear metre and per finish tier, not per square metre. A premium reception desk in 2pac and stone runs from $8,000 to $25,000 finished; commercial-grade casework typically sits $1,200–$2,200 per linear metre depending on hardware tier and panel grade; bespoke boardroom credenzas with integrated AV are quoted as one-off pieces. We provide a fixed-price line-item quote against shop drawings before manufacture starts.",
      "Materials are specified to BCA classification and building surveyor requirements. We use commercial-grade Laminex and Polytec panels, compact phenolic where wear is high, stainless steel for healthcare and food-service zones, fire-rated MDF where the spec requires it, and Blum and Häfele commercial-rated hardware throughout. Antimicrobial surfaces and food-safe finishes are sourced where the project type calls for them.",
      "Joinery lead time Australia workshop schedules drive most commercial fitout programmes — joinery is usually the longest-lead trade after FF&E. Our standard workshop lead time is six to ten weeks from signed shop drawings to delivery for a mid-sized job, and we lock dates against the construction programme at shop-drawing sign-off, not at deposit. For phased rollouts across multiple stores or branches, we plan production schedules across all sites so freight and install can be sequenced.",
      "Where projects cross between retail front-of-house and corporate back-of-house, we work to a single project programme. Shopfitting joinery cost Australia tends to track a touch lower per linear metre than office reception because retail counters and shelving repeat across modules, while reception desks and boardroom credenzas are one-off. For retail-only scopes, see our shopfitting service page at /shopfitting/.",
    ],
    processSteps: [
      { title: "Project consultation", description: "We review architect drawings, programme, and compliance requirements." },
      { title: "Shop drawings", description: "Documentation produced for architect mark-up and certification." },
      { title: "Manufacture", description: "Joinery lead time Australia workshop schedules are typically six to ten weeks for a mid-sized commercial job, eight to twelve for multi-store rollouts. Our Newcastle workshop produces under shop drawings signed by you, your architect, and your project manager, with weekly photo updates and a fixed delivery slot booked against the construction programme." },
      { title: "Site install", description: "Co-ordinated delivery and installation to construction programme." },
    ],
    faqs: buildFaqs("commercial-joinery", [
      { question: "What is commercial joinery?", answer: "Custom cabinetry and millwork built to commercial-grade specifications — using fire-rated, food-safe, or impact-resistant materials as required by the project's BCA classification and building surveyor." },
      { question: "How is commercial joinery different from residential joinery?", answer: "Higher material specs, formal documentation (shop drawings, architect markups), and strict programme co-ordination with builders and project managers." },
      { question: "How much does commercial joinery cost in Australia?", answer: "Commercial joinery fitout cost Australia varies by sector and finish level. Hospitality back-of-house and BOH counters: $1,000–$1,500 per linear metre. Healthcare casework with antimicrobial surfaces: $1,500–$2,200 per linear metre. Premium reception and boardroom joinery: $2,000–$3,500 per linear metre, with one-off feature pieces priced separately. Stone benchtops, integrated AV, and acoustic treatments are quoted as line items so you see exactly what the joinery itself costs versus the broader fitout." },
      { question: "What's included in a commercial joinery quote?", answer: "The joinery quote what's included Australia question is the most important one to answer before signing. A SteepWood commercial joinery quote covers: shop drawings co-ordinated with your architect, panel and hardware supply, manufacture in our Newcastle workshop, freight to your project site (anywhere in Australia), install by our own teams, fit-off, and the 10-year structural joinery warranty. Excluded items are listed line-by-line — typically electrical, plumbing, signage, flooring, certifier fees, and any landlord scope. Variations are quoted before being actioned, not after." },
      { question: "Do you handle retail shopfitting as well as commercial joinery?", answer: "Yes. Shopfitting joinery cost Australia tracks a little lower per linear metre than commercial reception and boardroom work because retail counters and shelving systems repeat across modules. For retail-only briefs (POS counters, display fixtures, shelving systems, landlord-approval documentation), see our shopfitting service page at /shopfitting/. For mixed retail + back-of-house + corporate offices, we run the whole job under one programme and one project manager." },
      { question: "What industries use commercial joinery?", answer: "Hospitality, healthcare, education, retail, hotels, corporate offices, government, aged care." },
      { question: "Do commercial joiners work with architects and interior designers?", answer: "Yes — most commercial projects come via design professionals. We work from architect drawings, produce shop drawings for approval, and attend site meetings as required." },
      { question: "What is the lead time for commercial joinery projects?", answer: "Joinery lead time Australia workshop schedules are typically six to ten weeks from signed shop drawings to delivery for a mid-sized job. Multi-store rollouts and complex fire-rated jobs run eight to twelve weeks. We book site install dates against the construction programme at shop-drawing sign-off — not at deposit — and we provide weekly progress photos from the workshop floor." },
      { question: "What materials are used in commercial joinery?", answer: "Laminex commercial grade, Polytec HMR, Formica, phenolic panel, stainless steel, fire-rated MDF, solid surface, commercial stone, Blum and Häfele hardware." },
      { question: "Can commercial joinery be fire-rated?", answer: "Yes — fire-rated MDF cores and intumescent finishes can achieve Group 1 and Group 2 fire indices per AS/NZS 3837 and the National Construction Code." },
    ]),
    relatedServices: [
      { slug: "office-fitout", label: "Office Fitout" },
      { slug: "shopfitting", label: "Shopfitting" },
      { slug: "custom-kitchen-joinery", label: "Custom Kitchen Joinery" },
    ],
    portfolioBrowseLabel: "Browse Commercial Projects",
  },
  "custom-furniture": {
    heroIntro:
      "Mass-produced furniture is designed for a showroom. Custom and bespoke furniture is designed for your home — your dimensions, your timber species, your finish, your style. At SteepWood we make furniture that could not come from a catalogue: dining tables built to the exact dimensions of your dining room, TV units designed to house your actual equipment, and shelving that fills your wall from floor to ceiling without a centimetre of wasted space.",
    whatIsParagraphs: splitParagraphs(
      `Every piece starts with a conversation. We ask about your room, your lifestyle, and your taste — and we show you timber samples, finish options, and joinery details before a single board is cut. Our custom furniture is made entirely in Newcastle by skilled joiners who take pride in the craft: hand-fitted dovetail joints, book-matched timber panels, and surfaces finished to a standard you simply cannot find in a furniture chain.

We work with a range of Australian and imported hardwoods, including Tasmanian oak, Victorian ash, Spotted Gum, Blackbutt, American oak, and walnut. Each species has its own character: the pale, straight grain of Tasmanian oak suits coastal and contemporary spaces; the rich caramel tones of Spotted Gum bring warmth to traditional homes; American oak and walnut appeal to those who want a more refined, European aesthetic. We also source reclaimed and recycled timber for clients who want the history and character of aged wood in a new piece.

Beyond dining tables and coffee tables, we build custom entertainment units, bedheads, study shelving, media walls, window seats, and storage ottomans — any piece of furniture that needs to be made to fit a specific space or satisfy a specific brief. Bespoke furniture in Australia typically starts from $1,500 for a smaller piece and scales up based on timber species, complexity, and size. Lead times range from three to eight weeks.`,
    ),
    includes: [
      { title: "Dining tables", description: "Solid timber dining tables built to your room dimensions and seating count." },
      { title: "Entertainment units", description: "TV units and media walls designed around your actual equipment." },
      { title: "Bedheads", description: "Custom bedheads with optional integrated side tables and storage." },
      { title: "Shelving", description: "Floor-to-ceiling bookcase walls and display shelving." },
      { title: "Desks", description: "Freestanding desks complementing built-in home office joinery." },
      { title: "Delivery and install", description: "Careful delivery and placement for heavy solid-timber pieces." },
    ],
    materials: [
      "Australian timber furniture joinery species selection drives everything else on a custom piece — the weight, the workability, the colour palette, the way the finish develops over time. We hold sample stock and order through trusted mills for Tasmanian oak, Victorian ash, Spotted Gum, Blackbutt, American oak, walnut, and reclaimed hardwoods. Every board is kiln-dried and acclimatised in our Newcastle workshop before machining, which is the single most important step in stopping movement and cupping later.",
      "Spotted Gum joinery furniture Australia clients ask for by name. The species is exceptional — JD 11 hardness, distinctive flame-grain figure, caramel-to-chocolate tones that warm a room — and we use it for dining tables, feature credenzas, bedheads, and statement shelving. It machines a little harder than oak and finishes beautifully under hand-rubbed oil or matt polyurethane. Spotted Gum sits at a premium price point and we treat it accordingly: every board face-graded for figure, end-grain sealed, and joinery cut with the grain direction marked on the shop drawing.",
      "Blackbutt timber joinery NSW projects are increasingly common because the species is grown in coastal NSW, takes a clean satin or matt finish, and reads almost neutral in colour — pale to light tan — which suits contemporary and coastal interiors. Blackbutt is structurally strong, holds detail crisply, and is bushfire-resistant under AS 3959 BAL-29, which matters for clients in fire-affected zones. We use Blackbutt for dining tables, floating shelves, bedheads, and statement furniture where the brief calls for understatement rather than figure.",
      "Tasmanian oak kitchen cabinet properties also describe its strengths as a furniture timber — pale, straight-grained, easy to finish in light tones, takes paint and oil equally well. The same species crosses between our furniture work and our kitchen and wardrobe work: a dining table in solid Tasmanian oak can be paired with kitchen cabinetry in Tasmanian oak veneer to read as a single material story across the room. Timber veneer kitchen cabinets Australia clients choose to extend the timber palette into wall cabinets and bookcase walls without the cost or movement of full hardwood. American oak (a denser cousin), Victorian ash, and walnut round out our standard furniture species library.",
    ],
    processSteps: [
      { title: "Design conversation", description: "Timber samples, finish options, and joinery details confirmed before cutting." },
      { title: "Shop drawing approval", description: "Concept translated to drawing; you sign off before manufacture." },
      { title: "Craft and finish", description: "3–8 weeks depending on size; reclaimed slabs may take 10–12 weeks." },
      { title: "Delivery", description: "Delivered and placed; install available for built-in adjacent joinery." },
    ],
    faqs: buildFaqs("custom-furniture", [
      { question: "How much does custom furniture cost in Australia?", answer: "Coffee table: $1,500–$4,000. Dining table (solid timber, 6-seater): $3,500–$9,000. Entertainment unit: $4,000–$12,000. Bedhead with side tables: $2,000–$5,000. Bookcase wall: $5,000–$15,000." },
      { question: "What is the lead time for bespoke furniture?", answer: "3–8 weeks depending on size and timber availability. Reclaimed or feature-grade slabs may extend lead time to 10–12 weeks." },
      { question: "What timbers are most popular for custom furniture in Australia?", answer: "Australian timber furniture joinery species selection breaks roughly into four categories. Pale and contemporary: Tasmanian oak and Victorian ash — Tasmanian oak kitchen cabinet properties (straight grain, light tone, takes finish evenly) also make it a perennial furniture favourite. Coastal and understated: Blackbutt timber joinery NSW projects use it for dining tables and shelving because the species reads light and clean. Warm and figured: Spotted Gum joinery furniture Australia clients ask for by name for the caramel tones and JD 11 hardness. Refined and European: American oak and walnut for clients who want a more formal, restrained look. We also offer timber veneer kitchen cabinets Australia-style facings on furniture cases — book-matched panels on display shelving and entertainment units — where solid hardwood would be impractical or cost-prohibitive." },
      { question: "What is the difference between custom and bespoke furniture?", answer: "We use 'custom' for made-to-measure pieces in standard SteepWood styles; 'bespoke' for fully designed-from-scratch pieces, sometimes with co-design input from the client." },
      { question: "Can I bring a design concept for a furniture maker to build?", answer: "Yes — sketches, Pinterest references, magazine clippings, or formal designs all welcome. We translate concept to shop drawing, confirm with you, then build." },
      { question: "Is custom furniture worth the investment compared to flat-pack?", answer: "Custom is a 4–10× upfront cost premium over flat-pack, but the pieces typically last decades, accept refinishing, and hold or appreciate in resale." },
      { question: "Can custom furniture be built to withstand Australian climate conditions?", answer: "Yes — we kiln-dry all timber, acclimatise stock to workshop conditions, and use finishes suited to UV and humidity exposure." },
      { question: "Can a furniture maker also do built-in joinery?", answer: "Yes — SteepWood is a full joinery shop. Many clients commission a dining table and a matching custom kitchen or entertainment unit together." },
    ]),
    relatedServices: [
      { slug: "home-office-joinery", label: "Home Office Joinery" },
      { slug: "built-in-wardrobes", label: "Built-In Wardrobes" },
      { slug: "staircase-joinery", label: "Staircase Joinery" },
    ],
    portfolioBrowseLabel: "Browse Furniture Projects",
  },
  "home-office-joinery": {
    heroIntro:
      "Working from home is no longer a temporary arrangement — it is a permanent feature of Australian life for millions of households. Yet most home offices are still improvised: a spare room with a flatpack desk, inadequate storage, and cables that trail across the floor. Custom home office joinery changes that. A built-in desk, floor-to-ceiling bookcase, and integrated filing storage transforms any spare room, alcove, or under-stair space into a workspace that genuinely supports productivity — and looks the part when you are on a video call.",
    whatIsParagraphs: splitParagraphs(
      `At SteepWood we design and build custom home office joinery across Newcastle, Sydney, Melbourne, Brisbane, Perth, and Adelaide. Our built-in home offices range from compact study nooks fitted into bedroom alcoves, to full-room office fitouts with wall-to-wall bookcase joinery, integrated monitor risers, and cable-managed desk surfaces. Every design is made to your measurements and your workflow.

We can build around virtually any configuration: L-shaped desks, corner bookcases, under-bench filing drawers, integrated printer nooks, and display shelving for awards, books, or art. Desk surfaces are available in solid timber (Tasmanian oak and American oak are perennial favourites), 2pac polyurethane in white or colour, or Polytec and Laminex veneer panels. All shelf and cabinet construction uses Australian-made Laminex or Polytec board with Blum hardware as standard.

We also integrate practical technology from the design stage: power outlets and USB charging ports built into desk surfaces, LED strip lighting under overhead shelves, and cable management grommets at the back of the desk — details that most flatpack furniture simply cannot accommodate.

A standard built-in study nook typically starts around $3,000 to $5,000. A full home office fit-out with floor-to-ceiling joinery, a solid timber desktop, and integrated lighting typically sits between $8,000 and $18,000 depending on size and finish. Free consultation, fixed-price quote.`,
    ),
    includes: [
      { title: "Built-in desks", description: "Sitting, standing, L-shape, and corner desk configurations." },
      { title: "Bookcase walls", description: "Floor-to-ceiling shelving for books, awards, and display." },
      { title: "Cable management", description: "Grommets, cable trays, and riser channels built into the joinery." },
      { title: "Study nooks", description: "Compact alcove offices from 1,500–2,000 mm wide." },
      { title: "Integrated power", description: "Power outlets and USB-C charging built into desk surfaces." },
      { title: "Under-stair offices", description: "Stepped bookcase and desk layouts using angled stair space." },
    ],
    materials: [
      "Home office joinery built-in cost in Australia spans a wide range: a compact study nook in alcove form starts around $3,000 to $5,000; a full home office fit-out with wall-to-wall bookcase joinery, a solid timber desktop, and integrated lighting typically sits $8,000 to $18,000; large dual-purpose rooms with a meeting table and full storage walls can run higher. We give you a fixed-price quote against the design drawings, not a per-linear-metre estimate that drifts.",
      "Home office fitout ideas built-in shelves keep evolving — the strongest 2026 patterns are floor-to-ceiling bookcase walls in 2pac white or timber veneer, integrated LED strip lighting under each shelf, hidden cable trays running behind the desk surface, push-to-open lower cabinets for printer/scanner stowage, and an island or peninsula desk to break a larger room into work and meeting zones. Where the room doubles as a guest space, we build Murphy beds into the cabinetry wall and tuck the desk on a return.",
      "Desk surfaces and shelving carry across 2pac polyurethane, Polytec and Laminex veneer panels, and solid hardwood — Tasmanian oak and American oak are the perennial favourites for desktops because they sand and re-finish if a heavy piece of equipment ever marks the surface. Internal hardware is Blum throughout: soft-close drawer runners on filing pedestals, hinged-door dampers on stationery cupboards, and integrated power and USB-C charging built into the desk surface.",
      "We also build standalone built in bookshelf joinery cost-controlled pieces — wall-to-wall fixed shelving, library-style display walls, and floating shelf systems — as discrete commissions outside a full office fit-out. Built in bookshelf joinery cost Australia ranges typically from $2,000 to $4,000 for a wall of fixed shelves in melamine, $5,000 to $10,000 for floor-to-ceiling 2pac shelving with adjustable internals and LED strip lighting, and higher again for timber veneer or solid hardwood with integrated cabinetry.",
    ],
    processSteps: [
      { title: "Workflow consultation", description: "We map your equipment, storage, and video-call backdrop requirements." },
      { title: "Design and quote", description: "Fixed-price quote with cable routing and power integration plan." },
      { title: "Manufacture", description: "Study nook: 4–6 weeks. Full office fit-out: 6–8 weeks." },
      { title: "Install", description: "Pre-cut penetrations for power; clean cable-managed handover." },
    ],
    faqs: buildFaqs("home-office-joinery", [
      { question: "How much does built-in home office joinery cost in Australia?", answer: "Home office joinery built-in cost in Australia is best quoted against your specific room. A standard built-in study nook typically starts around $3,000 to $5,000. A full home office fit-out with floor-to-ceiling joinery, a solid timber desktop, and integrated lighting typically sits between $8,000 and $18,000 depending on size and finish. Larger executive offices with a meeting return, full bookcase walls, and integrated AV run higher. Free consultation, fixed-price quote, no per-linear-metre estimates that drift." },
      { question: "How much does a built-in bookshelf cost in Australia?", answer: "Built in bookshelf joinery cost Australia ranges typically from $2,000 to $4,000 for a wall of fixed shelves in melamine carcass with painted MDF face, $5,000 to $10,000 for floor-to-ceiling 2pac shelving with adjustable internals and LED strip lighting, and $12,000+ for timber veneer or solid hardwood with integrated cabinetry, ladders, or hidden door panels. Most clients fall between $6,000 and $10,000 for a single feature wall, and we quote it as a fixed-price piece against the design." },
      { question: "What's included in a SteepWood home office joinery quote?", answer: "The joinery quote what's included Australia question is worth asking before any joiner starts work. A SteepWood home office joinery quote covers: site measure, design drawings, panel and hardware supply, manufacture in our Newcastle workshop, freight to site, install, fit-off, and the 10-year structural joinery warranty. Excluded items are spelled out: typically electrical (power outlets, data, lighting circuits), patching and painting around the joinery edge, and any moving of existing power points. Variations are quoted and signed before being actioned." },
      { question: "How can I get home office fitout ideas with built-in shelves and storage?", answer: "Home office fitout ideas built-in shelves work best when they are designed around how you actually work. We start with a 30-minute workflow conversation — how many monitors, what equipment, do you take video calls, do you need a meeting return, where does paperwork live — then design around that reality. The most common patterns we deliver are: floor-to-ceiling bookcase walls in 2pac or timber veneer, integrated LED, hidden cable trays, push-to-open lower cabinets, and an integrated desk surface in solid Tasmanian oak or American oak." },
      { question: "What is the standard height for a built-in desk?", answer: "720–740 mm to top of desk surface for seated work; 1,050–1,100 mm for standing. Adjustable electric standing desks can be integrated into joinery." },
      { question: "Can I get a standing desk built into joinery?", answer: "Yes — electric height-adjustable desk frames can be integrated within a joinery surround. Cable management routes through a riser channel." },
      { question: "What timber is best for home office furniture?", answer: "Tasmanian oak (warm, affordable), American oak (refined), walnut (premium), Spotted Gum (rich tones). For 2pac surfaces, any colour from Dulux, Resene, or Polytec palettes." },
      { question: "How do I incorporate cable management into a joinery desk?", answer: "Grommets at the back of the desk feed cables into a cable tray underneath; vertical risers route to wall-mounted power. We pre-cut and seal all penetrations during manufacture." },
      { question: "What is the difference between a study nook and a full home office?", answer: "Study nook: a single desk + overhead shelf, typically in an alcove or bedroom corner, 1,500–2,000 mm wide. Full home office: dedicated room with desk, storage, bookcase, and video call backdrop." },
      { question: "Can a home office be built into an alcove or under-stair space?", answer: "Yes — under-stair home offices are a SteepWood specialty. We CAD the angled stair underside and build a stepped bookcase + desk that fully uses the space." },
      { question: "Can I match my home office joinery to my other room joinery?", answer: "Yes — colour matching, timber grain matching, and finish matching across rooms is standard." },
    ]),
    relatedServices: [
      { slug: "built-in-wardrobes", label: "Built-In Wardrobes" },
      { slug: "custom-furniture", label: "Custom Furniture" },
      { slug: "commercial-joinery", label: "Commercial Joinery" },
    ],
    portfolioBrowseLabel: "Browse Home Office Projects",
  },
  "laundry-cabinets": {
    heroIntro:
      "The laundry is one of the most underinvested rooms in the Australian home — and one of the most used. A properly designed laundry with custom joinery transforms a cramped utility space into a genuinely functional room: overhead cabinets that go to the ceiling, a full-length bench for folding, a built-in broom closet, proper storage for cleaning products, and a finish that is easy to wipe down and hard to damage.",
    whatIsParagraphs: splitParagraphs(
      `At SteepWood we design and install custom laundry cabinets and joinery for homes across Australia. Every project starts with a site measure and a conversation about how you use the space — whether you need a double trough, a separate sink for washing pets, a countertop ironing station, or simply more overhead storage than the room currently has. We then design the joinery around those needs, right down to shelf heights and door configuration.

Our laundry joinery is built with moisture resistance as the baseline. We use HMR (high moisture-resistant) board for carcasses and MDF with appropriate sealing for all surfaces that may come into contact with water. Door finishes include polyurethane, 2pac gloss, and Laminex panels in a range of colours — including white and cream finishes that are the most popular choice for Australian laundries, and dark tones for contemporary scullery designs.

Custom laundry cabinetry typically costs between $3,000 and $10,000 depending on the size of the room, the number of overhead cabinets, whether benchtop stone is included, and the finish level selected. A basic laundry fit-out with overhead cabinets, base cabinets, and a laminate bench can be achieved at the lower end of that range, while a large scullery-style laundry with 2pac doors and a stone benchtop will sit toward the upper end.

We serve clients across Newcastle, Sydney, Melbourne, Brisbane, Perth, and Adelaide, with free in-home consultations and fixed-price quotes. Most laundry joinery projects install within four to six weeks of deposit.`,
    ),
    includes: [
      { title: "Overhead cabinets", description: "Floor-to-ceiling overhead storage maximising every millimetre." },
      { title: "Base cabinets", description: "900 mm tall base cabinets for ergonomic folding and sorting." },
      { title: "Broom storage", description: "Dedicated broom cupboards with internal hooks and shelving." },
      { title: "Stone benchtops", description: "Optional stone or laminate benches for folding and sorting." },
      { title: "Trough integration", description: "Benchtops templated for Robinhood, Clark, Reece, and integrated stainless troughs." },
      { title: "HMR carcasses", description: "High moisture-resistant board — non-negotiable for Australian laundries." },
    ],
    materials: [
      "Laundry cabinet joinery cost Australia depends mainly on size, finish level, and whether you want a stone benchtop. A basic laundry with overhead and base cabinets in melamine and a laminate bench sits at the lower end of the $3,000–$10,000 range. A scullery-style laundry with 2pac doors, full-height broom storage, integrated trough, and a stone benchtop sits at the upper end. We quote it as a fixed price against the design drawings, including site measure, manufacture, delivery, install, and fit-off.",
      "Coastal home joinery materials humidity is the single biggest factor in how a laundry holds up over time, and laundries fail faster than any other room when the wrong substrate is used. Standard particleboard has no business being in a laundry — daily steam, water spills, and washing-machine condensation will swell the unsealed edges within a few years. We use HMR (high moisture-resistant) board on every laundry carcass, seal all cut edges in our Newcastle workshop, and specify stainless-steel hardware where the cabinetry sits within splash distance of the trough.",
      "MDF vs plywood kitchen substrate Australia is a question that applies even more sharply to laundries than kitchens. Our default for laundry carcasses is HMR MDF — it is dimensionally stable, machines and seals cleanly, and resists humidity cycles well. Marine plywood is excellent for fully wet zones (boat builds, pool changing rooms) but it is more expensive, less flat for cabinet doors, and overkill for most domestic laundries. For high-spec coastal builds we sometimes step up to marine ply on the plinth and any element within 200 mm of the floor, while keeping HMR MDF for doors and carcass.",
      "Door finishes are 2pac polyurethane, polyurethane, or Laminex HMR panels — never standard low-pressure laminate that delaminates at the edges. White and cream finishes are by far the most popular for Australian laundries, with charcoal and deep navy popular in scullery-style designs that connect through to the kitchen. Hardware is Blum throughout: soft-close hinges and drawer runners that handle the daily open-close cycle a laundry produces.",
    ],
    processSteps: [
      { title: "Laundry measure", description: "We assess trough, appliance, and storage requirements on site." },
      { title: "Layout design", description: "Shelf heights, broom cupboard, and bench configuration confirmed." },
      { title: "Manufacture", description: "4–6 weeks from deposit in our Newcastle workshop." },
      { title: "Install", description: "Co-ordinated with plumber for trough and appliance connections." },
    ],
    faqs: buildFaqs("laundry-cabinets", [
      { question: "How much does a custom laundry renovation cost in Australia?", answer: "Laundry cabinet joinery cost Australia typically falls between $3,000 and $10,000 depending on the size of the room, the number of overhead cabinets, whether benchtop stone is included, and the finish level selected. A basic laundry fit-out with overhead cabinets, base cabinets, and a laminate bench can be achieved at the lower end of that range; a large scullery-style laundry with 2pac doors and a stone benchtop will sit toward the upper end. Add $500–$1,500 if you want a tall broom cupboard with internal hooks and adjustable shelves, and $800–$2,200 for an integrated stainless trough with a stone surround." },
      { question: "What is the standard height for laundry cabinets?", answer: "Base cabinets: 900 mm. Overhead clearance: minimum 600 mm above bench." },
      { question: "What materials should I use for laundry cabinets in a humid Australian climate?", answer: "Coastal home joinery materials humidity should drive the spec on every laundry, even inland. The four non-negotiables are: HMR board for carcasses (not standard particleboard), sealed cut edges, 2pac or Laminex HMR door fronts (not low-pressure laminate), and stainless-steel hardware near the trough. MDF vs plywood kitchen substrate Australia debates lean toward marine ply for fully wet zones, but for a domestic laundry HMR MDF is the right answer in 95% of cases — dimensionally stable, cleanly sealed, and significantly cheaper than marine ply without sacrificing real-world durability." },
      { question: "Can a cabinet maker build a laundry with a built-in trough?", answer: "Yes — we cut the benchtop to template for any laundry trough. Drop-in, undermount, and integrated stainless options all supported." },
      { question: "What is the best finish for laundry joinery?", answer: "2pac polyurethane (most durable, washable, any colour) or Laminex HMR panels (cost-effective, durable)." },
      { question: "How do I maximise storage in a small laundry?", answer: "Floor-to-ceiling overhead cabinets, slimline pull-out shelving, hanging rail above the trough, broom cupboard with internal hooks." },
      { question: "Do laundry cabinets need to be moisture resistant?", answer: "Yes — HMR board is non-negotiable; standard MDF will swell and fail within 2–5 years." },
      { question: "Can I match my laundry joinery to my kitchen?", answer: "Yes — same finish, same colour, same hardware. Many clients commission kitchen and laundry together." },
    ]),
    relatedServices: [
      { slug: "custom-kitchen-joinery", label: "Custom Kitchen Joinery" },
      { slug: "custom-bathroom-vanity", label: "Custom Bathroom Vanity" },
      { slug: "home-office-joinery", label: "Home Office Joinery" },
    ],
    portfolioBrowseLabel: "Browse Laundry Projects",
  },
  "staircase-joinery": {
    heroIntro:
      "A staircase is one of the most visible — and technically demanding — pieces of joinery in any home. Built right, it becomes a design feature: a sweeping run of American oak, a floating staircase with glass balustrades, or a classic Hamptons staircase with painted risers and polished hardwood treads. Built wrong, it creaks, moves, and shows its age within a few years. At SteepWood we design and build custom timber staircases across Australia that are engineered to last and finished to the standard your home deserves.",
    whatIsParagraphs: splitParagraphs(
      `We work with a comprehensive range of Australian and imported hardwoods: Tasmanian oak and Victorian ash for their warmth and workability; Spotted Gum and Blackbutt for outstanding hardness and durability in high-traffic stairs; American oak for a finer grain and that slightly European character that suits contemporary and coastal designs. For stairs that will be carpeted, treated pine provides an economical and structurally sound base.

Our staircase projects range from simple straight timber stairs in a standard single-storey home, through to complex geometric and curved staircases for custom builds. We supply and install stair stringers, treads, risers, newel posts, balusters, and handrails — and we can design balustrade systems in timber, glass panel, stainless cable, or steel flat bar, depending on the aesthetic you are after.

Pricing depends heavily on the type of staircase and the timber selected. A simple budget staircase typically starts around $2,500, while a detailed geometric design can reach $30,000 to $50,000. Most residential custom staircases fall between $8,000 and $20,000. Our standard lead time is four to six weeks for a straightforward staircase, up to 12 weeks for complex curved work.

We serve homeowners, builders, and architects across Newcastle, Sydney, Melbourne, Brisbane, Perth, and Adelaide, and provide shop drawings for approval before manufacture begins.`,
    ),
    includes: [
      { title: "Straight and L-shape stairs", description: "Standard residential runs through to complex geometric layouts." },
      { title: "Floating staircases", description: "Contemporary open-riser designs with glass or cable balustrades." },
      { title: "Timber treads and risers", description: "Tasmanian oak, Spotted Gum, Blackbutt, American oak, and treated pine options." },
      { title: "Balustrades", description: "Timber, glass panel, stainless cable, or steel flat bar systems." },
      { title: "NCC compliance", description: "Shop drawings meeting NCC riser, going, handrail, and balustrade requirements." },
      { title: "Tread overlays", description: "Hardwood overlay treads for renovating existing staircases without structural change." },
    ],
    materials: [
      "Staircase joinery timber cost NSW depends heavily on the species and the design. A budget treated-pine carpet-ready staircase typically starts around $2,500. A standard residential hardwood staircase in Tasmanian oak or American oak with closed risers and a continuous handrail typically runs $8,000 to $20,000. Floating staircases with steel stringers, hardwood treads, and glass-panel balustrades sit $18,000 to $40,000. Complex curved or geometric stairs in premium hardwood with bespoke balustrade can reach $30,000 to $50,000. Lead time is four to six weeks for a straight stair, up to twelve weeks for curved work.",
      "Australian timber furniture joinery species selection on a staircase matters more than on almost any other piece — the stairs see daily impact, drag from shoes, sun exposure on landings, and they are the most visually dominant joinery element in the home. We work in Tasmanian oak, Victorian ash, Spotted Gum, Blackbutt, American oak, and treated pine where carpet is going down. Each species is kiln-dried and acclimatised in our Newcastle workshop before machining, with grain direction marked on the shop drawing for every tread, riser, and stringer.",
      "Spotted Gum joinery furniture Australia clients often extend the same species into the staircase — the JD 11 hardness handles high-traffic stair use exceptionally well, the caramel-to-chocolate tones suit traditional and Hamptons interiors, and the figured grain reads beautifully on continuous treads. Blackbutt timber joinery NSW projects use Blackbutt for staircases because the species is grown locally, takes a clean satin or matt finish, reads pale enough for contemporary and coastal interiors, and meets BAL-29 bushfire requirements where the home is in a fire-prone zone. Both species are JD 10–11 and outperform softer hardwoods for stair wear.",
      "Tasmanian oak kitchen cabinet properties — pale tone, straight grain, takes finish evenly — make it our most-requested staircase timber too, particularly when clients want the stair to read as continuous with kitchen and floor timberwork. American oak (slightly denser, more European character) is the alternative for clients wanting a refined, contemporary look. Treads can be finished in hand-rubbed oil, matt polyurethane, or satin polyurethane; risers are typically painted in a complementary tone or matched to wall paint. Balustrades carry across timber, glass panel, stainless cable, and steel flat bar to suit the architecture.",
    ],
    processSteps: [
      { title: "Site measure", description: "Floor-to-floor heights, widths, and headroom assessed on site." },
      { title: "Shop drawings", description: "Drawings submitted for certifier approval before manufacture." },
      { title: "Manufacture", description: "Straight stairs: 4–6 weeks. Curved or geometric: 8–12 weeks." },
      { title: "Install", description: "On-site install typically 1–3 days depending on complexity." },
    ],
    faqs: buildFaqs("staircase-joinery", [
      { question: "How much does a custom timber staircase cost in Australia?", answer: "Staircase joinery timber cost NSW pricing depends heavily on the type of staircase and the timber selected. A budget treated-pine carpet-ready staircase typically starts around $2,500. A standard residential hardwood staircase in Tasmanian oak or American oak with closed risers and a continuous handrail typically runs $8,000 to $20,000. Floating staircases with steel stringers, hardwood treads, and glass balustrades sit $18,000 to $40,000. A detailed geometric or curved design in Spotted Gum or Blackbutt can reach $30,000 to $50,000." },
      { question: "What is the cheapest type of staircase in Australia?", answer: "Straight, closed-stringer, treated pine, carpet-ready. Adequate for resale-grade builds, but lacks the design impact of feature hardwood stairs." },
      { question: "What timber is best for internal staircases in Australia?", answer: "Australian timber furniture joinery species selection for a staircase is a balance of hardness, grain character, and how the species reads against the rest of the home. Spotted Gum joinery furniture Australia clients ask for by name because it is JD 11 hard (excellent stair wear), warm-toned, and visually distinctive. Blackbutt timber joinery NSW projects favour Blackbutt for its pale neutral tone, structural strength, and BAL-29 bushfire compliance — particularly relevant for homes in fire-prone zones. Tasmanian oak kitchen cabinet properties (pale, straight-grained, easy to finish evenly) also make it a perennial staircase favourite when clients want the stair to read continuous with kitchen and floor timber. American oak is the choice for slightly denser, more European character. Treated pine remains the right answer for any stair that will be carpeted." },
      { question: "What is the difference between an open-riser and closed-riser staircase?", answer: "Open-riser: gaps between treads — feels lighter, more contemporary. Closed-riser: solid riser between treads — traditional, more soundproof. Open-riser requires 125 mm sphere test compliance under NCC." },
      { question: "How long does it take to build and install a custom staircase?", answer: "Straight stairs: 4–6 weeks. Curved or geometric: 8–12 weeks. On-site install: 1–3 days." },
      { question: "Do I need a building permit for a new internal staircase?", answer: "Like-for-like replacement: usually no permit. New staircase, change of geometry, or load-bearing alteration: building approval required. We provide shop drawings for the certifier." },
      { question: "What are the Australian Building Code requirements for staircases?", answer: "NCC Volume 2 — riser 115–190 mm; going 240–355 mm; handrail height 865–1,000 mm; balustrade infill must not allow a 125 mm sphere to pass; landings at every 18 risers maximum." },
      { question: "Can I replace just the stair treads without replacing the whole staircase?", answer: "Yes — overlay treads (12–25 mm hardwood laminated to existing) are a common SteepWood project, taking 1–2 weeks and avoiding structural changes." },
    ]),
    relatedServices: [
      { slug: "custom-furniture", label: "Custom Furniture" },
      { slug: "commercial-joinery", label: "Commercial Joinery" },
      { slug: "custom-kitchen-joinery", label: "Custom Kitchen Joinery" },
    ],
    portfolioBrowseLabel: "Browse Staircase Projects",
  },
};

for (const [slug, content] of Object.entries(REMAINING_SERVICES)) {
  defineService(slug, content);
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Strip city names from service hub body copy — cities belong only in the cities-served grid. */
function sanitizeHubText(text: string): string {
  let out = text
    .replace(/\bmanufactured in Newcastle\b/gi, "manufactured in our workshop")
    .replace(/\bManufacture in Newcastle\b/g, "Manufacture in our workshop")
    .replace(/\bour Newcastle workshop\b/gi, "our workshop")
    .replace(/\bOur Newcastle workshop\b/g, "Our workshop")
    .replace(/\bin our Newcastle workshop\b/gi, "in our workshop")
    .replace(/\bmade entirely in Newcastle\b/gi, "made entirely in our workshop")
    .replace(/\bin Newcastle using\b/gi, "in our workshop using")
    .replace(/\bmanufactured in Newcastle and\b/gi, "manufactured in our workshop and")
    .replace(
      /We work across Newcastle, Sydney, Melbourne, Brisbane, Perth, and 12 more Australian cities[^.]*\./g,
      "We deliver nationwide from our workshop to 16 Australian cities — choose your location in the section below.",
    )
    .replace(
      /We serve homeowners, builders, and interior designers across Newcastle, Sydney, Melbourne, Brisbane, Perth, Adelaide, and 10 more cities[^.]*\./g,
      "We serve homeowners, builders, and interior designers Australia-wide.",
    )
    .replace(
      /We serve clients across Newcastle, Sydney, Melbourne, Brisbane, Perth, and Adelaide[^.]*\./g,
      "We serve clients Australia-wide with free consultations and fixed-price quotes.",
    )
    .replace(
      /At SteepWood we design and build custom home office joinery across Newcastle, Sydney, Melbourne, Brisbane, Perth, and Adelaide\./g,
      "At SteepWood we design and build custom home office joinery Australia-wide.",
    )
    .replace(
      /Sydney and Melbourne sit at the upper end; Perth and Adelaide offer slightly lower rates\./g,
      "Capital-city tenancies typically sit at the upper end; regional projects often offer lower freight and programme costs.",
    )
    .replace(
      /Sydney and Melbourne tenancies typically sit at the higher end; office fit out Newcastle projects benefit from our local workshop — no interstate freight loading, faster site revisits, and shorter programmes than Sydney tenants typically see\. See \/office-fitout\/newcastle\/ for Hunter-specific scope and pricing guidance\./g,
      "Capital-city tenancies typically sit at the higher end; projects near our workshop benefit from shorter lead times, faster site revisits, and no interstate freight loading on joinery.",
    )
    .replace(
      /Sydney and Melbourne sit at the upper end; Perth, Adelaide, Canberra, and regional NSW offer lower rates because of trade availability and freight\./g,
      "Capital cities and premium CBD tenancies sit at the upper end; regional projects often offer lower freight and trade costs.",
    )
    .replace(
      /Freight to Sydney, Brisbane, Perth, and Adelaide is quoted separately/g,
      "Interstate freight is quoted separately",
    )
    .replace(
      /Newcastle, Central Coast, Sydney Northern Beaches, and the Hunter all see/g,
      "Coastal regions across eastern Australia see",
    )
    .replace(
      /How much does a custom kitchen cost in Sydney in 2026\?/g,
      "How much does a custom kitchen cost in Australia in 2026?",
    )
    .replace(
      /Custom kitchen cost Sydney projects typically range/g,
      "Custom kitchen projects in major cities typically range",
    )
    .replace(
      /Kitchen renovation Sydney cost 2026 depends/g,
      "Kitchen renovation cost in 2026 depends",
    )
    .replace(
      /Custom joinery Sydney cost 2026 and interstate pricing/g,
      "Metro and regional pricing",
    )
    .replace(
      /How much does a walk-in robe cost in Newcastle, NSW\?/g,
      "How much does a walk-in robe cost in Australia?",
    )
    .replace(
      /Walk in wardrobe Newcastle NSW cost typically lands/g,
      "Walk-in wardrobe cost typically lands",
    )
    .replace(
      /Because we manufacture in Newcastle, there is no freight loading for Hunter, Central Coast, or Lower Hunter installs — quote includes/g,
      "Quotes include",
    )
    .replace(
      /Do you provide office fit out in Newcastle, NSW\?/g,
      "Do you provide office fit-out Australia-wide?",
    )
    .replace(
      /Yes\. Office fit out Newcastle is our home market — our workshop and install teams are based here, which means the shortest lead times, direct site revisits during manufacture, and no interstate freight loading on Hunter tenancies\. We fit out CBD offices, Honeysuckle professional suites, Hamilton creative spaces, and Charlestown commercial premises\. Full scope, lead times, and fixed-price guidance: \/office-fitout\/newcastle\/\./g,
      "Yes. We deliver office fit-outs Australia-wide from our workshop, with the shortest lead times and direct site revisits for projects in our home region. See the locations section below for city-specific scope and pricing guidance.",
    );

  for (const city of ALL_CITIES) {
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

function sanitizeHubContent(content: ServicePillarContent): ServicePillarContent {
  return {
    ...content,
    heroIntro: sanitizeHubText(content.heroIntro),
    whatIsParagraphs: content.whatIsParagraphs.map(sanitizeHubText),
    materials: content.materials.map(sanitizeHubText),
    processSteps: content.processSteps.map((step) => ({
      ...step,
      title: sanitizeHubText(step.title),
      description: sanitizeHubText(step.description),
    })),
    bodySections: content.bodySections.map((section) => ({
      ...section,
      title: sanitizeHubText(section.title),
      paragraphs: section.paragraphs.map(sanitizeHubText),
    })),
    faqs: content.faqs.map((faq) => ({
      ...faq,
      question: sanitizeHubText(faq.question),
      answer: sanitizeHubText(faq.answer),
    })),
    includes: content.includes.map((item) => ({
      ...item,
      title: sanitizeHubText(item.title),
      description: sanitizeHubText(item.description),
    })),
  };
}

export function getServiceContent(slug: string): ServicePillarContent | undefined {
  const content = SERVICE_CONTENT[slug];
  return content ? sanitizeHubContent(content) : undefined;
}

export function getRelatedServicesForHub(slug: string): Service[] {
  if (!isService(slug)) {
    return [];
  }
  return RELATED_SERVICES[slug];
}
