import type { Metadata } from "next";

import { QuoteFormShell } from "@/components/forms/quote/QuoteFormShell";
import { QuotePageIntro } from "@/components/pages/QuotePageIntro";
import { SectionShell } from "@/components/sections/section-shell";
import { canonicalUrl } from "@/lib/seo/canonical";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Get a Free Measure & Quote — SteepWood",
  description:
    "Request a free in-home measure and fixed-price quote for custom joinery. Tell us about your project in three quick steps.",
  alternates: {
    canonical: canonicalUrl("/quote/"),
    languages: {
      "en-AU": canonicalUrl("/quote/"),
    },
  },
  openGraph: {
    title: "Get a Free Measure & Quote — SteepWood",
    description:
      "Request a free in-home measure and fixed-price quote for custom joinery. Tell us about your project in three quick steps.",
    url: canonicalUrl("/quote/"),
    siteName: "SteepWood",
    locale: "en_AU",
    type: "website",
  },
};

export default function QuotePage() {
  return (
    <>
      <SectionShell>
        <div className="mx-auto max-w-3xl">
          <header className="mb-stack-lg text-center md:text-left">
            <p className="mb-stack-sm font-mono text-caption uppercase tracking-widest text-amber-600">
              Free &amp; no obligation
            </p>
            <h1 className="mb-stack-sm font-serif text-display-2 text-ink-900">
              Get a Free Measure &amp; Quote
            </h1>
          <p className="mb-stack-sm max-w-xl text-body-lg text-ink-800">
            Tell us about your project in three quick steps. Most quotes are
            returned within 5 working days of measurement. You can save progress
            and return later — your enquiry is stored securely until you submit
            the final step.
          </p>
          </header>

          <QuoteFormShell />
        </div>
      </SectionShell>

      <QuotePageIntro />
    </>
  );
}
