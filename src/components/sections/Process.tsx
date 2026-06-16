import { SectionShell } from "@/components/sections/section-shell";

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

export function Process() {
  return (
    <SectionShell className="bg-ink-50">
      <h2 className="mb-stack-lg max-w-3xl font-serif text-h2 text-ink-900">
        From consultation to install — what to expect
      </h2>
      <ol className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
        {STEPS.map((step) => (
          <li key={step.number} className="flex flex-col gap-3">
            <span className="font-serif text-5xl leading-none text-amber-600">
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
