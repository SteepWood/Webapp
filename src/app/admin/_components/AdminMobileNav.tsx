"use client";

import Link from "@/components/ui/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SteepWoodLogo } from "@/components/brand/SteepWoodLogo";
import { cn } from "@/lib/utils";

import { ADMIN_NAV_ITEMS } from "./admin-nav";

export function AdminMobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="lg:hidden"
          aria-label="Open admin menu"
        >
          <Menu className="size-4" aria-hidden />
          Menu
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-xs bg-ink-900 text-ink-50">
        <SheetHeader>
          <SheetTitle className="sr-only">Admin navigation</SheetTitle>
          <SteepWoodLogo variant="mark" theme="dark" className="text-ink-50" />
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-1" aria-label="Admin navigation">
          {ADMIN_NAV_ITEMS.map((item) => {
            const isActive =
              "exact" in item && item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-wood-texture text-on-wood shadow-sm"
                    : "text-ink-50/80 hover:bg-ink-800 hover:text-ink-50",
                )}
              >
                <item.icon className="size-4 shrink-0" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
