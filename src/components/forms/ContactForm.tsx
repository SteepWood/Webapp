"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "@/components/ui/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { submitContactForm } from "@/app/actions/contact";
import { TrackedPhoneLink } from "@/components/analytics/TrackedPhoneLink";
import { trackContactSubmit } from "@/lib/analytics/events";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BUSINESS_CREDENTIALS_FOOTER } from "@/lib/business";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/navigation";
import {
  CONTACT_SUBJECTS,
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";

export function ContactForm() {
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: undefined,
      message: "",
      company: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setServerError(null);
    const result = await submitContactForm(values);

    if (result.ok) {
      trackContactSubmit({ subject: values.subject });
      toast.success("Thanks — we'll be in touch within 1 business day.");
      form.reset();
      return;
    }

    setServerError(result.error);
  }

  return (
    <div className="surface-card rounded-lg p-6 md:p-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative flex flex-col gap-6"
          noValidate
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
                <FormLabel>
                  Phone <span className="text-ink-800/60">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input type="tel" autoComplete="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CONTACT_SUBJECTS.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea rows={5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
            <label htmlFor="company">Company</label>
            <input
              id="company"
              tabIndex={-1}
              autoComplete="off"
              {...form.register("company")}
            />
          </div>

          {serverError ? (
            <p className="text-sm text-error" role="alert">
              {serverError}
            </p>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              type="submit"
              size="lg"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Sending…" : "Send enquiry"}
            </Button>
            <Button asChild variant="outline" size="lg">
              <TrackedPhoneLink href={PHONE_HREF} context="contact-form">
                Call us instead — {PHONE_DISPLAY}
              </TrackedPhoneLink>
            </Button>
          </div>
        </form>
      </Form>

      <div className="mt-8 space-y-2 border-t border-ink-700/10 pt-6 text-body-sm text-ink-800/80">
        <p>We respond to all enquiries within 1 business day.</p>
        <p>{BUSINESS_CREDENTIALS_FOOTER}</p>
        <p>
          Your details are used only to respond to your enquiry. We never share
          data with third parties. See our{" "}
          <Link
            href="/legal/privacy/"
            className="text-amber-600 underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
