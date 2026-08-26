"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";

import {
  COOKIE_CONSENT_EVENT,
  readCookieConsent,
} from "@/lib/analytics/consent";

type GoogleAnalyticsProps = {
  measurementId?: string;
};

function subscribeConsent(onStoreChange: () => void) {
  window.addEventListener(COOKIE_CONSENT_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(COOKIE_CONSENT_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const consent = useSyncExternalStore(
    subscribeConsent,
    readCookieConsent,
    () => null,
  );

  if (!measurementId || consent !== "accepted") {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', { send_page_view: true });
        `}
      </Script>
    </>
  );
}
