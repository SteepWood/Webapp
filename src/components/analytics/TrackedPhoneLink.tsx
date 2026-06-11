"use client";

import { trackPhoneClick } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

type TrackedPhoneLinkProps = {
  href: string;
  context: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  "aria-label"?: string;
};

export function TrackedPhoneLink({
  href,
  context,
  className,
  children,
  onClick,
  "aria-label": ariaLabel,
}: TrackedPhoneLinkProps) {
  return (
    <a
      href={href}
      className={cn(className)}
      aria-label={ariaLabel}
      onClick={() => {
        trackPhoneClick({ context });
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}
