"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

import { savePortfolioProject } from "@/app/actions/admin/projects";
import { AdminImageUpload } from "@/components/admin/AdminImageUpload";
import { MarkdownPreview } from "@/components/admin/MarkdownPreview";
import { Button } from "@/components/ui/button";
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
import { slugify } from "@/lib/admin/slug";
import { SERVICES } from "@/lib/services-locations/services";
import { PROJECT_STATUSES } from "@/lib/validations/admin/projects";

type ProjectFormProps = {
  initial?: {
    id: string;
    title: string;
    slug: string;
    summary: string | null;
    description: string | null;
    serviceSlug: string | null;
    locationName: string | null;
    clientDisplayName: string | null;
    beforeImageUrl: string | null;
    afterImageUrl: string | null;
    galleryImages: Array<{ url: string; alt?: string; caption?: string }>;
    metaTitle: string | null;
    metaDescription: string | null;
    status: (typeof PROJECT_STATUSES)[number];
    displayOrder: number;
  };
};

export function ProjectForm({ initial }: ProjectFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [serviceSlug, setServiceSlug] = useState(initial?.serviceSlug ?? "none");
  const [locationName, setLocationName] = useState(initial?.locationName ?? "");
  const [clientDisplayName, setClientDisplayName] = useState(
    initial?.clientDisplayName ?? "",
  );
  const [beforeImageUrl, setBeforeImageUrl] = useState(
    initial?.beforeImageUrl ?? "",
  );
  const [afterImageUrl, setAfterImageUrl] = useState(
    initial?.afterImageUrl ?? "",
  );
  const [galleryImages, setGalleryImages] = useState(
    initial?.galleryImages ?? [],
  );
  const [metaTitle, setMetaTitle] = useState(initial?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(
    initial?.metaDescription ?? "",
  );
  const [status, setStatus] = useState<(typeof PROJECT_STATUSES)[number]>(
    initial?.status ?? "draft",
  );
  const [displayOrder, setDisplayOrder] = useState(initial?.displayOrder ?? 0);

  const autoSlug = useMemo(() => slugify(title), [title]);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  }

  function handleGalleryUpload(url: string) {
    setGalleryImages((current) => [...current, { url }]);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startTransition(async () => {
      const result = await savePortfolioProject({
        id: initial?.id,
        title,
        slug: slug || autoSlug,
        summary,
        description,
        serviceSlug: serviceSlug === "none" ? "" : serviceSlug,
        locationName,
        clientDisplayName,
        beforeImageUrl,
        afterImageUrl,
        galleryImages,
        metaTitle,
        metaDescription,
        status,
        displayOrder,
      });

      if (!result.ok) {
        toast.error(result.error);
        return;
      }

      toast.success("Project saved.");
      router.push(`/admin/projects/${result.id}/edit/`);
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
    >
      <div className="space-y-6 rounded-lg border border-ink-700/10 bg-white p-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(event) => {
              setSlugTouched(true);
              setSlug(event.target.value);
            }}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="clientDisplayName">Client name</Label>
          <Input
            id="clientDisplayName"
            value={clientDisplayName}
            onChange={(event) => setClientDisplayName(event.target.value)}
            placeholder="e.g. James & Priya Nguyen"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            id="summary"
            rows={3}
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (MDX/Markdown)</Label>
          <Textarea
            id="description"
            rows={12}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Service</Label>
            <Select value={serviceSlug} onValueChange={setServiceSlug}>
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
            <Label htmlFor="locationName">Location (suburb, city)</Label>
            <Input
              id="locationName"
              value={locationName}
              onChange={(event) => setLocationName(event.target.value)}
              placeholder="e.g. Merewether, Newcastle"
            />
          </div>
        </div>

        <AdminImageUpload
          folder="portfolio"
          value={beforeImageUrl}
          onChange={setBeforeImageUrl}
          label="Before image"
        />
        <AdminImageUpload
          folder="portfolio"
          value={afterImageUrl}
          onChange={setAfterImageUrl}
          label="After / hero image"
        />

        <AdminImageUpload
          folder="portfolio"
          value=""
          onChange={handleGalleryUpload}
          label="Add gallery image"
        />

        {galleryImages.length > 0 ? (
          <ul className="space-y-2 text-body-sm">
            {galleryImages.map((image, index) => (
              <li
                key={`${image.url}-${index}`}
                className="flex items-center justify-between gap-3 rounded-md border border-ink-700/10 px-3 py-2"
              >
                <span className="truncate">{image.url}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setGalleryImages((current) =>
                      current.filter((_, itemIndex) => itemIndex !== index),
                    )
                  }
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={status}
              onValueChange={(value) =>
                setStatus(value as (typeof PROJECT_STATUSES)[number])
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PROJECT_STATUSES.map((entry) => (
                  <SelectItem key={entry} value={entry}>
                    {entry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="displayOrder">Display order</Label>
            <Input
              id="displayOrder"
              type="number"
              min={0}
              value={displayOrder}
              onChange={(event) => setDisplayOrder(Number(event.target.value))}
            />
          </div>
        </div>

        <Button type="submit" disabled={isPending}>
          Save project
        </Button>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-ink-700/10 bg-white p-6">
          <h2 className="font-serif text-h3 text-ink-900">Description preview</h2>
          <div className="mt-4">
            <MarkdownPreview content={description} />
          </div>
        </div>

        <div className="rounded-lg border border-ink-700/10 bg-white p-6">
          <h2 className="font-serif text-h3 text-ink-900">SEO</h2>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta title</Label>
              <Input
                id="metaTitle"
                value={metaTitle}
                onChange={(event) => setMetaTitle(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta description</Label>
              <Textarea
                id="metaDescription"
                rows={4}
                value={metaDescription}
                onChange={(event) => setMetaDescription(event.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
