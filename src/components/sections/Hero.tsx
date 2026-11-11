import Link from "@/components/ui/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const HERO_IMAGE = "/images/workshop/people-3-saw-wide.jpg";

export function Hero() {
  return (
    <section className="relative -mt-[5.5rem] flex min-h-[560px] items-center overflow-hidden lg:-mt-28 lg:min-h-[720px]">
      <Image
        src={HERO_IMAGE}
        alt="Panel saw and cabinet assembly in the SteepWood workshop, Newcastle"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-[center_40%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,20,13,0.9)_0%,rgba(30,20,13,0.78)_48%,rgba(30,20,13,0.35)_100%)] lg:bg-[linear-gradient(90deg,rgba(30,20,13,0.92)_0%,rgba(30,20,13,0.72)_38%,rgba(30,20,13,0.1)_72%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-container-x pt-[calc(5.5rem+2rem)] pb-12 lg:pt-[calc(7rem+2.5rem)] lg:pb-16">
        <div className="max-w-[700px]">
          <p className="mb-4 max-w-md font-mono text-xs uppercase tracking-[0.14em] text-amber-400 sm:tracking-[0.18em]">
            Premium custom joinery
            <span className="px-1.5" aria-hidden>
              ·
            </span>
            <span className="whitespace-nowrap">Australia-wide</span>
          </p>
          <h1 className="mb-4 font-serif text-[clamp(40px,5vw,64px)] leading-[1.05] text-[#f7f2ea]">
            SteepWood — Australia&apos;s Custom Joinery Studio
          </h1>
          <p className="mb-8 max-w-xl text-base leading-relaxed text-[#f7f2ea]/90 sm:text-lg">
            Bespoke kitchens, wardrobes, and commercial joinery for homes and
            businesses across Australia. Craftsmanship since 2014, no
            compromises.
          </p>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="xl" className="w-full sm:w-auto">
              <Link href="/contact/">Get a Free Design Consultation</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="xl"
              className="w-full border border-[#f7f2ea]/80 bg-transparent text-[#f7f2ea] hover:bg-[#f7f2ea]/10 sm:w-auto"
            >
              <Link href="/portfolio/">See Our Work</Link>
            </Button>
          </div>
          <p className="text-[12px] font-normal text-[#f7f2ea]/60">
            NSW Licence 489553C · 10-year structural warranty
          </p>
        </div>
      </div>
    </section>
  );
}
