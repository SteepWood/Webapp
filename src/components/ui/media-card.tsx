import Image from "next/image";

import Link from "@/components/ui/link";
import { cn } from "@/lib/utils";

export const mediaCardShellClass =
  "group surface-card flex h-full flex-col overflow-hidden rounded-lg transition-[box-shadow,border-color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-amber-500/35 hover:shadow-md";

export const mediaCardImageAreaClass =
  "flex min-h-[12rem] shrink-0 items-center justify-center border-b border-ink-700/10 bg-ink-100 p-2 sm:min-h-[14rem]";

export const mediaCardImageClass =
  "h-auto max-h-64 w-full object-contain transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015]";

export const mediaCardBodyClass = "flex flex-1 flex-col bg-white p-5";

type MediaCardProps = {
  children: React.ReactNode;
  className?: string;
  viewTransitionName?: string;
};

export function MediaCard({
  children,
  className,
  viewTransitionName,
}: MediaCardProps) {
  return (
    <article
      className={cn(mediaCardShellClass, className)}
      style={
        viewTransitionName
          ? { viewTransitionName }
          : undefined
      }
    >
      {children}
    </article>
  );
}

type MediaCardLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function MediaCardLink({ href, children, className }: MediaCardLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2",
        className,
      )}
    >
      {children}
    </Link>
  );
}

type MediaCardImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
};

export function MediaCardImage({
  src,
  alt,
  width = 800,
  height = 600,
  sizes,
  priority,
  loading,
}: MediaCardImageProps) {
  return (
    <div className={mediaCardImageAreaClass}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        loading={loading}
        className={mediaCardImageClass}
      />
    </div>
  );
}

type MediaCardPlaceholderProps = {
  label: string;
};

export function MediaCardPlaceholder({ label }: MediaCardPlaceholderProps) {
  return (
    <div className={mediaCardImageAreaClass}>
      <div className="flex min-h-[12rem] w-full items-end bg-gradient-to-br from-ink-800 to-ink-950 p-6">
        <span className="font-serif text-xl text-ink-50">{label}</span>
      </div>
    </div>
  );
}

type MediaCardContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function MediaCardContent({ children, className }: MediaCardContentProps) {
  return <div className={cn(mediaCardBodyClass, className)}>{children}</div>;
}

type MediaCardTitleProps = {
  children: React.ReactNode;
  as?: "h2" | "h3";
  className?: string;
};

export function MediaCardTitle({
  children,
  as: Tag = "h3",
  className,
}: MediaCardTitleProps) {
  return (
    <Tag className={cn("mb-1 font-serif text-h4 text-ink-900", className)}>
      {children}
    </Tag>
  );
}

type MediaCardMetaProps = {
  children: React.ReactNode;
};

export function MediaCardMeta({ children }: MediaCardMetaProps) {
  return <p className="text-body-sm text-ink-800/75">{children}</p>;
}

type MediaCardDescriptionProps = {
  children: React.ReactNode;
  clamp?: boolean;
};

export function MediaCardDescription({
  children,
  clamp = true,
}: MediaCardDescriptionProps) {
  return (
    <p
      className={cn(
        "mt-2 text-body-sm leading-relaxed text-ink-800/85",
        clamp && "line-clamp-3 flex-1",
      )}
    >
      {children}
    </p>
  );
}

type MediaCardActionProps = {
  children: React.ReactNode;
  className?: string;
};

export function MediaCardAction({ children, className }: MediaCardActionProps) {
  return (
    <div className={cn("mt-4 text-sm font-semibold text-amber-700", className)}>
      {children}
    </div>
  );
}
