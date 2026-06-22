import type { Testimonial } from "@prisma/client";

const STATIC_TESTIMONIAL_TIMESTAMP = new Date("2024-06-01T00:00:00.000Z");

const FEATURED_TESTIMONIAL_SEEDS = [
  {
    id: "00000000-0000-4000-8000-000000000101",
    authorName: "James & Priya Nguyen",
    authorLocation: "Merewether, NSW",
    quote:
      "SteepWood understood exactly what we wanted for our Hamptons kitchen — shaker doors, the butler's pantry, everything. The install team was meticulous and the fixed price never changed.",
    serviceSlug: "custom-kitchen-joinery",
    locationSlug: "newcastle",
    source: "Google",
    displayOrder: 1,
  },
  {
    id: "00000000-0000-4000-8000-000000000102",
    authorName: "Catherine & David Walsh",
    authorLocation: "Mosman, NSW",
    quote:
      "Our walk-in robe feels like it was always part of the house. The American oak internals, LED lighting, and island bench were finished beautifully — and they kept the terrace tidy during install.",
    serviceSlug: "built-in-wardrobes",
    locationSlug: "sydney",
    source: "Google",
    displayOrder: 2,
  },
  {
    id: "00000000-0000-4000-8000-000000000103",
    authorName: "Tom & Ella Hartigan",
    authorLocation: "Suffolk Park, NSW",
    quote:
      "The floating vanity transformed our coastal bathroom. Moisture-resistant construction, spotted gum drawers, and a seamless install co-ordinated with our plumber. Highly recommend SteepWood.",
    serviceSlug: "custom-bathroom-vanity",
    locationSlug: "byron-bay",
    source: "Google",
    displayOrder: 3,
  },
  {
    id: "00000000-0000-4000-8000-000000000104",
    authorName: "Rachel & Mark O'Connor",
    authorLocation: "Barton, ACT",
    quote:
      "Our Barton office fitout was delivered on schedule across two weekends — reception desk, meeting-room joinery, and breakout storage all feel bespoke. SteepWood co-ordinated cleanly with our IT contractor.",
    serviceSlug: "office-fitout",
    locationSlug: "canberra",
    source: "Google",
    displayOrder: 4,
  },
  {
    id: "00000000-0000-4000-8000-000000000105",
    authorName: "Fiona & Greg Saunders",
    authorLocation: "Wollongong, NSW",
    quote:
      "The home office wall transformed our spare room into a proper workspace — integrated desk, printer bay, and shelving that looks built-in, not bolted on. Install was neat and the fixed quote held.",
    serviceSlug: "home-office-joinery",
    locationSlug: "wollongong",
    source: "Google",
    displayOrder: 5,
  },
  {
    id: "00000000-0000-4000-8000-000000000106",
    authorName: "Michelle & Andrew Park",
    authorLocation: "Erina, NSW",
    quote:
      "Our Erina laundry finally works as a room, not a cupboard. Full-height storage, folding bench, and appliance housing were finished beautifully — and SteepWood co-ordinated with our plumber on the same day.",
    serviceSlug: "laundry-cabinets",
    locationSlug: "central-coast",
    source: "Google",
    displayOrder: 6,
  },
] as const;

/** Static featured testimonials for homepage when the database is empty or unavailable. */
export function staticFeaturedTestimonials(limit = 3): Testimonial[] {
  return FEATURED_TESTIMONIAL_SEEDS.slice(0, limit).map((testimonial) => ({
    id: testimonial.id,
    authorName: testimonial.authorName,
    authorLocation: testimonial.authorLocation,
    rating: 5,
    quote: testimonial.quote,
    source: testimonial.source,
    sourceUrl: null,
    serviceSlug: testimonial.serviceSlug,
    locationSlug: testimonial.locationSlug,
    isVerified: true,
    isFeatured: true,
    isPublished: true,
    displayOrder: testimonial.displayOrder,
    createdAt: STATIC_TESTIMONIAL_TIMESTAMP,
    updatedAt: STATIC_TESTIMONIAL_TIMESTAMP,
  }));
}
