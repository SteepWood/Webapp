import Link from "@/components/ui/link";

import { SectionShell, contentSubheadingClass } from "@/components/sections/section-shell";
import { LOCATIONS } from "@/lib/services-locations/locations";

const PROCESS_STEPS = [
  {
    title: "Tell us about your project",
    description:
      "Share the room, scope, timeline, and any inspiration images. The more detail you provide in step one, the faster we can route your enquiry to the right designer.",
  },
  {
    title: "Book a consultation",
    description:
      "We confirm whether your project suits our workshop capacity and schedule an in-home measure across NSW and the ACT, or a video consultation for interstate clients.",
  },
  {
    title: "Receive a fixed-price quote",
    description:
      "Within five working days of measurement you receive itemised pricing, material schedules, and programme dates. No hidden variations after contract — the price you approve is the price you pay.",
  },
  {
    title: "Approve drawings and manufacture",
    description:
      "Once you sign off shop drawings, production begins in our Newcastle workshop. We keep you updated at key milestones before dispatch and install.",
  },
] as const;

const QUOTE_FAQ = [
  {
    question: "Is the online quote really free?",
    answer:
      "Yes. There is no charge for the three-step enquiry, design consultation, or site measure on qualifying projects. You only pay once you accept a written fixed-price contract and any deposit stated in that document.",
  },
  {
    question: "How long until I receive pricing?",
    answer:
      "Most clients receive a fixed-price quote within five working days of measurement. Complex whole-home or commercial scopes may take slightly longer; we will confirm the programme at consultation.",
  },
  {
    question: "Do you service my city?",
    answer:
      "We service sixteen Australian cities from our Newcastle workshop, including Sydney, Canberra, Melbourne, Brisbane, the Gold Coast, Newcastle, the Hunter Valley, the Central Coast, Wollongong, Perth, Byron Bay, Port Macquarie, Coffs Harbour, Adelaide, Bathurst, and Orange.",
  },
  {
    question: "What files should I upload?",
    answer:
      "PDF plans, builder schedules, and JPG or PNG photos of the existing space are ideal. Each file can be up to 10 MB. Uploads are optional in step three but help us assess joinery complexity before we visit site.",
  },
  {
    question: "Can builders and designers submit on behalf of clients?",
    answer:
      "Yes. Note the project address, builder or designer contact details, and target programme in step one. We regularly work with trade partners and can issue quotes to the appropriate party named in the contract.",
  },
  {
    question: "What happens after I submit?",
    answer:
      "Our studio reviews your scope within one business day, confirms service availability for your location, and books the next step — usually an in-home measure or video consultation. You will receive email confirmation at each stage.",
  },
] as const;

const INCLUDED_IN_QUOTE = [
  "Itemised cabinetry pricing with material and finish schedules",
  "Hardware specification (Blum, Hettich, or client-nominated equivalents)",
  "Benchtop allowance or nominated stone/engineered surface",
  "Installation programme and site access requirements",
  "Ten-year structural warranty terms and care instructions",
] as const;

export function QuotePageIntro() {
  const serviceAreaNames = LOCATIONS.map((location) => location.name).join(", ");

  return (
    <>
    <SectionShell className="pb-0">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="mb-stack-md font-serif text-h2 text-ink-900">
            How our quote process works
          </h2>
          <ol className="space-y-stack-md">
            {PROCESS_STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span
                  className="font-serif text-3xl leading-none text-amber-600"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className={contentSubheadingClass}>{step.title}</h3>
                  <p className="text-body-sm leading-relaxed text-ink-800/80">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="prose-steepwood text-body leading-relaxed text-ink-800">
          <h2 className="mb-stack-md font-serif text-h2 text-ink-900">
            What to prepare before you start
          </h2>
          <p>
            Have approximate room dimensions, photos of the existing space, and
            any plans from your builder or architect ready. If you are comparing
            benchtop, door, or hardware options, note your preferences — we can
            refine finishes during the design consultation.
          </p>
          <p>
            SteepWood designs and manufactures custom kitchens, wardrobes,
            vanities, laundry joinery, home offices, staircases, commercial
            fitouts, and shopfitting from our Newcastle workshop. We service{" "}
            {serviceAreaNames}, and interstate projects are quoted with freight
            and install co-ordinated upfront.
          </p>
          <p>
            For general enquiries that are not project quotes, use our{" "}
            <Link href="/contact/">contact page</Link> instead. For warranty or
            after-care questions, email{" "}
            <a
              href="mailto:hello@steepwood.com.au"
              className="text-amber-700 underline-offset-2 hover:underline"
            >
              hello@steepwood.com.au
            </a>{" "}
            with your original contract reference.
          </p>
          <p>
            Uploads are optional in step three but help us assess complexity
            sooner. We accept PDF plans and JPG or PNG photos up to 10 MB per
            file. Your details are stored securely and used only to prepare your
            quote, in line with our{" "}
            <Link href="/legal/privacy/">privacy policy</Link>.
          </p>
        </div>
      </div>

      <div className="mt-stack-xl grid grid-cols-1 gap-10 border-t border-ink-700/10 pt-stack-xl lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="mb-stack-md font-serif text-h2 text-ink-900">
            What your fixed-price quote includes
          </h2>
          <ul className="space-y-3 text-body leading-relaxed text-ink-800">
            {INCLUDED_IN_QUOTE.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-amber-600" aria-hidden>
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-stack-md text-body-sm text-ink-800/80">
            Variations after contract are documented in writing with revised
            pricing before manufacture changes proceed. We do not use open-ended
            hourly allowances for standard residential joinery.
          </p>
        </div>

        <div>
          <h2 className="mb-stack-md font-serif text-h2 text-ink-900">
            Common questions before you submit
          </h2>
          <dl className="space-y-stack-md">
            {QUOTE_FAQ.map((item) => (
              <div key={item.question}>
                <dt className="font-medium text-ink-900">{item.question}</dt>
                <dd className="mt-1 text-body-sm leading-relaxed text-ink-800/80">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </SectionShell>

    <SectionShell className="bg-ink-50">
      <div className="prose-steepwood mx-auto max-w-3xl text-body leading-relaxed text-ink-800">
        <h2 className="mb-stack-md font-serif text-h2 text-ink-900">
          Project types we quote online
        </h2>
        <p>
          Use this form for residential kitchens and butler&apos;s pantries,
          built-in and walk-in wardrobes, bathroom vanities, laundry storage,
          home office joinery, timber staircases, and commercial fitouts including
          offices, retail, and hospitality. If your scope spans multiple rooms,
          describe the full programme in step one so we can allocate the right
          designer and workshop capacity.
        </p>
        <p>
          We do not quote supply-only flat-pack assembly, structural building
          work, or appliance installation as standalone services. Builder and
          designer referrals are welcome — include trade contact details where
          drawings will be issued to a third party.
        </p>
        <p>
          If you prefer to speak before completing the form, call during workshop
          hours or email hello@steepwood.com.au with your suburb and project
          type. We will send a link to this form if we need structured scope
          details for pricing.
        </p>
      </div>
    </SectionShell>
    </>
  );
}
