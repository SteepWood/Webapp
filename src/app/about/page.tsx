import type { Metadata } from "next";

import { AboutCTA } from "@/components/sections/about/AboutCTA";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { Credentials } from "@/components/sections/about/Credentials";
import { OriginStory } from "@/components/sections/about/OriginStory";
import { Team } from "@/components/sections/about/Team";
import { Values } from "@/components/sections/about/Values";
import { WorkshopGallery } from "@/components/sections/about/WorkshopGallery";
import { canonicalUrl } from "@/lib/seo/canonical";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "About SteepWood Custom Joinery — Newcastle Craftsmen",
  description:
    "Twenty years of Newcastle joinery craftsmanship. Family-run, premium materials, fixed-price quotes. Learn the SteepWood story and meet the team.",
  alternates: {
    canonical: canonicalUrl("/about/"),
    languages: {
      "en-AU": canonicalUrl("/about/"),
    },
  },
  openGraph: {
    title: "About SteepWood Custom Joinery — Newcastle Craftsmen",
    description:
      "Twenty years of Newcastle joinery craftsmanship. Family-run, premium materials, fixed-price quotes. Learn the SteepWood story and meet the team.",
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
