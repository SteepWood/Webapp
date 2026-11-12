import Link from "@/components/ui/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const HERO_IMAGE = "/images/workshop/people-3-saw-wide-bright.jpg";

export function Hero() {
  return (
    <section className="bg-[#faf8f5]">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-container-x py-8 lg:min-h-[680px] lg:grid-cols-2 lg:gap-12 lg:py-10">
        <div>
          <p className="mb-4 max-w-md font-mono text-xs uppercase tracking-[0.14em] text-amber-500 sm:tracking-[0.18em]">
            Premium custom joinery
            <span className="px-1.5" aria-hidden>
              ·
            </span>
            <span className="whitespace-nowrap">Australia-wide</span>
          </p>
          <h1 className="mb-4 font-serif text-[clamp(40px,5vw,64px)] leading-[1.05] text-ink-900">
            SteepWood — Australia&apos;s Custom Joinery Studio
          </h1>
          <p className="mb-8 max-w-xl text-base leading-relaxed text-[#5c4a3c] sm:text-lg">
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
              className="w-full border border-[#2a1c13] bg-transparent text-[#2a1c13] hover:bg-ink-900/5 sm:w-auto"
            >
              <Link href="/portfolio/">See Our Work</Link>
            </Button>
          </div>
          <p className="text-[12px] font-normal text-[rgba(42,28,19,0.6)]">
            NSW Licence 489553C · 10-year structural warranty
          </p>
        </div>

        <div className="relative h-[240px] overflow-hidden rounded-[14px] shadow-[0_30px_60px_-30px_rgba(42,28,19,0.45)] md:h-[420px] lg:h-[560px]">
          <Image
            src={HERO_IMAGE}
            alt="Panel saw and cabinet assembly in the SteepWood workshop, Newcastle"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[center_40%]"
          />
        </div>
      </div>
    </section>
  );
}
