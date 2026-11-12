"use client";

import {
  ScrollReveal,
  ScrollRevealItem,
  ScrollRevealStagger,
} from "@/components/motion/ScrollReveal";
import {
  homepageHeadingClass,
  homepageInnerClass,
  homepageBandClass,
} from "@/components/sections/homepageStyles";

const STEPS = [
  {
    number: "01",
    title: "Free design consultation",
    description:
      "45–60 minutes in your home or via video. We listen first, measure second, and leave you with a clear sense of what is possible.",
  },
  {
    number: "02",
    title: "Detailed design and fixed-price quote",
    description:
      "Within five working days of measure, you receive drawings, material selections, and a fixed-price quote with no hidden variations.",
  },
  {
    number: "03",
    title: "Made in-house",
    description:
      "Residential projects typically take 8–12 weeks; commercial fitouts 10–16 weeks. Every component is built and finished by our own makers.",
  },
  {
    number: "04",
    title: "Install by our own teams",
    description:
      "We install across NSW and ACT with our own crews, and coordinate vetted install partners interstate for a seamless handover.",
  },
] as const;

export function ProcessReveal() {
  return (
    <section id="process" className={homepageBandClass}>
      <div className={homepageInnerClass}>
        <ScrollReveal>
          <h2 className={`${homepageHeadingClass} mb-10 max-w-3xl`}>
            From consultation to install — what to expect
          </h2>
        </ScrollReveal>

        <ScrollRevealStagger className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {STEPS.map((step) => (
            <ScrollRevealItem key={step.number}>
              <article className="flex h-full flex-col gap-3 rounded-lg border border-[#e6d9c8] bg-white p-4 md:p-6">
                <div className="flex items-center gap-3 md:flex-col md:items-start">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-500 font-serif text-base text-[#f7f2ea] md:size-11 md:text-lg">
                    {step.number}
                  </span>
                  <h3 className="font-serif text-xl leading-snug text-ink-900">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-ink-800/80">
                  {step.description}
                </p>
              </article>
            </ScrollRevealItem>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
