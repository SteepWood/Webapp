import type { Metadata } from "next";

import { AboutCTA } from "@/components/sections/about/AboutCTA";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { Credentials } from "@/components/sections/about/Credentials";
import { OriginStory } from "@/components/sections/about/OriginStory";
import { Team } from "@/components/sections/about/Team";
import { Values } from "@/components/sections/about/Values";
import { WorkshopGallery } from "@/components/sections/about/WorkshopGallery";
import { canonicalUrl } from "@/lib/seo/canonical";

const ABOUT_DESCRIPTION =
  "Founded in 2014, SteepWood is a Newcastle custom joinery studio led by Sukhveer Kaur. NSW Carpentry Contractor Licence 489553C, ABN 52 697 313 269.";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "About SteepWood — Custom Joinery Newcastle Since 2014 | Pavit Cabinetry",
  description: ABOUT_DESCRIPTION,
  alternates: {
    canonical: canonicalUrl("/about/"),
    languages: {
      "en-AU": canonicalUrl("/about/"),
    },
  },
  openGraph: {
    title: "About SteepWood — Custom Joinery Newcastle Since 2014 | Pavit Cabinetry",
    description: ABOUT_DESCRIPTION,
    url: canonicalUrl("/about/"),
    siteName: "SteepWood",
    locale: "en_AU",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OriginStory />
      <Values />
      <WorkshopGallery />
      <Team />
      <Credentials />
      <AboutCTA />
    </>
  );
}
