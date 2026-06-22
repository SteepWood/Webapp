"use client";

import { useEffect, useState } from "react";

import type { TocHeading } from "@/lib/blog/headings";
import { cn } from "@/lib/utils";

type TableOfContentsProps = {
  headings: TocHeading[];
};

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length === 0) {
      return;
    }

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-28 hidden max-h-[calc(100vh-8rem)] overflow-y-auto overscroll-contain xl:block"
    >
      <p className="mb-4 font-mono text-caption uppercase tracking-widest text-amber-600">
        On this page
      </p>
      <ul className="space-y-2 border-l border-ink-700/10 pl-4">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "block text-sm leading-6 transition-colors hover:text-amber-600",
                heading.level === 3 ? "pl-3" : "",
                activeId === heading.id
                  ? "font-semibold text-amber-600"
                  : "text-ink-800/70",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
