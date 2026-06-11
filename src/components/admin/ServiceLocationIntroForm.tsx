"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { updateServiceLocationIntro } from "@/app/actions/admin/service-locations";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ServiceLocationIntroFormProps = {
  serviceSlug: string;
  locationSlug: string;
  serviceName: string;
  locationName: string;
  initial: {
    intro: string;
    h1: string;
    bodyContent: string;
    metaTitle: string;
    metaDescription: string;
    isPublished: boolean;
  };
};

export function ServiceLocationIntroForm({
  serviceSlug,
  locationSlug,
  serviceName,
  locationName,
  initial,
}: ServiceLocationIntroFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState(initial);

  function updateField<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startTransition(async () => {
      const result = await updateServiceLocationIntro({
        serviceSlug,
        locationSlug,
        ...form,
      });

      if (!result.ok) {
        toast.error(result.error);
        return;
      }

      toast.success("Custom intro saved.");
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-lg border border-ink-700/10 bg-white p-6"
    >
      <p className="text-body-sm text-ink-800/70">
        Editing <strong>{serviceName}</strong> in <strong>{locationName}</strong>
      </p>

      <div className="space-y-2">
        <Label htmlFor="h1">Custom H1</Label>
        <Input
          id="h1"
          value={form.h1}
          onChange={(event) => updateField("h1", event.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="intro">Custom intro</Label>
        <Textarea
          id="intro"
          rows={6}
          value={form.intro}
          onChange={(event) => updateField("intro", event.target.value)}
          placeholder="Override the default templated intro for this service + location combo."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bodyContent">Body content</Label>
        <Textarea
          id="bodyContent"
          rows={10}
          value={form.bodyContent}
          onChange={(event) => updateField("bodyContent", event.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="metaTitle">Meta title</Label>
          <Input
            id="metaTitle"
            value={form.metaTitle}
            onChange={(event) => updateField("metaTitle", event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="metaDescription">Meta description</Label>
          <Textarea
            id="metaDescription"
            rows={3}
            value={form.metaDescription}
            onChange={(event) =>
              updateField("metaDescription", event.target.value)
            }
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <Checkbox
          checked={form.isPublished}
          onCheckedChange={(checked) =>
            updateField("isPublished", checked === true)
          }
        />
        Published on public site
      </label>

      <Button type="submit" disabled={isPending}>
        Save custom intro
      </Button>
    </form>
  );
}
