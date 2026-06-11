export const defaultSpring = {
  type: "spring" as const,
  stiffness: 260,
  damping: 22,
  mass: 0.6,
};

export const heroSpring = {
  type: "spring" as const,
  mass: 0.5,
  stiffness: 100,
  damping: 14,
};

export const hoverSpring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 24,
};

export const fadeTween = {
  duration: 0.25,
  ease: [0.2, 0, 0, 1] as [number, number, number, number],
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

export const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};
