import type { MetadataRoute } from "next";

import { env } from "@/env";

const SITE_URL = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");

const AI_BOTS_ALLOW = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "ClaudeBot",
  "anthropic-ai",
  "Applebot-Extended",
  "cohere-ai",
  "CCBot",
  "Amazonbot",
] as const;

const ADMIN_DISALLOW = ["/admin/", "/api/", "/_next/", "/auth/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ADMIN_DISALLOW,
      },
      ...AI_BOTS_ALLOW.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ADMIN_DISALLOW,
      })),
      {
        userAgent: "Bytespider",
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
