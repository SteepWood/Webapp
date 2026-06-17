import { createOgImage, OG_ALT, OG_SIZE } from "@/lib/seo/ogImage";
import { FOUNDING_YEAR } from "@/lib/business";

export const runtime = "edge";
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return createOgImage({
    eyebrow: "SteepWood",
    headline: "About SteepWood",
    subtitle: `Newcastle joinery craftsmanship since ${FOUNDING_YEAR}`,
  });
}
