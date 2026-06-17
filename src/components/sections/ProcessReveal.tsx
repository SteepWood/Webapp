"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import {
  ScrollReveal,
  ScrollRevealItem,
  ScrollRevealStagger,
} from "@/components/motion/ScrollReveal";
import { SectionShell } from "@/components/sections/section-shell";
import { useMediaQuery } from "@/hooks/use-media-query";

gsap.registerPlugin(ScrollTrigger);

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
    title: "Manufacture in Newcastle",
    description:
      "Residential projects typically take 8–12 weeks; commercial fitouts 10–16 weeks. Every component is built and finished in our workshop.",
  },
  {
    number: "04",
    title: "Install by our own teams",
    description:
      "We install across NSW and ACT with our own crews, and coordinate vetted install partners interstate for a seamless handover.",
  },
] as const;

export function ProcessReveal() {
  const lineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const desktopViewport = useMediaQuery("(min-width: 1024px)");

  useGSAP(
    () => {
      if (reducedMotion || !desktopViewport || !lineRef.current) {
        return;
      }

      const tween = gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        },
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { dependencies: [reducedMotion, desktopViewport] },
  );

  return (
    <SectionShell id="process" className="bg-ink-50">
      <ScrollReveal>
        <h2 className="mb-stack-lg max-w-3xl font-serif text-h2 text-ink-900">
          From consultation to install — what to expect
        </h2>
      </ScrollReveal>

      <div className="relative">
        <div
          ref={lineRef}
          aria-hidden
          className="absolute top-[2.75rem] right-0 left-0 hidden h-px origin-left bg-gradient-to-r from-amber-500/70 via-amber-400/40 to-transparent lg:block"
        />

        <ScrollRevealStagger className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {STEPS.map((step) => (
            <ScrollRevealItem key={step.number}>
              <article className="flex flex-col gap-3">
                <span className="font-serif text-5xl leading-none text-amber-600">
                  {step.number}
                </span>
                <h3 className="font-serif text-h4 text-ink-900">{step.title}</h3>
                <p className="text-body-sm leading-relaxed text-ink-800/80">
                  {step.description}
                </p>
              </article>
            </ScrollRevealItem>
          ))}
        </ScrollRevealStagger>
      </div>
    </SectionShell>
  );
}
