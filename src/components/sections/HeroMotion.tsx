"use client";

import { motion, useReducedMotion } from "motion/react";

import {
  revealTween,
  staggerContainer,
  fadeUpItem,
} from "@/lib/motion/presets";

type HeroMotionProps = {
  children: React.ReactNode;
};

export function HeroMotion({ children }: HeroMotionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return children;
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.div>
  );
}

export function HeroMotionItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={fadeUpItem}
      transition={revealTween}
      className={className}
    >
      {children}
    </motion.div>
  );
}
