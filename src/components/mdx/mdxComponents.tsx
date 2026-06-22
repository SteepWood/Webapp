import type * as React from "react";
import type { MDXComponents } from "mdx/types";

import { BlogImageGrid } from "./BlogImageGrid";
import { BlogWideImage } from "./BlogWideImage";
import { Callout } from "./Callout";
import { ImageWithCaption, MdxImage } from "./ImageWithCaption";
import { ProjectEmbed } from "./ProjectEmbed";
import { ServiceCTA } from "./ServiceCTA";

export const mdxComponents: MDXComponents = {
  Callout,
  ImageWithCaption,
  BlogImageGrid,
  BlogWideImage,
  ServiceCTA,
  ProjectEmbed,
  img: MdxImage,
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
    <h2
      {...props}
      className="mb-stack-sm mt-stack-xl scroll-mt-28 border-t border-ink-700/10 pt-stack-md font-serif text-h3 text-ink-900 first:mt-0 first:border-t-0 first:pt-0"
    />
  ),
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
    <h3
      {...props}
      className="mb-stack-sm mt-stack-lg scroll-mt-28 font-serif text-h4 text-ink-900"
    />
  ),
  h4: (props: React.ComponentPropsWithoutRef<"h4">) => (
    <h4
      {...props}
      className="mb-stack-sm mt-stack-md font-serif text-body-lg font-semibold text-ink-900"
    />
  ),
  p: (props: React.ComponentPropsWithoutRef<"p">) => (
    <p
      {...props}
      className="mb-stack-sm text-body-lg leading-relaxed text-ink-800/90 last:mb-0"
    />
  ),
  ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
    <ul
      {...props}
      className="mb-stack-sm list-disc space-y-2 pl-6 text-body-lg text-ink-800/90"
    />
  ),
  ol: (props: React.ComponentPropsWithoutRef<"ol">) => (
    <ol
      {...props}
      className="mb-stack-sm list-decimal space-y-2 pl-6 text-body-lg text-ink-800/90"
    />
  ),
  hr: (props: React.ComponentPropsWithoutRef<"hr">) => (
    <hr
      {...props}
      className="my-stack-lg border-0 border-t border-ink-700/12"
    />
  ),
  blockquote: (props: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      {...props}
      className="my-stack-md border-l-4 border-amber-500/70 bg-ink-50 px-5 py-4 font-serif text-h4 leading-snug text-ink-800/90 not-italic"
    />
  ),
  a: (props: React.ComponentPropsWithoutRef<"a">) => (
    <a
      {...props}
      className="text-amber-600 underline-offset-4 hover:underline"
    />
  ),
  table: (props: React.ComponentPropsWithoutRef<"table">) => (
    <div className="mb-stack-md overflow-x-auto">
      <table
        {...props}
        className="w-full border-collapse text-body text-ink-800/90"
      />
    </div>
  ),
  th: (props: React.ComponentPropsWithoutRef<"th">) => (
    <th
      {...props}
      className="border border-ink-700/12 bg-ink-50 px-3 py-2.5 text-left font-semibold"
    />
  ),
  td: (props: React.ComponentPropsWithoutRef<"td">) => (
    <td
      {...props}
      className="border border-ink-700/12 px-3 py-2.5 align-top"
    />
  ),
};
