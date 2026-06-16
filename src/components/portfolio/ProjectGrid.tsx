"use client";

import type { PortfolioProject } from "@prisma/client";

import {
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
import {
  getLocationLabel,
  getProjectHeroImage,
  getServiceLabel,
} from "@/lib/portfolio/utils";

type ProjectGridProps = {
  projects: PortfolioProject[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-ink-700/20 bg-ink-50/60 px-6 py-16 text-center">
        <p className="font-serif text-h4 text-ink-900">No projects found</p>
        <p className="mt-2 text-body text-ink-800/70">
          Try adjusting your filters to see more of our work.
        </p>
      </div>
    );
  }

  return (
    <ScrollRevealStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                    loading="lazy"
                  />
                ) : (
                  <MediaCardPlaceholder label={project.title} />
                )}
                <MediaCardContent>
                  <MediaCardTitle>{project.title}</MediaCardTitle>
                  <MediaCardMeta>
                    {getServiceLabel(project.serviceSlug)} ·{" "}
                    {getLocationLabel(project.locationName)}
                  </MediaCardMeta>
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
  );
}
