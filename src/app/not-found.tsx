import type { Metadata } from "next";
import Link from "@/components/ui/link";

import { SectionShell } from "@/components/sections/section-shell";
import { Button } from "@/components/ui/button";
import {
  MediaCard,
  MediaCardImage,
  MediaCardLink,
  MediaCardTitle,
} from "@/components/ui/media-card";
import { prisma } from "@/lib/db/prisma";
import { SERVICES } from "@/lib/services-locations/services";
import { getProjectHeroImage } from "@/lib/portfolio/utils";

export const metadata: Metadata = {
  title: "Page Not Found — SteepWood",
  robots: {
    index: false,
    follow: false,
  },
};

async function getRecentProjects() {
  try {
    return await prisma.portfolioProject.findMany({
      where: { isPublished: true },
      take: 3,
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export default async function NotFoundPage() {
  const projects = await getRecentProjects();

  return (
    <SectionShell>
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-caption uppercase tracking-widest text-amber-600">
          404
        </p>
        <h1 className="mt-4 font-serif text-display-2 text-ink-900">
          Lost in the workshop?
        </h1>
        <p className="mt-4 text-body-lg text-ink-800/80">
          We can&apos;t find the page you&apos;re looking for, but we&apos;re
          here to help.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact/">Contact us</Link>
          </Button>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="mb-6 font-serif text-h3 text-ink-900">Our services</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/${service.slug}/`}
                className="block rounded-lg border border-ink-700/10 bg-white px-4 py-3 text-sm font-medium text-ink-900 transition-colors hover:border-amber-500/40 hover:text-amber-600"
              >
                {service.shortTitle}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {projects.length > 0 ? (
        <div className="mt-16">
          <h2 className="mb-6 font-serif text-h3 text-ink-900">
            Recent projects
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project) => {
              const hero = getProjectHeroImage(project);

              return (
                <MediaCard key={project.id}>
                  <MediaCardLink href={`/portfolio/${project.slug}/`}>
                    {hero ? (
                      <MediaCardImage
                        src={hero.url}
                        alt={hero.alt}
                        width={hero.width}
                        height={hero.height}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : null}
                    <div className="p-4">
                      <MediaCardTitle as="h3">{project.title}</MediaCardTitle>
                    </div>
                  </MediaCardLink>
                </MediaCard>
              );
            })}
          </div>
        </div>
      ) : null}
    </SectionShell>
  );
}
