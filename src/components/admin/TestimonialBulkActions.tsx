"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { bulkUpdateTestimonials } from "@/app/actions/admin/testimonials";
import { Button } from "@/components/ui/button";

type TestimonialBulkActionsProps = {
  selectedIds: string[];
  onClear: () => void;
};

export function TestimonialBulkActions({
  selectedIds,
  onClear,
}: TestimonialBulkActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [lastAction, setLastAction] = useState<string | null>(null);

  function runAction(action: "verify" | "feature" | "reject") {
    startTransition(async () => {
      const result = await bulkUpdateTestimonials({ ids: selectedIds, action });

      if (!result.ok) {
        toast.error(result.error);
        return;
      }

      setLastAction(action);
      toast.success(`Bulk ${action} completed.`);
      onClear();
    });
  }

  if (selectedIds.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-ink-700/10 bg-white p-4">
      <p className="text-body-sm text-ink-800/70">
        {selectedIds.length} selected
        {lastAction ? ` · last action: ${lastAction}` : ""}
      </p>
      <Button
        type="button"
        size="sm"
        onClick={() => runAction("verify")}
        disabled={isPending}
      >
        Verify
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => runAction("feature")}
        disabled={isPending}
      >
        Feature
      </Button>
      <Button
        type="button"
        size="sm"
        variant="destructive"
        onClick={() => runAction("reject")}
        disabled={isPending}
      >
        Reject
      </Button>
    </div>
  );
}
