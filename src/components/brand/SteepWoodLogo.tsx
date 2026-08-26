import Image from "next/image";
import Link from "@/components/ui/link";

import { cn } from "@/lib/utils";

const BRAND = {
  logo: {
    light: "/brand/steepwood-logo-trimmed.png",
    dark: "/brand/steepwood-logo-dark.png",
    width: 935,
    height: 691,
    alt: "SteepWood Joinery — Premium Custom Joinery",
  },
  mark: {
    light: "/brand/steepwood-favicon-trimmed.png",
    dark: "/brand/steepwood-favicon-dark.png",
    width: 932,
    height: 570,
    alt: "SteepWood",
  },
} as const;

type SteepWoodLogoProps = {
  className?: string;
  /** Full stacked wordmark; mark = icon only with text for dark surfaces */
  variant?: "full" | "mark";
  /** Light = dark logo on light backgrounds; dark = light logo on ink surfaces */
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
          className="h-11 w-auto shrink-0 object-contain lg:h-12"
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
        sizes="(max-width: 640px) 140px, (max-width: 1024px) 168px, 196px"
        className="block h-14 w-auto max-w-[min(100%,12rem)] object-contain object-left sm:h-16 lg:h-[4.5rem] lg:max-w-[14rem]"
        priority={priority}
      />
    </Link>
  );
}
