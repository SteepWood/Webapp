"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { LOCATIONS } from "@/lib/services-locations/locations";
import { useQuoteFormStore } from "@/lib/stores/quoteForm";
import {
  PROPERTY_TYPES,
  step2Schema,
  type QuoteAttachment,
  type QuoteFormData,
  type Step2FormData,
} from "@/lib/validations/quote";
import { cn } from "@/lib/utils";

import { FileUploadZone } from "./FileUploadZone";

const PROPERTY_TYPE_LABELS: Record<(typeof PROPERTY_TYPES)[number], string> = {
  house: "House",
  apartment: "Apartment",
  "commercial-space": "Commercial space",
  "new-build": "New build",
};

const LOCATIONS_BY_REGION = LOCATIONS.reduce<
  Record<string, (typeof LOCATIONS)[number][]>
>((groups, location) => {
  const existing = groups[location.region] ?? [];
  groups[location.region] = [...existing, location];
  return groups;
}, {});

export function Step2Form() {
  const data = useQuoteFormStore((state) => state.data);
  const draftId = useQuoteFormStore((state) => state.draftId);
  const ensureDraftId = useQuoteFormStore((state) => state.ensureDraftId);
  const updateData = useQuoteFormStore((state) => state.updateData);
  const setStep = useQuoteFormStore((state) => state.setStep);

  useEffect(() => {
    ensureDraftId();
  }, [ensureDraftId]);

  const form = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    mode: "onChange",
    defaultValues: {
      locationSlug: data.locationSlug,
      suburb: data.suburb ?? "",
      propertyType: data.propertyType,
      projectDescription: data.projectDescription ?? "",
      attachments: data.attachments ?? [],
    },
  });

  const descriptionValue = form.watch("projectDescription") ?? "";

  function onSubmit(values: Step2FormData) {
    updateData(values as Partial<QuoteFormData>);
    setStep(3);
  }

  if (!draftId) {
    return (
      <div className="h-24 animate-pulse rounded-lg bg-ink-700/10" aria-busy="true" />
    );
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
          name="locationSlug"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Primary location</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your city or region" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(LOCATIONS_BY_REGION).map(
                    ([region, locations]) => (
                      <SelectGroup key={region}>
                        <SelectLabel>{region}</SelectLabel>
                        {locations.map((location) => (
                          <SelectItem key={location.slug} value={location.slug}>
                            {location.name}, {location.state}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ),
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="suburb"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Suburb</FormLabel>
              <FormControl>
                <Input
                  autoComplete="address-level2"
                  placeholder="e.g. Merewether"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="propertyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Property type</FormLabel>
              <FormControl>
                <div
                  className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                  role="radiogroup"
                  aria-label="Property type"
                >
                  {PROPERTY_TYPES.map((propertyType) => {
                    const selected = field.value === propertyType;

                    return (
                      <button
                        key={propertyType}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => field.onChange(propertyType)}
                        className={cn(
                          "rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2",
                          selected
                            ? "border-amber-500 bg-amber-100/60 text-ink-900"
                            : "border-ink-700/10 bg-ink-50 text-ink-900 hover:border-amber-400/60",
                        )}
                      >
                        {PROPERTY_TYPE_LABELS[propertyType]}
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
          name="projectDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Tell us about your project</FormLabel>
              <FormControl>
                <Textarea
                  rows={6}
                  placeholder="Describe your space, style preferences, timeline, and anything else that will help us prepare your quote."
                  maxLength={1500}
                  {...field}
                />
              </FormControl>
              <div className="flex items-center justify-between gap-3">
                <FormMessage />
                <p className="text-caption text-ink-800/60">
                  {descriptionValue.length}/1,500
                </p>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="attachments"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">
                Reference images or plans (optional)
              </FormLabel>
              <FormControl>
                <FileUploadZone
                  draftId={draftId}
                  attachments={(field.value ?? []) as QuoteAttachment[]}
                  onChange={field.onChange}
                />
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
