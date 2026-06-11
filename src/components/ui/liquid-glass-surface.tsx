"use client";

import LiquidGlass from "liquid-glass-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type LiquidGlassSurfaceProps = {
  children: React.ReactNode;
  className?: string;
  fallbackClassName?: string;
};

function supportsLiquidGlass(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const ua = navigator.userAgent;
  const isSafari = /Safari/.test(ua) && !/Chrome/.test(ua);
  const isFirefox = /Firefox/.test(ua);
  const supportsBackdrop = CSS.supports("backdrop-filter", "blur(1px)");

  return supportsBackdrop && !isSafari && !isFirefox;
}

export function LiquidGlassSurface({
  children,
  className,
  fallbackClassName,
}: LiquidGlassSurfaceProps) {
  const [useGlass, setUseGlass] = useState(false);

  useEffect(() => {
    setUseGlass(supportsLiquidGlass());
  }, []);

  if (!useGlass) {
    return (
      <div
        className={cn(
          "border border-white/40 bg-white/30 shadow-lg backdrop-blur-xl",
          fallbackClassName,
          className,
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <LiquidGlass
      displacementScale={50}
      blurAmount={0.08}
      saturation={130}
      aberrationIntensity={1.5}
      elasticity={0.2}
      cornerRadius={32}
      padding="12px 20px"
      className={className}
    >
      {children}
    </LiquidGlass>
  );
}
