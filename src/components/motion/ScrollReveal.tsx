"use client";

import { motion, useReducedMotion } from "motion/react";

import {
  fadeUpItem,
  scrollRevealViewport,
  staggerContainer,
} from "@/lib/motion/presets";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 1, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={scrollRevealViewport}
      transition={{ ...fadeUpItem.show.transition, delay }}
    >
      {children}
    </motion.div>
  );
}

type StaggerTag = "div" | "ul" | "ol";
type ItemTag = "div" | "li";

const staggerMotion = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
} as const;

const itemMotion = {
  div: motion.div,
  li: motion.li,
} as const;

type ScrollRevealStaggerProps = {
  children: React.ReactNode;
  className?: string;
  as?: StaggerTag;
};

export function ScrollRevealStagger({
  children,
  className,
  as = "div",
}: ScrollRevealStaggerProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionComp = staggerMotion[as];

  if (shouldReduceMotion) {
    const Comp = as;
    return <Comp className={className}>{children}</Comp>;
  }

  return (
    <MotionComp
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={scrollRevealViewport}
    >
      {children}
    </MotionComp>
  );
}

export function ScrollRevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: ItemTag;
}) {
  const shouldReduceMotion = useReducedMotion();
  const MotionComp = itemMotion[as];

  if (shouldReduceMotion) {
    const Comp = as;
    return <Comp className={className}>{children}</Comp>;
  }

  return (
    <MotionComp variants={fadeUpItem} className={cn(className)}>
      {children}
    </MotionComp>
  );
}
