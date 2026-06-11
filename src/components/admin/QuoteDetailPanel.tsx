"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import {
  markQuoteContacted,
  updateQuoteNotes,
} from "@/app/actions/admin/quotes";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { QuoteStatusSelect } from "./QuoteStatusSelect";

type QuoteDetailPanelProps = {
  quoteId: string;
  status: string;
  initialNotes: string;
};

export function QuoteDetailPanel({
  quoteId,
  status,
  initialNotes,
}: QuoteDetailPanelProps) {
  const [notes, setNotes] = useState(initialNotes);
  const [isPending, startTransition] = useTransition();

  function handleSaveNotes() {
    startTransition(async () => {
      const result = await updateQuoteNotes({ id: quoteId, adminNotes: notes });

      if (!result.ok) {
        toast.error(result.error);
        return;
      }

      toast.success("Notes saved.");
    });
  }

  function handleMarkContacted() {
    startTransition(async () => {
      const result = await markQuoteContacted({ id: quoteId });

      if (!result.ok) {
        toast.error(result.error);
        return;
      }

      toast.success("Marked as contacted and email sent.");
    });
  }

  return (
    <div className="space-y-6 rounded-lg border border-ink-700/10 bg-white p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-body-sm text-ink-800/70">Status</p>
          <div className="mt-2">
            <QuoteStatusSelect quoteId={quoteId} initialStatus={status} />
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleMarkContacted}
          disabled={isPending}
        >
          Mark as contacted
        </Button>
      </div>

      <div>
        <label
          htmlFor="admin-notes"
          className="mb-2 block text-body-sm font-medium text-ink-900"
        >
          Internal notes
        </label>
        <Textarea
          id="admin-notes"
          rows={6}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Team-only notes about this quote…"
        />
        <Button
          type="button"
          className="mt-3"
          onClick={handleSaveNotes}
          disabled={isPending}
        >
          Save notes
        </Button>
      </div>
    </div>
  );
}
