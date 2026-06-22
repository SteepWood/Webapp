import { SectionShell } from "@/components/sections/section-shell";

const TOPICS = [
  {
    title: "Kitchen planning and budgeting",
    description:
      "Guides to custom kitchen costs in NSW, comparisons between flat-pack and bespoke cabinetry, and how fixed-price quoting works when you renovate or build new. Includes typical price drivers such as benchtop material, appliance integration, and structural changes.",
  },
  {
    title: "Materials and finishes",
    description:
      "Articles on 2pac, laminate, and timber veneer selection, engineered stone regulations, hardware choices, and how finishes perform in Australian climates. We explain when to specify moisture-resistant boards in wet areas and laundry spaces.",
  },
  {
    title: "Wardrobes and storage",
    description:
      "Walk-in robe and built-in wardrobe planning, storage maximisation for bedrooms, and cost considerations for whole-home storage packages. Useful when you are comparing internal fit-out options before committing to a builder.",
  },
  {
    title: "Choosing a joiner",
    description:
      "Questions to ask before appointing a custom joiner, what to expect from shop drawings, and how to evaluate quotes that look similar on paper. Covers warranties, lead times, and installation responsibility.",
  },
  {
    title: "Workshop and process",
    description:
      "Behind-the-scenes notes from our Newcastle workshop on measure, manufacture, delivery, and installation — so you know what happens between deposit and handover. Includes freight and interstate install considerations.",
  },
  {
    title: "Compliance and consumer rights",
    description:
      "Plain-language summaries of Australian Consumer Law topics that affect joinery purchases, linked to our formal legal pages. Helpful for homeowners reviewing contracts before signing.",
  },
] as const;

export function BlogTopicOverview() {
  return (
    <SectionShell className="border-t border-ink-700/10 bg-ink-50/50">
      <h2 className="mb-stack-md font-serif text-h2 text-ink-900">
        Topics we publish
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {TOPICS.map((topic) => (
          <article
            key={topic.title}
            className="rounded-lg border border-ink-700/10 bg-ink-50 p-6"
          >
            <h3 className="mb-2 font-serif text-h4 text-ink-900">
              {topic.title}
            </h3>
            <p className="text-body-sm leading-relaxed text-ink-800/80">
              {topic.description}
            </p>
          </article>
        ))}
      </div>
      <p className="mt-stack-lg max-w-3xl text-body-sm leading-relaxed text-ink-800/75">
        Articles are written for Australian homeowners, builders, and designers.
        We focus on practical decisions you make before signing a joinery
        contract — not generic inspiration lists. When regulations or material
        supply change, we update affected posts and note the revision date on
        the article page. Use the filters below to browse by category or tag.
        Featured articles rotate on the homepage grid when new launch content is
        published from our Newcastle studio team each quarter when available.
      </p>
    </SectionShell>
  );
}
