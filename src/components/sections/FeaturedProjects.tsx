"use client";

import Image from "next/image";

import {
  ScrollReveal,
  ScrollRevealItem,
  ScrollRevealStagger,
} from "@/components/motion/ScrollReveal";
import {
  homepageHeadingClass,
  homepageInnerClass,
  homepageSectionClass,
} from "@/components/sections/homepageStyles";
import {
  MediaCard,
  MediaCardContent,
  MediaCardDescription,
  MediaCardImage,
  MediaCardLink,
  MediaCardMeta,
  MediaCardPlaceholder,
  MediaCardTitle,
} from "@/components/ui/media-card";
import Link from "@/components/ui/link";
import { SectionShell, sectionHeadingClass } from "@/components/sections/section-shell";
import type { PortfolioProject } from "@prisma/client";
import { getProjectHeroImage } from "@/lib/portfolio/utils";
import { cn } from "@/lib/utils";

function EditorialProjectCard({
  project,
  sizes,
  feature = false,
}: {
  project: PortfolioProject;
  sizes: string;
  feature?: boolean;
}) {
  const hero = getProjectHeroImage(project);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[12px] border border-[#e6d9c8] bg-white shadow-[0_14px_30px_-24px_rgba(42,28,19,0.35)]">
      <Link
        href={`/portfolio/${project.slug}/`}
        className="group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
      >
        <span
          className={cn(
            "relative block w-full overflow-hidden",
            feature
              ? "aspect-[4/3] lg:aspect-auto lg:min-h-[320px] lg:flex-1"
              : "aspect-[4/3]",
          )}
        >
          {hero ? (
            <Image
              src={hero.url}
              alt={hero.alt}
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            />
          ) : (
            <span className="absolute inset-0 bg-ink-100" />
          )}
        </span>
        <span className="flex flex-col p-5">
          <span className="font-serif text-[21px] leading-tight text-ink-900">
            {project.title}
          </span>
          {project.locationName ? (
            <span className="mt-1 text-[13px] font-semibold text-amber-500">
              {project.locationName}
            </span>
          ) : null}
          {project.summary ? (
            <span className="mt-2 text-[14.5px] leading-snug text-[#5c4a3c]">
              {project.summary}
            </span>
          ) : null}
        </span>
      </Link>
    </article>
  );
}

export function FeaturedProjects({
  projects,
  title = "Recent projects across Australia",
  description,
  shellClassName,
  variant = "grid",
}: {
  projects: PortfolioProject[];
  title?: string;
  description?: string;
  shellClassName?: string;
  variant?: "grid" | "editorial";
}) {
  if (projects.length === 0) {
    return null;
  }

  if (variant === "editorial") {
    const [feature, ...rest] = projects;
    const stacked = rest.slice(0, 2);
    const more = rest.slice(2);

    if (!feature) {
      return null;
    }

    return (
      <section id="projects" className={homepageSectionClass}>
        <div className={homepageInnerClass}>
          <ScrollReveal>
            <h2 className={`${homepageHeadingClass} mb-10`}>{title}</h2>
            {description ? (
              <p className="mb-8 max-w-3xl text-base text-ink-800/80">{description}</p>
            ) : null}
          </ScrollReveal>

          <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[1.6fr_1fr]">
            <EditorialProjectCard
              project={feature}
              sizes="(max-width: 1024px) 100vw, 58vw"
              feature
            />
            <div className="grid grid-cols-1 gap-4">
              {stacked.map((project) => (
                <EditorialProjectCard
                  key={project.slug}
                  project={project}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              ))}
            </div>
          </div>

          {more.length > 0 ? (
            <div
              className={cn(
                "mt-4 grid grid-cols-1 gap-4",
                more.length === 2 && "sm:grid-cols-2",
                more.length === 3 && "sm:grid-cols-3",
                more.length >= 4 && "sm:grid-cols-2",
              )}
            >
              {more.map((project) => (
                <EditorialProjectCard
                  key={project.slug}
                  project={project}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <SectionShell id="projects" className={shellClassName}>
      <ScrollReveal>
        <h2 className={sectionHeadingClass}>{title}</h2>
        {description ? (
          <p className="mb-stack-md max-w-3xl text-body text-ink-800/80">
            {description}
          </p>
        ) : null}
      </ScrollReveal>

      <ScrollRevealStagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const hero = getProjectHeroImage(project);

          return (
            <ScrollRevealItem key={project.slug} className="h-full">
              <MediaCard>
                <MediaCardLink href={`/portfolio/${project.slug}/`}>
                  {hero ? (
                    <MediaCardImage
                      src={hero.url}
                      alt={hero.alt}
                      width={hero.width}
                      height={hero.height}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <MediaCardPlaceholder label={project.title} />
                  )}
                  <MediaCardContent>
                    <MediaCardTitle>{project.title}</MediaCardTitle>
                    {project.locationName ? (
                      <MediaCardMeta>{project.locationName}</MediaCardMeta>
                    ) : null}
                    {project.summary ? (
                      <MediaCardDescription>{project.summary}</MediaCardDescription>
                    ) : null}
                  </MediaCardContent>
                </MediaCardLink>
              </MediaCard>
            </ScrollRevealItem>
          );
        })}
      </ScrollRevealStagger>
    </SectionShell>
  );
}
