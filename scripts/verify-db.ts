import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const [
    services,
    locations,
    serviceLocations,
    blogPosts,
    portfolioProjects,
    testimonials,
    faqs,
  ] = await Promise.all([
    prisma.service.count(),
    prisma.location.count(),
    prisma.serviceLocation.count(),
    prisma.blogPost.count({ where: { isPublished: true } }),
    prisma.portfolioProject.count({ where: { isPublished: true } }),
    prisma.testimonial.count({ where: { isPublished: true } }),
    prisma.faq.count({ where: { isPublished: true, category: "homepage" } }),
  ]);

  console.log("Prisma connected to Supabase successfully.");
  console.log({
    services,
    locations,
    serviceLocations,
    blogPosts,
    portfolioProjects,
    testimonials,
    homepageFaqs: faqs,
  });
}

main()
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
