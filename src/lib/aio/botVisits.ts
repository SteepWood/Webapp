import { prisma } from "@/lib/db/prisma";

export type AiBotVisitSummary = {
  weekStart: string;
  path: string;
  visits: number;
};

export async function getAiBotVisitSummaries(): Promise<AiBotVisitSummary[]> {
  try {
    const visits = await prisma.aiBotVisit.findMany({
      orderBy: { createdAt: "desc" },
      take: 500,
      select: {
        path: true,
        createdAt: true,
      },
    });

    const grouped = new Map<string, number>();

    for (const visit of visits) {
      const weekStart = getWeekStart(visit.createdAt);
      const key = `${weekStart}|${visit.path}`;
      grouped.set(key, (grouped.get(key) ?? 0) + 1);
    }

    return [...grouped.entries()]
      .map(([key, count]) => {
        const [weekStart, path] = key.split("|");
        return {
          weekStart: weekStart ?? "",
          path: path ?? "",
          visits: count,
        };
      })
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 50);
  } catch {
    return [];
  }
}

function getWeekStart(date: Date): string {
  const copy = new Date(date);
  const day = copy.getUTCDay();
  const diff = day === 0 ? -6 : 1 - day;
  copy.setUTCDate(copy.getUTCDate() + diff);
  copy.setUTCHours(0, 0, 0, 0);
  return copy.toISOString().slice(0, 10);
}
