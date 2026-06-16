export const defaultSpring = {
  type: "spring" as const,
  stiffness: 220,
  damping: 28,
  mass: 0.8,
};

export const revealTween = {
  duration: 0.65,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export const hoverTween = {
  duration: 0.35,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export const fadeTween = {
  duration: 0.25,
  ease: [0.2, 0, 0, 1] as [number, number, number, number],
};

export const staggerContainer = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

export const fadeUpItem = {
  hidden: { opacity: 1, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: revealTween,
  },
};

export const scrollRevealViewport = {
  once: true,
  margin: "0px 0px -4% 0px",
  amount: 0.12,
} as const;
