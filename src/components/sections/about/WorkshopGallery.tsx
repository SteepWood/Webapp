"use client";

import Image from "next/image";
import { useState } from "react";

import { SectionShell } from "@/components/sections/section-shell";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { WORKSHOP_GALLERY_IMAGES } from "@/lib/images";

const WORKSHOP_PHOTOS = WORKSHOP_GALLERY_IMAGES.map((photo) => ({
  src: photo.src,
  alt: photo.alt,
  caption: photo.caption,
}));

export function WorkshopGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activePhoto =
    activeIndex !== null ? WORKSHOP_PHOTOS[activeIndex] : null;

  return (
    <SectionShell className="bg-ink-100/40">
      <h2 className="mb-stack-lg font-serif text-h2 text-ink-900">
        The workshop
      </h2>
      <p className="mb-stack-lg max-w-3xl text-body-lg text-ink-800">
        Every SteepWood project is designed, manufactured, and finished under
        one roof in Newcastle — machinery, hand tools, and experienced makers
        working side by side.
      </p>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {WORKSHOP_PHOTOS.map((photo, index) => (
          <li key={photo.caption}>
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group flex w-full flex-col rounded-lg border border-ink-700/10 bg-ink-100 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={800}
                height={600}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="h-auto max-h-48 w-full object-contain"
              />
              <span className="mt-2 px-1 text-left text-caption text-ink-800">
                {photo.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog
        open={activeIndex !== null}
        onOpenChange={(open) => {
          if (!open) {
            setActiveIndex(null);
          }
        }}
      >
        <DialogContent className="max-w-4xl p-0" showCloseButton>
          {activePhoto ? (
            <>
              <DialogTitle className="sr-only">{activePhoto.caption}</DialogTitle>
              <div className="flex items-center justify-center bg-ink-100 p-4">
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  width={1600}
                  height={1200}
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="h-auto max-h-[70vh] w-full object-contain"
                  priority
                />
              </div>
              <p className="px-6 pb-6 text-body-sm text-ink-800">
                {activePhoto.caption} — {activePhoto.alt}
              </p>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </SectionShell>
  );
}
