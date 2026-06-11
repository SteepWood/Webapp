import Image from "next/image";
import Link from "@/components/ui/link";

import { cn } from "@/lib/utils";

const BRAND = {
  logo: {
    src: "/brand/steepwood-logo.png",
    width: 1627,
    height: 484,
    alt: "SteepWood — Premium Custom Joinery",
  },
  mark: {
    src: "/brand/steepwood-favicon.png",
    width: 1254,
    height: 1254,
    alt: "SteepWood",
  },
} as const;

type SteepWoodLogoProps = {
  className?: string;
  /** Full wordmark for light backgrounds; mark + text for dark backgrounds */
  variant?: "full" | "mark";
  priority?: boolean;
};

export function SteepWoodLogo({
  className,
  variant = "full",
  priority = false,
}: SteepWoodLogoProps) {
  if (variant === "mark") {
    return (
      <Link
        href="/"
        className={cn("inline-flex items-center gap-3.5", className)}
        aria-label="SteepWood home"
      >
        <Image
          src={BRAND.mark.src}
          alt=""
          width={BRAND.mark.width}
          height={BRAND.mark.height}
          className="h-12 w-12 shrink-0 rounded-[0.65rem] object-contain lg:h-14 lg:w-14"
          priority={priority}
        />
        <span className="font-serif text-2xl font-semibold tracking-tight text-ink-50 lg:text-3xl">
          SteepWood
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <Image
        src={BRAND.logo.src}
        alt={BRAND.logo.alt}
        width={BRAND.logo.width}
        height={BRAND.logo.height}
        sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 400px"
        className="block h-20 w-auto min-w-[260px] object-contain object-left sm:h-[5.5rem] sm:min-w-[320px] lg:h-24 lg:min-w-[380px]"
        priority={priority}
      />
    </Link>
  );
}
