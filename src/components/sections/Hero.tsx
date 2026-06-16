import Link from "@/components/ui/link";

import { HeroMotion, HeroMotionItem } from "@/components/sections/HeroMotion";
import { MediaFrame } from "@/components/ui/media-frame";
import { Button } from "@/components/ui/button";
import { WORKSHOP_HERO_IMAGE } from "@/lib/images";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-container-x py-section-y">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,_rgba(139,107,71,0.14)_0%,_transparent_55%)]"
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <HeroMotion>
          <HeroMotionItem>
            <p className="mb-stack-sm font-mono text-caption uppercase tracking-widest text-amber-600">
              Premium custom joinery · Newcastle, NSW
            </p>
          </HeroMotionItem>
          <HeroMotionItem>
            <h1 className="mb-stack-md max-w-2xl font-serif text-display-1 text-ink-900">
              Custom Joinery, Designed and Built in Newcastle
            </h1>
          </HeroMotionItem>
          <HeroMotionItem>
            <p className="mb-stack-lg max-w-xl text-body-lg text-ink-800">
              Bespoke kitchens, wardrobes, and commercial joinery for homes and
              businesses across Australia. Twenty years of craftsmanship, one
              workshop, no compromises.
            </p>
          </HeroMotionItem>
          <HeroMotionItem>
            <div className="mb-stack-md flex flex-col gap-stack-sm sm:flex-row">
              <Button asChild size="xl">
                <Link href="/contact/">Get a Free Design Consultation</Link>
              </Button>
              <Button asChild variant="ghost" size="xl">
                <Link href="/portfolio/">See Our Work</Link>
              </Button>
            </div>
          </HeroMotionItem>
          <HeroMotionItem>
            <p className="text-body-sm text-ink-800/80">
              ★ 4.9 Google · HIA Member · Newcastle, NSW
            </p>
          </HeroMotionItem>
        </HeroMotion>

        <HeroMotionItem className="min-w-0">
          <MediaFrame
            src={WORKSHOP_HERO_IMAGE}
            alt="SteepWood joinery workshop in Newcastle showing custom cabinetry in production"
            width={1600}
            height={1000}
            priority
            fetchPriority="high"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="rounded-lg shadow-md ring-1 ring-ink-700/10"
          />
        </HeroMotionItem>
      </div>
    </section>
  );
}
