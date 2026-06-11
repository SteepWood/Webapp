import Image from "next/image";
import Link from "@/components/ui/link";

import { SectionShell } from "@/components/sections/section-shell";
import type { PortfolioProject } from "@prisma/client";

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
      <h2 className="mb-stack-lg font-serif text-h2 text-ink-900">{title}</h2>
      {description ? (
        <p className="mb-stack-md max-w-3xl text-body text-ink-800/80">
          {description}
        </p>
      ) : null}

      <div className="flex gap-6 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">
        {projects.map((project) => {
          const imageUrl =
            project.afterImageUrl ??
            (Array.isArray(project.galleryImages) &&
            project.galleryImages.length > 0 &&
            typeof project.galleryImages[0] === "object" &&
            project.galleryImages[0] !== null &&
            "url" in project.galleryImages[0]
              ? String(
                  (project.galleryImages[0] as { url: string }).url,
                )
              : null);

          return (
            <article
              key={project.slug}
              className="min-w-[85%] shrink-0 rounded-lg border border-ink-700/10 sm:min-w-[60%] lg:min-w-0"
            >
              <Link
                href={`/portfolio/${project.slug}/`}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <div className="flex min-h-[12rem] items-center justify-center bg-ink-100 p-2 sm:min-h-[14rem]">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={`${project.title}${project.locationName ? ` in ${project.locationName}` : ""}`}
                      width={800}
                      height={600}
                      sizes="(max-width: 1024px) 85vw, 33vw"
                      className="h-auto max-h-64 w-full object-contain"
                    />
                  ) : (
                    <div className="flex min-h-[12rem] w-full items-end bg-gradient-to-br from-ink-800 to-ink-950 p-6">
                      <span className="font-serif text-xl text-ink-50">
                        {project.title}
                      </span>
                    </div>
                  )}
                </div>
                <div className="bg-ink-50 p-5">
                  <h3 className="mb-1 font-serif text-h4 text-ink-900">
                    {project.title}
                  </h3>
                  {project.locationName ? (
                    <p className="text-body-sm text-ink-800/70">
                      {project.locationName}
                    </p>
                  ) : null}
                  {project.summary ? (
                    <p className="mt-2 text-body-sm leading-relaxed text-ink-800/80">
                      {project.summary}
                    </p>
                  ) : null}
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}
