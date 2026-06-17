import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { IdentityBlock } from "@/components/aio/IdentityBlock";
import { TrackedPhoneLink } from "@/components/analytics/TrackedPhoneLink";
import { ContactForm } from "@/components/forms/ContactForm";
import { SectionShell } from "@/components/sections/section-shell";
import {
  CONTACT_HOURS_TABLE,
  PHONE_DISPLAY,
  PHONE_HREF,
  PHONE_HOURS_LABEL,
  WORKSHOP_LOCATION,
} from "@/lib/navigation";
import { canonicalUrl } from "@/lib/seo/canonical";

export const revalidate = 86400;

const WORKSHOP_ADDRESS = WORKSHOP_LOCATION;
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Newcastle+NSW+Australia";
const MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d378678.894!2d151.7817!3d-32.9283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b13147e6827613f%3A0x304f0bed60d7010!2sNewcastle%20NSW%2C%20Australia!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau";

export const metadata: Metadata = {
  title: "Contact SteepWood — Free Joinery Quote",
  description:
    "Get a free design consultation and fixed-price quote for custom joinery. Phone, email, or contact form. Servicing 16 Australian cities from Newcastle.",
  alternates: {
    canonical: canonicalUrl("/contact/"),
    languages: {
      "en-AU": canonicalUrl("/contact/"),
    },
  },
  openGraph: {
    title: "Contact SteepWood — Free Joinery Quote",
    description:
      "Get a free design consultation and fixed-price quote for custom joinery. Phone, email, or contact form. Servicing 16 Australian cities from Newcastle.",
    url: canonicalUrl("/contact/"),
    siteName: "SteepWood",
    locale: "en_AU",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <SectionShell>
        <div className="max-w-3xl">
          <p className="mb-stack-sm font-mono text-caption uppercase tracking-widest text-amber-600">
            Get in touch
          </p>
          <h1 className="mb-stack-md font-serif text-display-2 text-ink-900">
            Get a Free Design Consultation
          </h1>
          <IdentityBlock className="mb-stack-md" />
          <p className="font-serif text-h4 text-ink-800/90">Let&apos;s talk.</p>
          <p className="mt-stack-sm text-body-lg text-ink-800">
            Tell us about your project and we&apos;ll book a free consultation —
            in-home for NSW, ACT, and Hunter clients, via video for interstate.
            Most quotes are returned within 5 working days of measurement. No
            obligation, no pressure pricing, and no &ldquo;from&rdquo; estimates
            that change after you sign.
          </p>
        </div>
      </SectionShell>

      <SectionShell className="bg-ink-50 pt-0">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <article className="rounded-lg border border-ink-700/10 bg-ink-50 p-6">
            <Phone className="mb-4 size-8 text-amber-600" aria-hidden />
            <h2 className="mb-2 font-serif text-h4 text-ink-900">Phone</h2>
            <TrackedPhoneLink
              href={PHONE_HREF}
              context="contact-page"
              className="text-xl font-medium text-ink-900 transition-colors hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              {PHONE_DISPLAY}
            </TrackedPhoneLink>
            <p className="mt-2 text-body-sm text-ink-800/70">
              {PHONE_HOURS_LABEL}
            </p>
          </article>

          <article className="rounded-lg border border-ink-700/10 bg-ink-50 p-6">
            <Mail className="mb-4 size-8 text-amber-600" aria-hidden />
            <h2 className="mb-2 font-serif text-h4 text-ink-900">Email</h2>
            <a
              href="mailto:hello@steepwood.com.au"
              className="text-lg font-medium text-ink-900 transition-colors hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              hello@steepwood.com.au
            </a>
          </article>

          <article className="rounded-lg border border-ink-700/10 bg-ink-50 p-6">
            <MapPin className="mb-4 size-8 text-amber-600" aria-hidden />
            <h2 className="mb-2 font-serif text-h4 text-ink-900">
              Workshop visit
            </h2>
            <p className="text-body-sm text-ink-800/80">{WORKSHOP_ADDRESS}</p>
            <p className="mt-2 text-body-sm text-ink-800/70">By appointment</p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-amber-600 underline-offset-4 hover:underline"
            >
              Open in Google Maps
            </a>
          </article>
        </div>
      </SectionShell>

      <SectionShell className="pt-0">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-stack-md font-serif text-h2 text-ink-900">
              Send an enquiry
            </h2>
            <p className="mb-stack-lg text-body text-ink-800/80">
              For general enquiries, press, supplier, or careers contact — use
              the form below. For project quotes, visit our{" "}
              <a
                href="/quote/"
                className="text-amber-600 underline-offset-4 hover:underline"
              >
                quote page
              </a>
              .
            </p>
            <ContactForm />
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <h2 className="mb-stack-md font-serif text-h2 text-ink-900">
                Opening hours
              </h2>
              <table className="w-full text-left text-body-sm">
                <tbody>
                  {CONTACT_HOURS_TABLE.map((row) => (
                    <tr
                      key={row.days}
                      className="border-b border-ink-700/10 last:border-0"
                    >
                      <th
                        scope="row"
                        className="py-3 pr-4 font-medium text-ink-900"
                      >
                        {row.days}
                      </th>
                      <td className="py-3 text-ink-800/80">{row.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h2 className="mb-stack-sm font-serif text-h2 text-ink-900">
                Workshop location
              </h2>
              <p className="mb-stack-md text-body-sm text-ink-800/80">
                {WORKSHOP_ADDRESS}
              </p>
              <div className="min-h-[16rem] w-full rounded-lg border border-ink-700/10 sm:min-h-[20rem]">
                <iframe
                  title="SteepWood workshop location in Newcastle NSW"
                  src={MAPS_EMBED_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="aspect-[4/3] h-auto min-h-[16rem] w-full border-0 sm:min-h-[20rem]"
                  allowFullScreen
                />
              </div>
            </div>

            <p className="text-body-sm text-ink-800/70">
              Service area: 16 cities across NSW, ACT, QLD, VIC, SA, and WA.
            </p>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
