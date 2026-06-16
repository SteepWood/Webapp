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
import { SectionShell } from "@/components/sections/section-shell";
import type { PortfolioProject } from "@prisma/client";

function getProjectImageUrl(project: PortfolioProject): string | null {
  return (
    project.afterImageUrl ??
    (Array.isArray(project.galleryImages) &&
    project.galleryImages.length > 0 &&
    typeof project.galleryImages[0] === "object" &&
    project.galleryImages[0] !== null &&
    "url" in project.galleryImages[0]
      ? String((project.galleryImages[0] as { url: string }).url)
      : null)
  );
}

export function FeaturedProjects({
  projects,
  title = "Recent projects across Australia",
  description,
}: {
  projects: PortfolioProject[];
  title?: string;
  description?: string;
}) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <SectionShell id="projects">
      <ScrollReveal>
        <h2 className="mb-stack-lg font-serif text-h2 text-ink-900">{title}</h2>
        {description ? (
          <p className="mb-stack-md max-w-3xl text-body text-ink-800/80">
            {description}
          </p>
        ) : null}
      </ScrollReveal>

      <ScrollRevealStagger className="flex gap-6 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">
        {projects.map((project) => {
          const imageUrl = getProjectImageUrl(project);

          return (
            <ScrollRevealItem
              key={project.slug}
              className="h-full min-w-[85%] shrink-0 sm:min-w-[60%] lg:min-w-0"
            >
              <MediaCard>
                <MediaCardLink href={`/portfolio/${project.slug}/`}>
                  {imageUrl ? (
                    <MediaCardImage
                      src={imageUrl}
                      alt={`${project.title}${project.locationName ? ` in ${project.locationName}` : ""}`}
                      sizes="(max-width: 1024px) 85vw, 33vw"
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
