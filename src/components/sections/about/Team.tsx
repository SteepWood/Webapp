import { SectionShell } from "@/components/sections/section-shell";

const TEAM = [
  {
    name: "Sukhveer Kaur",
    role: "Founder & Master Joiner",
    bio: "Twenty years in bespoke joinery across residential and commercial projects throughout NSW.",
    initials: "SK",
  },
  {
    name: "Sarah Chen",
    role: "Lead Designer",
    bio: "Translates client briefs into detailed drawings, material schedules, and 3D visuals.",
    initials: "SC",
  },
  {
    name: "Tom Walsh",
    role: "Lead Joiner",
    bio: "Oversees workshop production, quality control, and complex on-site fitting.",
    initials: "TW",
  },
  {
    name: "Marcus O'Brien",
    role: "Install Lead",
    bio: "Coordinates install teams across NSW and ACT with a focus on seamless handover.",
    initials: "MO",
  },
] as const;

export function Team() {
  return (
    <SectionShell>
      <h2 className="mb-stack-lg font-serif text-h2 text-ink-900">
        Meet the team
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.map((member) => (
          <article
            key={member.name}
            className="surface-card flex flex-col rounded-lg p-6"
          >
            <div
              className="mb-4 flex size-16 items-center justify-center rounded-full bg-ink-900 font-serif text-xl text-ink-50"
              aria-hidden
            >
              {member.initials}
            </div>
            <h3 className="font-serif text-h4 text-ink-900">{member.name}</h3>
            <p className="mb-3 text-caption font-medium uppercase tracking-wide text-amber-600">
              {member.role}
            </p>
            <p className="text-body-sm leading-relaxed text-ink-800/80">
              {member.bio}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
