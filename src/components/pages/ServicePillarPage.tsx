import Link from "@/components/ui/link";

import { AnswerFirst } from "@/components/aio/AnswerFirst";
import { FactsBlock } from "@/components/aio/FactsBlock";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { MediaFrame } from "@/components/ui/media-frame";
import {
  MediaCard,
  MediaCardImage,
  MediaCardLink,
} from "@/components/ui/media-card";
import { SectionShell, contentSubheadingClass } from "@/components/sections/section-shell";
import { ServicePillarFAQ } from "@/components/pages/ServicePillarFAQ";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { PageClosingCta } from "@/components/sections/dark-cta-section";
import { Button } from "@/components/ui/button";
import type { ServicePillarContent } from "@/lib/services-locations/serviceContent";
import {
  getServiceIncludesImage,
  getServiceProcessImage,
  getServiceSectionImage,
  getServiceWhatIsImage,
} from "@/lib/services-locations/serviceImages";
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
import {
  getServiceMaterialsPrefix,
  getServiceWhatIsPrefix,
} from "@/lib/aio/answer-first-data";
import { getServiceFacts } from "@/lib/aio/facts-data";
import {
  howToStructuredData,
  speakableStructuredData,
} from "@/lib/aio/schema";

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
  const pageUrl = canonicalUrl(`/${service.slug}/`);
  const howToSchema = howToStructuredData(service, content.processSteps);
  const speakableSchema = speakableStructuredData(pageUrl);
  const whatIsPrefix = getServiceWhatIsPrefix(service.slug);
  const materialsPrefix = getServiceMaterialsPrefix(service.slug);
  const serviceFacts = getServiceFacts(service.slug);

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
      {howToSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      ) : null}
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
            src={service.heroImagePath}
            alt={`${service.name} crafted in the SteepWood Newcastle workshop`}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </SectionShell>

      <FactsBlock
        title={`${service.shortTitle} facts — quick reference`}
        facts={serviceFacts}
      />

      <SectionShell>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="mb-stack-md font-serif text-h2 text-ink-900">
              What is {service.name.toLowerCase()}?
            </h2>
            {whatIsPrefix ? <AnswerFirst>{whatIsPrefix}</AnswerFirst> : null}
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
            <div className="prose-steepwood max-w-none text-body leading-relaxed text-ink-800">
              {content.whatIsParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <MediaFrame
            src={getServiceWhatIsImage(service.slug)}
            alt={`${service.name} crafted in the SteepWood Newcastle workshop`}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </SectionShell>

      <SectionShell className="bg-ink-50">
        <h2 className="mb-stack-lg font-serif text-h2 text-ink-900">
          What&apos;s included
        </h2>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.includes.map((item, index) => (
            <li key={item.title}>
              <MediaCard className="h-full">
                <MediaCardImage
                  src={getServiceIncludesImage(service.slug, index)}
                  alt={`${item.title} — ${service.name} by SteepWood`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="flex flex-1 flex-col bg-white p-6">
                  <h3 className={contentSubheadingClass}>
                    {item.title}
                  </h3>
                  <p className="text-body-sm leading-relaxed text-ink-800/80">
                    {item.description}
                  </p>
                </div>
              </MediaCard>
            </li>
          ))}
        </ul>
      </SectionShell>

      <SectionShell>
        <h2 className="mb-stack-lg font-serif text-h2 text-ink-900">
          Materials &amp; finishes
        </h2>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div className="prose-steepwood max-w-none text-body leading-relaxed text-ink-800">
            {materialsPrefix ? <AnswerFirst>{materialsPrefix}</AnswerFirst> : null}
            {content.materials.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          <MediaFrame
            src={service.materialsImagePath}
            alt="Premium joinery materials and finishes in the SteepWood workshop"
            sizes="(max-width: 1024px) 100vw, 50vw"
            imageClassName="grayscale"
          />
        </div>
      </SectionShell>

      {content.bodySections.map((section, index) => {
        const sectionImage = getServiceSectionImage(service.slug, index);
        const copy = (
          <div className="prose-steepwood max-w-none text-body leading-relaxed text-ink-800">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        );

        return (
          <SectionShell
            key={section.title}
            className={index % 2 === 1 ? "bg-ink-50" : undefined}
          >
            <h2 className="mb-stack-md max-w-3xl font-serif text-h2 text-ink-900">
              {section.title}
            </h2>
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              {index % 2 === 0 ? (
                <>
                  <MediaFrame
                    src={sectionImage}
                    alt={`${section.title} — ${service.name} by SteepWood`}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {copy}
                </>
              ) : (
                <>
                  {copy}
                  <MediaFrame
                    src={sectionImage}
                    alt={`${section.title} — ${service.name} by SteepWood`}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </>
              )}
            </div>
          </SectionShell>
        );
      })}

      <SectionShell className="bg-ink-50">
        <h2 className="mb-stack-lg max-w-3xl font-serif text-h2 text-ink-900">
          Our {service.shortTitle.toLowerCase()} process
        </h2>
        <ol className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {content.processSteps.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-3">
              <MediaFrame
                src={getServiceProcessImage(service.slug, index)}
                alt={`${step.title} — ${service.name} by SteepWood`}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                frameClassName="mb-1"
              />
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
              <MediaCard className="h-full">
                <MediaCardLink href={`/${service.slug}/${location.slug}/`}>
                  <MediaCardImage
                    src={location.heroImagePath}
                    alt={`${service.shortTitle} in ${location.name} by SteepWood`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="flex flex-1 flex-col bg-white p-5">
                    <h3 className={contentSubheadingClass}>
                      {location.name}
                    </h3>
                    <p className="text-body-sm text-ink-800/70">
                      {location.region} · {location.driveTimeFromNewcastle}
                    </p>
                    <p className="mt-2 text-body-sm font-medium text-amber-700">
                      {service.shortTitle} in {location.name} →
                    </p>
                  </div>
                </MediaCardLink>
              </MediaCard>
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
