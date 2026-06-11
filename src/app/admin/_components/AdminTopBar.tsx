import { LogOut } from "lucide-react";

import { adminSignOut } from "@/app/actions/admin-auth";
import { Button } from "@/components/ui/button";

import { AdminMobileNav } from "./AdminMobileNav";

type AdminTopBarProps = {
  email: string;
};

export function AdminTopBar({ email }: AdminTopBarProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-700/10 bg-ink-50 px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <AdminMobileNav />
        <div className="min-w-0">
          <p className="font-mono text-caption uppercase tracking-widest text-amber-600">
            SteepWood Admin
          </p>
          <p className="truncate text-body-sm text-ink-800/70">{email}</p>
        </div>
      </div>

      <form action={adminSignOut}>
        <Button type="submit" variant="outline" size="sm">
          <LogOut className="size-4" aria-hidden />
          Sign out
        </Button>
      </form>
    </header>
  );
}
