import { SectionShell } from "@/components/sections/section-shell";
import { getAiBotVisitSummaries } from "@/lib/aio/botVisits";

export const dynamic = "force-dynamic";

const COMING_SOON_PANELS = [
  "Citation tracker",
  "Schema health",
  "NAP consistency monitor",
  "Freshness dashboard",
] as const;

export default async function AiVisibilityPage() {
  const botVisits = await getAiBotVisitSummaries();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-display-3 text-ink-900">AI Visibility</h1>
        <p className="mt-2 max-w-2xl text-body text-ink-800/80">
          Monitor AI crawler activity and citation signals. Bot logging is active;
          advanced panels ship in Phase 4.
        </p>
      </div>

      <SectionShell className="rounded-lg border border-ink-700/10 bg-white p-6">
        <h2 className="mb-4 font-serif text-h3 text-ink-900">Bot hit log</h2>
        {botVisits.length === 0 ? (
          <p className="text-body-sm text-ink-800/70">
            No AI bot visits logged yet. Visits from GPTBot, PerplexityBot,
            ClaudeBot, Google-Extended, and OAI-SearchBot appear here within seven
            days of launch.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left text-body-sm">
              <thead>
                <tr className="border-b border-ink-700/10">
                  <th scope="col" className="py-2 pr-4 font-medium text-ink-900">
                    Week starting
                  </th>
                  <th scope="col" className="py-2 pr-4 font-medium text-ink-900">
                    Path
                  </th>
                  <th scope="col" className="py-2 font-medium text-ink-900">
                    Visits
                  </th>
                </tr>
              </thead>
              <tbody>
                {botVisits.map((row) => (
                  <tr
                    key={`${row.weekStart}-${row.path}`}
                    className="border-b border-ink-700/10 last:border-0"
                  >
                    <td className="py-2 pr-4 text-ink-800/80">{row.weekStart}</td>
                    <td className="py-2 pr-4 font-mono text-ink-800">{row.path}</td>
                    <td className="py-2 text-ink-900">{row.visits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionShell>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {COMING_SOON_PANELS.map((panel) => (
          <SectionShell
            key={panel}
            className="rounded-lg border border-dashed border-ink-700/20 bg-ink-50 p-6"
          >
            <h2 className="mb-2 font-serif text-h4 text-ink-900">{panel}</h2>
            <p className="text-body-sm text-ink-800/70">Coming in Phase 4.</p>
          </SectionShell>
        ))}
      </div>
    </div>
  );
}
