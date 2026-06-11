import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/ui/link";
import { notFound } from "next/navigation";

import { ProjectViewTracker } from "@/components/analytics/ProjectViewTracker";
import { ProjectComparisonHero } from "@/components/portfolio/ProjectComparisonHero";
import { ProjectGallery } from "@/components/portfolio/ProjectGallery";
import { ProjectGrid } from "@/components/portfolio/ProjectGrid";
import { SectionShell } from "@/components/sections/section-shell";
import { Button } from "@/components/ui/button";
import {
  getPortfolioProjectBySlug,
  getPublishedPortfolioSlugs,
  getSimilarPortfolioProjects,
} from "@/lib/db/portfolio";
import {
  anonymisedClient,
  formatCompletionDate,
  getLocationLabel,
  getProjectGalleryImages,
  getProjectHeroImage,
  getServiceLabel,
} from "@/lib/portfolio/utils";
import { canonicalUrl } from "@/lib/seo/canonical";
import {
  projectBreadcrumbStructuredData,
  projectImageGalleryStructuredData,
} from "@/lib/seo/projectStructuredData";

export const dynamicParams = false;
export const revalidate = 86400;

export async function generateStaticParams() {
  const slugs = await getPublishedPortfolioSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPortfolioProjectBySlug(slug);

  if (!project) {
    return {};
  }

  const title =
    project.metaTitle ?? `${project.title} — SteepWood Portfolio`;
  const description =
    project.metaDescription ??
    project.summary ??
    `Custom joinery project by SteepWood in ${getLocationLabel(project.locationName)}.`;
  const hero = getProjectHeroImage(project);
  const path = `/portfolio/${project.slug}/`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl(path),
      languages: {
        "en-AU": canonicalUrl(path),
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl(path),
      siteName: "SteepWood",
      locale: "en_AU",
      type: "website",
      ...(hero
        ? {
            images: [
              {
                url: hero.url.startsWith("http")
                  ? hero.url
                  : canonicalUrl(hero.url),
                width: hero.width,
                height: hero.height,
                alt: hero.alt,
              },
            ],
          }
        : {}),
    },
  };
}

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-caption font-medium uppercase tracking-wider text-ink-800/60">
        {label}
      </dt>
      <dd className="mt-1 text-body text-ink-900">{value}</dd>
    </div>
  );
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getPortfolioProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const hero = getProjectHeroImage(project);
  const galleryImages = getProjectGalleryImages(project);
  const similarProjects = await getSimilarPortfolioProjects(project);
  const breadcrumbSchema = projectBreadcrumbStructuredData(project);
  const gallerySchema = projectImageGalleryStructuredData(project);
  const descriptionParagraphs = (project.description ?? project.summary ?? "")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <>
      <ProjectViewTracker
        slug={project.slug}
        category={project.serviceSlug ?? undefined}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
      />

      <SectionShell className="pb-0">
        <nav aria-label="Breadcrumb" className="mb-stack-md">
          <ol className="flex flex-wrap items-center gap-2 text-body-sm text-ink-800/70">
            <li>
              <Link href="/" className="hover:text-amber-600">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/portfolio/" className="hover:text-amber-600">
                Projects
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-ink-900">{project.title}</li>
          </ol>
        </nav>
      </SectionShell>

      <div className="bg-ink-900">
        {project.beforeImageUrl && project.afterImageUrl ? (
          <ProjectComparisonHero
            beforeUrl={project.beforeImageUrl}
            afterUrl={project.afterImageUrl}
            beforeAlt={`Before — ${project.title}`}
            afterAlt={`After — ${project.title}`}
            width={hero?.width ?? 1600}
            height={hero?.height ?? 1000}
          />
        ) : hero ? (
          <div className="flex w-full items-center justify-center px-container-x py-6">
            <Image
              src={hero.url}
              alt={hero.alt}
              width={hero.width}
              height={hero.height}
              priority
              fetchPriority="high"
              sizes="100vw"
              className="h-auto max-h-[70vh] w-full max-w-7xl object-contain"
            />
          </div>
        ) : null}
        <div className="px-container-x pb-10 pt-6">
          <div className="mx-auto max-w-7xl">
            <p className="mb-stack-sm font-mono text-caption uppercase tracking-widest text-amber-600">
              {getServiceLabel(project.serviceSlug)} ·{" "}
              {getLocationLabel(project.locationName)}
            </p>
            <h1 className="max-w-4xl font-serif text-display-2 text-ink-900">
              {project.title}
            </h1>
            <p className="mt-3 text-body text-ink-800/80">
              Completed {formatCompletionDate(project.createdAt)}
            </p>
          </div>
        </div>
      </div>

      <SectionShell>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
          <div>
            {descriptionParagraphs.length > 0 ? (
              <div className="prose prose-ink max-w-none space-y-4 text-body-lg text-ink-800/90">
                {descriptionParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <p className="text-body-lg text-ink-800/80">
                {project.summary ??
                  "A bespoke SteepWood joinery project crafted to the client brief."}
              </p>
            )}

            {galleryImages.length > 0 ? (
              <div className="mt-stack-xl">
                <h2 className="mb-stack-md font-serif text-h3 text-ink-900">
                  Project gallery
                </h2>
                <ProjectGallery images={galleryImages} />
              </div>
            ) : null}
          </div>

          <aside className="h-fit rounded-lg border border-ink-700/10 bg-ink-50 p-6">
            <h2 className="mb-stack-md font-serif text-h4 text-ink-900">
              Project details
            </h2>
            <dl className="space-y-4">
              <DetailItem
                label="Client"
                value={anonymisedClient(project.locationName)}
              />
              <DetailItem
                label="Service"
                value={getServiceLabel(project.serviceSlug)}
              />
              <DetailItem
                label="Location"
                value={getLocationLabel(project.locationName)}
              />
              <DetailItem
                label="Completed"
                value={formatCompletionDate(project.createdAt)}
              />
            </dl>
          </aside>
        </div>
      </SectionShell>

      {similarProjects.length > 0 ? (
        <SectionShell className="border-t border-ink-700/10 pt-section-y">
          <h2 className="mb-stack-lg font-serif text-h2 text-ink-900">
            Similar projects
          </h2>
          <ProjectGrid projects={similarProjects} />
        </SectionShell>
      ) : null}

      <SectionShell className="border-t border-ink-700/10">
        <div className="rounded-lg bg-ink-900 px-8 py-10 text-center md:px-12">
          <h2 className="mb-stack-sm font-serif text-h2 text-ink-50">
            Inspired? Get a free measure &amp; quote
          </h2>
          <p className="mb-stack-lg text-body text-ink-100/80">
            Tell us about your project and we&apos;ll arrange a no-obligation
            in-home visit.
          </p>
          <Button asChild size="lg">
            <Link href="/quote/">Get a Free Measure &amp; Quote</Link>
          </Button>
        </div>
      </SectionShell>
    </>
  );
}
