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

function buildBodySections(
  includes: ServiceInclude[],
  whatIsParagraphs: string[],
): ServiceBodySection[] {
  return includes.map((item, index) => {
    const extra =
      whatIsParagraphs[index % whatIsParagraphs.length] ?? whatIsParagraphs[0];
    const paragraphs = [item.description, extra].filter(
      (paragraph): paragraph is string => Boolean(paragraph),
    );

    return {
      title: item.title,
      paragraphs,
    };
  });
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
      "Our kitchens are manufactured in Newcastle using premium Laminex and Polytec decorative panels, 2pac polyurethane door finishes sprayed in our workshop, natural timber veneers, and solid hardwood accents where the brief calls for warmth.",
      "Bench and work surfaces are available in Caesarstone, Smartstone, Essastone, Quantum Quartz, porcelain, and natural stone. We carry full sample libraries and co-ordinate door colour, benchtop, and splashback during the design stage.",
      "Hardware is Blum throughout — soft-close drawer runners, pull-out pantry systems, and lift mechanisms that are backed by a 25-year manufacturer warranty on residential projects.",
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
    ]),
    relatedServices: [
      { slug: "built-in-wardrobes", label: "Built-In Wardrobes" },
      { slug: "custom-bathroom-vanity", label: "Custom Bathroom Vanity" },
      { slug: "laundry-cabinets", label: "Laundry Cabinets" },
    ],
    portfolioBrowseLabel: "Browse Kitchen Projects",
  },
};

// Populate bodySections after includes are defined
for (const slug of Object.keys(SERVICE_CONTENT)) {
  const content = SERVICE_CONTENT[slug];
  if (!content) {
    continue;
  }

  content.bodySections = buildBodySections(
    content.includes,
    content.whatIsParagraphs,
  );
}

function defineService(
  slug: string,
  content: Omit<ServicePillarContent, "bodySections">,
): void {
  SERVICE_CONTENT[slug] = {
    ...content,
    bodySections: buildBodySections(content.includes, content.whatIsParagraphs),
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
    "Carcasses are built from Laminex and Polytec melamine panels. Doors are available in 2pac polyurethane, melamine, veneer, or solid timber to suit Hamptons, contemporary, and coastal interiors.",
    "Internal fittings are Blum throughout — soft-close drawer runners, LED lighting systems, and pull-out accessories designed for daily use.",
    "Walk-in robes can include island benches, charging stations, and integrated USB-C/AC power points as standard options.",
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
        "Standard built-ins: $1,000–$2,500 per linear metre. Custom robes with internal drawers and LED: $3,000–$7,500. Walk-in robes: $10,000–$30,000+.",
    },
    {
      question: "What is the minimum width for a walk-in robe?",
      answer:
        "1,500 mm clear width for a single-sided WIR; 2,200 mm for a double-sided WIR with hanging on both walls and a 900 mm walkway.",
    },
    {
      question: "Is it cheaper to build custom wardrobes or buy flatpack?",
      answer:
        "Flatpack (IKEA PAX) is cheaper upfront — $800–$1,500 for a comparable run. Custom is $3,000+. The trade-off is lifetime durability, ceiling-height usage, and a finish that holds up to daily wear. Custom typically pays back through resale value on a quality home.",
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
      "Commercial-grade Laminex and Polytec panels, solid surface bench tops, and Blum and Häfele hardware throughout.",
      "Acoustic treatments, ceiling systems, and flooring co-ordinated with joinery installation programmes.",
      "Shop drawings and documentation for architect, builder, and certification requirements.",
    ],
    processSteps: [
      { title: "Workplace brief", description: "We understand headcount, work styles, and brand requirements before measuring." },
      { title: "Design and documentation", description: "3–4 weeks for design, landlord approvals, and fixed-price contract." },
      { title: "Construction programme", description: "Typical 200–500 sqm fitout: 6–12 weeks from contract." },
      { title: "Handover", description: "Co-ordinated trades, defect period, and itemised depreciation schedule supplied." },
    ],
    faqs: buildFaqs("office-fitout", [
      { question: "How much does an office fitout cost per square metre in Australia?", answer: "Basic refresh: $800–$1,200/sqm. Mid-range: $1,200–$2,000/sqm. Premium: $2,000–$3,000+/sqm. Sydney/Melbourne premium; Perth/Adelaide ~10–15% lower." },
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
      "Commercial-grade Laminex and Polytec panels, CNC-routed MDF profiles, solid surface counters, and custom metal fixtures.",
      "Execution to brand style guides, planograms, CAD files, colour codes, and brand-mandated suppliers.",
      "10-year structural joinery warranty, 12-month builders' warranty on workmanship, and manufacturer hardware warranties.",
    ],
    processSteps: [
      { title: "Retail brief", description: "Sector, brand standards, landlord conditions, and opening date established upfront." },
      { title: "Concept and documentation", description: "Landlord and council documentation prepared before manufacture begins." },
      { title: "Manufacture", description: "Boutique fitout (50–150 sqm): 4–8 weeks. Flagship (>300 sqm): 10–16 weeks." },
      { title: "Install and fit-off", description: "On-site installation with co-ordinated trades and defect-free handover." },
    ],
    faqs: buildFaqs("shopfitting", [
      { question: "How much does a shop fitout cost in Australia?", answer: "Basic: $400–$800/sqm. Mid: $800–$1,500/sqm. Premium: $1,500–$3,000+/sqm. A 100 sqm boutique with custom joinery typically lands $80k–$150k." },
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
      "Moisture-resistant HMR MDF or solid hardwood carcasses with all surfaces sealed before fitting.",
      "Door finishes in polyurethane, 2pac, and premium Laminex HMR panels that resist humidity cycles.",
      "Blum soft-close hinges and drawer systems throughout; timber options include Tasmanian oak, Blackbutt, and Spotted Gum.",
    ],
    processSteps: [
      { title: "Site measure", description: "We measure your bathroom, confirm basin selection, and plan plumbing clearances." },
      { title: "Design and quote", description: "Fixed-price quote with finish samples and stone templating schedule." },
      { title: "Manufacture", description: "3–6 weeks from deposit in our Newcastle workshop." },
      { title: "Install", description: "Co-ordinated with plumber and tiler for a seamless bathroom sequence." },
    ],
    faqs: buildFaqs("custom-bathroom-vanity", [
      { question: "How much does a custom bathroom vanity cost in Australia?", answer: "Basic single vanity: $1,500–$2,500. Custom with stone top: $2,500–$5,000. Double vanity with full storage: $4,000–$8,000+." },
      { question: "What is the best wood for bathroom vanity cabinets in a humid climate?", answer: "Tasmanian oak, Blackbutt, and Spotted Gum all perform well when properly sealed. We use HMR MDF for carcasses and seal all timber surfaces with marine-grade polyurethane." },
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
      "Commercial-grade Laminex and Polytec panels, phenolic panel, stainless steel, fire-rated MDF, and solid surface bench tops.",
      "Blum and Häfele commercial hardware; antimicrobial surfaces for healthcare where specified.",
      "Food-safe and impact-resistant materials matched to BCA classification and building surveyor requirements.",
    ],
    processSteps: [
      { title: "Project consultation", description: "We review architect drawings, programme, and compliance requirements." },
      { title: "Shop drawings", description: "Documentation produced for architect mark-up and certification." },
      { title: "Manufacture", description: "Small projects: 4–6 weeks. Mid-size packages: 8–12 weeks. Large programmes: 12–20 weeks." },
      { title: "Site install", description: "Co-ordinated delivery and installation to construction programme." },
    ],
    faqs: buildFaqs("commercial-joinery", [
      { question: "What is commercial joinery?", answer: "Custom cabinetry and millwork built to commercial-grade specifications — using fire-rated, food-safe, or impact-resistant materials as required by the project's BCA classification and building surveyor." },
      { question: "How is commercial joinery different from residential joinery?", answer: "Higher material specs, formal documentation (shop drawings, architect markups), and strict programme co-ordination with builders and project managers." },
      { question: "How much does commercial joinery cost in Australia?", answer: "Project-specific — usually quoted per item or per sqm. Reception desks: $5,000–$25,000+. Café back bars: $15,000–$60,000. Hospital nurse stations: $20,000–$100,000+." },
      { question: "What industries use commercial joinery?", answer: "Hospitality, healthcare, education, retail, hotels, corporate offices, government, aged care." },
      { question: "Do commercial joiners work with architects and interior designers?", answer: "Yes — most commercial projects come via design professionals. We work from architect drawings, produce shop drawings for approval, and attend site meetings as required." },
      { question: "What is the lead time for commercial joinery projects?", answer: "Small project (1–2 items): 4–6 weeks. Mid-size fitout joinery package: 8–12 weeks. Large multi-room programme: 12–20 weeks." },
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
      "Tasmanian oak, Victorian ash, Spotted Gum, Blackbutt, American oak, and walnut — kiln-dried and acclimatised in our workshop.",
      "Finishes include oil, lacquer, polyurethane, paint, and beeswax suited to UV and humidity exposure.",
      "Hand-fitted dovetail joints, mortise and tenon, and book-matched panels for feature-grade pieces.",
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
      { question: "What timbers are most popular for custom furniture in Australia?", answer: "Tasmanian oak (most popular), Spotted Gum (warmer, harder), Blackbutt (pale, hard), American oak (refined), Victorian ash (close grain), walnut (premium)." },
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
      "Solid Tasmanian oak and American oak desktops, 2pac polyurethane, and Polytec/Laminex veneer panels.",
      "Blum soft-close hardware throughout; LED strip lighting under overhead shelves.",
      "Colour and timber matching across rooms using samples held in our records for repeat orders.",
    ],
    processSteps: [
      { title: "Workflow consultation", description: "We map your equipment, storage, and video-call backdrop requirements." },
      { title: "Design and quote", description: "Fixed-price quote with cable routing and power integration plan." },
      { title: "Manufacture", description: "Study nook: 4–6 weeks. Full office fit-out: 6–8 weeks." },
      { title: "Install", description: "Pre-cut penetrations for power; clean cable-managed handover." },
    ],
    faqs: buildFaqs("home-office-joinery", [
      { question: "How much does built-in home office joinery cost in Australia?", answer: "Study nook: $3,000–$5,000. Full home office with bookcase wall: $8,000–$18,000. Library-grade fit-out with feature timber: $15,000–$30,000+." },
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
      "HMR board for all carcasses; 2pac polyurethane, polyurethane, or Laminex HMR panels for doors.",
      "Never standard particleboard — laundries see daily steam, water spills, and washing machine condensation.",
      "Matching kitchen finishes available when laundry and kitchen are commissioned together.",
    ],
    processSteps: [
      { title: "Laundry measure", description: "We assess trough, appliance, and storage requirements on site." },
      { title: "Layout design", description: "Shelf heights, broom cupboard, and bench configuration confirmed." },
      { title: "Manufacture", description: "4–6 weeks from deposit in our Newcastle workshop." },
      { title: "Install", description: "Co-ordinated with plumber for trough and appliance connections." },
    ],
    faqs: buildFaqs("laundry-cabinets", [
      { question: "How much does a custom laundry renovation cost in Australia?", answer: "Joinery-only: $3,000–$10,000. Full renovation (joinery, plumbing, tiling, flooring): $10,000–$25,000." },
      { question: "What is the standard height for laundry cabinets?", answer: "Base cabinets: 900 mm. Overhead clearance: minimum 600 mm above bench." },
      { question: "What materials should I use for laundry cabinets?", answer: "HMR board for carcasses. 2pac, polyurethane, or Laminex HMR panels for doors. Never standard particleboard." },
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
      "Tasmanian oak, Victorian ash, Spotted Gum, Blackbutt, and American oak for feature hardwood stairs.",
      "Treated pine for carpet-ready budget stairs; glass, cable, and steel balustrade systems on request.",
      "All stairs designed to NCC Volume 2 — riser 115–190 mm, going 240–355 mm, handrail height 865–1,000 mm.",
    ],
    processSteps: [
      { title: "Site measure", description: "Floor-to-floor heights, widths, and headroom assessed on site." },
      { title: "Shop drawings", description: "Drawings submitted for certifier approval before manufacture." },
      { title: "Manufacture", description: "Straight stairs: 4–6 weeks. Curved or geometric: 8–12 weeks." },
      { title: "Install", description: "On-site install typically 1–3 days depending on complexity." },
    ],
    faqs: buildFaqs("staircase-joinery", [
      { question: "How much does a custom timber staircase cost in Australia?", answer: "Simple straight stairs (treated pine, carpet-ready): $2,500–$5,000. Solid hardwood: $8,000–$20,000. Floating or curved with glass balustrade: $20,000–$50,000+." },
      { question: "What is the cheapest type of staircase in Australia?", answer: "Straight, closed-stringer, treated pine, carpet-ready. Adequate for resale-grade builds, but lacks the design impact of feature hardwood stairs." },
      { question: "What timber is best for internal staircases?", answer: "Spotted Gum and Blackbutt for hardness; Tasmanian oak and American oak for appearance. For commercial/high-traffic: Jarrah or Merbau." },
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

export function getServiceContent(slug: string): ServicePillarContent | undefined {
  return SERVICE_CONTENT[slug];
}
