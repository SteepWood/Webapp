"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

import { saveBlogPost } from "@/app/actions/admin/blog";
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
import { BLOG_STATUSES } from "@/lib/validations/admin/blog";

type BlogPostFormProps = {
  initial?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string | null;
    coverImageUrl: string | null;
    coverImageAlt: string | null;
    authorName: string | null;
    category: string | null;
    tags: string[];
    status: (typeof BLOG_STATUSES)[number];
    publishedAt: string | null;
  };
};

export function BlogPostForm({ initial }: BlogPostFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(initial?.coverImageUrl ?? "");
  const [coverImageAlt, setCoverImageAlt] = useState(initial?.coverImageAlt ?? "");
  const [authorName, setAuthorName] = useState(initial?.authorName ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [tags, setTags] = useState((initial?.tags ?? []).join(", "));
  const [status, setStatus] = useState<(typeof BLOG_STATUSES)[number]>(
    initial?.status ?? "draft",
  );
  const [publishedAt, setPublishedAt] = useState(initial?.publishedAt ?? "");

  const autoSlug = useMemo(() => slugify(title), [title]);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startTransition(async () => {
      const result = await saveBlogPost({
        id: initial?.id,
        title,
        slug: slug || autoSlug,
        excerpt,
        content,
        coverImageUrl,
        coverImageAlt,
        authorName,
        category,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        status,
        publishedAt: publishedAt || undefined,
      });

      if (!result.ok) {
        toast.error(result.error);
        return;
      }

      toast.success("Blog post saved.");
      router.push(`/admin/blog/${result.id}/edit/`);
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
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            rows={3}
            value={excerpt}
            onChange={(event) => setExcerpt(event.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Body (MDX/Markdown)</Label>
          <Textarea
            id="content"
            rows={14}
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>

        <AdminImageUpload
          folder="blog"
          value={coverImageUrl}
          onChange={setCoverImageUrl}
          label="Hero image"
        />

        <div className="space-y-2">
          <Label htmlFor="coverImageAlt">Hero image alt text</Label>
          <Input
            id="coverImageAlt"
            value={coverImageAlt}
            onChange={(event) => setCoverImageAlt(event.target.value)}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="authorName">Author</Label>
            <Input
              id="authorName"
              value={authorName}
              onChange={(event) => setAuthorName(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(event) => setTags(event.target.value)}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={status}
              onValueChange={(value) =>
                setStatus(value as (typeof BLOG_STATUSES)[number])
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BLOG_STATUSES.map((entry) => (
                  <SelectItem key={entry} value={entry}>
                    {entry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="publishedAt">Publish date</Label>
            <Input
              id="publishedAt"
              type="datetime-local"
              value={publishedAt}
              onChange={(event) => setPublishedAt(event.target.value)}
            />
          </div>
        </div>

        <Button type="submit" disabled={isPending}>
          Save post
        </Button>
      </div>

      <div className="rounded-lg border border-ink-700/10 bg-white p-6">
        <h2 className="font-serif text-h3 text-ink-900">Preview</h2>
        <div className="mt-4">
          <MarkdownPreview content={content} />
        </div>
      </div>
    </form>
  );
}
