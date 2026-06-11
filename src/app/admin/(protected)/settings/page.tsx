import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const dynamic = "force-dynamic";

export default function AdminSettingsPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Settings"
        title="Settings"
        description="Account and integration settings will live here in a later phase."
      />

      <div className="rounded-lg border border-ink-700/10 bg-white p-6 text-body-sm text-ink-800/70">
        <p>Supabase Auth, Resend, and storage configuration are managed via environment variables and external dashboards.</p>
      </div>
    </div>
  );
}
