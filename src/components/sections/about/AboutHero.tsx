import { SectionShell } from "@/components/sections/section-shell";
import { MediaFrame } from "@/components/ui/media-frame";

export function AboutHero() {
  return (
    <SectionShell className="pb-0">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0">
          <p className="mb-stack-sm font-mono text-caption uppercase tracking-widest text-amber-600">
            Our story
          </p>
          <h1 className="mb-stack-md font-serif text-display-2 text-ink-900">
            About SteepWood — Twenty Years of Newcastle Craftsmanship
          </h1>
          <p className="mb-stack-sm max-w-xl font-serif text-h4 text-ink-800/90">
            Joiners who measure twice and care thrice.
          </p>
          <p className="max-w-xl text-body-lg text-ink-800">
            Twenty years of Newcastle joinery craftsmanship. Family-run, premium
            materials, fixed-price quotes — and a workshop where every detail
            still matters.
          </p>
        </div>
        <MediaFrame
          src="/images/hero-workshop.svg"
          alt="SteepWood joinery workshop in Newcastle with craftspeople at work"
          sizes="(max-width: 1024px) 100vw, 50vw"
          imageClassName="grayscale"
        />
      </div>
    </SectionShell>
  );
}
