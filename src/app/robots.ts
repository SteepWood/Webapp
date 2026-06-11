import type { MetadataRoute } from "next";

import { env } from "@/env";

const SITE_URL = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/", "/auth/"],
      },
      // Block AI scrapers that don't respect content licensing
      // (uncomment if user wants to block these)
      // {
      //   userAgent: "GPTBot",
      //   disallow: "/",
      // },
      // {
      //   userAgent: "CCBot",
      //   disallow: "/",
      // },
      // {
      //   userAgent: "anthropic-ai",
      //   disallow: "/",
      // },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
