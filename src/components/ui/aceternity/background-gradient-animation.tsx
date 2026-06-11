"use client";

import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

type BackgroundGradientAnimationProps = {
  children: React.ReactNode;
  className?: string;
};

export function BackgroundGradientAnimation({
  children,
  className,
}: BackgroundGradientAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {shouldReduceMotion ? (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,137,42,0.12)_0%,_transparent_60%)]" />
        ) : (
          <>
            <motion.div
              className="absolute -left-1/4 top-0 h-[120%] w-[70%] rounded-full bg-amber-500/10 blur-3xl"
              animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -right-1/4 bottom-0 h-[100%] w-[60%] rounded-full bg-orange-400/10 blur-3xl"
              animate={{ x: [0, -30, 0], y: [0, -15, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
