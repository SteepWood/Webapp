import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { IdentityBlock } from "@/components/aio/IdentityBlock";
import { TrackedPhoneLink } from "@/components/analytics/TrackedPhoneLink";
import { ContactForm } from "@/components/forms/ContactForm";
import Link from "@/components/ui/link";
import { SectionShell, contentSubheadingClass } from "@/components/sections/section-shell";
import {
  CONTACT_HOURS_TABLE,
  PHONE_DISPLAY,
  PHONE_HREF,
  PHONE_HOURS_LABEL,
  WORKSHOP_LOCATION,
  GOOGLE_REVIEW_URL,
} from "@/lib/navigation";
import { LOCATIONS } from "@/lib/services-locations/locations";
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
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="mb-stack-md font-serif text-h2 text-ink-900">
              What happens when you contact us
            </h2>
            <div className="prose-steepwood space-y-stack-md text-body leading-relaxed text-ink-800">
              <p>
                Every enquiry is read by our Newcastle studio team — not an
                overseas call centre. We respond within one business day, usually
                sooner for phone messages left during workshop hours.
              </p>
              <p>
                If your message is about a new kitchen, wardrobe, vanity, or
                commercial fitout, we will direct you to our{" "}
                <Link href="/quote/">quote form</Link> so we can capture room
                dimensions, scope, and timeline in one structured request. That
                helps us return accurate fixed-price pricing faster.
              </p>
              <p>
                For press, supplier, careers, or general questions, use the
                contact form on this page. Include your suburb or city so we can
                confirm service availability across our sixteen-city coverage
                area before we book a consultation.
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-stack-md font-serif text-h2 text-ink-900">
              Consultation options
            </h2>
            <ul className="space-y-stack-md text-body leading-relaxed text-ink-800">
              <li>
                <h3 className={contentSubheadingClass}>In-home measure</h3>
                <p className="text-body-sm text-ink-800/80">
                  Available across Newcastle, the Hunter, Sydney, Canberra, and
                  regional NSW on qualifying projects. We bring material samples
                  and discuss layout on site.
                </p>
              </li>
              <li>
                <h3 className={contentSubheadingClass}>Video consultation</h3>
                <p className="text-body-sm text-ink-800/80">
                  Ideal for interstate clients in Melbourne, Brisbane, Perth,
                  Adelaide, and other serviced cities. We review plans and photos
                  together before scheduling freight and install.
                </p>
              </li>
              <li>
                <h3 className={contentSubheadingClass}>Workshop visit</h3>
                <p className="text-body-sm text-ink-800/80">
                  By appointment only. See finished doors, benchtop samples, and
                  hardware in person before you commit to a specification.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </SectionShell>

      <SectionShell>
        <div className="prose-steepwood max-w-3xl text-body leading-relaxed text-ink-800">
          <h2 className="mb-stack-md font-serif text-h2 text-ink-900">
            Where we work
          </h2>
          <p>
            SteepWood is headquartered in Newcastle and services sixteen
            Australian cities: {LOCATIONS.map((location) => location.name).join(", ")}.
            Hunter and Central Coast clients benefit from local install teams;
            Sydney, Canberra, and Wollongong projects are serviced on regular
            routes from the workshop; interstate work is quoted with freight,
            install partners, and lead times confirmed before contract.
          </p>
          <p>
            When you call or write, include your suburb so we can confirm travel,
            measure availability, and realistic programme dates before we book
            a consultation. For full project quotes with dimensions and scope,
            use the dedicated{" "}
            <Link href="/quote/">quote form</Link> so your enquiry reaches the
            right designer immediately.
          </p>
        </div>
      </SectionShell>

      <SectionShell className="bg-ink-50 pt-0">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <article className="rounded-lg border border-ink-700/10 bg-ink-50 p-6">
            <Phone className="mb-4 size-8 text-amber-600" aria-hidden />
            <h2 className={contentSubheadingClass}>Phone</h2>
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
            <h2 className={contentSubheadingClass}>Email</h2>
            <a
              href="mailto:hello@steepwood.com.au"
              className="text-lg font-medium text-ink-900 transition-colors hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              hello@steepwood.com.au
            </a>
          </article>

          <article className="rounded-lg border border-ink-700/10 bg-ink-50 p-6">
            <MapPin className="mb-4 size-8 text-amber-600" aria-hidden />
            <h2 className={contentSubheadingClass}>
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

      <SectionShell>
        <div className="prose-steepwood max-w-3xl text-body leading-relaxed text-ink-800">
          <h2 className="mb-stack-md font-serif text-h2 text-ink-900">
            Response times and after-care
          </h2>
          <p>
            Phone messages and emails received during workshop hours are typically
            answered the same business day. Enquiries sent after hours or on
            Sunday are queued for Monday morning. Urgent site issues for existing
            clients should call {PHONE_DISPLAY} and leave a detailed message with
            your contract reference.
          </p>
          <p>
            After installation, care instructions and warranty documentation are
            emailed to you and stored against your project file. For adjustment
            visits within the warranty period, contact us with photos so we can
            schedule a revisit with the correct parts where needed.
          </p>
          <p>
            Media and partnership enquiries should include your publication name,
            audience, and deadline. Supplier samples can be couriered to our
            Newcastle workshop by prior arrangement — include SDS sheets where
            applicable for new coating or board products. Careers enquiries
            should include your trade qualification and availability for
            Newcastle-based workshop or install roles. We reply to all careers
            submissions within five business days when a suitable role is open.
            Privacy-related requests should reference our privacy policy and
            include enough detail for us to locate your records. We never
            share contact details with third-party marketers.
          </p>
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
              <Link href="/quote/">quote page</Link>.
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
              Service area: {LOCATIONS.map((location) => location.name).join(", ")}.
            </p>
            <p className="text-body-sm leading-relaxed text-ink-800/70">
              Interstate projects are quoted with freight, install partners, and
              lead times confirmed upfront. Newcastle and Hunter clients receive
              priority scheduling for in-home measures because our workshop and
              install teams are based locally.
            </p>
            <p className="text-body-sm text-ink-800/70">
              Past client?{" "}
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-amber-700 underline-offset-2 hover:underline"
              >
                Leave a Google review
              </a>
            </p>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
