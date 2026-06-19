"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { mediaFrameAreaClass, mediaFrameImageClass } from "@/components/ui/media-frame";
import { cn } from "@/lib/utils";

type ProjectComparisonHeroProps = {
  beforeUrl: string;
  afterUrl: string;
  beforeAlt: string;
  afterAlt: string;
  width: number;
  height: number;
};

export function ProjectComparisonHero({
  beforeUrl,
  afterUrl,
  beforeAlt,
  afterAlt,
  width,
  height,
}: ProjectComparisonHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) {
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(5, Math.min(95, next)));
  }, []);

  useEffect(() => {
    if (!dragging) {
      return;
    }

    const onMove = (event: MouseEvent | TouchEvent) => {
      const clientX =
        "touches" in event ? (event.touches[0]?.clientX ?? 0) : event.clientX;
      updatePosition(clientX);
    };

    const onUp = () => setDragging(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging, updatePosition]);

  const nudge = (delta: number) => {
    setPosition((current) => Math.max(5, Math.min(95, current + delta)));
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        mediaFrameAreaClass,
        "select-none rounded-none bg-ink-900",
      )}
      onMouseDown={(event) => {
        setDragging(true);
        updatePosition(event.clientX);
      }}
      onTouchStart={(event) => {
        setDragging(true);
        const touch = event.touches[0];
        if (touch) {
          updatePosition(touch.clientX);
        }
      }}
    >
      <Image
        src={afterUrl}
        alt={afterAlt}
        width={width}
        height={height}
        priority
        fetchPriority="high"
        sizes="100vw"
        className={mediaFrameImageClass}
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeUrl}
          alt={beforeAlt}
          width={width}
          height={height}
          priority
          sizes="100vw"
          className={mediaFrameImageClass}
        />
      </div>

      <button
        type="button"
        aria-label="Drag to compare before and after images. Use left and right arrow keys to adjust."
        aria-valuemin={5}
        aria-valuemax={95}
        aria-valuenow={Math.round(position)}
        className="absolute top-0 bottom-0 z-10 w-1 -translate-x-1/2 cursor-ew-resize bg-amber-500 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        style={{ left: `${position}%` }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            nudge(-5);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            nudge(5);
          }
        }}
      >
        <span
          className={cn(
            "absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink-50/40 bg-ink-900/70 text-xs font-medium text-ink-50",
          )}
        >
          ⇔
        </span>
      </button>
    </div>
  );
}
