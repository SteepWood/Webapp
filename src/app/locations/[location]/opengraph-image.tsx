import { getLocationDefinition } from "@/lib/services-locations/locations";
import { createOgImage, OG_ALT, OG_SIZE } from "@/lib/seo/ogImage";

export const runtime = "edge";
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: slug } = await params;
  const location = getLocationDefinition(slug);

  if (!location) {
    return createOgImage({
      headline: "SteepWood",
      subtitle: "Premium Custom Joinery",
    });
  }

  return createOgImage({
    eyebrow: "SteepWood",
    headline: `Custom Joinery in ${location.name}`,
    subtitle: `${location.state} · Newcastle-crafted, Australia-wide delivery`,
    backgroundSlug: location.slug,
  });
}
