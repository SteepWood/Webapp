import { requireAdminUser } from "@/lib/auth/admin";

import { AdminSidebar } from "../_components/AdminSidebar";
import { AdminTopBar } from "../_components/AdminTopBar";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdminUser();

  return (
    <div className="flex min-h-screen bg-ink-50 text-ink-900">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopBar email={user.email ?? ""} />
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
