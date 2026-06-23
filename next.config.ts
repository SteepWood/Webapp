import type { NextConfig } from "next";

/** Keep in sync with RETIRED_BLOG_SLUG_MAP in src/lib/blog/launchPack.ts */
const RETIRED_BLOG_REDIRECTS: Record<string, string> = {
  "kitchen-storage-planning-australia":
    "walk-in-robe-built-in-wardrobe-cost-guide-nsw",
  "joinery-materials-guide-2pac-timber":
    "benchtop-guide-engineered-stone-ban-nsw",
  "australian-home-joinery-trends-2026": "flat-pack-vs-custom-kitchen-australia",
};

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.supabase.co https://*.googletagmanager.com https://www.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://*.vercel-analytics.com https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "frame-src 'self' https://www.google.com https://www.youtube.com",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // Supabase transaction pooler allows one connection per Prisma client.
    staticGenerationMaxConcurrency: 1,
  },
  async redirects() {
    const retiredBlogRedirects = Object.entries(RETIRED_BLOG_REDIRECTS).flatMap(
      ([slug, destination]) => [
        {
          source: `/blog/${slug}`,
          destination: `/blog/${destination}/`,
          permanent: true,
        },
        {
          source: `/blog/${slug}/`,
          destination: `/blog/${destination}/`,
          permanent: true,
        },
      ],
    );

    return [
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "www.steepwood.com.au" }],
        destination: "https://steepwood.com.au/:path*",
        permanent: true,
      },
      ...retiredBlogRedirects,
      {
        source: "/custom-joinery/:location",
        destination: "/locations/:location/",
        permanent: true,
      },
      {
        source: "/custom-joinery/:location/",
        destination: "/locations/:location/",
        permanent: true,
      },
      {
        source: "/bathroom-vanity-joinery",
        destination: "/custom-bathroom-vanity/",
        permanent: true,
      },
      {
        source: "/bathroom-vanity-joinery/",
        destination: "/custom-bathroom-vanity/",
        permanent: true,
      },
      {
        source: "/shopfitting-retail-joinery",
        destination: "/shopfitting/",
        permanent: true,
      },
      {
        source: "/shopfitting-retail-joinery/",
        destination: "/shopfitting/",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "/legal/privacy/",
        permanent: true,
      },
      {
        source: "/privacy/",
        destination: "/legal/privacy/",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "/legal/terms/",
        permanent: true,
      },
      {
        source: "/terms/",
        destination: "/legal/terms/",
        permanent: true,
      },
      {
        source: "/australian-consumer-law",
        destination: "/legal/consumer-rights/",
        permanent: true,
      },
      {
        source: "/australian-consumer-law/",
        destination: "/legal/consumer-rights/",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    localPatterns: [
      {
        pathname: "/images/**",
        search: "",
      },
      {
        pathname: "/blog/**",
        search: "",
      },
      {
        pathname: "/images/portfolio/**",
        search: "?v=20250619",
      },
      {
        pathname: "/brand/**",
        search: "",
      },
      {
        pathname: "/badges/**",
        search: "",
      },
      {
        pathname: "/og-default.jpg",
        search: "",
      },
      {
        pathname: "/og/**",
        search: "",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          ...securityHeaders,
          {
            key: "Content-Security-Policy",
            value: cspDirectives.join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
