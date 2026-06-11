"use client";

import "lenis/dist/lenis.css";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";

gsap.registerPlugin(ScrollTrigger);

type LenisProviderProps = {
  children: React.ReactNode;
};

function shouldUseLenis(
  reducedMotion: boolean,
  desktopViewport: boolean,
): boolean {
  return !reducedMotion && desktopViewport;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const desktopViewport = useMediaQuery("(min-width: 768px)");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(shouldUseLenis(reducedMotion, desktopViewport));
  }, [reducedMotion, desktopViewport]);

  useGSAP(
    () => {
      if (!enabled) {
        return;
      }

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        smoothWheel: true,
      });

      lenisRef.current = lenis;

      lenis.on("scroll", ScrollTrigger.update);

      const ticker = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(ticker);
        lenis.destroy();
        lenisRef.current = null;
      };
    },
    { dependencies: [enabled], revertOnUpdate: true },
  );

  return children;
}
