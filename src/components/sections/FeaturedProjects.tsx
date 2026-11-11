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
  className,
  sizes,
}: {
  project: PortfolioProject;
  className?: string;
  sizes: string;
}) {
  const hero = getProjectHeroImage(project);

  return (
    <article className={cn("group relative min-h-[290px] overflow-hidden rounded-lg", className)}>
      <Link
        href={`/portfolio/${project.slug}/`}
        className="absolute inset-0 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
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
          <span className="absolute inset-0 bg-ink-800" />
        )}
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[rgba(30,20,13,0.88)] via-[rgba(30,20,13,0.12)] to-transparent"
        />
        <span className="absolute inset-x-0 bottom-0 flex flex-col p-5 text-[#f7f2ea]">
          <span className="font-serif text-2xl leading-tight">{project.title}</span>
          {project.locationName ? (
            <span className="mt-1 text-sm text-[#f7f2ea]/85">{project.locationName}</span>
          ) : null}
          {project.summary ? (
            <span className="mt-2 line-clamp-2 text-sm leading-snug text-[#f7f2ea]/80">
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

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr] lg:grid-rows-[290px_290px]">
            <EditorialProjectCard
              project={feature}
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="min-h-[420px] lg:row-span-2 lg:min-h-0"
            />
            {stacked.map((project) => (
              <EditorialProjectCard
                key={project.slug}
                project={project}
                sizes="(max-width: 1024px) 100vw, 34vw"
              />
            ))}
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
                  sizes="(max-width: 1024px) 100vw, 33vw"
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
