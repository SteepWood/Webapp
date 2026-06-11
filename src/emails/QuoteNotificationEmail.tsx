import { Button, Heading, Hr, Link, Text } from "@react-email/components";

import type { ParsedQuoteEmailData } from "@/lib/email/quoteData";

import { EmailLayout } from "./components/EmailLayout";

type QuoteNotificationEmailProps = ParsedQuoteEmailData;

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Text className="my-1 text-sm leading-6 text-[#3d2e22]">
      <strong className="text-[#1c1410]">{label}:</strong> {value}
    </Text>
  );
}

export function QuoteNotificationEmail({
  reference,
  firstName,
  services,
  scope,
  suburb,
  locationName,
  propertyType,
  budgetRange,
  timeframe,
  preferredContact,
  marketingOptIn,
  projectDescription,
  attachments,
  adminUrl,
}: QuoteNotificationEmailProps) {
  return (
    <EmailLayout preview={`New quote request — ${reference} (${firstName})`}>
      <Heading className="mb-4 text-2xl font-semibold text-[#1c1410]">
        New quote request — {reference}
      </Heading>

      <DetailRow label="Name" value={firstName} />
      <DetailRow label="Services" value={services} />
      <DetailRow label="Scope" value={scope} />
      <DetailRow
        label="Location"
        value={
          locationName ? `${suburb} (${locationName})` : suburb
        }
      />
      <DetailRow label="Property type" value={propertyType} />
      <DetailRow label="Budget" value={budgetRange} />
      <DetailRow label="Timeframe" value={timeframe} />
      <DetailRow label="Preferred contact" value={preferredContact} />
      <DetailRow
        label="Marketing opt-in"
        value={marketingOptIn ? "Yes" : "No"}
      />

      <Hr className="my-6 border-[#e8dfd4]" />

      <Heading
        as="h2"
        className="mb-3 text-lg font-semibold text-[#1c1410]"
      >
        Project description
      </Heading>
      <Text className="mb-6 whitespace-pre-wrap text-base leading-7 text-[#3d2e22]">
        {projectDescription}
      </Text>

      <Heading
        as="h2"
        className="mb-3 text-lg font-semibold text-[#1c1410]"
      >
        Attachments
      </Heading>
      {attachments.length > 0 ? (
        <ul className="mb-6 list-disc space-y-1 pl-5 text-sm text-[#3d2e22]">
          {attachments.map((file) => (
            <li key={file.url}>
              {file.name}{" "}
              <span className="text-xs text-[#6b5c52]">({file.url})</span>
            </li>
          ))}
        </ul>
      ) : (
        <Text className="mb-6 text-sm text-[#6b5c52]">No attachments</Text>
      )}

      <Button
        href={adminUrl}
        className="rounded-md bg-[#b8721f] px-6 py-3 text-sm font-semibold text-white no-underline"
      >
        View in admin
      </Button>

      <Text className="mt-6 text-xs text-[#6b5c52]">
        Or open{" "}
        <Link href={adminUrl} className="text-[#b8721f] no-underline">
          {adminUrl}
        </Link>
      </Text>
    </EmailLayout>
  );
}

export default QuoteNotificationEmail;
