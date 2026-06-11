import { getServiceDefinition } from "@/lib/services-locations/services";
import { createOgImage, OG_ALT, OG_SIZE } from "@/lib/seo/ogImage";

export const runtime = "edge";
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: slug } = await params;
  const service = getServiceDefinition(slug);

  if (!service) {
    return createOgImage({
      headline: "SteepWood",
      subtitle: "Premium Custom Joinery",
    });
  }

  return createOgImage({
    eyebrow: "SteepWood",
    headline: service.name,
    subtitle: service.shortDescription,
    backgroundSlug: service.slug,
  });
}
