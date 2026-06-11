"use client";

import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";

import { updateQuoteStatus } from "@/app/actions/admin/quotes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  QUOTE_STATUSES,
  type QuoteStatus,
} from "@/lib/validations/admin/quotes";

type QuoteStatusSelectProps = {
  quoteId: string;
  initialStatus: string;
};

export function QuoteStatusSelect({
  quoteId,
  initialStatus,
}: QuoteStatusSelectProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(
    initialStatus as QuoteStatus,
  );

  function handleChange(value: string) {
    const status = value as QuoteStatus;

    startTransition(async () => {
      setOptimisticStatus(status);
      const result = await updateQuoteStatus({ id: quoteId, status });

      if (!result.ok) {
        toast.error(result.error);
      } else {
        toast.success("Status updated.");
      }
    });
  }

  return (
    <Select
      value={optimisticStatus}
      onValueChange={handleChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-44">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {QUOTE_STATUSES.map((status) => (
          <SelectItem key={status} value={status}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
