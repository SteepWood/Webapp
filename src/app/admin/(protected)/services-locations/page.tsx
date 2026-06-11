import Link from "@/components/ui/link";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Badge } from "@/components/ui/badge";
import { listServiceLocationCombos } from "@/lib/db/admin-crud";

export const dynamic = "force-dynamic";

export default async function AdminServiceLocationsPage() {
  const combos = await listServiceLocationCombos();

  return (
    <div>
      <AdminPageHeader
        eyebrow="Content"
        title="Services & locations"
        description="Override custom intros for priority service + location combinations."
      />

      <div className="overflow-hidden rounded-lg border border-ink-700/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink-700/10 bg-ink-50">
            <tr>
              <th className="px-4 py-3 font-medium text-ink-800/70">Service</th>
              <th className="px-4 py-3 font-medium text-ink-800/70">Location</th>
              <th className="px-4 py-3 font-medium text-ink-800/70">Custom intro</th>
              <th className="px-4 py-3 font-medium text-ink-800/70">Status</th>
              <th className="px-4 py-3 font-medium text-ink-800/70" />
            </tr>
          </thead>
          <tbody>
            {combos.map((combo) => (
              <tr
                key={`${combo.serviceSlug}-${combo.locationSlug}`}
                className="border-b border-ink-700/5 last:border-b-0"
              >
                <td className="px-4 py-3">{combo.serviceName}</td>
                <td className="px-4 py-3">{combo.locationName}</td>
                <td className="px-4 py-3">
                  {combo.hasCustomIntro ? (
                    <Badge variant="secondary">Custom</Badge>
                  ) : (
                    <span className="text-ink-800/50">Default</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Badge variant="secondary">
                    {combo.isPublished ? "published" : "draft"}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/services-locations/${combo.serviceSlug}/${combo.locationSlug}/`}
                    className="font-medium text-amber-600 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
