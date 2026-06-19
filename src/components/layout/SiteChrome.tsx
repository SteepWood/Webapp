"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandaloneRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/auth");

  if (isStandaloneRoute) {
    return children;
  }

  return (
    <>
      <Header />
      <main className="flex-1 pt-[5.5rem] pb-[calc(5rem+max(0px,env(safe-area-inset-bottom)))] lg:pt-28 lg:pb-0">
        {children}
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
