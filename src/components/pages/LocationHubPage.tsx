import Link from "@/components/ui/link";

import { AnswerFirst } from "@/components/aio/AnswerFirst";
import { FactsBlock } from "@/components/aio/FactsBlock";
import { IdentityBlock } from "@/components/aio/IdentityBlock";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { MediaFrame } from "@/components/ui/media-frame";
import { SectionShell, contentSubheadingClass } from "@/components/sections/section-shell";
import { ServicePillarFAQ } from "@/components/pages/ServicePillarFAQ";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { PageClosingCta } from "@/components/sections/dark-cta-section";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/services-locations/services";
import type { LocationHubContent } from "@/lib/services-locations/locationContent";
import { getNearbyLocations } from "@/lib/services-locations/locationContent";
import type { ResolvedLocation } from "@/lib/services-locations/types";
import type { PortfolioProject, Testimonial } from "@prisma/client";
import { canonicalUrl } from "@/lib/seo/canonical";
import {
  locationBreadcrumbStructuredData,
  locationFaqStructuredData,
  locationHubStructuredData,
} from "@/lib/seo/locationStructuredData";
import type { AggregateRatingStats } from "@/lib/testimonials/aggregateRating";
import { getLocationIntroPrefix } from "@/lib/aio/answer-first-data";
import { getLocationFacts } from "@/lib/aio/facts-data";
import {
  placeStructuredData,
  speakableStructuredData,
} from "@/lib/aio/schema";

type LocationHubPageProps = {
  location: ResolvedLocation;
  content: LocationHubContent;
  projects: PortfolioProject[];
  testimonials: Testimonial[];
  aggregateRating: AggregateRatingStats | null;
};

function architectureBullets(content: LocationHubContent): string[] {
  if (content.architectureBullets && content.architectureBullets.length > 0) {
    return content.architectureBullets;
  }

  return content.architecturalStyles
    .split(/,\s*/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function trustCards(location: ResolvedLocation) {
  return [
    {
      title: "Workshop crafted in Newcastle",
      description:
        "Every project is designed and manufactured in our Newcastle workshop — not outsourced to a third-party factory.",
    },
    {
      title: `Free measure visits to ${location.name}`,
      description:
        "We attend your home for design consultations and site measures at no charge on qualifying projects.",
    },
    {
      title: "Delivery and install by our team",
      description:
        "Installations are managed by our own crews in NSW and ACT, with vetted partners interstate.",
    },
    {
      title: "From our Newcastle workshop",
      description: location.driveTimeFromNewcastle,
    },
  ];
}

export function LocationHubPage({
  location,
  content,
  projects,
  testimonials,
  aggregateRating,
}: LocationHubPageProps) {
  const nearbyLocations = getNearbyLocations(content.nearbyLocationSlugs);
  const localBusinessSchema = locationHubStructuredData(
    location,
    content.coveredSuburbs,
  );
  const breadcrumbSchema = locationBreadcrumbStructuredData(location);
  const faqSchema = locationFaqStructuredData(
    location.slug,
    content.faqs.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    })),
  );
  const pageUrl = canonicalUrl(`/locations/${location.slug}/`);
  const placeSchema = placeStructuredData(location);
  const speakableSchema = speakableStructuredData(pageUrl);
  const introPrefix = getLocationIntroPrefix(location.slug);
  const locationFacts = getLocationFacts(location.slug);
  const architectureList = architectureBullets(content);

  const kicker =
    location.slug === "newcastle"
      ? "Newcastle · Our Home"
      : `Newcastle to ${location.name}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />

      <SectionShell className="pb-4 pt-8">
        <nav aria-label="Breadcrumb" className="mb-stack-md">
          <ol className="flex flex-wrap items-center gap-2 text-body-sm text-ink-800/70">
            <li>
              <Link href="/" className="hover:text-amber-600">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-ink-800/70">Locations</li>
            <li aria-hidden>/</li>
            <li className="font-medium text-ink-900">{location.name}</li>
          </ol>
        </nav>
      </SectionShell>

      <SectionShell className="pb-0">
        <div
          className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
          style={{ viewTransitionName: `location-${location.slug}` }}
        >
          <div>
            <p className="mb-stack-sm font-mono text-caption uppercase tracking-widest text-amber-600">
              {kicker}
            </p>
            <h1 className="mb-stack-md font-serif text-display-2 text-ink-900">
              {location.h1}
            </h1>
            <p className="mb-stack-lg max-w-xl text-body-lg text-ink-800">
              {content.heroIntro}
            </p>
            <div className="flex flex-col gap-stack-sm sm:flex-row">
              <Button asChild size="xl">
                <Link href="/contact/">Get a Free Design Consultation</Link>
              </Button>
              <Button asChild variant="ghost" size="xl">
                <Link href="/portfolio/">
                  See projects in {location.name}
                </Link>
              </Button>
            </div>
          </div>
          <MediaFrame
            src={location.heroImagePath}
            alt={`Custom joinery projects in ${location.name}`}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </SectionShell>

      <SectionShell>
        <IdentityBlock locationSlug={location.slug} className="max-w-3xl" />
      </SectionShell>

      <FactsBlock
        title={`${location.name} joinery — quick facts`}
        facts={locationFacts}
      />

      <SectionShell>
        <div className="prose-steepwood max-w-3xl text-body leading-relaxed text-ink-800">
          {introPrefix ? <AnswerFirst>{introPrefix}</AnswerFirst> : null}
          {content.introParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </SectionShell>

      {content.localContext ? (
        <SectionShell className="bg-ink-50">
          <h2 className="mb-stack-md font-serif text-h2 text-ink-900">
            Why SteepWood in {location.name}
          </h2>
          <p className="max-w-3xl text-body-lg leading-relaxed text-ink-800">
            {content.localContext}
          </p>
        </SectionShell>
      ) : null}

      {content.leadTime || content.freight ? (
        <SectionShell>
          <h2 className="mb-stack-md font-serif text-h2 text-ink-900">
            Lead times and freight to {location.name}
          </h2>
          <div className="prose-steepwood max-w-3xl text-body leading-relaxed text-ink-800">
            {content.leadTime ? <p>{content.leadTime}</p> : null}
            {content.freight ? <p>{content.freight}</p> : null}
          </div>
        </SectionShell>
      ) : null}

      <SectionShell className="bg-ink-50">
        <h2 className="mb-stack-lg font-serif text-h2 text-ink-900">
          Why {location.name} clients choose SteepWood
        </h2>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustCards(location).map((card) => (
            <li
              key={card.title}
              className="surface-card rounded-lg p-6"
            >
              <h3 className={contentSubheadingClass}>
                {card.title}
              </h3>
              <p className="text-body-sm leading-relaxed text-ink-800/80">
                {card.description}
              </p>
            </li>
          ))}
        </ul>
      </SectionShell>

      <SectionShell>
        <h2 className="mb-stack-sm font-serif text-h2 text-ink-900">
          Services in {location.name}
        </h2>
        <p className="mb-stack-lg max-w-3xl text-body-lg text-ink-800">
          Ten custom joinery services, each with a dedicated {location.name} page
          covering local logistics, materials, and project examples.
        </p>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/${service.slug}/${location.slug}/`}
                className="surface-card block h-full rounded-lg p-5 transition-colors hover:border-amber-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <h3 className={contentSubheadingClass}>
                  {service.name}
                </h3>
                <p className="mb-3 text-body-sm text-ink-800/70">
                  {service.shortDescription}
                </p>
                <p className="text-body-sm font-medium text-amber-700">
                  {service.shortTitle} in {location.name} →
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </SectionShell>

      <FeaturedProjects projects={projects} />

      <TestimonialsSection
        title={`What our ${location.name} clients say`}
        testimonials={testimonials}
        aggregateRating={aggregateRating}
        entityId={`${canonicalUrl(`/locations/${location.slug}/`)}#localbusiness`}
        entityName={`SteepWood Custom Joinery — ${location.name}`}
        pageUrl={canonicalUrl(`/locations/${location.slug}/`)}
      />

      <SectionShell className="bg-ink-50">
        <h2 className="mb-stack-md font-serif text-h2 text-ink-900">
          Service area — suburbs we cover in {location.name}
        </h2>
        <p className="mb-stack-md max-w-3xl text-body text-ink-800">
          We serve homeowners, builders, and designers across {location.name} and
          surrounding suburbs.
        </p>
        <ul className="mb-stack-lg flex flex-wrap gap-2">
          {content.coveredSuburbs.map((suburb) => (
            <li
              key={suburb}
              className="rounded-md border border-ink-700/10 bg-white px-3 py-1.5 text-body-sm text-ink-800"
            >
              {suburb}
            </li>
          ))}
        </ul>
        <h3 className="mb-stack-sm font-serif text-h3 text-ink-900">
          Architecture and building types
        </h3>
        <ul className="max-w-3xl list-disc space-y-2 pl-5 text-body text-ink-800">
          {architectureList.map((style) => (
            <li key={style}>{style}</li>
          ))}
        </ul>
      </SectionShell>

      <ServicePillarFAQ faqs={content.faqs} />

      {nearbyLocations.length > 0 ? (
        <SectionShell className="bg-ink-100/30">
          <h2 className="mb-stack-lg font-serif text-h2 text-ink-900">
            Nearby locations
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {nearbyLocations.map((nearby) => (
              <li key={nearby.slug}>
                <Link
                  href={`/locations/${nearby.slug}/`}
                  className="surface-card block rounded-lg p-5 transition-colors hover:border-amber-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  <h3 className={contentSubheadingClass}>
                    {nearby.name}
                  </h3>
                  <p className="text-body-sm text-ink-800/70">
                    {nearby.region} · {nearby.driveTimeFromNewcastle}
                  </p>
                  <p className="mt-2 text-body-sm font-medium text-amber-700">
                    Custom joinery in {nearby.name} →
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </SectionShell>
      ) : null}

      <PageClosingCta
        title={`Ready to start your ${location.name} project?`}
        description="Free design consultation, fixed-price quote within 5 working days, no obligation."
        phoneContext="location-hub-cta"
      />
    </>
  );
}
