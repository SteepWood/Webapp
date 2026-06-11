"use client";

import Link from "@/components/ui/link";
import { useEffect, useState } from "react";
import { ClipboardList, Phone } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { TrackedPhoneLink } from "@/components/analytics/TrackedPhoneLink";
import { LiquidGlassSurface } from "@/components/ui/liquid-glass-surface";
import { PHONE_HREF } from "@/lib/navigation";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.3);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      role="region"
      aria-label="Quick contact actions"
      className="fixed right-0 bottom-4 left-0 z-50 px-4 pb-safe lg:hidden"
      initial={false}
      animate={{ y: visible ? 0 : "120%" }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }
      }
    >
      <LiquidGlassSurface
        fallbackClassName="rounded-full"
        className="mx-auto max-w-md rounded-full"
      >
        <div className="flex min-h-14 items-center">
          <TrackedPhoneLink
            href={PHONE_HREF}
            context="sticky-mobile-cta"
            className="flex min-h-11 flex-1 items-center justify-center gap-2 text-sm font-semibold text-ink-900 transition-colors hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-inset"
            aria-label="Call SteepWood"
          >
            <Phone className="size-4 shrink-0" aria-hidden />
            Call
          </TrackedPhoneLink>

          <div className="h-8 w-px bg-ink-700/20" aria-hidden />

          <Link
            href="/quote/"
            className="flex min-h-11 flex-1 items-center justify-center gap-2 text-sm font-semibold text-ink-900 transition-colors hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-inset"
          >
            <ClipboardList className="size-4 shrink-0" aria-hidden />
            Free Quote
          </Link>
        </div>
      </LiquidGlassSurface>
    </motion.div>
  );
}
