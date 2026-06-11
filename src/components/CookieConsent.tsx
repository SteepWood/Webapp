"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentValue,
} from "@/lib/analytics/consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readCookieConsent() === null);
  }, []);

  function handleChoice(value: CookieConsentValue) {
    writeCookieConsent(value);
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-lg border border-ink-700/10 bg-ink-900 p-5 text-ink-50 shadow-lg md:inset-x-8"
    >
      <p
        id="cookie-consent-title"
        className="font-serif text-h4 text-ink-50"
      >
        Cookies &amp; analytics
      </p>
      <p
        id="cookie-consent-description"
        className="mt-2 text-body-sm text-ink-50/80"
      >
        We use optional analytics cookies to understand how visitors use our
        site. You can accept or decline — essential site functions still work
        either way.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button type="button" size="sm" onClick={() => handleChoice("accepted")}>
          Accept
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="border-ink-50/30 text-ink-50 hover:bg-ink-800"
          onClick={() => handleChoice("declined")}
        >
          Decline
        </Button>
      </div>
    </div>
  );
}
