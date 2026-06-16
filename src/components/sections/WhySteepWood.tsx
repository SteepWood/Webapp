"use client";

import { Award, Gem, Hammer, Warehouse } from "lucide-react";

import {
  ScrollReveal,
  ScrollRevealItem,
  ScrollRevealStagger,
} from "@/components/motion/ScrollReveal";
import { SectionShell } from "@/components/sections/section-shell";

const PILLARS = [
  {
    icon: Warehouse,
    title: "Newcastle Workshop",
    description:
      "Every piece designed and manufactured in one place. No subcontracted joinery, no surprises.",
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
    <SectionShell className="surface-section">
      <ScrollReveal>
        <h2 className="mb-stack-lg font-serif text-h2 text-ink-900">
          Why SteepWood
        </h2>
      </ScrollReveal>
      <ScrollRevealStagger className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((pillar) => (
          <ScrollRevealItem key={pillar.title}>
            <div className="flex flex-col gap-3">
              <pillar.icon
                className="size-8 text-amber-700"
                aria-hidden
                strokeWidth={1.5}
              />
              <h3 className="font-serif text-h4 text-ink-900">{pillar.title}</h3>
              <p className="text-body-sm leading-relaxed text-ink-800/80">
                {pillar.description}
              </p>
            </div>
          </ScrollRevealItem>
        ))}
      </ScrollRevealStagger>
    </SectionShell>
  );
}
