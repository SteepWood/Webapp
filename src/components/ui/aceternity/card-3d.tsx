"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export function CardContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !containerRef.current) {
      return;
    }

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (event.clientX - left - width / 2) / 25;
    const y = (event.clientY - top - height / 2) / 25;
    containerRef.current.style.setProperty("--rotate-x", `${Math.max(Math.min(-y, 6), -6)}deg`);
    containerRef.current.style.setProperty("--rotate-y", `${Math.max(Math.min(x, 6), -6)}deg`);
  };

  const handleMouseEnter = () => setIsMouseEntered(true);
  const handleMouseLeave = () => {
    setIsMouseEntered(false);
    if (containerRef.current) {
      containerRef.current.style.setProperty("--rotate-x", "0deg");
      containerRef.current.style.setProperty("--rotate-y", "0deg");
    }
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn("py-2 [perspective:1000px]", className)}
        style={
          {
            "--rotate-x": "0deg",
            "--rotate-y": "0deg",
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </MouseEnterContext.Provider>
  );
}

export function CardBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "h-full w-full transition-transform duration-200 ease-out",
        !shouldReduceMotion &&
          "[transform:rotateX(var(--rotate-x))_rotateY(var(--rotate-y))]",
        className,
      )}
      style={shouldReduceMotion ? undefined : { transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

export function CardItem({
  children,
  className,
  translateZ = 0,
}: {
  children: React.ReactNode;
  className?: string;
  translateZ?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const context = useContext(MouseEnterContext);

  if (!context) {
    throw new Error("CardItem must be used within CardContainer");
  }

  const [isMouseEntered] = context;
  const cappedZ = Math.min(translateZ, 20);

  return (
    <div
      className={cn("w-full transition-transform duration-200 ease-out", className)}
      style={
        shouldReduceMotion || !isMouseEntered
          ? undefined
          : { transform: `translateZ(${cappedZ}px)` }
      }
    >
      {children}
    </div>
  );
}
