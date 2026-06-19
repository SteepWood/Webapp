import Link from "@/components/ui/link";

import { TrackedPhoneLink } from "@/components/analytics/TrackedPhoneLink";
import { SteepWoodLogo } from "@/components/brand/SteepWoodLogo";
import { FooterNewsletter } from "@/components/layout/FooterNewsletter";
import { BUSINESS_COPYRIGHT_LINE, BUSINESS_CREDENTIALS_FOOTER } from "@/lib/business";
import { FOOTER_HOURS_LABEL, LOCATIONS, PHONE_DISPLAY, PHONE_HREF, SERVICES, WORKSHOP_LOCATION } from "@/lib/navigation";

const footerLinkClass =
  "text-ink-100/80 transition-colors duration-[var(--duration-fast)] hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900";

const LEGAL_LINKS = [
  { href: "/legal/privacy/", label: "Privacy Policy" },
  { href: "/legal/terms/", label: "Terms" },
  { href: "/legal/consumer-rights/", label: "Australian Consumer Law" },
] as const;

const DEVELOPER_CREDIT = {
  label: "Newcastle Technology Services",
  href: "https://newytechs.com.au/",
} as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="site-footer"
      className="scroll-mt-24 border-t border-amber-400/20 bg-ink-950 pt-section-half pb-12 text-ink-100"
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
              {BUSINESS_CREDENTIALS_FOOTER}
            </p>
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
              <p className="text-sm text-ink-100/80">{WORKSHOP_LOCATION}</p>
              <p className="text-sm text-ink-100/80">{FOOTER_HOURS_LABEL}</p>
            </div>

            <FooterNewsletter />
          </div>
        </div>

        <div className="mt-stack-lg flex flex-col items-center gap-4 border-t border-ink-700/40 pt-8 text-center text-sm text-ink-100/70 lg:flex-row lg:items-center lg:justify-between lg:text-left">
          <p className="max-w-prose lg:max-w-none">
            © {year} {BUSINESS_COPYRIGHT_LINE} · All rights reserved
          </p>
          <p className="max-w-prose lg:max-w-none">
            Proudly servicing Newcastle, Hunter Valley &amp; Australia-wide
          </p>
          <nav
            aria-label="Legal links"
            className="flex w-full flex-wrap justify-center gap-x-4 gap-y-2 lg:w-auto lg:justify-end"
          >
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={footerLinkClass}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div
          className="border-t border-ink-700/30 py-4 text-center text-xs text-ink-100/55"
          aria-label="Site credit"
        >
          Designed and Developed by{" "}
          <a
            href={DEVELOPER_CREDIT.href}
            className="text-ink-100/75 underline decoration-ink-100/30 underline-offset-2 transition-colors duration-[var(--duration-fast)] hover:text-amber-400 hover:decoration-amber-400/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
            target="_blank"
            rel="noopener noreferrer"
          >
            {DEVELOPER_CREDIT.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
