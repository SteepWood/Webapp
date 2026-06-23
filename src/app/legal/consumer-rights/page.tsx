/* TODO: Lawyer-reviewed copy required — soft launch approved; review booked next month. */

import type { Metadata } from "next";
import Link from "@/components/ui/link";

import { LegalBreadcrumbs } from "@/components/legal/LegalBreadcrumbs";
import { BUSINESS_LEGAL_NAME } from "@/lib/business";
import { PHONE_DISPLAY, PHONE_HOURS_LABEL } from "@/lib/navigation";
import { canonicalUrl } from "@/lib/seo/canonical";

export const revalidate = 86400;

const LAST_UPDATED = "9 June 2026";

export const metadata: Metadata = {
  title: "Australian Consumer Law",
  description:
    "Your rights under the Australian Consumer Law, including consumer guarantees, SteepWood warranties, and repair, replacement, or refund entitlements.",
  alternates: {
    canonical: canonicalUrl("/legal/consumer-rights/"),
    languages: {
      "en-AU": canonicalUrl("/legal/consumer-rights/"),
    },
  },
  openGraph: {
    title: "Australian Consumer Law",
    description:
      "Your rights under the Australian Consumer Law, including consumer guarantees, SteepWood warranties, and repair, replacement, or refund entitlements.",
    url: canonicalUrl("/legal/consumer-rights/"),
    siteName: "SteepWood",
    locale: "en_AU",
    type: "website",
  },
};

export default function ConsumerRightsPage() {
  return (
    <article>
      <LegalBreadcrumbs currentPage="Australian Consumer Law" />

      <header className="mb-stack-lg">
        <h1 className="mb-stack-sm font-serif text-display-2 text-ink-900">
          Australian Consumer Law
        </h1>
        <p className="text-body-sm text-ink-800/70">
          Last updated: {LAST_UPDATED}
        </p>
      </header>

      <div className="space-y-stack-lg text-body-lg text-ink-800/90">
        <section id="consumer-guarantees">
          <h2 className="mb-stack-sm font-serif text-h3 text-ink-900">
            Consumer guarantees
          </h2>
          <p>
            Our goods and services come with guarantees that cannot be excluded
            under the Australian Consumer Law. For major failures with the
            service, you are entitled to cancel your service contract and obtain
            a refund. For major failures with goods, you are entitled to a
            replacement or refund, and compensation for any other reasonably
            foreseeable loss or damage.
          </p>
          <p>
            You are also entitled to have goods repaired or replaced if the
            goods fail to be of acceptable quality and the failure does not
            amount to a major failure. If the failure is minor, we may choose to
            repair rather than replace or refund.
          </p>
          <p>
            Consumer guarantees under the{" "}
            <em>Competition and Consumer Act 2010</em> (Cth) apply to joinery
            goods and installation services supplied by {BUSINESS_LEGAL_NAME}
            to consumers within Australia. For more information, visit the{" "}
            <a
              href="https://www.accc.gov.au/consumers/consumer-rights-guarantees"
              className="text-amber-600 underline-offset-2 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              ACCC consumer rights page
            </a>
            .
          </p>
        </section>

        <section id="warranties">
          <h2 className="mb-stack-sm font-serif text-h3 text-ink-900">
            Our warranties
          </h2>
          <p>
            In addition to your rights under the Australian Consumer Law,
            SteepWood provides the following express warranties on our custom
            joinery products:
          </p>
          <ul className="mt-stack-sm list-disc space-y-2 pl-6">
            <li>
              <strong>Lifetime craftsmanship warranty</strong> — covers defects
              in workmanship in our Newcastle workshop for the life of the
              product, provided it has been used and maintained as intended.
            </li>
            <li>
              <strong>10-year structural warranty</strong> — covers structural
              integrity of cabinets, carcasses, and fixed joinery elements
              against failure under normal residential or commercial use.
            </li>
            <li>
              <strong>Hardware warranty</strong> — Blum and other specified
              hardware brands are covered by their respective manufacturer
              warranties, which we pass through to you.
            </li>
          </ul>
          <p className="mt-stack-sm">
            Warranties do not cover damage caused by misuse, unauthorised
            modification, normal wear and tear, or failure to follow care
            instructions provided at handover.
          </p>
        </section>

        <section id="your-rights">
          <h2 className="mb-stack-sm font-serif text-h3 text-ink-900">
            Your rights — repair, replacement, or refund
          </h2>
          <p>
            If you believe our goods or services have not met a consumer
            guarantee, you are entitled to a remedy. Depending on whether the
            failure is major or minor, your entitlements may include:
          </p>
          <ul className="mt-stack-sm list-disc space-y-2 pl-6">
            <li>Repair of the goods or re-performance of the service.</li>
            <li>Replacement of the goods or re-supply of equivalent services.</li>
            <li>Refund of the purchase price.</li>
            <li>
              Compensation for any reasonably foreseeable loss or damage resulting
              from the failure.
            </li>
          </ul>
          <p className="mt-stack-sm">
            We will work with you in good faith to resolve any issue promptly
            and fairly, in line with ACCC guidance on consumer guarantees.
          </p>
        </section>

        <section id="make-a-claim">
          <h2 className="mb-stack-sm font-serif text-h3 text-ink-900">
            How to make a claim
          </h2>
          <p>
            To lodge a warranty or consumer guarantee claim, contact us with a
            description of the issue and photographs where possible:
          </p>
          <ul className="mt-stack-sm list-disc space-y-2 pl-6">
            <li>
              Email:{" "}
              <a
                href="mailto:hello@steepwood.com.au"
                className="text-amber-600 underline-offset-2 hover:underline"
              >
                hello@steepwood.com.au
              </a>
            </li>
            <li>Phone: {PHONE_DISPLAY} ({PHONE_HOURS_LABEL})</li>
          </ul>
          <p className="mt-stack-sm">
            We will acknowledge your claim within 2 business days and arrange an
            inspection or assessment. Most warranty repairs are completed within
            14 business days of approval, subject to parts availability.
          </p>
        </section>

        <section id="warranty-summary">
          <h2 className="mb-stack-sm font-serif text-h3 text-ink-900">
            Summary of SteepWood warranties
          </h2>
          <p>
            Our written contracts include a ten-year structural warranty on
            cabinetry we manufacture and install, plus manufacturer-backed
            hardware warranties where applicable (including Blum hinge and runner
            programmes). Finish warranties depend on the board and coating system
            specified — your quote lists the applicable product warranties.
          </p>
          <p>
            Consumer guarantees under the Australian Consumer Law apply in
            addition to any express warranty we provide. If there is a conflict
            between this page and your signed contract, the contract and
            applicable law together determine your entitlements. Retain your tax
            invoices and delivery dockets for warranty claims.
          </p>
        </section>

        <section id="dispute-resolution">
          <h2 className="mb-stack-sm font-serif text-h3 text-ink-900">
            Dispute resolution and escalation
          </h2>
          <p>
            We aim to resolve warranty and consumer issues directly and promptly.
            If you believe a product or service fails to meet a consumer
            guarantee, contact us with photos, contract references, and a clear
            description of the defect or concern. We will inspect, repair,
            replace, or refund where the Australian Consumer Law requires it.
          </p>
          <p>
            If you remain unsatisfied after our written response, you may contact
            NSW Fair Trading or the ACCC for independent guidance. Nothing on
            this page prevents you from pursuing remedies available under law.
          </p>
        </section>

        <section id="record-keeping">
          <h2 className="mb-stack-sm font-serif text-h3 text-ink-900">
            Records, photos, and evidence
          </h2>
          <p>
            We retain signed contracts, approved shop drawings, delivery dockets,
            and installation sign-off records for the life of the applicable
            warranty period. Photographs may be taken during manufacture and
            installation for quality assurance and portfolio purposes, with
            client consent where required.
          </p>
          <p>
            If you need copies of your contract or warranty documentation, email{" "}
            <a
              href="mailto:hello@steepwood.com.au"
              className="text-amber-600 underline-offset-2 hover:underline"
            >
              hello@steepwood.com.au
            </a>{" "}
            with your project address and approximate completion date. We will
            respond within five business days.
          </p>
        </section>

        <section id="further-information">
          <h2 className="mb-stack-sm font-serif text-h3 text-ink-900">
            Further information
          </h2>
          <p>
            For independent advice about your consumer rights, contact:
          </p>
          <ul className="mt-stack-sm list-disc space-y-2 pl-6">
            <li>
              <a
                href="https://www.accc.gov.au/"
                className="text-amber-600 underline-offset-2 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Australian Competition and Consumer Commission (ACCC)
              </a>{" "}
              — accc.gov.au
            </li>
            <li>
              <a
                href="https://www.fairtrading.nsw.gov.au/"
                className="text-amber-600 underline-offset-2 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                NSW Fair Trading
              </a>{" "}
              — fairtrading.nsw.gov.au
            </li>
          </ul>
          <p className="mt-stack-sm">
            Nothing on this page limits your rights under the Australian Consumer
            Law. Where our express warranties offer more than the statutory
            minimum, you are entitled to the benefit of whichever provides the
            greater protection.
          </p>
          <p className="mt-stack-sm">
            If you are not satisfied with our response to a warranty or consumer
            claim, you may escalate the matter to NSW Fair Trading or the ACCC.
            Keep photos, contracts, and correspondence so assessors can review
            the facts quickly.
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
          href="/legal/terms/"
          className="text-amber-600 underline-offset-2 hover:underline"
        >
          Terms of Service
        </Link>
      </p>
    </article>
  );
}
