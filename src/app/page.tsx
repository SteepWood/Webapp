import type { Metadata } from "next";
import { preload } from "react-dom";
import { Suspense } from "react";

import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { HomepageFAQ } from "@/components/sections/HomepageFAQ";
import { ProcessReveal } from "@/components/sections/ProcessReveal";
import { ServiceAreaTeaser } from "@/components/sections/ServiceAreaTeaser";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import {
  Testimonials,
  TestimonialsSkeleton,
} from "@/components/sections/Testimonials";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhySteepWood } from "@/components/sections/WhySteepWood";
import { WORKSHOP_HERO_IMAGE } from "@/lib/images";
import { getHomepagePageData } from "@/lib/db/homepage-page";
import { canonicalUrl } from "@/lib/seo/canonical";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: {
    absolute: "Custom Joinery Newcastle NSW — Australia-Wide",
  },
  description:
    "Premium custom joinery from our Newcastle workshop. Kitchens, wardrobes, vanities, commercial fitouts across 16 Australian cities. Free design consultation.",
  alternates: {
    canonical: canonicalUrl("/"),
    languages: {
      "en-AU": canonicalUrl("/"),
    },
  },
  openGraph: {
    title: "Custom Joinery Newcastle NSW — Australia-Wide | SteepWood Joinery",
    description:
      "Premium custom joinery from our Newcastle workshop. Kitchens, wardrobes, vanities, commercial fitouts across 16 Australian cities. Free design consultation.",
    url: canonicalUrl("/"),
    siteName: "SteepWood",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Joinery Newcastle NSW — Australia-Wide | SteepWood Joinery",
    description:
      "Premium custom joinery from our Newcastle workshop. Kitchens, wardrobes, vanities, commercial fitouts across 16 Australian cities. Free design consultation.",
  },
};

export default async function HomePage() {
  preload(WORKSHOP_HERO_IMAGE, {
    as: "image",
    fetchPriority: "high",
  });

  const { services, locations, projects, faqs } = await getHomepagePageData();

  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesOverview services={services} />
      <WhySteepWood />
      <FeaturedProjects projects={projects} />
      <ProcessReveal />
      <Suspense fallback={<TestimonialsSkeleton />}>
        <Testimonials />
      </Suspense>
      <ServiceAreaTeaser locations={locations} />
      <HomepageFAQ faqs={faqs} />
      <FinalCTA />
    </>
  );
}
