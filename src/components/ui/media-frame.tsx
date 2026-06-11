import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";

type MediaFrameProps = {
  src: ImageProps["src"];
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
  className?: string;
  frameClassName?: string;
  imageClassName?: string;
};

export function MediaFrame({
  src,
  alt,
  width = 1600,
  height = 1000,
  priority = false,
  fetchPriority,
  sizes = "100vw",
  className,
  frameClassName,
  imageClassName,
}: MediaFrameProps) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center rounded-lg bg-ink-100 p-2 sm:p-3",
        frameClassName,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        fetchPriority={fetchPriority}
        sizes={sizes}
        className={cn(
          "h-auto max-h-[min(70vh,720px)] w-full max-w-full object-contain",
          imageClassName,
        )}
      />
    </div>
  );
}
