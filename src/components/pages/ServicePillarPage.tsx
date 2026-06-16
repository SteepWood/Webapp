import Link from "@/components/ui/link";

import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { MediaFrame } from "@/components/ui/media-frame";
import { SectionShell } from "@/components/sections/section-shell";
import { ServicePillarFAQ } from "@/components/pages/ServicePillarFAQ";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { PageClosingCta } from "@/components/sections/dark-cta-section";
import { Button } from "@/components/ui/button";
import { WORKSHOP_HERO_IMAGE } from "@/lib/images";
import type { ServicePillarContent } from "@/lib/services-locations/serviceContent";
import { LOCATIONS } from "@/lib/services-locations/locations";
import type { ResolvedService } from "@/lib/services-locations/types";
import type { PortfolioProject, Testimonial } from "@prisma/client";
import { canonicalUrl } from "@/lib/seo/canonical";
import {
  serviceBreadcrumbStructuredData,
  serviceFaqStructuredData,
  servicePillarStructuredData,
} from "@/lib/seo/serviceStructuredData";
import type { AggregateRatingStats } from "@/lib/testimonials/aggregateRating";

type ServicePillarPageProps = {
  service: ResolvedService;
  content: ServicePillarContent;
  projects: PortfolioProject[];
  testimonials: Testimonial[];
  aggregateRating: AggregateRatingStats | null;
};

export function ServicePillarPage({
  service,
  content,
  projects,
  testimonials,
  aggregateRating,
}: ServicePillarPageProps) {
  const serviceSchema = servicePillarStructuredData(service);
  const breadcrumbSchema = serviceBreadcrumbStructuredData(service);
  const faqSchema = serviceFaqStructuredData(
    service.slug,
    content.faqs.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    })),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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
            <li className="font-medium text-ink-900">{service.name}</li>
          </ol>
        </nav>
      </SectionShell>

      <SectionShell className="pb-0">
        <div
          className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
          style={{ viewTransitionName: `service-${service.slug}` }}
        >
          <div>
            <p className="mb-stack-sm font-mono text-caption uppercase tracking-widest text-amber-600">
              Custom Joinery · Australia-wide
            </p>
            <h1 className="mb-stack-md font-serif text-display-2 text-ink-900">
              {service.h1}
            </h1>
            <p className="mb-stack-lg max-w-xl text-body-lg text-ink-800">
              {content.heroIntro}
            </p>
            <div className="flex flex-col gap-stack-sm sm:flex-row">
              <Button asChild size="xl">
                <Link href="/contact/">Get a Free Design Consultation</Link>
              </Button>
              <Button asChild variant="ghost" size="xl">
                <Link href="/portfolio/">{content.portfolioBrowseLabel}</Link>
              </Button>
            </div>
          </div>
          <MediaFrame
            src={WORKSHOP_HERO_IMAGE}
            alt={`${service.name} crafted in the SteepWood Newcastle workshop`}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </SectionShell>

      <SectionShell>
        <h2 className="mb-stack-md font-serif text-h2 text-ink-900">
          What is {service.name.toLowerCase()}?
        </h2>
        {content.relatedServices.length > 0 ? (
          <p className="mb-stack-md text-body text-ink-800/80">
            Complementary services:{" "}
            {content.relatedServices.map((related, index) => (
              <span key={related.slug}>
                {index > 0 ? ", " : null}
                <Link
                  href={`/${related.slug}/`}
                  className="font-medium text-amber-700 underline-offset-2 hover:underline"
                >
                  {related.label}
                </Link>
              </span>
            ))}
            .
          </p>
        ) : null}
        <div className="prose-steepwood max-w-3xl space-y-4 text-body leading-relaxed text-ink-800">
          {content.whatIsParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </SectionShell>

      <SectionShell className="bg-ink-50">
        <h2 className="mb-stack-lg font-serif text-h2 text-ink-900">
          What&apos;s included
        </h2>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.includes.map((item) => (
            <li
              key={item.title}
              className="surface-card rounded-lg p-6"
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
        <h2 className="mb-stack-lg font-serif text-h2 text-ink-900">
          Materials &amp; finishes
        </h2>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4 text-body leading-relaxed text-ink-800">
            {content.materials.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          <MediaFrame
            src={WORKSHOP_HERO_IMAGE}
            alt="Premium joinery materials and finishes in the SteepWood workshop"
            sizes="(max-width: 1024px) 100vw, 50vw"
            imageClassName="grayscale"
          />
        </div>
      </SectionShell>

      {content.bodySections.map((section) => (
        <SectionShell
          key={section.title}
          className={content.bodySections.indexOf(section) % 2 === 1 ? "bg-ink-50" : undefined}
        >
          <h2 className="mb-stack-md max-w-3xl font-serif text-h2 text-ink-900">
            {section.title}
          </h2>
          <div className="max-w-3xl space-y-4 text-body leading-relaxed text-ink-800">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </SectionShell>
      ))}

      <SectionShell className="bg-ink-50">
        <h2 className="mb-stack-lg max-w-3xl font-serif text-h2 text-ink-900">
          Our {service.shortTitle.toLowerCase()} process
        </h2>
        <ol className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {content.processSteps.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-3">
              <span className="font-serif text-5xl leading-none text-amber-600">
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

      <FeaturedProjects projects={projects} />

      <TestimonialsSection
        testimonials={testimonials}
        aggregateRating={aggregateRating}
        entityId={`${canonicalUrl(`/${service.slug}/`)}#service`}
        entityName={`SteepWood — ${service.name}`}
        entityType="Service"
        pageUrl={canonicalUrl(`/${service.slug}/`)}
      />

      <SectionShell className="bg-ink-100/30">
        <h2 className="mb-stack-sm font-serif text-h2 text-ink-900">
          We craft {service.name.toLowerCase()} for clients across Australia
        </h2>
        <p className="mb-stack-lg max-w-3xl text-body-lg text-ink-800">
          Every location below links to our dedicated {service.shortTitle.toLowerCase()}{" "}
          page for that city — with local logistics, drive times, and project examples.
        </p>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LOCATIONS.map((location) => (
            <li key={location.slug}>
              <Link
                href={`/${service.slug}/${location.slug}/`}
                className="surface-card block rounded-lg p-5 transition-colors hover:border-amber-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <h3 className="mb-1 font-serif text-h4 text-ink-900">
                  {location.name}
                </h3>
                <p className="text-body-sm text-ink-800/70">
                  {location.region} · {location.driveTimeFromNewcastle}
                </p>
                <p className="mt-2 text-body-sm font-medium text-amber-700">
                  {service.shortTitle} in {location.name} →
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </SectionShell>

      <ServicePillarFAQ faqs={content.faqs} />

      <PageClosingCta
        title={`Ready to design your ${service.name.toLowerCase()}?`}
        description="Free design consultation, fixed-price quote within 5 working days, no obligation."
        phoneContext="service-pillar-cta"
      />
    </>
  );
}
