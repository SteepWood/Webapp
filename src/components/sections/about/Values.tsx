import { SectionShell } from "@/components/sections/section-shell";

const VALUES = [
  {
    title: "Craftsmanship over speed",
    description:
      "We would rather decline a rushed timeline than compromise a joint, a finish, or a fit. Quality is the only schedule that matters.",
  },
  {
    title: "Materials that age beautifully",
    description:
      "Polytec, Laminex, Caesarstone, Smartstone, and Blum hardware — selected for how they look on day one and how they wear over twenty years.",
  },
  {
    title: "Honest communication",
    description:
      "Fixed-price quotes, clear lead times, and direct access to the people building your joinery. No surprises, no vague allowances.",
  },
  {
    title: "Built for generations",
    description:
      "We design and build joinery meant to be lived with, not replaced. Structural warranties and hardware guarantees back every project.",
  },
] as const;

export function Values() {
  return (
    <SectionShell>
      <h2 className="mb-stack-lg font-serif text-h2 text-ink-900">Our values</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {VALUES.map((value) => (
          <article
            key={value.title}
            className="surface-card rounded-lg p-6"
          >
            <h3 className="mb-3 font-serif text-h4 text-ink-900">
              {value.title}
            </h3>
            <p className="text-body-sm leading-relaxed text-ink-800/80">
              {value.description}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
