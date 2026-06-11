import Link from "@/components/ui/link";
import { notFound } from "next/navigation";

import { ServiceLocationIntroForm } from "@/components/admin/ServiceLocationIntroForm";
import { getServiceLocationCombo } from "@/lib/db/admin-crud";
import { getLocationDefinition } from "@/lib/services-locations/locations";
import { getServiceDefinition } from "@/lib/services-locations/services";

export const dynamic = "force-dynamic";

type ServiceLocationEditPageProps = {
  params: Promise<{ service: string; location: string }>;
};

export default async function AdminServiceLocationEditPage({
  params,
}: ServiceLocationEditPageProps) {
  const { service: serviceSlug, location: locationSlug } = await params;
  const service = getServiceDefinition(serviceSlug);
  const location = getLocationDefinition(locationSlug);

  if (!service || !location) {
    notFound();
  }

  const row = await getServiceLocationCombo(serviceSlug, locationSlug);

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/services-locations/"
          className="text-body-sm text-amber-600 hover:underline"
        >
          ← Back to services & locations
        </Link>
        <h1 className="mt-4 font-serif text-display-3 text-ink-900">
          {service.shortTitle} · {location.name}
        </h1>
        <p className="mt-2 text-body-sm text-ink-800/70">
          Public URL: /{serviceSlug}/{locationSlug}/
        </p>
      </div>

      <ServiceLocationIntroForm
        serviceSlug={serviceSlug}
        locationSlug={locationSlug}
        serviceName={service.name}
        locationName={location.name}
        initial={{
          intro: row?.intro ?? "",
          h1: row?.h1 ?? "",
          bodyContent: row?.bodyContent ?? "",
          metaTitle: row?.metaTitle ?? "",
          metaDescription: row?.metaDescription ?? "",
          isPublished: row?.isPublished ?? true,
        }}
      />
    </div>
  );
}
