"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";

import type { PortfolioGalleryImage } from "@/lib/portfolio/utils";

import "yet-another-react-lightbox/styles.css";

type ProjectGalleryProps = {
  images: PortfolioGalleryImage[];
};

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (images.length === 0) {
    return null;
  }

  const slides = images.map((image) => ({
    src: image.url,
    alt: image.alt,
    width: image.width,
    height: image.height,
  }));

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {images.map((image, imageIndex) => (
          <button
            key={`${image.url}-${imageIndex}`}
            type="button"
            className="mb-4 block w-full overflow-hidden rounded-lg border border-ink-700/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
            onClick={() => {
              setIndex(imageIndex);
              setOpen(true);
            }}
            aria-label={`Open gallery image ${imageIndex + 1}: ${image.alt}`}
          >
            <Image
              src={image.url}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-auto w-full object-contain"
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        controller={{ closeOnBackdropClick: true }}
      />
    </>
  );
}
