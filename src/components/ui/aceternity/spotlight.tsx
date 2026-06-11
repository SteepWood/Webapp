"use client";

import { motion, useReducedMotion } from "motion/react";
import { useCallback, useRef } from "react";

import { cn } from "@/lib/utils";

type SpotlightProps = {
  children: React.ReactNode;
  className?: string;
};

export function Spotlight({ children, className }: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || !containerRef.current) {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      containerRef.current.style.setProperty("--spotlight-x", `${x}px`);
      containerRef.current.style.setProperty("--spotlight-y", `${y}px`);
    },
    [shouldReduceMotion],
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      className={cn("relative overflow-hidden", className)}
      style={
        {
          "--spotlight-x": "50%",
          "--spotlight-y": "40%",
        } as React.CSSProperties
      }
    >
      {!shouldReduceMotion ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(600px circle at var(--spotlight-x) var(--spotlight-y), rgba(212,137,42,0.18), transparent 45%)",
          }}
        />
      ) : null}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
