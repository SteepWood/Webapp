"use client";

import Image from "next/image";
import { useState } from "react";

import { SectionShell, sectionHeadingClass } from "@/components/sections/section-shell";
import { MediaThumb } from "@/components/ui/media-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
      <h2 className={sectionHeadingClass}>The workshop</h2>
      <p className="mb-stack-md max-w-3xl text-body-lg text-ink-800">
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
              className="group flex w-full flex-col overflow-hidden rounded-lg border border-ink-700/10 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <MediaThumb
                src={photo.src}
                alt={photo.alt}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <span className="px-3 py-2 text-left text-caption text-ink-800">
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
          <DialogTitle className="sr-only">
            {activePhoto?.caption ?? "Workshop photograph"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {activePhoto
              ? `Enlarged workshop photograph: ${activePhoto.alt}`
              : "Enlarged workshop photograph from the SteepWood gallery"}
          </DialogDescription>
          {activePhoto ? (
            <>
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-100">
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  width={1600}
                  height={1200}
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="size-full object-cover"
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
