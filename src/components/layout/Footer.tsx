import Image from "next/image";
import Link from "@/components/ui/link";

import { TrackedPhoneLink } from "@/components/analytics/TrackedPhoneLink";

import { SteepWoodLogo } from "@/components/brand/SteepWoodLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LOCATIONS, PHONE_DISPLAY, PHONE_HREF, SERVICES } from "@/lib/navigation";

const footerLinkClass =
  "text-ink-100/80 transition-colors duration-[var(--duration-fast)] hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900";

const LEGAL_LINKS = [
  { href: "/legal/privacy/", label: "Privacy Policy" },
  { href: "/legal/terms/", label: "Terms" },
  { href: "/legal/consumer-rights/", label: "Australian Consumer Law" },
] as const;

const CREDENTIAL_BADGES = [
  { src: "/badges/hia.svg", alt: "Housing Industry Association member" },
  { src: "/badges/mba.svg", alt: "Master Builders Association member" },
  { src: "/badges/houzz.svg", alt: "Houzz professional" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="site-footer"
      className="scroll-mt-24 border-t border-amber-400/20 bg-ink-950 pt-section-y pb-12 text-ink-100"
    >
      <div className="mx-auto max-w-7xl px-container-x">
        <div className="grid grid-cols-1 gap-stack-lg md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="flex flex-col gap-stack-sm">
            <SteepWoodLogo theme="dark" />
            <p className="max-w-xs text-sm leading-relaxed text-ink-100/80">
              Premium custom joinery, crafted in Newcastle. Serving NSW and
              Australia-wide.
            </p>
            <p className="text-caption text-ink-100/60">
              ABN 00 000 000 000 · NSW Builder&apos;s Licence 000000C
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              {CREDENTIAL_BADGES.map((badge) => (
                <Image
                  key={badge.src}
                  src={badge.src}
                  alt={badge.alt}
                  width={72}
                  height={32}
                  className="h-8 w-auto brightness-0 invert opacity-70 transition-opacity duration-[var(--duration-fast)] hover:opacity-100"
                />
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-stack-md font-serif text-h4 text-ink-50">
              Services
            </h4>
            <ul className="flex flex-col gap-2">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/${service.slug}/`}
                    className={footerLinkClass}
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-stack-md font-serif text-h4 text-ink-50">
              Areas We Serve
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {LOCATIONS.map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/locations/${location.slug}/`}
                    className={footerLinkClass}
                  >
                    {location.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-stack-md">
            <div className="flex flex-col gap-2">
              <TrackedPhoneLink
                href={PHONE_HREF}
                context="footer"
                className="text-xl font-medium text-ink-50 transition-colors duration-[var(--duration-fast)] hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
                aria-label={`Call SteepWood on ${PHONE_DISPLAY}`}
              >
                {PHONE_DISPLAY}
              </TrackedPhoneLink>
              <a href="mailto:hello@steepwood.com.au" className={footerLinkClass}>
                hello@steepwood.com.au
              </a>
              <p className="text-sm text-ink-100/80">
                Workshop address coming soon
                <br />
                Newcastle NSW
              </p>
              <p className="text-sm text-ink-100/80">
                Mon–Fri 7am–5pm · Sat by appointment
              </p>
            </div>

            <div>
              <h4 className="mb-stack-sm font-serif text-h4 text-ink-50">
                Newsletter
              </h4>
              {/* TODO: wire newsletter submit to Resend audience API */}
              <form className="flex flex-col gap-2 sm:flex-row" noValidate>
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Email address
                </label>
                <Input
                  id="footer-newsletter-email"
                  type="email"
                  name="email"
                  placeholder="Your email"
                  autoComplete="email"
                  className="border-ink-700 bg-ink-800 text-ink-50 placeholder:text-ink-100/50"
                />
                <Button type="button" className="shrink-0">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-stack-lg flex flex-col gap-4 border-t border-ink-700/40 pt-8 text-sm text-ink-100/70 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {year} SteepWood Joinery Pty Ltd · All rights reserved
          </p>
          <p className="text-center lg:text-left">
            Proudly servicing Newcastle, Hunter Valley &amp; Australia-wide
          </p>
          <nav aria-label="Legal links" className="flex flex-wrap justify-center gap-x-4 gap-y-2 lg:justify-end">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={footerLinkClass}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
