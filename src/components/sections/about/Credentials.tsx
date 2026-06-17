import { SectionShell } from "@/components/sections/section-shell";
import { BUSINESS_CREDENTIALS_LIST } from "@/lib/business";

export function Credentials() {
  return (
    <SectionShell className="relative border-y border-ink-800 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950 text-ink-100">
      <div className="max-w-2xl">
        <h2 className="mb-stack-md font-serif text-h2 text-ink-50">
          Credentials
        </h2>
        <p className="mb-stack-lg text-body-lg text-ink-100/80">
          We are happy to provide licence and registration documentation on
          request.
        </p>
        <ul className="flex flex-col gap-3">
          {BUSINESS_CREDENTIALS_LIST.map((item) => (
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
    </SectionShell>
  );
}
