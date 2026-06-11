import Link from "@/components/ui/link";

import { ProjectForm } from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

export default function AdminProjectNewPage() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/projects/"
          className="text-body-sm text-amber-600 hover:underline"
        >
          ← Back to projects
        </Link>
        <h1 className="mt-4 font-serif text-display-3 text-ink-900">
          New project
        </h1>
      </div>

      <ProjectForm />
    </div>
  );
}
