import { cn } from "@/lib/utils";

const STEPS = [
  { number: 1, label: "Service" },
  { number: 2, label: "Details" },
  { number: 3, label: "Contact" },
] as const;

export function ProgressBar({ currentStep }: { currentStep: 1 | 2 | 3 }) {
  const progressPercent = currentStep === 1 ? 33 : currentStep === 2 ? 66 : 100;

  return (
    <div className="mb-stack-lg" aria-label="Quote form progress">
      <div className="mb-stack-sm flex items-center justify-between gap-2">
        {STEPS.map((step) => {
          const isActive = step.number === currentStep;
          const isComplete = step.number < currentStep;

          return (
            <div
              key={step.number}
              className={cn(
                "flex flex-1 flex-col items-center gap-2 text-center",
                isActive || isComplete ? "text-ink-900" : "text-ink-800/50",
              )}
            >
              <div
                className={cn(
                  "flex size-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                  isActive &&
                    "border-amber-500 bg-amber-500 text-ink-950",
                  isComplete &&
                    !isActive &&
                    "border-amber-500 bg-amber-100 text-amber-700",
                  !isActive &&
                    !isComplete &&
                    "border-ink-700/20 bg-ink-50 text-ink-800/60",
                )}
                aria-current={isActive ? "step" : undefined}
              >
                {step.number}
              </div>
              <span className="hidden text-caption font-medium sm:block">
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <div
        className="h-1.5 overflow-hidden rounded-full bg-ink-700/10"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progressPercent}
        aria-label={`Step ${currentStep} of 3`}
      >
        <div
          className="h-full rounded-full bg-amber-500 transition-all duration-[var(--duration-base)] ease-[var(--ease-out-soft)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <p className="mt-stack-sm text-body-sm text-ink-800/70">
        Step {currentStep} of 3 — {progressPercent}% complete
      </p>
    </div>
  );
}
