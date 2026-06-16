import Image from "next/image";

import { SectionShell } from "@/components/sections/section-shell";

const CREDENTIALS = [
  "Housing Industry Association (HIA) member",
  "Master Builders Association (MBA) NSW member",
  "NSW Builder's Licence 000000C",
  "ABN 00 000 000 000",
  "Public liability insurance — $20 million",
  "Workers' compensation cover — current",
  "10-year structural warranty on residential joinery",
  "Blum hardware warranty — 25 years",
] as const;

export function Credentials() {
  return (
    <SectionShell className="relative border-y border-ink-800 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950 text-ink-100">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="mb-stack-md font-serif text-h2 text-ink-50">
            Credentials and memberships
          </h2>
          <p className="mb-stack-lg text-body-lg text-ink-100/80">
            We carry the licences, insurances, and industry memberships our
            clients expect from a premium joinery business — and we are happy
            to provide documentation on request.
          </p>
          <ul className="flex flex-col gap-3">
            {CREDENTIALS.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-body-sm leading-relaxed text-ink-100/90"
              >
                <span className="text-amber-500" aria-hidden>
                  —
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 rounded-lg border border-amber-400/25 bg-ink-800 p-8 shadow-lg ring-1 ring-ink-50/10">
          <Image
            src="/badges/hia.svg"
            alt="HIA member"
            width={96}
            height={40}
            className="h-10 w-auto brightness-0 invert opacity-80"
          />
          <Image
            src="/badges/mba.svg"
            alt="MBA member"
            width={96}
            height={40}
            className="h-10 w-auto brightness-0 invert opacity-80"
          />
          <Image
            src="/badges/houzz.svg"
            alt="Houzz professional"
            width={112}
            height={40}
            className="h-10 w-auto brightness-0 invert opacity-80"
          />
        </div>
      </div>
    </SectionShell>
  );
}
