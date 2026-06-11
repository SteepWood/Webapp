import { createOgImage, OG_ALT, OG_SIZE } from "@/lib/seo/ogImage";

export const runtime = "edge";
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return createOgImage({
    headline: "SteepWood",
    subtitle: "Custom Joinery, Newcastle to Australia",
  });
}
