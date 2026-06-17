import { PrismaClient } from "@prisma/client";

import {
  portfolioGalleryImages,
  portfolioImagePath,
} from "../src/lib/images";
import { BLOG_DEFAULT_AUTHOR } from "../src/lib/business";
import { LOCATIONS } from "../src/lib/services-locations/locations";
import { SERVICES } from "../src/lib/services-locations/services";

const prisma = new PrismaClient();

const HOMEPAGE_FAQS = [
  {
    question: "How much does custom joinery cost in Australia?",
    answer:
      "Every SteepWood project is quoted individually based on scope, materials, and complexity. As a guide, custom kitchens typically start from $25,000, built-in wardrobes from $4,500, and bathroom vanities from $3,500. We provide fixed-price quotes after a free in-home design consultation — no hidden extras.",
    displayOrder: 1,
  },
  {
    question: "Do you service areas outside Newcastle?",
    answer:
      "Yes. We travel for free consultations across NSW and the ACT, and deliver finished joinery via dedicated furniture freight to QLD, VIC, SA, and WA. Our workshop is in Newcastle, but we have completed projects in 16 Australian cities and regions.",
    displayOrder: 2,
  },
  {
    question: "How long does a custom kitchen take from quote to install?",
    answer:
      "Most residential kitchen projects take 10–14 weeks from signed contract to installation. This includes design, engineering, manufacturing in our Newcastle workshop, and scheduled delivery. We provide a firm timeline at quote stage.",
    displayOrder: 3,
  },
  {
    question: "What materials and hardware do you use?",
    answer:
      "We work with premium Australian board products (Polytec, Laminex), 2-pac and timber veneers, Caesarstone and natural stone benchtops, and Blum soft-close hardware as standard. Material selections are confirmed during your design consultation.",
    displayOrder: 4,
  },
  {
    question: "Is there a warranty on SteepWood joinery?",
    answer:
      "Yes. All SteepWood joinery carries a 10-year structural warranty and Blum's 25-year hardware warranty. We stand behind our craftsmanship because every piece is designed, manufactured, and quality-checked in our own workshop.",
    displayOrder: 5,
  },
] as const;

const SAMPLE_PROJECTS = [
  {
    slug: "hamptons-kitchen-newcastle",
    title: "Hamptons Kitchen — Merewether",
    clientDisplayName: "James & Priya Nguyen",
    summary:
      "Shaker-profile 2-pac kitchen with Caesarstone benchtops, integrated Miele appliances, and a concealed butler's pantry for a Merewether family home.",
    description: `James and Priya Nguyen were renovating a 1920s coastal cottage in Merewether and wanted a Hamptons kitchen that felt bright, practical, and sympathetic to the home's original proportions — without the compromises of an off-the-shelf package.

We designed a shaker-profile 2-pac kitchen in Dulux Lexicon Quarter with brushed-nickel hardware, Caesarstone Empira White benchtops, and a full-height pantry wall with internal pull-out storage. A concealed butler's pantry sits behind pocket doors, keeping bench clutter out of the open-plan living zone.

Manufactured in our Newcastle workshop over seven weeks and installed across three days. James and Priya's brief prioritised soft-close drawers throughout, a farmhouse sink under the window, and dedicated zones for school lunches and coffee.`,
    locationName: "Merewether, Newcastle",
    serviceSlug: "custom-kitchen-joinery",
    metaTitle: "Hamptons Kitchen Merewether — James & Priya Nguyen",
    metaDescription:
      "Custom Hamptons kitchen in Merewether, Newcastle — shaker 2-pac, Caesarstone benchtops, butler's pantry. SteepWood joinery for James & Priya Nguyen.",
    displayOrder: 1,
  },
  {
    slug: "walk-in-robe-sydney",
    title: "Walk-In Robe — Mosman",
    clientDisplayName: "Catherine & David Walsh",
    summary:
      "Walk-in robe with American oak veneer internals, LED-lit hanging zones, and a centre island bench for a Mosman master suite.",
    description: `Catherine and David Walsh added a first-floor extension to their Federation terrace in Mosman and needed a walk-in robe that matched the craftsmanship of the new master suite — not a modular system squeezed into an awkward corner.

The design uses American oak veneer drawer fronts, full-height hanging for coats and gowns, double soft-close drawers, and LED strip lighting switched at the entry. A centre island bench provides folded-shirt storage and a surface for packing.

Site measure in Mosman, manufacture in Newcastle, and install completed in two days with minimal disruption to the rest of the home. Catherine's brief called out full-extension runners, cedar-lined jewellery drawers, and mirror panels on the entry doors.`,
    locationName: "Mosman, Sydney",
    serviceSlug: "built-in-wardrobes",
    metaTitle: "Walk-In Robe Mosman — Catherine & David Walsh",
    metaDescription:
      "Custom walk-in robe in Mosman — American oak veneer, LED lighting, island bench. SteepWood wardrobe joinery for Catherine & David Walsh.",
    displayOrder: 2,
  },
  {
    slug: "floating-vanity-byron-bay",
    title: "Floating Vanity — Suffolk Park",
    clientDisplayName: "Tom & Ella Hartigan",
    summary:
      "Wall-hung HMR vanity with timber veneer drawers, stone benchtop, and integrated shaver cabinet for a Suffolk Park coastal bathroom.",
    description: `Tom and Ella Hartigan were updating a main bathroom in their Suffolk Park home near Byron Bay — a humid coastal environment that demanded moisture-resistant construction and a clean, floating aesthetic.

We built a wall-hung vanity in HMR carcass board with spotted gum veneer drawer fronts, a cut-out for their chosen Caroma basin, and a stone benchtop supplied to match the existing floor tile. A matching shaver cabinet sits above with internal power and mirrored doors.

All wet-area edges were sealed in our Newcastle workshop before freight to the Northern Rivers. Install took one day, co-ordinated with their plumber's rough-in. Ella's brief included deep drawers for towels, a pull-out grooming tray, and handleless push-to-open lower cabinets.`,
    locationName: "Suffolk Park, Byron Bay",
    serviceSlug: "custom-bathroom-vanity",
    metaTitle: "Floating Vanity Suffolk Park — Tom & Ella Hartigan",
    metaDescription:
      "Custom floating bathroom vanity in Suffolk Park, Byron Bay — HMR construction, timber veneer, stone top. SteepWood for Tom & Ella Hartigan.",
    displayOrder: 3,
  },
] as const;

const SAMPLE_TESTIMONIALS = [
  {
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
    authorName: "Tom & Ella Hartigan",
    authorLocation: "Suffolk Park, NSW",
    quote:
      "The floating vanity transformed our coastal bathroom. Moisture-resistant construction, spotted gum drawers, and a seamless install co-ordinated with our plumber. Highly recommend SteepWood.",
    serviceSlug: "custom-bathroom-vanity",
    locationSlug: "byron-bay",
    source: "Google",
    displayOrder: 3,
  },
] as const;

async function seedServices() {
  for (const service of SERVICES) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {
        name: service.name,
        shortDescription: service.shortDescription,
        description: service.longIntro,
        metaTitle: service.metaTitle,
        metaDescription: service.metaDescription,
        heroImageUrl: service.heroImagePath,
        heroImageAlt: `${service.name} by SteepWood in Newcastle`,
        displayOrder: service.buildPriority,
        isActive: true,
      },
      create: {
        slug: service.slug,
        name: service.name,
        shortDescription: service.shortDescription,
        description: service.longIntro,
        metaTitle: service.metaTitle,
        metaDescription: service.metaDescription,
        heroImageUrl: service.heroImagePath,
        heroImageAlt: `${service.name} by SteepWood in Newcastle`,
        displayOrder: service.buildPriority,
        isActive: true,
      },
    });
  }
}

async function seedLocations() {
  for (const [index, location] of LOCATIONS.entries()) {
    await prisma.location.upsert({
      where: { slug: location.slug },
      update: {
        name: location.name,
        state: location.state,
        region: location.region,
        metaTitle: location.metaTitle,
        metaDescription: location.metaDescription,
        displayOrder: index + 1,
        isActive: true,
      },
      create: {
        slug: location.slug,
        name: location.name,
        state: location.state,
        region: location.region,
        metaTitle: location.metaTitle,
        metaDescription: location.metaDescription,
        displayOrder: index + 1,
        isActive: true,
      },
    });
  }
}

async function seedServiceLocations() {
  const [services, locations] = await Promise.all([
    prisma.service.findMany({ select: { id: true, slug: true } }),
    prisma.location.findMany({ select: { id: true, slug: true } }),
  ]);

  for (const service of services) {
    for (const location of locations) {
      await prisma.serviceLocation.upsert({
        where: {
          serviceId_locationId: {
            serviceId: service.id,
            locationId: location.id,
          },
        },
        update: { isPublished: true },
        create: {
          serviceId: service.id,
          locationId: location.id,
          isPublished: true,
        },
      });
    }
  }
}

async function seedFaqs() {
  for (const faq of HOMEPAGE_FAQS) {
    const existing = await prisma.faq.findFirst({
      where: {
        question: faq.question,
        category: "homepage",
      },
    });

    if (existing) {
      await prisma.faq.update({
        where: { id: existing.id },
        data: {
          answer: faq.answer,
          displayOrder: faq.displayOrder,
          isPublished: true,
        },
      });
      continue;
    }

    await prisma.faq.create({
      data: {
        question: faq.question,
        answer: faq.answer,
        category: "homepage",
        displayOrder: faq.displayOrder,
        isPublished: true,
      },
    });
  }
}

async function seedPortfolio() {
  for (const project of SAMPLE_PROJECTS) {
    const beforeImageUrl = portfolioImagePath(project.slug, "before");
    const afterImageUrl = portfolioImagePath(project.slug, "after");
    const galleryImages = portfolioGalleryImages(project.slug, project.title);

    await prisma.portfolioProject.upsert({
      where: { slug: project.slug },
      update: {
        title: project.title,
        summary: project.summary,
        description: project.description,
        clientDisplayName: project.clientDisplayName,
        locationName: project.locationName,
        serviceSlug: project.serviceSlug,
        metaTitle: project.metaTitle,
        metaDescription: project.metaDescription,
        displayOrder: project.displayOrder,
        isPublished: true,
        beforeImageUrl,
        afterImageUrl,
        galleryImages,
      },
      create: {
        slug: project.slug,
        title: project.title,
        summary: project.summary,
        description: project.description,
        clientDisplayName: project.clientDisplayName,
        locationName: project.locationName,
        serviceSlug: project.serviceSlug,
        metaTitle: project.metaTitle,
        metaDescription: project.metaDescription,
        displayOrder: project.displayOrder,
        isPublished: true,
        beforeImageUrl,
        afterImageUrl,
        galleryImages,
      },
    });
  }
}

async function seedTestimonials() {
  for (const testimonial of SAMPLE_TESTIMONIALS) {
    const existing = await prisma.testimonial.findFirst({
      where: {
        authorName: testimonial.authorName,
        serviceSlug: testimonial.serviceSlug,
        locationSlug: testimonial.locationSlug,
      },
    });

    const data = {
      authorName: testimonial.authorName,
      authorLocation: testimonial.authorLocation,
      quote: testimonial.quote,
      rating: 5,
      serviceSlug: testimonial.serviceSlug,
      locationSlug: testimonial.locationSlug,
      source: testimonial.source,
      isVerified: true,
      isFeatured: true,
      isPublished: true,
      displayOrder: testimonial.displayOrder,
    };

    if (existing) {
      await prisma.testimonial.update({
        where: { id: existing.id },
        data,
      });
      continue;
    }

    await prisma.testimonial.create({ data });
  }
}

async function seedBlogAuthors() {
  const result = await prisma.blogPost.updateMany({
    where: { isPublished: true },
    data: { authorName: BLOG_DEFAULT_AUTHOR },
  });

  if (result.count > 0) {
    console.log(`  updated ${result.count} published blog post author(s)`);
  }
}

async function main() {
  console.log("Seeding services…");
  await seedServices();

  console.log("Seeding locations…");
  await seedLocations();

  console.log("Seeding service × location matrix…");
  await seedServiceLocations();

  console.log("Seeding homepage FAQs…");
  await seedFaqs();

  console.log("Seeding sample portfolio projects…");
  await seedPortfolio();

  console.log("Seeding portfolio testimonials…");
  await seedTestimonials();

  console.log("Setting blog post authors…");
  await seedBlogAuthors();

  const counts = await Promise.all([
    prisma.service.count(),
    prisma.location.count(),
    prisma.serviceLocation.count(),
    prisma.faq.count({ where: { category: "homepage", isPublished: true } }),
    prisma.portfolioProject.count({ where: { isPublished: true } }),
    prisma.blogPost.count({ where: { isPublished: true } }),
    prisma.testimonial.count({ where: { isPublished: true } }),
  ]);

  console.log("Seed complete:");
  console.log(`  services: ${counts[0]}`);
  console.log(`  locations: ${counts[1]}`);
  console.log(`  service_locations: ${counts[2]}`);
  console.log(`  homepage FAQs: ${counts[3]}`);
  console.log(`  portfolio projects: ${counts[4]}`);
  console.log(`  blog posts: ${counts[5]}`);
  console.log(`  testimonials: ${counts[6]}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
