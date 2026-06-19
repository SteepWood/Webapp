"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";

import { MediaThumb } from "@/components/ui/media-card";
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, imageIndex) => (
          <button
            key={`${image.url}-${imageIndex}`}
            type="button"
            className="group overflow-hidden rounded-lg border border-ink-700/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
            onClick={() => {
              setIndex(imageIndex);
              setOpen(true);
            }}
            aria-label={`Open gallery image ${imageIndex + 1}: ${image.alt}`}
          >
            <MediaThumb
              src={image.url}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
