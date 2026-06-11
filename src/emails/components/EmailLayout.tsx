import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";
import type { ReactNode } from "react";

type EmailLayoutProps = {
  preview: string;
  children: ReactNode;
};

export function EmailLayout({ preview, children }: EmailLayoutProps) {
  return (
    <Html lang="en-AU">
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind>
        <Body className="bg-[#faf7f2] font-sans text-[#1c1410]">
          <Container className="mx-auto my-8 max-w-[600px] rounded-lg border border-[#e8dfd4] bg-white px-8 py-10">
            <Text className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#b8721f]">
              SteepWood Joinery
            </Text>
            {children}
            <Text className="mt-8 border-t border-[#e8dfd4] pt-6 text-center text-xs text-[#6b5c52]">
              SteepWood — Premium custom joinery from Newcastle NSW
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
