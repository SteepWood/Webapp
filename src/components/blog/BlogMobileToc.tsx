"use client";

import { useState } from "react";

import type { TocHeading } from "@/lib/blog/headings";
import { cn } from "@/lib/utils";

type BlogMobileTocProps = {
  headings: TocHeading[];
};

export function BlogMobileToc({ headings }: BlogMobileTocProps) {
  const [open, setOpen] = useState(false);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="mb-stack-lg rounded-lg border border-ink-700/10 bg-ink-50 lg:hidden">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-inset"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="font-mono text-caption uppercase tracking-widest text-amber-600">
          On this page
        </span>
        <span className="text-body-sm text-ink-800/70">{open ? "Hide" : "Show"}</span>
      </button>
      {open ? (
        <ul className="space-y-2 border-t border-ink-700/10 px-4 py-3">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={cn(
                  "block text-body-sm leading-6 text-ink-800/80 transition-colors hover:text-amber-600",
                  heading.level === 3 ? "pl-3" : "",
                )}
                onClick={() => setOpen(false)}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
