/* TODO: Lawyer-reviewed copy required — soft launch approved; review booked next month. */

import type { Metadata } from "next";
import Link from "@/components/ui/link";

import { LegalBreadcrumbs } from "@/components/legal/LegalBreadcrumbs";
import { BUSINESS_LEGAL_NAME } from "@/lib/business";
import { canonicalUrl } from "@/lib/seo/canonical";

export const revalidate = 86400;

const LAST_UPDATED = "9 June 2026";

export const metadata: Metadata = {
  title: "Terms of Service — SteepWood Joinery",
  description:
    "Terms governing use of the SteepWood website, quotes, intellectual property, and joinery services. Governed by the laws of New South Wales, Australia.",
  alternates: {
    canonical: canonicalUrl("/legal/terms/"),
    languages: {
      "en-AU": canonicalUrl("/legal/terms/"),
    },
  },
  openGraph: {
    title: "Terms of Service — SteepWood Joinery",
    description:
      "Terms governing use of the SteepWood website, quotes, intellectual property, and joinery services. Governed by the laws of New South Wales, Australia.",
    url: canonicalUrl("/legal/terms/"),
    siteName: "SteepWood",
    locale: "en_AU",
    type: "website",
  },
};

export default function TermsOfServicePage() {
  return (
    <article>
      <LegalBreadcrumbs currentPage="Terms of Service" />

      <header className="mb-stack-lg">
        <h1 className="mb-stack-sm font-serif text-display-2 text-ink-900">
          Terms of Service
        </h1>
        <p className="text-body-sm text-ink-800/70">
          Last updated: {LAST_UPDATED}
        </p>
      </header>

      <div className="space-y-stack-lg text-body-lg text-ink-800/90">
        <section id="use-of-website">
          <h2 className="mb-stack-sm font-serif text-h3 text-ink-900">
            Use of website
          </h2>
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your access to and use of
            the SteepWood website (steepwood.com.au) and related online services
            operated by {BUSINESS_LEGAL_NAME} (&quot;SteepWood&quot;, &quot;we&quot;,
            &quot;us&quot;, or &quot;our&quot;).
          </p>
          <p>
            By accessing or using our website, you agree to be bound by these
            Terms. If you do not agree, please do not use our website. We may
            update these Terms at any time by publishing a revised version on
            this page.
          </p>
          <p>
            You must not use our website to transmit unlawful, misleading, or
            harmful content, attempt to gain unauthorised access to our systems,
            or interfere with the proper functioning of the site.
          </p>
        </section>

        <section id="intellectual-property">
          <h2 className="mb-stack-sm font-serif text-h3 text-ink-900">
            Intellectual property
          </h2>
          <p>
            All content on this website — including text, photography, design
            drawings, logos, joinery specifications, and layout — is owned by or
            licensed to SteepWood and is protected by Australian copyright and
            trade mark law.
          </p>
          <p>
            You may view and print pages for personal, non-commercial reference.
            You must not reproduce, distribute, modify, or commercially exploit
            any content without our prior written consent.
          </p>
          <p>
            Custom joinery designs prepared by SteepWood for your project remain
            our intellectual property until full payment is received. Upon full
            payment, you receive a licence to use the design for the specified
            project only.
          </p>
        </section>

        <section id="quotes">
          <h2 className="mb-stack-sm font-serif text-h3 text-ink-900">
            Quotes and pricing
          </h2>
          <p>
            Quotes provided by SteepWood are fixed-price for the scope described
            in the quote document. Quotes are valid for{" "}
            <strong>90 days</strong> from the date of issue unless otherwise
            stated.
          </p>
          <p>
            A quote becomes a binding agreement only when both parties have
            signed a written contract or purchase order and any required deposit
            has been paid. Verbal estimates and website content are indicative
            only and do not constitute a binding offer.
          </p>
          <p>
            Prices are quoted in Australian dollars (AUD) and include GST where
            applicable.
          </p>
        </section>

        <section id="variations">
          <h2 className="mb-stack-sm font-serif text-h3 text-ink-900">
            Variations and cancellations
          </h2>
          <p>
            Changes to the agreed scope of work after a contract is signed are
            treated as variations. All variations must be agreed in writing
            before work commences, including any adjustment to price and
            timeline.
          </p>
          <p>
            If you wish to cancel a project after signing a contract, please
            contact us immediately. Cancellation fees may apply to cover design
            work, materials ordered, and production already commenced. The
            applicable cancellation terms will be set out in your project
            contract.
          </p>
          <p>
            SteepWood reserves the right to cancel or postpone a project due to
            circumstances beyond our reasonable control, including supply chain
            disruptions or safety concerns. In such cases, we will work with you
            to find a fair resolution.
          </p>
        </section>

        <section id="liability">
          <h2 className="mb-stack-sm font-serif text-h3 text-ink-900">
            Limitations of liability
          </h2>
          <p>
            To the maximum extent permitted by law, SteepWood excludes all
            liability for any loss or damage arising from your use of this
            website, including indirect, consequential, or special loss.
          </p>
          <p>
            Website content is provided for general information only. While we
            make reasonable efforts to ensure accuracy, we do not warrant that
            the website is error-free, uninterrupted, or free of viruses.
          </p>
          <p>
            Nothing in these Terms excludes, restricts, or modifies any consumer
            guarantee, right, or remedy under the Australian Consumer Law or
            other applicable legislation that cannot lawfully be excluded. See our{" "}
            <Link
              href="/legal/consumer-rights/"
              className="text-amber-600 underline-offset-2 hover:underline"
            >
              Australian Consumer Law statement
            </Link>{" "}
            for details of your statutory rights.
          </p>
        </section>

        <section id="governing-law">
          <h2 className="mb-stack-sm font-serif text-h3 text-ink-900">
            Governing law
          </h2>
          <p>
            These Terms are governed by the laws of New South Wales, Australia.
            You submit to the non-exclusive jurisdiction of the courts of New
            South Wales and the Commonwealth of Australia for any dispute
            arising from these Terms or your use of our website.
          </p>
        </section>

        <section id="contact">
          <h2 className="mb-stack-sm font-serif text-h3 text-ink-900">
            Contact
          </h2>
          <p>
            Questions about these Terms? Email{" "}
            <a
              href="mailto:hello@steepwood.com.au"
              className="text-amber-600 underline-offset-2 hover:underline"
            >
              hello@steepwood.com.au
            </a>{" "}
            or call us during business hours. See our{" "}
            <Link
              href="/contact/"
              className="text-amber-600 underline-offset-2 hover:underline"
            >
              contact page
            </Link>{" "}
            for full details.
          </p>
        </section>
      </div>

      <p className="mt-stack-lg text-body-sm text-ink-800/60">
        See also:{" "}
        <Link
          href="/legal/privacy/"
          className="text-amber-600 underline-offset-2 hover:underline"
        >
          Privacy Policy
        </Link>{" "}
        ·{" "}
        <Link
          href="/legal/consumer-rights/"
          className="text-amber-600 underline-offset-2 hover:underline"
        >
          Australian Consumer Law
        </Link>
      </p>
    </article>
  );
}
