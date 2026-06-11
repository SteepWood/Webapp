import { createOgImage, OG_ALT, OG_SIZE } from "@/lib/seo/ogImage";

export const runtime = "edge";
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return createOgImage({
    eyebrow: "SteepWood",
    headline: "Contact SteepWood",
    subtitle: "Free design consultation across 16 Australian cities",
  });
}
