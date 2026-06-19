"use client";

import {
  ScrollReveal,
  ScrollRevealItem,
  ScrollRevealStagger,
} from "@/components/motion/ScrollReveal";
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
import { SectionShell, sectionHeadingClass } from "@/components/sections/section-shell";
import type { PortfolioProject } from "@prisma/client";
import { getProjectHeroImage } from "@/lib/portfolio/utils";

export function FeaturedProjects({
  projects,
  title = "Recent projects across Australia",
  description,
  shellClassName,
}: {
  projects: PortfolioProject[];
  title?: string;
  description?: string;
  shellClassName?: string;
}) {
  if (projects.length === 0) {
    return null;
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
