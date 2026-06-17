import { IdentityBlock } from "@/components/aio/IdentityBlock";
import { SectionShell } from "@/components/sections/section-shell";
import { MediaFrame } from "@/components/ui/media-frame";
import { FOUNDING_YEAR } from "@/lib/business";
import { WORKSHOP_HERO_IMAGE } from "@/lib/images";

export function AboutHero() {
  return (
    <SectionShell className="pb-0">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0">
          <p className="mb-stack-sm font-mono text-caption uppercase tracking-widest text-amber-600">
            Our story
          </p>
          <h1 className="mb-stack-md font-serif text-display-2 text-ink-900">
            About SteepWood — Custom Joinery Crafted in Newcastle Since{" "}
            {FOUNDING_YEAR}
          </h1>
          <IdentityBlock className="mb-stack-md max-w-xl" />
          <p className="mb-stack-sm max-w-xl font-serif text-h4 text-ink-800/90">
            Joiners who measure twice and care thrice.
          </p>
          <p className="max-w-xl text-body-lg text-ink-800">
            Newcastle joinery craftsmanship since {FOUNDING_YEAR}. Family-run,
            premium materials, fixed-price quotes — and a workshop where every
            detail still matters.
          </p>
        </div>
        <MediaFrame
          src={WORKSHOP_HERO_IMAGE}
          alt="SteepWood joinery workshop in Newcastle with craftspeople at work"
          sizes="(max-width: 1024px) 100vw, 50vw"
          imageClassName="grayscale"
        />
      </div>
    </SectionShell>
  );
}
