"use client";

import { Award, Gem, Hammer, Warehouse } from "lucide-react";

import {
  ScrollReveal,
  ScrollRevealItem,
  ScrollRevealStagger,
} from "@/components/motion/ScrollReveal";
import {
  homepageHeadingClass,
  homepageInnerClass,
  homepageSectionClass,
} from "@/components/sections/homepageStyles";

const PILLARS = [
  {
    icon: Warehouse,
    title: "Made In-House",
    description:
      "Every piece designed and made by SteepWood. No subcontracted joinery, no surprises.",
  },
  {
    icon: Hammer,
    title: "20+ Years of Craftsmanship",
    description:
      "Hand-fitted joints, book-matched timber, finishes that hold up to decades of use.",
  },
  {
    icon: Gem,
    title: "Premium Materials Only",
    description:
      "Polytec, Laminex, Caesarstone, Smartstone, Blum hardware. No flatpack shortcuts.",
  },
  {
    icon: Award,
    title: "Fixed-Price Quotes",
    description:
      'No "from" pricing. No surprise variations. What we quote is what you pay.',
  },
] as const;

export function WhySteepWood() {
  return (
    <section className={homepageSectionClass}>
      <div className={homepageInnerClass}>
        <ScrollReveal>
          <h2 className={`${homepageHeadingClass} mb-10`}>Why SteepWood</h2>
        </ScrollReveal>
        <ScrollRevealStagger className="grid grid-cols-2 gap-3 md:gap-8 lg:grid-cols-4">
          {PILLARS.map((pillar) => (
            <ScrollRevealItem key={pillar.title}>
              <div className="flex h-full flex-col gap-3 rounded-lg border border-[#e6d9c8] bg-white p-[14px] md:p-6">
                <pillar.icon
                  className="size-6 text-amber-700 md:size-8"
                  aria-hidden
                  strokeWidth={1.5}
                />
                <h3 className="font-serif text-base text-ink-900 md:text-xl">{pillar.title}</h3>
                <p className="text-[13px] leading-relaxed text-ink-800/80 md:text-sm">
                  {pillar.description}
                </p>
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
