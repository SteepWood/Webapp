"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { updateTestimonial } from "@/app/actions/admin/testimonials";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { LOCATIONS } from "@/lib/services-locations/locations";
import { SERVICES } from "@/lib/services-locations/services";

type TestimonialEditFormProps = {
  testimonial: {
    id: string;
    authorName: string;
    authorLocation: string | null;
    quote: string;
    rating: number;
    source: string | null;
    sourceUrl: string | null;
    serviceSlug: string | null;
    locationSlug: string | null;
    isVerified: boolean;
    isFeatured: boolean;
    isPublished: boolean;
  };
};

export function TestimonialEditForm({ testimonial }: TestimonialEditFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState(testimonial);

  function updateField<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startTransition(async () => {
      const result = await updateTestimonial({
        ...form,
        authorLocation: form.authorLocation ?? "",
        source: form.source ?? "",
        sourceUrl: form.sourceUrl ?? "",
        serviceSlug: form.serviceSlug ?? "",
        locationSlug: form.locationSlug ?? "",
      });

      if (!result.ok) {
        toast.error(result.error);
        return;
      }

      toast.success("Testimonial saved.");
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-lg border border-ink-700/10 bg-white p-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="authorName">Name</Label>
          <Input
            id="authorName"
            value={form.authorName}
            onChange={(event) => updateField("authorName", event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="authorLocation">Suburb / location</Label>
          <Input
            id="authorLocation"
            value={form.authorLocation ?? ""}
            onChange={(event) =>
              updateField("authorLocation", event.target.value)
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="quote">Quote</Label>
        <Textarea
          id="quote"
          rows={5}
          value={form.quote}
          onChange={(event) => updateField("quote", event.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Rating</Label>
          <Select
            value={String(form.rating)}
            onValueChange={(value) => updateField("rating", Number(value))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 4, 3, 2, 1].map((rating) => (
                <SelectItem key={rating} value={String(rating)}>
                  {rating} stars
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="source">Source</Label>
          <Input
            id="source"
            value={form.source ?? ""}
            onChange={(event) => updateField("source", event.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Service</Label>
          <Select
            value={form.serviceSlug || "none"}
            onValueChange={(value) =>
              updateField("serviceSlug", value === "none" ? null : value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {SERVICES.map((service) => (
                <SelectItem key={service.slug} value={service.slug}>
                  {service.shortTitle}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Location</Label>
          <Select
            value={form.locationSlug || "none"}
            onValueChange={(value) =>
              updateField("locationSlug", value === "none" ? null : value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {LOCATIONS.map((location) => (
                <SelectItem key={location.slug} value={location.slug}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={form.isVerified}
            onCheckedChange={(checked) =>
              updateField("isVerified", checked === true)
            }
          />
          Verified
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={form.isFeatured}
            onCheckedChange={(checked) =>
              updateField("isFeatured", checked === true)
            }
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={form.isPublished}
            onCheckedChange={(checked) =>
              updateField("isPublished", checked === true)
            }
          />
          Published
        </label>
      </div>

      <Button type="submit" disabled={isPending}>
        Save testimonial
      </Button>
    </form>
  );
}
