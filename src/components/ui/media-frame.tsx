import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";

/** Fixed 16:10 hero / feature frame — fills the box with object-cover. */
export const mediaFrameAreaClass =
  "relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-ink-100";

export const mediaFrameImageClass = "size-full object-cover";

type MediaFrameProps = {
  src: ImageProps["src"];
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
  /** Serve the original JPEG so IPTC/XMP metadata is preserved. */
  unoptimized?: boolean;
  className?: string;
  frameClassName?: string;
  imageClassName?: string;
};

export function MediaFrame({
  src,
  alt,
  title,
  width = 1600,
  height = 1000,
  priority = false,
  fetchPriority,
  sizes = "100vw",
  unoptimized = false,
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
        title={title}
        width={width}
        height={height}
        priority={priority}
        fetchPriority={fetchPriority}
        sizes={sizes}
        unoptimized={unoptimized}
        className={cn(mediaFrameImageClass, imageClassName)}
      />
    </div>
  );
}
