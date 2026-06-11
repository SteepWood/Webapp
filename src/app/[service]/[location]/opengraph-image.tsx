import { getLocationDefinition } from "@/lib/services-locations/locations";
import { getServiceDefinition } from "@/lib/services-locations/services";
import { createOgImage, OG_ALT, OG_SIZE } from "@/lib/seo/ogImage";

export const runtime = "edge";
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ service: string; location: string }>;
}) {
  const { service: serviceSlug, location: locationSlug } = await params;
  const service = getServiceDefinition(serviceSlug);
  const location = getLocationDefinition(locationSlug);

  if (!service || !location) {
    return createOgImage({
      headline: "SteepWood",
      subtitle: "Premium Custom Joinery",
    });
  }

  return createOgImage({
    eyebrow: "SteepWood",
    headline: `${service.name} in ${location.name}`,
    subtitle: service.shortDescription,
    backgroundSlug: service.slug,
  });
}
