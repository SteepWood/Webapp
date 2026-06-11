import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { ViewTransitions } from "next-view-transitions";

import { AnalyticsShell } from "@/components/analytics/AnalyticsShell";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { Providers } from "@/components/providers";
import { env } from "@/env";
import { fraunces, generalSans, ibmPlexMono } from "@/lib/fonts";
import { rootStructuredData } from "@/lib/seo/structuredData";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "SteepWood — Premium Custom Joinery",
    template: "%s | SteepWood",
  },
  description:
    "Premium custom joinery from our Newcastle workshop. Kitchens, wardrobes, vanities, and commercial fitouts across Australia.",
  openGraph: {
    siteName: "SteepWood",
    locale: "en_AU",
    type: "website",
  },
  icons: {
    icon: [{ url: "/brand/steepwood-favicon.png", type: "image/png" }],
    apple: [{ url: "/brand/steepwood-favicon.png", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      suppressHydrationWarning
      className={`${fraunces.variable} ${generalSans.variable} ${ibmPlexMono.variable} scroll-smooth h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ViewTransitions>
          <Providers>
            <SiteChrome>{children}</SiteChrome>
            <AnalyticsShell ga4Id={env.NEXT_PUBLIC_GA4_ID} />
          </Providers>
        </ViewTransitions>
        <Script
          id="root-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(rootStructuredData()),
          }}
        />
      </body>
    </html>
  );
}
