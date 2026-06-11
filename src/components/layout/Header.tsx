"use client";

import Link from "@/components/ui/link";
import { useEffect, useState } from "react";
import { Menu, Phone } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TrackedPhoneLink } from "@/components/analytics/TrackedPhoneLink";
import { SteepWoodLogo } from "@/components/brand/SteepWoodLogo";
import { LiquidGlassSurface } from "@/components/ui/liquid-glass-surface";
import {
  LOCATIONS,
  PHONE_DISPLAY,
  PHONE_HREF,
  PRIMARY_NAV_LINKS,
  SERVICES,
} from "@/lib/navigation";
import { cn } from "@/lib/utils";

const navLinkClass =
  "rounded-md px-3 py-2 text-sm font-medium text-ink-900 transition-colors hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-50";

function DesktopNav() {
  return (
    <>
      <nav
        aria-label="Main navigation"
        className="hidden items-center gap-1 lg:flex"
      >
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  navLinkClass,
                  "bg-transparent hover:bg-ink-100/60 data-[state=open]:bg-ink-100/60",
                )}
              >
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[520px] grid-cols-2 gap-1 p-4">
                  {SERVICES.map((service) => (
                    <li key={service.slug}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={`/${service.slug}/`}
                          className="block rounded-md p-3 transition-colors hover:bg-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                        >
                          <span className="block text-sm font-medium text-ink-900">
                            {service.label}
                          </span>
                          <span className="mt-1 block text-xs leading-snug text-ink-900/60">
                            {service.preview}
                          </span>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {PRIMARY_NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className={navLinkClass}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="hidden items-center gap-4 lg:flex">
        <TrackedPhoneLink
          href={PHONE_HREF}
          context="header-desktop"
          className={cn(
            navLinkClass,
            "inline-flex items-center gap-2 whitespace-nowrap",
          )}
          aria-label={`Call SteepWood on ${PHONE_DISPLAY}`}
        >
          <Phone className="size-4 shrink-0" aria-hidden />
          {PHONE_DISPLAY}
        </TrackedPhoneLink>
        <Button asChild>
          <Link href="/quote/">Get a Free Measure &amp; Quote</Link>
        </Button>
      </div>
    </>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 h-[5.5rem] pt-safe transition-all duration-[var(--duration-base)] ease-[var(--ease-out-soft)] lg:h-28">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-container-x">
        <SteepWoodLogo priority className="relative z-10 shrink-0" />

        {scrolled ? (
          <LiquidGlassSurface
            fallbackClassName="rounded-full"
            className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1 lg:flex lg:items-center lg:gap-2"
          >
            <DesktopNav />
          </LiquidGlassSurface>
        ) : (
          <div className="hidden flex-1 items-center justify-end gap-4 lg:flex">
            <DesktopNav />
          </div>
        )}

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <SteepWoodLogo priority className="relative z-10" />
            </SheetHeader>

            <nav aria-label="Mobile navigation" className="mt-6 flex flex-col">
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="services">
                  <AccordionTrigger className="text-base font-medium text-ink-900">
                    Services
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex flex-col gap-1 pl-1">
                      {SERVICES.map((service) => (
                        <li key={service.slug}>
                          <Link
                            href={`/${service.slug}/`}
                            className="block rounded-md px-2 py-2 text-sm text-ink-900/80 transition-colors hover:bg-ink-100 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                            onClick={closeMobile}
                          >
                            {service.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="locations">
                  <AccordionTrigger className="text-base font-medium text-ink-900">
                    Locations
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="grid grid-cols-2 gap-1 pl-1">
                      {LOCATIONS.map((location) => (
                        <li key={location.slug}>
                          <Link
                            href={`/locations/${location.slug}/`}
                            className="block rounded-md px-2 py-2 text-sm text-ink-900/80 transition-colors hover:bg-ink-100 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                            onClick={closeMobile}
                          >
                            {location.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-2 flex flex-col border-t border-ink-700/10 pt-2">
                {PRIMARY_NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-md px-2 py-3 text-base font-medium text-ink-900 transition-colors hover:bg-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    onClick={closeMobile}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="mt-8 flex flex-col gap-3">
              <Button variant="outline" size="lg" className="w-full" asChild>
                <TrackedPhoneLink
                  href={PHONE_HREF}
                  context="header-mobile"
                  onClick={closeMobile}
                >
                  <Phone className="size-4" aria-hidden />
                  Call {PHONE_DISPLAY}
                </TrackedPhoneLink>
              </Button>
              <Button size="lg" className="w-full" asChild>
                <Link href="/quote/" onClick={closeMobile}>
                  Get a Free Measure &amp; Quote
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
