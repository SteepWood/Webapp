import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";

/** Fixed 16:10 hero / feature frame — fills the box with object-cover. */
export const mediaFrameAreaClass =
  "relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-ink-100";

export const mediaFrameImageClass = "size-full object-cover";

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
      className={cn(mediaFrameAreaClass, frameClassName, className)}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        fetchPriority={fetchPriority}
        sizes={sizes}
        className={cn(mediaFrameImageClass, imageClassName)}
      />
    </div>
  );
}
