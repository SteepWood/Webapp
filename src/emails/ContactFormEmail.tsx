import { Heading, Hr, Text } from "@react-email/components";

import { EmailLayout } from "./components/EmailLayout";

export type ContactFormEmailProps = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Text className="my-1 text-sm leading-6 text-[#3d2e22]">
      <strong className="text-[#1c1410]">{label}:</strong> {value}
    </Text>
  );
}

export function ContactFormEmail({
  name,
  email,
  phone,
  subject,
  message,
}: ContactFormEmailProps) {
  return (
    <EmailLayout preview={`New contact enquiry — ${subject} (${name})`}>
      <Heading className="mb-4 text-2xl font-semibold text-[#1c1410]">
        New contact enquiry
      </Heading>

      <DetailRow label="Name" value={name} />
      <DetailRow label="Email" value={email} />
      {phone ? <DetailRow label="Phone" value={phone} /> : null}
      <DetailRow label="Subject" value={subject} />

      <Hr className="my-6 border-[#e8dfd4]" />

      <Heading
        as="h2"
        className="mb-3 text-lg font-semibold text-[#1c1410]"
      >
        Message
      </Heading>
      <Text className="whitespace-pre-wrap text-base leading-7 text-[#3d2e22]">
        {message}
      </Text>
    </EmailLayout>
  );
}

export default ContactFormEmail;
