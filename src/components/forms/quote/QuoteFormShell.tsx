"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useQuoteFormStore } from "@/lib/stores/quoteForm";

import { ProgressBar } from "./ProgressBar";
import { Step1Form } from "./Step1Form";
import { Step2Form } from "./Step2Form";
import { Step3Form } from "./Step3Form";

export function QuoteFormShell() {
  const [mounted, setMounted] = useState(false);
  const step = useQuoteFormStore((state) => state.step);
  const setStep = useQuoteFormStore((state) => state.setStep);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="rounded-lg border border-ink-700/10 bg-ink-50 p-8"
        aria-busy="true"
        aria-label="Loading quote form"
      >
        <div className="h-2 animate-pulse rounded-full bg-ink-700/10" />
      </div>
    );
  }

  return (
    <div className="surface-card rounded-lg p-6 md:p-8">
      <ProgressBar currentStep={step} />

      {step > 1 ? (
        <div className="mb-stack-md">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="px-0 text-ink-800/80 hover:text-amber-600"
            onClick={() => setStep((step - 1) as 1 | 2 | 3)}
          >
            ← Back
          </Button>
        </div>
      ) : null}

      {step === 1 ? <Step1Form /> : null}
      {step === 2 ? <Step2Form /> : null}
      {step === 3 ? <Step3Form /> : null}
    </div>
  );
}
