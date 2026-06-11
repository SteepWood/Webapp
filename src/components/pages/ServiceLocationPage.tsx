import Link from "@/components/ui/link";

import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { MediaFrame } from "@/components/ui/media-frame";
import { SectionShell } from "@/components/sections/section-shell";
import { ServicePillarFAQ } from "@/components/pages/ServicePillarFAQ";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { Button } from "@/components/ui/button";
import type { ComboPageContent } from "@/lib/services-locations/comboContent";
import { getLocationContent } from "@/lib/services-locations/locationContent";
import { getServiceContent } from "@/lib/services-locations/serviceContent";
import { LOCATIONS } from "@/lib/services-locations/locations";
import { SERVICES } from "@/lib/services-locations/services";
import type { ResolvedServiceLocation } from "@/lib/services-locations/types";
import type { PortfolioProject, Testimonial } from "@prisma/client";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/navigation";
import { canonicalUrl } from "@/lib/seo/canonical";
import {
  comboBreadcrumbStructuredData,
  comboFaqStructuredData,
  comboLocalBusinessStructuredData,
  comboServiceStructuredData,
} from "@/lib/seo/serviceLocationStructuredData";
import type { AggregateRatingStats } from "@/lib/testimonials/aggregateRating";

type ServiceLocationPageProps = {
  combo: ResolvedServiceLocation;
  content: ComboPageContent;
  projects: PortfolioProject[];
  testimonials: Testimonial[];
  aggregateRating: AggregateRatingStats | null;
  hasLocalProjects: boolean;
};

export function ServiceLocationPage({
  combo,
  content,
  projects,
  testimonials,
  aggregateRating,
  hasLocalProjects,
}: ServiceLocationPageProps) {
  const { service, location } = combo;
  const serviceContent = getServiceContent(service.slug);
  const locationContent = getLocationContent(location.slug);

  const siblingServices = SERVICES.filter((item) => item.slug !== service.slug)
    .slice(0, 5);
  const siblingLocations = (locationContent?.nearbyLocationSlugs ?? [])
    .slice(0, 5);

  const pageUrl = canonicalUrl(`/${service.slug}/${location.slug}/`);

  const serviceSchema = comboServiceStructuredData(combo);
  const localBusinessSchema = comboLocalBusinessStructuredData(combo);
  const breadcrumbSchema = comboBreadcrumbStructuredData(combo);
  const faqSchema = comboFaqStructuredData(
    service.slug,
    location.slug,
    content.faqs.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    })),
  );
  const costFaq = serviceContent?.faqs[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
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

      <SectionShell className="pb-4 pt-8">
        <nav aria-label="Breadcrumb" className="mb-stack-md">
          <ol className="flex flex-wrap items-center gap-2 text-body-sm text-ink-800/70">
            <li>
              <Link href="/" className="hover:text-amber-600">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link
                href={`/${service.slug}/`}
                className="hover:text-amber-600"
              >
                {service.name}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-ink-900">{location.name}</li>
          </ol>
        </nav>
      </SectionShell>

      <SectionShell className="pb-0">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-stack-sm font-mono text-caption uppercase tracking-widest text-amber-600">
              {service.shortTitle} · {location.name}
            </p>
            <h1 className="mb-stack-md font-serif text-display-2 text-ink-900">
              {combo.h1}
            </h1>
            <p className="mb-stack-lg max-w-xl text-body-lg text-ink-800">
              {content.heroIntro}
            </p>
            <Button asChild size="xl">
              <Link href="/contact/">Get a Free Design Consultation</Link>
            </Button>
          </div>
          <MediaFrame
            src="/images/hero-workshop.svg"
            alt={`${service.shortTitle} in ${location.name} by SteepWood`}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </SectionShell>

      <SectionShell>
        <h2 className="mb-stack-md font-serif text-h2 text-ink-900">
          Why SteepWood for {service.shortTitle.toLowerCase()} in{" "}
          {location.name}
        </h2>
        <div className="max-w-3xl space-y-4 text-body leading-relaxed text-ink-800">
          {content.localContextParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
        {locationContent ? (
          <p className="mt-stack-md max-w-3xl text-body-sm text-ink-800/80">
            Suburbs we serve in {location.name}:{" "}
            {locationContent.coveredSuburbs.join(", ")}.
          </p>
        ) : null}
      </SectionShell>

      {serviceContent ? (
        <>
          <SectionShell className="bg-ink-50">
            <h2 className="mb-stack-lg font-serif text-h2 text-ink-900">
              {service.shortTitle} in {location.name} — what&apos;s included
            </h2>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {serviceContent.includes.map((item) => (
                <li
                  key={item.title}
                  className="rounded-lg border border-ink-700/10 bg-ink-50 p-6"
                >
                  <h3 className="mb-2 font-serif text-h4 text-ink-900">
                    {item.title}
                  </h3>
                  <p className="text-body-sm leading-relaxed text-ink-800/80">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </SectionShell>

          <SectionShell>
            <h2 className="mb-stack-md font-serif text-h2 text-ink-900">
              Materials, finishes, and hardware
            </h2>
            <div className="max-w-3xl space-y-4 text-body leading-relaxed text-ink-800">
              {serviceContent.materials.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </SectionShell>

          {costFaq ? (
            <SectionShell className="bg-ink-50">
              <h2 className="mb-stack-md font-serif text-h2 text-ink-900">
                Cost guide for {service.shortTitle.toLowerCase()} in{" "}
                {location.name}
              </h2>
              <p className="max-w-3xl text-body leading-relaxed text-ink-800">
                {costFaq.answer}
              </p>
            </SectionShell>
          ) : null}

          {serviceContent.bodySections.slice(0, 3).map((section, index) => (
            <SectionShell
              key={section.title}
              className={index % 2 === 1 ? "bg-ink-50" : undefined}
            >
              <h2 className="mb-stack-md max-w-3xl font-serif text-h2 text-ink-900">
                {section.title} for {location.name} homes
              </h2>
              <div className="max-w-3xl space-y-4 text-body leading-relaxed text-ink-800">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </SectionShell>
          ))}
        </>
      ) : null}

      <FeaturedProjects
        projects={projects}
        title={
          hasLocalProjects
            ? `Recent ${service.shortTitle.toLowerCase()} projects in ${location.name}`
            : `${service.shortTitle} projects from across ${location.region}`
        }
        description={
          !hasLocalProjects && projects.length > 0
            ? `Photographed from our Newcastle workshop; designs are replicable to ${location.name} homes and businesses.`
            : undefined
        }
      />

      <SectionShell className="bg-ink-50">
        <h2 className="mb-stack-lg font-serif text-h2 text-ink-900">
          Why choose SteepWood for {service.shortTitle.toLowerCase()} in{" "}
          {location.name}
        </h2>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <li className="rounded-lg border border-ink-700/10 bg-ink-50 p-6">
            <h3 className="mb-2 font-serif text-h4 text-ink-900">
              Newcastle-crafted
            </h3>
            <p className="text-body-sm leading-relaxed text-ink-800/80">
              Every project is designed and manufactured in our Newcastle
              workshop using premium Laminex, Polytec, 2pac, stone, and Blum
              hardware.
            </p>
          </li>
          <li className="rounded-lg border border-ink-700/10 bg-ink-50 p-6">
            <h3 className="mb-2 font-serif text-h4 text-ink-900">
              Free measure visits to {location.name}
            </h3>
            <p className="text-body-sm leading-relaxed text-ink-800/80">
              We attend your {location.name} home or business for design
              consultations and site measures at no charge on qualifying
              projects.
            </p>
          </li>
          <li className="rounded-lg border border-ink-700/10 bg-ink-50 p-6">
            <h3 className="mb-2 font-serif text-h4 text-ink-900">
              {location.driveTimeFromNewcastle}
            </h3>
            <p className="text-body-sm leading-relaxed text-ink-800/80">
              Delivery and install co-ordinated from our Newcastle workshop.
              Typical lead time: {content.leadTime}.
            </p>
          </li>
        </ul>
      </SectionShell>

      {serviceContent ? (
        <SectionShell>
          <h2 className="mb-stack-lg max-w-3xl font-serif text-h2 text-ink-900">
            Our {service.shortTitle.toLowerCase()} process in {location.name}
          </h2>
          <ol className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
            {serviceContent.processSteps.map((step, index) => (
              <li key={step.title} className="flex flex-col gap-3">
                <span className="font-serif text-5xl leading-none text-amber-500/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-h4 text-ink-900">{step.title}</h3>
                <p className="text-body-sm leading-relaxed text-ink-800/80">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </SectionShell>
      ) : null}

      <TestimonialsSection
        title={`What our ${location.name} clients say`}
        testimonials={testimonials}
        aggregateRating={aggregateRating}
        entityId={`${pageUrl}#localbusiness`}
        entityName={`SteepWood Custom Joinery — ${location.name}`}
        entityType="HomeAndConstructionBusiness"
        pageUrl={pageUrl}
        className="bg-ink-50"
      />

      <ServicePillarFAQ faqs={content.faqs} />

      <SectionShell className="bg-ink-100/30">
        <h2 className="mb-stack-md font-serif text-h2 text-ink-900">
          {service.shortTitle} in nearby cities
        </h2>
        <ul className="mb-stack-lg grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {siblingLocations.map((nearbySlug) => {
            const nearby =
              LOCATIONS.find((item) => item.slug === nearbySlug)?.name ??
              nearbySlug;
            return (
              <li key={nearbySlug}>
                <Link
                  href={`/${service.slug}/${nearbySlug}/`}
                  className="block rounded-md border border-ink-700/10 bg-ink-50 px-4 py-3 text-sm font-medium text-ink-900 transition-colors hover:border-amber-500/40 hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  {service.shortTitle} in {nearby} →
                </Link>
              </li>
            );
          })}
        </ul>

        <h2 className="mb-stack-md font-serif text-h2 text-ink-900">
          Other joinery services in {location.name}
        </h2>
        <ul className="mb-stack-lg grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {siblingServices.map((sibling) => (
            <li key={sibling.slug}>
              <Link
                href={`/${sibling.slug}/${location.slug}/`}
                className="block rounded-md border border-ink-700/10 bg-ink-50 px-4 py-3 text-sm font-medium text-ink-900 transition-colors hover:border-amber-500/40 hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                {sibling.shortTitle} in {location.name} →
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-4 text-body-sm">
          <Link
            href={`/${service.slug}/`}
            className="font-medium text-amber-700 underline-offset-2 hover:underline"
          >
            All {service.name.toLowerCase()} services →
          </Link>
          <Link
            href={`/locations/${location.slug}/`}
            className="font-medium text-amber-700 underline-offset-2 hover:underline"
          >
            Custom joinery in {location.name} →
          </Link>
        </div>
      </SectionShell>

      <SectionShell className="bg-ink-900 text-ink-100">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-stack-sm font-serif text-h2 text-ink-50">
            Get a free {service.shortTitle.toLowerCase()} quote for{" "}
            {location.name}
          </h2>
          <p className="mb-stack-lg text-body-lg text-ink-100/80">
            Fixed-price quote within 5 working days. We respond to all enquiries
            within one business day.
          </p>
          <div className="flex flex-col justify-center gap-stack-sm sm:flex-row">
            <Button asChild size="xl">
              <Link href="/contact/">Get a Free Quote</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="xl"
              className="border-ink-50 text-ink-50 hover:bg-ink-50 hover:text-ink-900"
            >
              <a href={PHONE_HREF}>Call us — {PHONE_DISPLAY}</a>
            </Button>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
