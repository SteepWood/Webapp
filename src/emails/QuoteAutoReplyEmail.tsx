import { Heading, Hr, Link, Text } from "@react-email/components";

import type { ParsedQuoteEmailData } from "@/lib/email/quoteData";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/navigation";

import { EmailLayout } from "./components/EmailLayout";

const NEXT_STEPS = [
  "We review your project details and any photos you've shared.",
  "A SteepWood team member contacts you to confirm scope and timing.",
  "We arrange a free in-home measure at a time that suits you.",
  "You receive a fixed-price quote — no obligation to proceed.",
] as const;

type QuoteAutoReplyEmailProps = Pick<
  ParsedQuoteEmailData,
  "greetingName" | "reference"
>;

export function QuoteAutoReplyEmail({
  greetingName,
  reference,
}: QuoteAutoReplyEmailProps) {
  return (
    <EmailLayout preview={`Your SteepWood quote request — ref ${reference}`}>
      <Heading className="mb-4 text-2xl font-semibold text-[#1c1410]">
        Thanks, {greetingName} — we&apos;ve received your quote request
      </Heading>
      <Text className="mb-4 text-base leading-7 text-[#3d2e22]">
        Your reference number is{" "}
        <strong className="font-semibold text-[#1c1410]">{reference}</strong>.
        Our team will be in touch within 1 business day.
      </Text>

      <Heading
        as="h2"
        className="mb-3 text-lg font-semibold text-[#1c1410]"
      >
        What happens next
      </Heading>
      <ol className="mb-6 list-decimal space-y-2 pl-5 text-base leading-7 text-[#3d2e22]">
        {NEXT_STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <Hr className="my-6 border-[#e8dfd4]" />

      <Text className="mb-2 text-base leading-7 text-[#3d2e22]">
        Questions? Reply to this email or call us on{" "}
        <Link href={PHONE_HREF} className="text-[#b8721f] no-underline">
          {PHONE_DISPLAY}
        </Link>
        .
      </Text>
      <Text className="text-base leading-7 text-[#3d2e22]">
        — The SteepWood team
      </Text>
    </EmailLayout>
  );
}

export default QuoteAutoReplyEmail;
