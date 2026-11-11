import Link from "@/components/ui/link";
import Image from "next/image";

import { TrackedPhoneLink } from "@/components/analytics/TrackedPhoneLink";
import { Button } from "@/components/ui/button";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/navigation";

export function FinalCTA() {
  return (
    <aside className="relative min-h-[420px] overflow-hidden rounded-lg">
      <Image
        src="/images/services/built-in-wardrobes-hero.jpg"
        alt="Built-in wardrobe joinery in warm timber, made by SteepWood in Newcastle"
        fill
        sizes="(max-width: 1024px) 100vw, 36vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[rgba(30,20,13,0.92)] via-[rgba(30,20,13,0.45)] to-[rgba(30,20,13,0.12)]"
      />
      <div className="relative flex min-h-[420px] flex-col justify-end p-6 text-[#f7f2ea] sm:p-8">
        <h2 className="mb-3 font-serif text-[2rem] leading-[1.15] text-[#f7f2ea] lg:text-[2.625rem]">
          Ready to start your project?
        </h2>
        <p className="mb-6 max-w-md text-base leading-relaxed text-[#f7f2ea]/90">
          Free design consultation, fixed-price quote within 5 working days, no
          obligation.
        </p>
        <div className="flex flex-col gap-3">
          <Button asChild size="xl" className="w-full sm:w-auto">
            <Link href="/contact/">Get a Free Quote</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="xl"
            className="w-full border-ink-50/90 bg-transparent text-ink-50 hover:border-amber-100 hover:bg-ink-50 hover:text-ink-900 sm:w-auto"
          >
            <TrackedPhoneLink href={PHONE_HREF} context="final-cta">
              Call us — {PHONE_DISPLAY}
            </TrackedPhoneLink>
          </Button>
        </div>
      </div>
    </aside>
  );
}
