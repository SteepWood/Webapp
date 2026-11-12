import Image from "next/image";

import {
  homepageDarkClass,
  homepageDarkHeadingClass,
  homepageInnerClass,
} from "@/components/sections/homepageStyles";

const TICKS = [
  "Moisture-resistant HMR board for wet areas",
  "Blum soft-close hardware as standard",
  "Every job checked and wrapped before delivery",
] as const;

const PHOTOS = [
  {
    src: "/images/workshop/people-2-assembly-team.jpg",
    alt: "Cabinet assembly underway in the SteepWood workshop, Newcastle",
    caption: "Cabinet assembly",
    className: "col-span-1 row-span-2 min-h-[320px] lg:min-h-0",
    imageClassName: "object-[40%_50%]",
    sizes: "(max-width: 700px) 100vw, 50vw",
  },
  {
    src: "/images/workshop/people-1-saw-two-workers.jpg",
    alt: "Two joiners cutting sheet material on a panel saw in the SteepWood workshop, Newcastle",
    caption: "Panel cutting",
    className: "min-h-[180px]",
    imageClassName: "object-center",
    sizes: "(max-width: 700px) 50vw, 25vw",
  },
  {
    src: "/images/workshop/warehouse.jpg",
    alt: "Board stock stored on racks in the SteepWood workshop, Newcastle",
    caption: "Board stock",
    className: "min-h-[180px]",
    imageClassName: "object-[50%_30%]",
    sizes: "(max-width: 700px) 50vw, 25vw",
  },
] as const;

export function WorkshopSection() {
  return (
    <section id="workshop" className={homepageDarkClass}>
      <div
        className={`${homepageInnerClass} grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14`}
      >
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-amber-400">
            In the workshop
          </p>
          <h2 className={`${homepageDarkHeadingClass} mb-5 max-w-xl`}>
            Every piece is made{" "}
            <span className="whitespace-nowrap">in-house</span>
          </h2>
          <p className="mb-8 max-w-xl text-base leading-relaxed text-[#f7f2ea]/85">
            We cut, edge, assemble and finish every job ourselves, so we
            control quality and timing from first drawing to install.
          </p>
          <ul className="divide-y divide-[#f7f2ea]/15 border-y border-[#f7f2ea]/15">
            {TICKS.map((tick) => (
              <li key={tick} className="flex items-start gap-3 py-3.5">
                <span
                  aria-hidden
                  className="mt-2 size-2 shrink-0 rounded-full bg-amber-400"
                />
                <span className="text-sm leading-relaxed text-[#f7f2ea]/90">
                  {tick}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid min-h-[420px] grid-cols-2 grid-rows-2 gap-3 lg:min-h-[560px]">
          {PHOTOS.map((photo) => (
            <figure
              key={photo.src}
              className={`relative h-full overflow-hidden rounded-lg ${photo.className}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={photo.sizes}
                className={`object-cover ${photo.imageClassName}`}
              />
              <figcaption className="absolute bottom-3 left-3 rounded bg-ink-950/85 px-2.5 py-1 text-xs text-[#f7f2ea]">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
