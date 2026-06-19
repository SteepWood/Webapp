import Link from "@/components/ui/link";

import { getPortfolioProjectBySlug } from "@/lib/db/portfolio";
import { getProjectHeroImage } from "@/lib/portfolio/utils";
import { MediaCardImage } from "@/components/ui/media-card";

export async function ProjectEmbed({ slug }: { slug: string }) {
  const project = await getPortfolioProjectBySlug(slug);

  if (!project) {
    return null;
  }

  const hero = getProjectHeroImage(project);

  return (
    <article className="my-8 overflow-hidden rounded-lg border border-ink-700/10 not-prose">
      <Link
        href={`/portfolio/${project.slug}/`}
        className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
      >
        {hero ? (
          <MediaCardImage
            src={hero.url}
            alt={hero.alt}
            width={hero.width}
            height={hero.height}
            sizes="(max-width: 768px) 100vw, 768px"
          />
        ) : null}
        <div className="bg-ink-50 p-5">
          <p className="mb-1 font-mono text-caption uppercase tracking-widest text-amber-600">
            Featured project
          </p>
          <h3 className="font-serif text-h4 text-ink-900">{project.title}</h3>
          {project.summary ? (
            <p className="mt-2 text-body-sm text-ink-800/80">{project.summary}</p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
