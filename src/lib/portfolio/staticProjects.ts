import type { PortfolioProject } from "@prisma/client";

import { portfolioGalleryImages, portfolioImagePath } from "@/lib/images";

const STATIC_PROJECT_TIMESTAMP = new Date("2024-06-01T00:00:00.000Z");

const FEATURED_PROJECT_SEEDS = [
  {
    id: "00000000-0000-4000-8000-000000000001",
    slug: "hamptons-kitchen-newcastle",
    title: "Hamptons Kitchen — Merewether",
    clientDisplayName: "James & Priya Nguyen",
    summary:
      "Shaker-profile 2-pac kitchen with Caesarstone benchtops, integrated Miele appliances, and a concealed butler's pantry for a Merewether family home.",
    locationName: "Merewether, Newcastle",
    serviceSlug: "custom-kitchen-joinery",
    displayOrder: 1,
  },
  {
    id: "00000000-0000-4000-8000-000000000002",
    slug: "walk-in-robe-sydney",
    title: "Walk-In Robe — Mosman",
    clientDisplayName: "Catherine & David Walsh",
    summary:
      "Walk-in robe with American oak veneer internals, LED-lit hanging zones, and a centre island bench for a Mosman master suite.",
    locationName: "Mosman, Sydney",
    serviceSlug: "built-in-wardrobes",
    displayOrder: 2,
  },
  {
    id: "00000000-0000-4000-8000-000000000003",
    slug: "floating-vanity-byron-bay",
    title: "Floating Vanity — Suffolk Park",
    clientDisplayName: "Tom & Ella Hartigan",
    summary:
      "Wall-hung HMR vanity with timber veneer drawers, stone benchtop, and integrated shaver cabinet for a Suffolk Park coastal bathroom.",
    locationName: "Suffolk Park, Byron Bay",
    serviceSlug: "custom-bathroom-vanity",
    displayOrder: 3,
  },
  {
    id: "00000000-0000-4000-8000-000000000004",
    slug: "office-fitout-canberra",
    title: "Office Fitout — Barton",
    clientDisplayName: "Rachel & Mark O'Connor",
    summary:
      "Reception desk, meeting-room joinery, and breakout storage for a Barton professional services suite — Polytec laminate, 2-pac accents, and integrated cable management.",
    locationName: "Barton, Canberra",
    serviceSlug: "office-fitout",
    displayOrder: 4,
  },
  {
    id: "00000000-0000-4000-8000-000000000005",
    slug: "home-office-wollongong",
    title: "Home Office Joinery — Wollongong",
    clientDisplayName: "Fiona & Greg Saunders",
    summary:
      "Floor-to-ceiling home office wall with integrated desk, printer housing, and display shelving for a Wollongong terrace renovation.",
    locationName: "Wollongong, NSW",
    serviceSlug: "home-office-joinery",
    displayOrder: 5,
  },
  {
    id: "00000000-0000-4000-8000-000000000006",
    slug: "laundry-cabinets-central-coast",
    title: "Laundry Cabinetry — Erina",
    clientDisplayName: "Michelle & Andrew Park",
    summary:
      "Full-height laundry cabinetry with broom cupboard, folding bench, and appliance housing for an Erina family home.",
    locationName: "Erina, Central Coast",
    serviceSlug: "laundry-cabinets",
    displayOrder: 6,
  },
] as const;

/** Static featured projects for homepage when the database is empty or unavailable. */
export function staticFeaturedProjects(): PortfolioProject[] {
  return FEATURED_PROJECT_SEEDS.map((project) => ({
    id: project.id,
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    description: null,
    clientDisplayName: project.clientDisplayName,
    locationName: project.locationName,
    serviceSlug: project.serviceSlug,
    beforeImageUrl: portfolioImagePath(project.slug, "before"),
    afterImageUrl: portfolioImagePath(project.slug, "after"),
    galleryImages: portfolioGalleryImages(project.slug, project.title),
    metaTitle: null,
    metaDescription: null,
    isPublished: true,
    displayOrder: project.displayOrder,
    createdAt: STATIC_PROJECT_TIMESTAMP,
    updatedAt: STATIC_PROJECT_TIMESTAMP,
  }));
}
