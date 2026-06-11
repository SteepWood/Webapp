"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { CookieConsent } from "@/components/CookieConsent";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

type AnalyticsShellProps = {
  ga4Id?: string;
};

export function AnalyticsShell({ ga4Id }: AnalyticsShellProps) {
  return (
    <>
      <GoogleAnalytics measurementId={ga4Id} />
      <Analytics />
      <SpeedInsights />
      <CookieConsent />
    </>
  );
}
