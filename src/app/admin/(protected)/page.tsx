import Link from "@/components/ui/link";
import {
  FileText,
  FolderKanban,
  MessageSquareQuote,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  getAdminDashboardMetrics,
  getAdminRecentActivity,
} from "@/lib/db/admin";

export const dynamic = "force-dynamic";

const METRIC_CARDS = [
  {
    key: "quotesThisWeek" as const,
    label: "Quotes this week",
    icon: MessageSquareQuote,
    href: "/admin/quotes/",
  },
  {
    key: "pendingTestimonials" as const,
    label: "Pending testimonials",
    icon: Star,
    href: "/admin/testimonials/",
  },
  {
    key: "draftBlogPosts" as const,
    label: "Draft blog posts",
    icon: FileText,
    href: "/admin/blog/",
  },
  {
    key: "publishedProjects" as const,
    label: "Published projects",
    icon: FolderKanban,
    href: "/admin/projects/",
  },
];

function formatRelativeTime(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60_000);

  if (diffMinutes < 1) {
    return "Just now";
  }
  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }

  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function AdminDashboardPage() {
  const [metrics, activity] = await Promise.all([
    getAdminDashboardMetrics(),
    getAdminRecentActivity(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-caption uppercase tracking-widest text-amber-600">
          Overview
        </p>
        <h1 className="mt-2 font-serif text-display-3 text-ink-900">
          Dashboard
        </h1>
        <p className="mt-2 text-body-sm text-ink-800/70">
          Quote triage, content publishing, and portfolio management.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {METRIC_CARDS.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className="rounded-lg border border-ink-700/10 bg-white p-5 transition-colors hover:border-amber-500/40"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-body-sm text-ink-800/70">{card.label}</p>
                <p className="mt-2 font-serif text-display-2 text-ink-900">
                  {metrics[card.key]}
                </p>
              </div>
              <card.icon className="size-5 text-amber-600" aria-hidden />
            </div>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-lg border border-ink-700/10 bg-white p-6">
          <h2 className="font-serif text-h3 text-ink-900">Recent activity</h2>
          {activity.length === 0 ? (
            <p className="mt-4 text-body-sm text-ink-800/70">
              No recent activity yet.
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-ink-700/10">
              {activity.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="flex items-start justify-between gap-4 py-4 transition-colors hover:text-amber-600"
                  >
                    <div>
                      <p className="font-medium text-ink-900">{item.title}</p>
                      <p className="mt-1 text-body-sm text-ink-800/70">
                        {item.subtitle}
                      </p>
                    </div>
                    <time
                      dateTime={item.occurredAt.toISOString()}
                      className="shrink-0 text-body-sm text-ink-800/50"
                    >
                      {formatRelativeTime(item.occurredAt)}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-lg border border-ink-700/10 bg-white p-6">
          <h2 className="font-serif text-h3 text-ink-900">Quick actions</h2>
          <div className="mt-4 flex flex-col gap-3">
            <Button asChild>
              <Link href="/admin/projects/new/">Add new project</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/blog/new/">Write new post</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
