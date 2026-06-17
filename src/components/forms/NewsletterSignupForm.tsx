"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { submitNewsletterForm } from "@/app/actions/newsletter";
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
import { cn } from "@/lib/utils";
import {
  newsletterFormSchema,
  type NewsletterFormValues,
} from "@/lib/validations/newsletter";

type NewsletterSignupFormProps = {
  inputId: string;
  layout?: "inline" | "stacked";
  placeholder?: string;
  inputClassName?: string;
  buttonClassName?: string;
  formClassName?: string;
  messageClassName?: string;
};

export function NewsletterSignupForm({
  inputId,
  layout = "inline",
  placeholder = "Your email",
  inputClassName,
  buttonClassName,
  formClassName,
  messageClassName,
}: NewsletterSignupFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      email: "",
      company: "",
    },
  });

  async function onSubmit(values: NewsletterFormValues) {
    setIsSubmitting(true);

    try {
      const result = await submitNewsletterForm(values);

      if (result.ok) {
        toast.success(
          result.alreadySubscribed
            ? "You're already on our list — thanks for subscribing."
            : "Thanks — you're subscribed to workshop insights.",
        );
        form.reset();
        return;
      }

      toast.error(result.error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        className={cn(
          layout === "inline"
            ? "flex flex-col gap-2 sm:flex-row"
            : "space-y-3",
          formClassName,
        )}
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <input
              {...field}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute -left-[9999px] h-px w-px opacity-0"
            />
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className={layout === "inline" ? "min-w-0 flex-1" : undefined}>
              <FormLabel htmlFor={inputId} className="sr-only">
                Email address
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id={inputId}
                  type="email"
                  placeholder={placeholder}
                  autoComplete="email"
                  disabled={isSubmitting}
                  className={inputClassName}
                />
              </FormControl>
              <FormMessage className={messageClassName} />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={cn(
            layout === "inline" ? "shrink-0" : "w-full",
            buttonClassName,
          )}
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "Subscribing…" : "Subscribe"}
        </Button>
      </form>
    </Form>
  );
}
