"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "@/components/ui/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { submitQuote } from "@/app/actions/quote";
import { trackQuoteSubmit } from "@/lib/analytics/events";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useQuoteFormStore } from "@/lib/stores/quoteForm";
import {
  PREFERRED_CONTACT_METHODS,
  step1Schema,
  step2Schema,
  step3Schema,
  type QuoteSubmitData,
} from "@/lib/validations/quote";
import { cn } from "@/lib/utils";

const step3FormSchema = step3Schema.extend({
  website: z.string().max(0, "Invalid submission."),
});

type Step3FormValues = z.infer<typeof step3FormSchema>;

const PREFERRED_CONTACT_LABELS: Record<
  (typeof PREFERRED_CONTACT_METHODS)[number],
  string
> = {
  email: "Email",
  phone: "Phone",
  either: "Either",
};

export function Step3Form() {
  const router = useRouter();
  const data = useQuoteFormStore((state) => state.data);
  const setStep = useQuoteFormStore((state) => state.setStep);
  const resetForm = useQuoteFormStore((state) => state.resetForm);

  const form = useForm<Step3FormValues>({
    resolver: zodResolver(step3FormSchema),
    mode: "onChange",
    defaultValues: {
      fullName: data.fullName ?? "",
      email: data.email ?? "",
      phone: data.phone ?? "",
      preferredContact: data.preferredContact,
      consentMarketing: data.consentMarketing ?? false,
      consentPrivacy: undefined,
      website: "",
    },
  });

  useEffect(() => {
    const step1 = step1Schema.safeParse(data);
    const step2 = step2Schema.safeParse(data);

    if (!step1.success) {
      setStep(1);
      return;
    }

    if (!step2.success) {
      setStep(2);
    }
  }, [data, setStep]);

  async function onSubmit(values: Step3FormValues) {
    const payload: QuoteSubmitData = {
      ...(data as QuoteSubmitData),
      ...values,
      website: values.website ?? "",
    };

    const result = await submitQuote(payload);

    if (result.ok) {
      trackQuoteSubmit({
        serviceTypes: payload.serviceTypes,
        budgetRange: payload.budgetRange,
        locationSlug: payload.locationSlug,
      });
      const firstName = values.fullName.split(" ")[0] || values.fullName;
      resetForm();
      toast.success("Quote request sent — we'll be in touch soon.");
      router.push(
        `/quote/thank-you/?ref=${encodeURIComponent(result.quoteId)}&name=${encodeURIComponent(firstName)}`,
      );
      return;
    }

    if (result.error === "spam") {
      toast.error("Something went wrong. Please try again.");
      return;
    }

    toast.error(result.message ?? "Please check the form and try again.");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex flex-col gap-stack-lg"
        noValidate
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Full name</FormLabel>
              <FormControl>
                <Input autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-stack-md sm:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Email</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Phone</FormLabel>
                <FormControl>
                  <Input type="tel" autoComplete="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="preferredContact"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Preferred contact method</FormLabel>
              <FormControl>
                <div
                  className="grid grid-cols-1 gap-2 sm:grid-cols-3"
                  role="radiogroup"
                  aria-label="Preferred contact method"
                >
                  {PREFERRED_CONTACT_METHODS.map((method) => {
                    const selected = field.value === method;

                    return (
                      <button
                        key={method}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => field.onChange(method)}
                        className={cn(
                          "rounded-lg border-2 px-4 py-3 text-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2",
                          selected
                            ? "border-amber-500 bg-amber-100/60 text-ink-900"
                            : "border-ink-700/10 bg-ink-50 text-ink-900 hover:border-amber-400/60",
                        )}
                      >
                        {PREFERRED_CONTACT_LABELS[method]}
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
          name="consentMarketing"
          render={({ field }) => (
            <FormItem className="flex items-start gap-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked === true)}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-normal text-ink-800/90">
                  I&apos;d like to receive occasional design inspiration emails
                  (optional)
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consentPrivacy"
          render={({ field }) => (
            <FormItem className="flex items-start gap-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value === true}
                  onCheckedChange={(checked) =>
                    field.onChange(checked === true ? true : undefined)
                  }
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-normal text-ink-800/90">
                  I agree to SteepWood&apos;s{" "}
                  <Link
                    href="/legal/privacy/"
                    className="text-amber-600 underline-offset-4 hover:underline"
                  >
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/legal/terms/"
                    className="text-amber-600 underline-offset-4 hover:underline"
                  >
                    Terms
                  </Link>{" "}
                  (required)
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div
          className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
          aria-hidden
        >
          <label htmlFor="website">Website</label>
          <input
            id="website"
            tabIndex={-1}
            autoComplete="off"
            {...form.register("website")}
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            {form.formState.isSubmitting
              ? "Sending…"
              : "Send my quote request"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
