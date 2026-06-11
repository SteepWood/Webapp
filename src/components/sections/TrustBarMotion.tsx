"use client";

import { motion, useReducedMotion } from "motion/react";

import { fadeTween } from "@/lib/motion/presets";

type TrustBarMotionProps = {
  children: React.ReactNode;
};

export function TrustBarMotion({ children }: TrustBarMotionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return children;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={fadeTween}
    >
      {children}
    </motion.div>
  );
}
