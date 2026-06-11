"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { getPublicCmsMediaUrl } from "@/lib/supabase/storage";

type AdminImageUploadProps = {
  folder: "blog" | "portfolio";
  value?: string;
  onChange: (url: string) => void;
  label?: string;
};

export function AdminImageUpload({
  folder,
  value,
  onChange,
  label = "Image",
}: AdminImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setIsUploading(true);

      try {
        const response = await fetch("/api/admin/upload-url/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: file.name,
            mimeType: file.type,
            size: file.size,
            folder,
          }),
        });

        const payload = (await response.json()) as {
          signedUrl?: string;
          path?: string;
          error?: string;
        };

        if (!response.ok || !payload.signedUrl || !payload.path) {
          throw new Error(payload.error ?? "Upload failed.");
        }

        const uploadResponse = await fetch(payload.signedUrl, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
            "x-upsert": "false",
          },
          body: file,
        });

        if (!uploadResponse.ok) {
          throw new Error("Could not upload image to storage.");
        }

        const publicUrl = getPublicCmsMediaUrl(
          payload.path,
          process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
        );
        onChange(publicUrl);
        toast.success("Image uploaded.");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Image upload failed.",
        );
      } finally {
        setIsUploading(false);
      }
    },
    [folder, onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
    disabled: isUploading,
  });

  return (
    <div className="space-y-3">
      <p className="text-body-sm font-medium text-ink-900">{label}</p>

      <div
        {...getRootProps()}
        className="cursor-pointer rounded-lg border border-dashed border-ink-700/20 bg-ink-50 px-4 py-8 text-center"
      >
        <input {...getInputProps()} />
        <p className="text-body-sm text-ink-800/70">
          {isDragActive
            ? "Drop the image here…"
            : "Drag and drop an image, or click to browse"}
        </p>
        <p className="mt-1 text-caption text-ink-800/50">
          JPEG, PNG, or WebP up to 10 MB
        </p>
      </div>

      {value ? (
        <div className="space-y-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            className="max-h-48 w-full rounded-md border border-ink-700/10 object-contain"
          />
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}>
            Remove image
          </Button>
        </div>
      ) : null}
    </div>
  );
}
