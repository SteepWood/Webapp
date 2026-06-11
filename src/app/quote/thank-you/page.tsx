import type { Metadata } from "next";
import Link from "@/components/ui/link";

import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/sections/section-shell";
import { canonicalUrl } from "@/lib/seo/canonical";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Thank You — SteepWood",
  description:
    "Your quote request has been received. Our team will be in touch within one business day.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: canonicalUrl("/quote/thank-you/"),
  },
};

const NEXT_STEPS = [
  "We review your project details and any photos you've shared.",
  "A SteepWood team member contacts you to confirm scope and timing.",
  "We arrange a free in-home measure at a time that suits you.",
  "You receive a fixed-price quote — no obligation to proceed.",
] as const;

type ThankYouPageProps = {
  searchParams: Promise<{
    ref?: string;
    name?: string;
  }>;
};

function formatReference(ref?: string): string | null {
  if (!ref) {
    return null;
  }

  return ref.replace(/-/g, "").slice(0, 8).toUpperCase();
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const { ref, name } = await searchParams;
  const reference = formatReference(ref);
  const greetingName = name?.trim() || "there";

  return (
    <SectionShell>
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-stack-sm font-mono text-caption uppercase tracking-widest text-amber-600">
          Request received
        </p>
        <h1 className="mb-stack-md font-serif text-display-2 text-ink-900">
          Thank you, {greetingName}
        </h1>
        <p className="mb-stack-lg text-body-lg text-ink-800/80">
          We&apos;ve received your request. Our team will be in touch within 1
          business day.
        </p>

        {reference ? (
          <p className="mb-stack-xl rounded-lg border border-ink-700/10 bg-ink-50 px-6 py-4 font-mono text-body-sm text-ink-900">
            Quote reference:{" "}
            <span className="font-semibold tracking-wider">{reference}</span>
          </p>
        ) : null}

        <div className="mb-stack-xl rounded-lg border border-ink-700/10 bg-ink-50 p-6 text-left">
          <h2 className="mb-stack-md font-serif text-h4 text-ink-900">
            What happens next
          </h2>
          <ol className="list-decimal space-y-3 pl-5 text-body text-ink-800/90">
            {NEXT_STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/portfolio/">View our work</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/blog/">Read project stories</Link>
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
