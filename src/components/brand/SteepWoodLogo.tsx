import Image from "next/image";
import Link from "@/components/ui/link";

import { cn } from "@/lib/utils";

const BRAND = {
  logo: {
    light: "/brand/steepwood-logo-trimmed.png",
    dark: "/brand/steepwood-logo-dark.png",
    width: 1586,
    height: 448,
    alt: "SteepWood — Premium Custom Joinery",
  },
  mark: {
    light: "/brand/steepwood-favicon-trimmed.png",
    dark: "/brand/steepwood-favicon-dark.png",
    width: 936,
    height: 958,
    alt: "SteepWood",
  },
} as const;

type SteepWoodLogoProps = {
  className?: string;
  /** Full wordmark for light backgrounds; mark + text for dark backgrounds */
  variant?: "full" | "mark";
  /** Light = dark logo on wood/paper backgrounds; dark = white logo on ink surfaces */
  theme?: "light" | "dark";
  priority?: boolean;
};

export function SteepWoodLogo({
  className,
  variant = "full",
  theme = "light",
  priority = false,
}: SteepWoodLogoProps) {
  const assets = BRAND[variant === "mark" ? "mark" : "logo"];
  const src = theme === "dark" ? assets.dark : assets.light;

  if (variant === "mark") {
    return (
      <Link
        href="/"
        className={cn("inline-flex items-center gap-3.5", className)}
        aria-label="SteepWood home"
      >
        <Image
          src={src}
          alt=""
          width={assets.width}
          height={assets.height}
          className="h-11 w-11 shrink-0 rounded-lg object-contain lg:h-12 lg:w-12"
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
        src={src}
        alt={assets.alt}
        width={assets.width}
        height={assets.height}
        sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 400px"
        className="block h-[4.5rem] w-auto max-w-[min(100%,22rem)] object-contain object-left sm:h-20 lg:h-[5.25rem]"
        priority={priority}
      />
    </Link>
  );
}
