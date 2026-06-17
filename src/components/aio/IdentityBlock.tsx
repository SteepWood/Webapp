import { getIdentityParagraph } from "@/lib/aio/constants";
import { cn } from "@/lib/utils";

type IdentityBlockProps = {
  locationSlug?: string;
  className?: string;
};

export function IdentityBlock({ locationSlug, className }: IdentityBlockProps) {
  return (
    <p
      className={cn(
        "text-body leading-relaxed text-ink-800",
        className,
      )}
      data-aio="identity-block"
    >
      {getIdentityParagraph(locationSlug)}
    </p>
  );
}
