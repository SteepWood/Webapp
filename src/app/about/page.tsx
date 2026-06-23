import type { Metadata } from "next";

import { AboutCTA } from "@/components/sections/about/AboutCTA";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { Credentials } from "@/components/sections/about/Credentials";
import { OriginStory } from "@/components/sections/about/OriginStory";
import { Team } from "@/components/sections/about/Team";
import { Values } from "@/components/sections/about/Values";
import { WorkshopGallery } from "@/components/sections/about/WorkshopGallery";
import { FOUNDING_YEAR } from "@/lib/business";
import { canonicalUrl } from "@/lib/seo/canonical";

const ABOUT_DESCRIPTION = `Newcastle joinery craftsmanship since ${FOUNDING_YEAR}. Family-run, premium materials, fixed-price quotes. Learn the SteepWood story and meet the team.`;

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "About — Newcastle Craftsmen Since 2014",
  description: ABOUT_DESCRIPTION,
  alternates: {
    canonical: canonicalUrl("/about/"),
    languages: {
      "en-AU": canonicalUrl("/about/"),
    },
  },
  openGraph: {
    title: "About — Newcastle Craftsmen Since 2014",
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
