"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

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

function StaticProcess() {
  return (
    <SectionShell className="bg-ink-50">
      <h2 className="mb-stack-lg max-w-3xl font-serif text-h2 text-ink-900">
        From consultation to install — what to expect
      </h2>
      <ol className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
        {STEPS.map((step) => (
          <li key={step.number} className="flex flex-col gap-3">
            <span className="font-serif text-5xl leading-none text-amber-500/80">
              {step.number}
            </span>
            <h3 className="font-serif text-h4 text-ink-900">{step.title}</h3>
            <p className="text-body-sm leading-relaxed text-ink-800/80">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}

export function ProcessScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const desktopViewport = useMediaQuery("(min-width: 768px)");

  useGSAP(
    () => {
      if (reducedMotion || !desktopViewport || !sectionRef.current || !pinRef.current) {
        return;
      }

      const stepElements = gsap.utils.toArray<HTMLElement>("[data-process-step]");

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: pinRef.current,
          scrub: 0.5,
        },
      });

      stepElements.forEach((element, index) => {
        if (index === 0) {
          gsap.set(element, { opacity: 1, y: 0 });
          return;
        }

        timeline.fromTo(
          element,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6 },
          index * 0.5,
        );
      });

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    { dependencies: [reducedMotion, desktopViewport], scope: sectionRef },
  );

  if (reducedMotion || !desktopViewport) {
    return <StaticProcess />;
  }

  return (
    <section ref={sectionRef} className="bg-ink-50">
      <div ref={pinRef} className="px-container-x py-section-y">
        <div className="mx-auto min-w-0 max-w-7xl">
          <h2 className="mb-stack-lg max-w-3xl font-serif text-h2 text-ink-900">
            From consultation to install — what to expect
          </h2>
          <ol className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
            {STEPS.map((step) => (
              <li
                key={step.number}
                data-process-step
                className="flex flex-col gap-3"
              >
                <span className="font-serif text-5xl leading-none text-amber-500/80">
                  {step.number}
                </span>
                <h3 className="font-serif text-h4 text-ink-900">{step.title}</h3>
                <p className="text-body-sm leading-relaxed text-ink-800/80">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
