"use client";

import type { PortfolioProject } from "@prisma/client";
import Image from "next/image";
import Link from "@/components/ui/link";

import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/components/ui/aceternity/card-3d";
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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => {
        const hero = getProjectHeroImage(project);

        return (
          <CardContainer key={project.slug}>
            <CardBody className="rounded-lg border border-ink-700/10 bg-ink-50">
              <CardItem translateZ={12}>
                <article>
                  <Link
                    href={`/portfolio/${project.slug}/`}
                    className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                  >
                    <div className="flex min-h-[12rem] items-center justify-center bg-ink-100 p-2 sm:min-h-[14rem]">
                      {hero ? (
                        <Image
                          src={hero.url}
                          alt={hero.alt}
                          width={hero.width}
                          height={hero.height}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="h-auto max-h-64 w-full object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex min-h-[12rem] w-full items-end bg-gradient-to-br from-ink-800 to-ink-950 p-6">
                          <span className="font-serif text-xl text-ink-50">
                            {project.title}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="font-serif text-h4 text-ink-900">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-body-sm text-ink-800/70">
                        {getServiceLabel(project.serviceSlug)} ·{" "}
                        {getLocationLabel(project.locationName)}
                      </p>
                      {project.summary ? (
                        <p className="mt-2 text-body-sm leading-relaxed text-ink-800/80">
                          {project.summary}
                        </p>
                      ) : null}
                    </div>
                  </Link>
                </article>
              </CardItem>
            </CardBody>
          </CardContainer>
        );
      })}
    </div>
  );
}
