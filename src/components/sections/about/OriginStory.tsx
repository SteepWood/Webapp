import { SectionShell } from "@/components/sections/section-shell";
import { FOUNDING_YEAR } from "@/lib/business";

const PARAGRAPHS = [
  `SteepWood began in ${FOUNDING_YEAR} as a small joinery workshop in Newcastle, NSW, founded on a simple idea: that custom joinery deserves the same standard of design, materials, and craftsmanship as the best architectural homes it goes into. More than a decade later, our workshop has grown into one of the most respected premium joinery operations on the east coast — but our process is still built around the same fundamentals. Every project starts with a conversation, every piece is designed for the actual space and the actual people who will use it, and every finish leaves the workshop only when it meets the standard that has carried our name since ${FOUNDING_YEAR}.`,
  "Our work spans the full range of joinery: custom kitchens, built-in wardrobes and walk-in robes, bathroom vanities, laundry joinery, home office and study fit-outs, custom furniture, timber staircases, and full commercial joinery for offices, retail, and hospitality. We manufacture everything in Newcastle, supply our own materials through long-standing partnerships with Polytec, Laminex, Caesarstone, Smartstone, and Blum, and install with our own teams across NSW and ACT — and with vetted install partners interstate.",
  "We work for homeowners directly, for builders and architects on new builds and renovations, and for businesses needing commercial fitouts. Our pricing model is fixed-price, our warranties are written into the contract, and our reputation is built one project at a time across the Hunter, Sydney, Canberra, and the cities and regions in between.",
  "We started SteepWood in a modest workshop space with a handful of tools and a conviction that Australian homeowners deserved better than flatpack compromises. Today we occupy a purpose-built facility in Newcastle, but the ethos has not shifted: measure carefully, communicate honestly, and never rush a finish that a family will live with for decades.",
] as const;

export function OriginStory() {
  return (
    <SectionShell className="bg-ink-50 pt-0">
      <h2 className="mb-stack-lg font-serif text-h2 text-ink-900">Our story</h2>
      <div className="grid grid-cols-1 gap-8 text-body leading-relaxed text-ink-800 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-6">
          {PARAGRAPHS.slice(0, 2).map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
        <div className="flex flex-col gap-6">
          {PARAGRAPHS.slice(2).map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
