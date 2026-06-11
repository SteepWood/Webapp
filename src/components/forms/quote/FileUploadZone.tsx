"use client";

import { FileText, Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  ALLOWED_QUOTE_ATTACHMENT_MIME_TYPES,
  MAX_QUOTE_ATTACHMENT_BYTES,
  MAX_QUOTE_ATTACHMENTS_PER_REQUEST,
} from "@/lib/supabase/storage";
import type { QuoteAttachment } from "@/lib/validations/quote";
import { cn } from "@/lib/utils";

type UploadingFile = {
  id: string;
  name: string;
  progress: number;
};

type FileUploadZoneProps = {
  attachments: QuoteAttachment[];
  onChange: (attachments: QuoteAttachment[]) => void;
  draftId: string;
};

function uploadWithProgress(
  signedUrl: string,
  file: File,
  onProgress: (progress: number) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
        return;
      }

      reject(new Error("Upload failed"));
    };

    xhr.onerror = () => reject(new Error("Upload failed"));
    xhr.open("PUT", signedUrl);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.send(file);
  });
}

export function FileUploadZone({
  attachments,
  onChange,
  draftId,
}: FileUploadZoneProps) {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);

  const handleFiles = useCallback(
    async (acceptedFiles: File[]) => {
      const remainingSlots =
        MAX_QUOTE_ATTACHMENTS_PER_REQUEST - attachments.length;

      if (remainingSlots <= 0) {
        toast.error("Maximum of 5 files allowed.");
        return;
      }

      const filesToUpload = acceptedFiles.slice(0, remainingSlots);

      if (acceptedFiles.length > remainingSlots) {
        toast.error("Maximum of 5 files allowed.");
      }

      let nextAttachments = [...attachments];

      for (const file of filesToUpload) {
        if (
          !ALLOWED_QUOTE_ATTACHMENT_MIME_TYPES.includes(
            file.type as (typeof ALLOWED_QUOTE_ATTACHMENT_MIME_TYPES)[number],
          )
        ) {
          toast.error("Format not supported. Use JPG, PNG, WebP, or PDF.");
          continue;
        }

        if (file.size > MAX_QUOTE_ATTACHMENT_BYTES) {
          toast.error(`"${file.name}" is too large. Maximum size is 10 MB.`);
          continue;
        }

        const uploadId = crypto.randomUUID();
        setUploadingFiles((current) => [
          ...current,
          { id: uploadId, name: file.name, progress: 0 },
        ]);

        try {
          const response = await fetch("/api/upload-url/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              filename: file.name,
              mimeType: file.type,
              size: file.size,
              draftId,
              currentFileCount: nextAttachments.length,
            }),
          });

          const payload = (await response.json()) as {
            error?: string;
            path?: string;
            signedUrl?: string;
            previewUrl?: string;
          };

          if (!response.ok || !payload.signedUrl || !payload.path) {
            throw new Error(payload.error ?? "Unable to prepare upload.");
          }

          await uploadWithProgress(payload.signedUrl, file, (progress) => {
            setUploadingFiles((current) =>
              current.map((item) =>
                item.id === uploadId ? { ...item, progress } : item,
              ),
            );
          });

          let previewUrl: string | undefined;

          if (file.type.startsWith("image/")) {
            const previewResponse = await fetch("/api/upload-url/preview/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ path: payload.path }),
            });
            const previewPayload = (await previewResponse.json()) as {
              previewUrl?: string;
            };

            if (previewResponse.ok && previewPayload.previewUrl) {
              previewUrl = previewPayload.previewUrl;
            }
          }

          const attachment: QuoteAttachment = {
            url: payload.path,
            name: file.name,
            mimeType: file.type,
            size: file.size,
            previewUrl,
          };

          nextAttachments = [...nextAttachments, attachment];
          onChange(nextAttachments);
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Upload failed.";
          toast.error(message);
        } finally {
          setUploadingFiles((current) =>
            current.filter((item) => item.id !== uploadId),
          );
        }
      }
    },
    [attachments, draftId, onChange],
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: (files) => {
      void handleFiles(files);
    },
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "application/pdf": [".pdf"],
    },
    maxSize: MAX_QUOTE_ATTACHMENT_BYTES,
    multiple: true,
    noClick: true,
    noKeyboard: false,
    disabled: attachments.length >= MAX_QUOTE_ATTACHMENTS_PER_REQUEST,
  });

  function removeAttachment(path: string) {
    onChange(attachments.filter((file) => file.url !== path));
  }

  return (
    <div className="space-y-stack-md">
      <div
        {...getRootProps()}
        className={cn(
          "rounded-lg border-2 border-dashed p-6 text-center transition-colors",
          isDragActive
            ? "border-amber-500 bg-amber-100/40"
            : "border-ink-700/15 bg-ink-50",
          attachments.length >= MAX_QUOTE_ATTACHMENTS_PER_REQUEST &&
            "cursor-not-allowed opacity-60",
        )}
      >
        <input {...getInputProps()} aria-label="Upload reference files" />
        <Upload
          className="mx-auto mb-stack-sm size-8 text-amber-600"
          aria-hidden
        />
        <p className="font-medium text-ink-900">
          {isDragActive
            ? "Drop files here"
            : "Drop files here or click to browse"}
        </p>
        <p className="mt-1 text-body-sm text-ink-800/70">
          JPG, PNG, WebP, or PDF. Up to 5 files, 10 MB each.
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-stack-sm"
          onClick={open}
          disabled={attachments.length >= MAX_QUOTE_ATTACHMENTS_PER_REQUEST}
        >
          Browse files
        </Button>
      </div>

      {uploadingFiles.length > 0 ? (
        <ul className="space-y-3" aria-live="polite">
          {uploadingFiles.map((file) => (
            <li key={file.id} className="rounded-lg border border-ink-700/10 p-3">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="truncate text-sm text-ink-900">{file.name}</span>
                <span className="text-caption text-ink-800/70">
                  {file.progress}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-ink-700/10">
                <div
                  className="h-full rounded-full bg-amber-500 transition-all"
                  style={{ width: `${file.progress}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      {attachments.length > 0 ? (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {attachments.map((file) => (
            <li
              key={file.url}
              className="relative flex items-center gap-3 rounded-lg border border-ink-700/10 bg-white p-3"
            >
              {file.mimeType.startsWith("image/") && file.previewUrl ? (
                <Image
                  src={file.previewUrl}
                  alt={file.name}
                  width={64}
                  height={64}
                  unoptimized
                  className="size-16 shrink-0 rounded-md object-contain"
                />
              ) : (
                <div className="flex size-16 shrink-0 items-center justify-center rounded-md bg-ink-100">
                  <FileText className="size-7 text-ink-800/60" aria-hidden />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink-900">
                  {file.name}
                </p>
                <p className="text-caption text-ink-800/60">
                  {(file.size / 1024 / 1024).toFixed(1)} MB
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Remove ${file.name}`}
                onClick={() => removeAttachment(file.url)}
              >
                <X className="size-4" aria-hidden />
              </Button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
