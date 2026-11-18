import Link from "@/components/ui/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const HERO_IMAGE = "/images/hero/fine-walnut-kitchen.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#1c120d]">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-container-x py-8 lg:min-h-[680px] lg:grid-cols-2 lg:gap-12 lg:py-10 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="relative z-10 subpixel-antialiased pt-[153px] sm:pt-[186px] md:pt-[220px] lg:pt-0">
          <p className="mb-4 max-w-md font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#f0b677] before:mb-4 before:block before:h-px before:w-12 before:bg-[#f0b677] before:content-[''] max-[374px]:text-[10.5px] max-[374px]:tracking-[0.04em] sm:tracking-[0.18em]">
            Premium custom joinery
            <span className="px-1.5" aria-hidden>
              ·
            </span>
            <span className="whitespace-nowrap">Australia-wide</span>
          </p>
          <h1 className="mb-4 font-serif text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-0.01em] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.45)] max-[374px]:text-[clamp(32px,10vw,40px)] lg:font-semibold xl:text-[clamp(40px,3.9vw,55px)]">
            SteepWood — Australia&apos;s Custom Joinery Studio
          </h1>
          <p className="mb-8 max-w-xl text-base leading-relaxed text-[#f7f2ea] sm:text-lg">
            Bespoke kitchens, wardrobes, and commercial joinery for homes and
            businesses across Australia. Craftsmanship since 2014, no
            compromises.
          </p>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="xl"
              className="w-full sm:w-auto lg:h-12 lg:px-5 lg:text-base lg:whitespace-nowrap max-[374px]:px-4 max-[374px]:text-base max-[374px]:whitespace-nowrap"
            >
              <Link href="/contact/">Get a Free Design Consultation</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="xl"
              className="w-full border border-white bg-transparent text-white hover:bg-white/10 sm:w-auto lg:h-12 lg:px-5 lg:text-base lg:whitespace-nowrap max-[374px]:px-4 max-[374px]:text-base max-[374px]:whitespace-nowrap"
            >
              <Link href="/portfolio/">See Our Work</Link>
            </Button>
          </div>
          <p className="text-[12px] font-normal text-[rgba(247,242,234,0.85)]">
            NSW Licence 505342C · 10-year structural warranty
          </p>
        </div>

        <div className="absolute inset-x-0 top-0 h-[360px] overflow-hidden sm:h-[420px] md:h-[480px] lg:inset-0 lg:h-auto">
          <Image
            src={HERO_IMAGE}
            alt="Custom walnut kitchen with fluted island, stone benchtop, dining table and timber staircase by SteepWood"
            fill
            priority
            fetchPriority="high"
            quality={90}
            sizes="100vw"
            className="object-cover object-[85%_40%] lg:object-[center_55%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,18,13,0)_0%,rgba(28,18,13,0)_28%,rgba(28,18,13,0.80)_56%,rgba(28,18,13,0.95)_76%,rgba(28,18,13,1)_100%)] lg:bg-[linear-gradient(90deg,rgba(20,12,8,0.96)_0%,rgba(20,12,8,0.93)_42%,rgba(20,12,8,0.74)_53%,rgba(20,12,8,0.30)_65%,rgba(20,12,8,0)_77%)] xl:bg-[linear-gradient(90deg,rgba(20,12,8,0.96)_0%,rgba(20,12,8,0.93)_36%,rgba(20,12,8,0.66)_48%,rgba(20,12,8,0.24)_59%,rgba(20,12,8,0)_69%)]"
          />
        </div>
      </div>
    </section>
  );
}
