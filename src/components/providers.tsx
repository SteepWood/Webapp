"use client";

import { ThemeProvider } from "next-themes";

import { LenisProvider } from "@/components/providers/LenisProvider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      enableColorScheme={false}
    >
      <LenisProvider>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </LenisProvider>
    </ThemeProvider>
  );
}
