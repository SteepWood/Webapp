import type { Metadata } from "next";
import { preload } from "react-dom";
import { Suspense } from "react";

import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { HomepageFAQ } from "@/components/sections/HomepageFAQ";
import {
  homepageInnerClass,
  homepageSectionClass,
} from "@/components/sections/homepageStyles";
import { ProcessReveal } from "@/components/sections/ProcessReveal";
import { ServiceAreaTeaser } from "@/components/sections/ServiceAreaTeaser";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import {
  Testimonials,
  TestimonialsSkeleton,
} from "@/components/sections/Testimonials";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhySteepWood } from "@/components/sections/WhySteepWood";
import { WorkshopSection } from "@/components/sections/WorkshopSection";
import { getHomepagePageData } from "@/lib/db/homepage-page";
import { canonicalUrl } from "@/lib/seo/canonical";

const HOMEPAGE_HERO_IMAGE = "/images/workshop/people-3-saw-wide.jpg";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: {
    absolute:
      "SteepWood — Custom Joinery & Cabinetmakers Australia (NSW Licence 489553C)",
  },
  description:
    "Custom joinery, kitchens, wardrobes, vanities and commercial fit-outs across Australia. Workshop since 2014. NSW Carpentry Licence 489553C.",
  alternates: {
    canonical: canonicalUrl("/"),
    languages: {
      "en-AU": canonicalUrl("/"),
    },
  },
  openGraph: {
    title:
      "SteepWood — Custom Joinery & Cabinetmakers Australia | SteepWood Joinery",
    description:
      "Custom joinery, kitchens, wardrobes, vanities and commercial fit-outs across Australia. Workshop since 2014. NSW Carpentry Licence 489553C.",
    url: canonicalUrl("/"),
    siteName: "SteepWood",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "SteepWood — Custom Joinery & Cabinetmakers Australia | SteepWood Joinery",
    description:
      "Custom joinery, kitchens, wardrobes, vanities and commercial fit-outs across Australia. Workshop since 2014. NSW Carpentry Licence 489553C.",
  },
};

export default async function HomePage() {
  preload(HOMEPAGE_HERO_IMAGE, {
    as: "image",
    fetchPriority: "high",
  });

  const { services, locations, projects, faqs } = await getHomepagePageData();

  return (
    <div className="overflow-x-clip bg-[#faf8f5] max-lg:-mb-[calc(5rem+env(safe-area-inset-bottom))]">
      <Hero />
      <TrustBar />
      <ServicesOverview services={services} />
      <WorkshopSection />
      <FeaturedProjects projects={projects} variant="editorial" />
      <ProcessReveal />
      <Suspense fallback={<TestimonialsSkeleton />}>
        <Testimonials />
      </Suspense>
      <WhySteepWood />
      <ServiceAreaTeaser locations={locations} />
      <section id="faq" className={homepageSectionClass}>
        <div
          className={`${homepageInnerClass} grid items-start gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-12`}
        >
          <HomepageFAQ faqs={faqs} embedded />
          <FinalCTA />
        </div>
      </section>
    </div>
  );
}
