"use client";

import Link from "@/components/ui/link";
import { useEffect, useState } from "react";
import { ClipboardList, Phone } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { TrackedPhoneLink } from "@/components/analytics/TrackedPhoneLink";
import { PHONE_HREF } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.35);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setFooterInView(entry.isIntersecting);
        }
      },
      { threshold: 0, rootMargin: "0px 0px 0px 0px" },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const showCta = visible && !footerInView;

  return (
    <motion.div
      role="region"
      aria-label="Quick contact actions"
      inert={!showCta ? true : undefined}
      className="fixed right-0 bottom-0 left-0 z-50 px-4 pb-safe lg:hidden"
      initial={false}
      animate={{
        y: showCta ? 0 : "110%",
        opacity: showCta ? 1 : 0,
      }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
      }
    >
      <div
        className={cn(
          "surface-card mx-auto mb-3 max-w-md overflow-hidden rounded-lg bg-white/95 shadow-lg backdrop-blur-xl",
          !showCta && "pointer-events-none",
        )}
      >
        <div className="flex min-h-14 items-center">
          <TrackedPhoneLink
            href={PHONE_HREF}
            context="sticky-mobile-cta"
            className="flex min-h-11 flex-1 items-center justify-center gap-2 text-sm font-medium text-ink-900 transition-colors hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-inset"
            aria-label="Call SteepWood"
          >
            <Phone className="size-4 shrink-0" aria-hidden />
            Call
          </TrackedPhoneLink>

          <div className="h-8 w-px bg-ink-700/15" aria-hidden />

          <Link
            href="/quote/"
            className="flex min-h-11 flex-1 items-center justify-center gap-2 border-l border-amber-600/20 bg-wood-texture text-sm font-medium text-on-wood hover:brightness-95 active:brightness-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-inset"
          >
            <ClipboardList className="size-4 shrink-0" aria-hidden />
            Free Quote
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
