"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Bath,
  Briefcase,
  Building2,
  ChefHat,
  DoorClosed,
  Landmark,
  Laptop,
  Layers,
  Sofa,
  Store,
  type LucideIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useQuoteFormStore } from "@/lib/stores/quoteForm";
import { SERVICES } from "@/lib/services-locations/services";
import {
  BUDGET_RANGES,
  PROJECT_SCOPES,
  TIMEFRAMES,
  step1Schema,
  type Step1FormData,
  type QuoteFormData,
} from "@/lib/validations/quote";
import { cn } from "@/lib/utils";

const SERVICE_ICONS: Record<(typeof SERVICES)[number]["slug"], LucideIcon> = {
  "custom-kitchen-joinery": ChefHat,
  "built-in-wardrobes": DoorClosed,
  "office-fitout": Briefcase,
  shopfitting: Store,
  "custom-bathroom-vanity": Bath,
  "commercial-joinery": Building2,
  "custom-furniture": Sofa,
  "home-office-joinery": Laptop,
  "laundry-cabinets": Layers,
  "staircase-joinery": Landmark,
};

const PROJECT_SCOPE_LABELS: Record<
  (typeof PROJECT_SCOPES)[number],
  string
> = {
  "single-room": "Single room",
  "multi-room": "Multiple rooms",
  "full-home": "Full home",
  commercial: "Commercial space",
};

const BUDGET_LABELS: Record<(typeof BUDGET_RANGES)[number], string> = {
  "<10k": "Under $10k",
  "10-25k": "$10k–$25k",
  "25-50k": "$25k–$50k",
  "50-100k": "$50k–$100k",
  "100k+": "$100k+",
  "not-sure": "Not sure yet",
};

const TIMEFRAME_LABELS: Record<(typeof TIMEFRAMES)[number], string> = {
  asap: "As soon as possible",
  "1-3-months": "1–3 months",
  "3-6-months": "3–6 months",
  "6-12-months": "6–12 months",
  exploring: "Just exploring",
};

export function Step1Form() {
  const data = useQuoteFormStore((state) => state.data);
  const updateData = useQuoteFormStore((state) => state.updateData);
  const setStep = useQuoteFormStore((state) => state.setStep);

  const form = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    mode: "onChange",
    defaultValues: {
      serviceTypes: data.serviceTypes ?? [],
      projectScope: data.projectScope,
      budgetRange: data.budgetRange,
      timeframe: data.timeframe,
    },
  });

  function onSubmit(values: Step1FormData) {
    updateData(values as Partial<QuoteFormData>);
    setStep(2);
  }

  function toggleService(
    current: Step1FormData["serviceTypes"],
    slug: Step1FormData["serviceTypes"][number],
    checked: boolean,
  ) {
    if (checked) {
      return [...current, slug];
    }

    return current.filter((value) => value !== slug);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-stack-lg"
        noValidate
      >
        <FormField
          control={form.control}
          name="serviceTypes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">
                What services are you interested in?
              </FormLabel>
              <p className="mb-stack-sm text-body-sm text-ink-800/70">
                Select all that apply.
              </p>
              <FormControl>
                <div
                  className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                  role="group"
                  aria-label="Service types"
                >
                  {SERVICES.map((service) => {
                    const Icon = SERVICE_ICONS[service.slug] ?? Building2;
                    const selected = field.value?.includes(service.slug);

                    return (
                      <button
                        key={service.slug}
                        type="button"
                        role="checkbox"
                        aria-checked={selected}
                        onClick={() => {
                          const next = toggleService(
                            field.value ?? [],
                            service.slug,
                            !selected,
                          );
                          field.onChange(next);
                        }}
                        className={cn(
                          "flex items-start gap-3 rounded-lg border-2 p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2",
                          selected
                            ? "border-amber-500 bg-amber-100/60"
                            : "border-ink-700/10 bg-ink-50 hover:border-amber-400/60",
                        )}
                      >
                        <Icon
                          className={cn(
                            "mt-0.5 size-5 shrink-0",
                            selected ? "text-amber-700" : "text-ink-800/60",
                          )}
                          aria-hidden
                        />
                        <span className="text-sm font-medium text-ink-900">
                          {service.shortTitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectScope"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Project scope</FormLabel>
              <FormControl>
                <div
                  className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                  role="radiogroup"
                  aria-label="Project scope"
                >
                  {PROJECT_SCOPES.map((scope) => {
                    const selected = field.value === scope;

                    return (
                      <button
                        key={scope}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => field.onChange(scope)}
                        className={cn(
                          "rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2",
                          selected
                            ? "border-amber-500 bg-amber-100/60 text-ink-900"
                            : "border-ink-700/10 bg-ink-50 text-ink-900 hover:border-amber-400/60",
                        )}
                      >
                        {PROJECT_SCOPE_LABELS[scope]}
                      </button>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="budgetRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Estimated budget</FormLabel>
              <FormControl>
                <div
                  className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6"
                  role="radiogroup"
                  aria-label="Budget range"
                >
                  {BUDGET_RANGES.map((budget) => {
                    const selected = field.value === budget;

                    return (
                      <button
                        key={budget}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => field.onChange(budget)}
                        className={cn(
                          "rounded-lg border-2 px-3 py-2.5 text-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2",
                          selected
                            ? "border-amber-500 bg-amber-100/60 text-ink-900"
                            : "border-ink-700/10 bg-ink-50 text-ink-900 hover:border-amber-400/60",
                        )}
                      >
                        {BUDGET_LABELS[budget]}
                      </button>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timeframe"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">When do you want to start?</FormLabel>
              <FormControl>
                <div
                  className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3"
                  role="radiogroup"
                  aria-label="Project timeframe"
                >
                  {TIMEFRAMES.map((timeframe) => {
                    const selected = field.value === timeframe;

                    return (
                      <button
                        key={timeframe}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => field.onChange(timeframe)}
                        className={cn(
                          "rounded-lg border-2 px-3 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2",
                          selected
                            ? "border-amber-500 bg-amber-100/60 text-ink-900"
                            : "border-ink-700/10 bg-ink-50 text-ink-900 hover:border-amber-400/60",
                        )}
                      >
                        {TIMEFRAME_LABELS[timeframe]}
                      </button>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-2">
          <Button type="submit" size="lg" disabled={!form.formState.isValid}>
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
}
