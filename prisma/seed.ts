import { PrismaClient } from "@prisma/client";

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
    title: "Hamptons Kitchen — Newcastle",
    summary:
      "Shaker-profile 2-pac kitchen with Caesarstone benchtops, integrated appliances, and a butler's pantry.",
    locationName: "Newcastle",
    serviceSlug: "custom-kitchen-joinery",
    displayOrder: 1,
  },
  {
    slug: "walk-in-robe-sydney",
    title: "Walk-In Robe — Sydney",
    summary:
      "Full-height wardrobes with soft-close drawers, LED lighting, and island bench in American oak veneer.",
    locationName: "Sydney",
    serviceSlug: "built-in-wardrobes",
    displayOrder: 2,
  },
  {
    slug: "floating-vanity-byron-bay",
    title: "Floating Vanity — Byron Bay",
    summary:
      "Moisture-resistant HMR vanity with integrated basin, timber veneer drawers, and concealed storage.",
    locationName: "Byron Bay",
    serviceSlug: "custom-bathroom-vanity",
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
    await prisma.portfolioProject.upsert({
      where: { slug: project.slug },
      update: {
        title: project.title,
        summary: project.summary,
        locationName: project.locationName,
        serviceSlug: project.serviceSlug,
        displayOrder: project.displayOrder,
        isPublished: true,
        afterImageUrl: "/images/hero-workshop.svg",
      },
      create: {
        slug: project.slug,
        title: project.title,
        summary: project.summary,
        locationName: project.locationName,
        serviceSlug: project.serviceSlug,
        displayOrder: project.displayOrder,
        isPublished: true,
        afterImageUrl: "/images/hero-workshop.svg",
      },
    });
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
