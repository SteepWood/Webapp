"use client";

import type { Testimonial } from "@prisma/client";
import Image from "next/image";
import { Star } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="mb-3 flex gap-0.5"
      aria-label={`${rating} out of 5 stars`}
      role="img"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            "size-4",
            index < rating
              ? "fill-amber-500 text-amber-500"
              : "text-ink-700/20",
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}

function SourceBadge({ source }: { source: string | null }) {
  if (!source) {
    return (
      <span className="text-caption text-ink-800/60">Verified review</span>
    );
  }

  const normalized = source.toLowerCase();

  if (normalized.includes("houzz")) {
    return (
      <span className="inline-flex items-center gap-2 text-caption text-ink-800/70">
        <Image
          src="/badges/houzz.svg"
          alt=""
          width={56}
          height={18}
          className="h-4 w-auto"
          aria-hidden
        />
        Verified review
      </span>
    );
  }

  if (normalized.includes("google")) {
    return (
      <span className="inline-flex items-center gap-2 text-caption text-ink-800/70">
        <span className="font-semibold text-ink-900">Google</span>
        Verified review
      </span>
    );
  }

  return (
    <span className="text-caption text-ink-800/70">
      {source} · Verified review
    </span>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="surface-card flex h-full w-full flex-col rounded-lg p-6 text-left transition-colors hover:border-amber-400/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
      >
        <StarRating rating={testimonial.rating} />
        <blockquote className="mb-4 flex-1 font-serif text-body italic leading-relaxed text-ink-800">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <figcaption className="space-y-2">
          <p className="text-body-sm text-ink-800/80">
            <span className="font-medium not-italic text-ink-900">
              — {testimonial.authorName}
            </span>
            {testimonial.authorLocation ? (
              <span>, {testimonial.authorLocation}</span>
            ) : null}
          </p>
          <SourceBadge source={testimonial.source} />
        </figcaption>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogDescription className="sr-only">
            Full review from {testimonial.authorName}
            {testimonial.authorLocation
              ? `, ${testimonial.authorLocation}`
              : ""}
          </DialogDescription>
          <DialogHeader>
            <DialogTitle className="font-serif text-h4">
              Client review
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-left">
            <StarRating rating={testimonial.rating} />
            <p className="font-serif text-body-lg italic leading-relaxed text-ink-800">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <p className="text-body-sm text-ink-800/80">
              — {testimonial.authorName}
              {testimonial.authorLocation
                ? `, ${testimonial.authorLocation}`
                : ""}
            </p>
            <SourceBadge source={testimonial.source} />
            {testimonial.sourceUrl ? (
              <Button asChild variant="outline" size="sm">
                <a
                  href={testimonial.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View original review
                </a>
              </Button>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
