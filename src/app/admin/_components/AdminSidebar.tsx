"use client";

import Link from "@/components/ui/link";
import { usePathname } from "next/navigation";

import { SteepWoodLogo } from "@/components/brand/SteepWoodLogo";
import { cn } from "@/lib/utils";

import { ADMIN_NAV_ITEMS } from "./admin-nav";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-ink-700/10 bg-ink-900 text-ink-50 lg:flex lg:flex-col">
      <div className="border-b border-ink-700/20 px-5 py-6">
        <SteepWoodLogo variant="mark" className="text-ink-50" />
        <p className="mt-3 font-mono text-caption uppercase tracking-widest text-ink-50/60">
          Admin
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4" aria-label="Admin navigation">
        {ADMIN_NAV_ITEMS.map((item) => {
          const isActive =
            "exact" in item && item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-amber-500 text-ink-950"
                  : "text-ink-50/80 hover:bg-ink-800 hover:text-ink-50",
              )}
            >
              <item.icon className="size-4 shrink-0" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
