"use client";

import ReactMarkdown from "react-markdown";

type MarkdownPreviewProps = {
  content: string;
};

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  if (!content.trim()) {
    return (
      <p className="text-body-sm text-ink-800/60">Nothing to preview yet.</p>
    );
  }

  return (
    <div className="prose-steepwood max-w-none text-ink-900">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
