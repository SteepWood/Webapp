/* TODO: Lawyer-reviewed copy required before public launch. */

import type { Metadata } from "next";
import Link from "@/components/ui/link";

import { LegalBreadcrumbs } from "@/components/legal/LegalBreadcrumbs";
import { canonicalUrl } from "@/lib/seo/canonical";

export const revalidate = 86400;

const LAST_UPDATED = "9 June 2026";

export const metadata: Metadata = {
  title: "Privacy Policy — SteepWood Joinery",
  description:
    "How SteepWood collects, uses, stores, and protects your personal information under the Privacy Act 1988 and Australian Privacy Principles.",
  alternates: {
    canonical: canonicalUrl("/legal/privacy/"),
    languages: {
      "en-AU": canonicalUrl("/legal/privacy/"),
    },
  },
  openGraph: {
    title: "Privacy Policy — SteepWood Joinery",
    description:
      "How SteepWood collects, uses, stores, and protects your personal information under the Privacy Act 1988 and Australian Privacy Principles.",
    url: canonicalUrl("/legal/privacy/"),
    siteName: "SteepWood",
    locale: "en_AU",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <article>
      <LegalBreadcrumbs currentPage="Privacy Policy" />

      <header className="mb-stack-lg">
        <h1 className="mb-stack-sm font-serif text-display-2 text-ink-900">
          Privacy Policy
        </h1>
        <p className="text-body-sm text-ink-800/70">
          Last updated: {LAST_UPDATED}
        </p>
      </header>

      <div className="space-y-stack-lg text-body-lg text-ink-800/90">
        <section id="introduction">
          <h2 className="mb-stack-sm font-serif text-h3 text-ink-900">
            Introduction
          </h2>
          <p>
            SteepWood Joinery Pty Ltd (ABN 00 000 000 000) (&quot;SteepWood&quot;,
            &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose,
            and store personal information in accordance with the{" "}
            <em>Privacy Act 1988</em> (Cth) and the Australian Privacy Principles
            (APPs).
          </p>
          <p>
            By using our website at steepwood.com.au, submitting an enquiry, or
            engaging our joinery services, you agree to the practices described
            in this policy.
          </p>
        </section>

        <section id="information-we-collect">
          <h2 className="mb-stack-sm font-serif text-h3 text-ink-900">
            Information we collect
          </h2>
          <p>We may collect the following types of personal information:</p>
          <ul className="mt-stack-sm list-disc space-y-2 pl-6">
            <li>
              <strong>Contact details</strong> — name, email address, phone
              number, and suburb or city, provided via our contact form, quote
              request form, or direct correspondence.
            </li>
            <li>
              <strong>Project enquiry information</strong> — details about your
              joinery project, including service type, budget range, timeline,
              property address, and any notes or files you choose to upload.
            </li>
            <li>
              <strong>Technical information</strong> — IP address, browser type,
              device identifiers, referring URLs, and pages visited, collected
              automatically when you use our website.
            </li>
            <li>
              <strong>Cookies and analytics data</strong> — see the Cookies and
              analytics section below.
            </li>
          </ul>
          <p className="mt-stack-sm">
            We only collect personal information that is reasonably necessary for
            our functions and activities.
          </p>
        </section>

        <section id="why-we-collect">
          <h2 className="mb-stack-sm font-serif text-h3 text-ink-900">
            Why we collect your information
          </h2>
          <p>We collect and use personal information to:</p>
          <ul className="mt-stack-sm list-disc space-y-2 pl-6">
            <li>Respond to enquiries and provide quotes and design consultations.</li>
            <li>Deliver joinery design, manufacture, and installation services.</li>
            <li>Communicate with you about your project, including scheduling and variations.</li>
            <li>
              Send marketing communications where you have opted in — you may
              unsubscribe at any time.
            </li>
            <li>Improve our website, services, and customer experience.</li>
            <li>Comply with legal and regulatory obligations.</li>
          </ul>
        </section>

        <section id="storage">
          <h2 className="mb-stack-sm font-serif text-h3 text-ink-900">
            How we store and protect your information
          </h2>
          <p>
            Personal information is stored in Supabase (PostgreSQL), hosted in the
            Australian region (Sydney). Data is encrypted at rest and in transit
            using industry-standard TLS and AES-256 encryption.
          </p>
          <p>
            Uploaded project files (such as plans and inspiration images) are
            stored in Supabase Storage with access restricted to authorised
            SteepWood staff only.
          </p>
          <p>
            We take reasonable steps to protect personal information from misuse,
            interference, loss, unauthorised access, modification, or disclosure.
            Access is limited to employees and contractors who need the
            information to perform their role.
          </p>
        </section>

        <section id="disclosure">
          <h2 className="mb-stack-sm font-serif text-h3 text-ink-900">
            Disclosure of personal information
          </h2>
          <p>
            We do not sell, rent, or trade your personal information to third
            parties.
          </p>
          <p>We may disclose personal information only to:</p>
          <ul className="mt-stack-sm list-disc space-y-2 pl-6">
            <li>
              Subcontractors and tradespeople involved in delivering your project
              (for example, installers, electricians, or stone suppliers), and
              only to the extent necessary.
            </li>
            <li>
              Service providers who assist us to operate our business (for
              example, email delivery via Resend, analytics providers), subject
              to confidentiality obligations.
            </li>
            <li>
              Government authorities where required or authorised by law.
            </li>
          </ul>
          <p className="mt-stack-sm">
            We do not disclose personal information to overseas recipients unless
            you have consented or we are otherwise permitted under the APPs.
          </p>
        </section>

        <section id="access-correction">
          <h2 className="mb-stack-sm font-serif text-h3 text-ink-900">
            Access and correction
          </h2>
          <p>
            You have the right to request access to the personal information we
            hold about you and to request correction if it is inaccurate,
            out-of-date, incomplete, irrelevant, or misleading.
          </p>
          <p>
            To make a request, email{" "}
            <a
              href="mailto:hello@steepwood.com.au"
              className="text-amber-600 underline-offset-2 hover:underline"
            >
              hello@steepwood.com.au
            </a>{" "}
            with the subject line &quot;Privacy access request&quot;. We will respond
            within 30 days.
          </p>
        </section>

        <section id="complaints">
          <h2 className="mb-stack-sm font-serif text-h3 text-ink-900">
            Complaints
          </h2>
          <p>
            If you believe we have breached the Australian Privacy Principles or
            mishandled your personal information, please contact us first at{" "}
            <a
              href="mailto:hello@steepwood.com.au"
              className="text-amber-600 underline-offset-2 hover:underline"
            >
              hello@steepwood.com.au
            </a>
            . We will investigate and respond within 30 days.
          </p>
          <p>
            If you are not satisfied with our response, you may lodge a complaint
            with the Office of the Australian Information Commissioner (OAIC) at{" "}
            <a
              href="https://www.oaic.gov.au/"
              className="text-amber-600 underline-offset-2 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              oaic.gov.au
            </a>
            .
          </p>
        </section>

        <section id="cookies">
          <h2 className="mb-stack-sm font-serif text-h3 text-ink-900">
            Cookies and analytics
          </h2>
          <p>Our website uses the following analytics and tracking tools:</p>
          <ul className="mt-stack-sm list-disc space-y-2 pl-6">
            <li>
              <strong>Google Analytics 4 (GA4)</strong> — collects anonymised
              usage data including pages visited, session duration, and traffic
              sources. You can opt out by installing the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                className="text-amber-600 underline-offset-2 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Google Analytics Opt-out Browser Add-on
              </a>{" "}
              or adjusting your browser cookie settings.
            </li>
            <li>
              <strong>Vercel Analytics</strong> — collects anonymised performance
              and page-view data to help us monitor site speed and reliability.
              No personally identifiable information is collected by Vercel
              Analytics.
            </li>
          </ul>
          <p className="mt-stack-sm">
            You can disable cookies in your browser settings, though some website
            features may not function correctly as a result.
          </p>
        </section>

        <section id="changes">
          <h2 className="mb-stack-sm font-serif text-h3 text-ink-900">
            Changes to this policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. The &quot;Last
            updated&quot; date at the top of this page will reflect any changes.
            Continued use of our website after changes are published constitutes
            your acceptance of the updated policy.
          </p>
        </section>

        <section id="contact">
          <h2 className="mb-stack-sm font-serif text-h3 text-ink-900">
            Contact us
          </h2>
          <p>
            For privacy-related enquiries, contact our Privacy Officer at{" "}
            <a
              href="mailto:hello@steepwood.com.au"
              className="text-amber-600 underline-offset-2 hover:underline"
            >
              hello@steepwood.com.au
            </a>{" "}
            or write to SteepWood Joinery Pty Ltd, Newcastle NSW 2300,
            Australia.
          </p>
        </section>
      </div>

      <p className="mt-stack-lg text-body-sm text-ink-800/60">
        See also:{" "}
        <Link
          href="/legal/terms/"
          className="text-amber-600 underline-offset-2 hover:underline"
        >
          Terms of Service
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
