import type * as React from "react";
import type { MDXComponents } from "mdx/types";

import { Callout } from "./Callout";
import { ImageWithCaption } from "./ImageWithCaption";
import { ProjectEmbed } from "./ProjectEmbed";
import { ServiceCTA } from "./ServiceCTA";

export const mdxComponents: MDXComponents = {
  Callout,
  ImageWithCaption,
  ServiceCTA,
  ProjectEmbed,
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
    <h2
      {...props}
      className="mt-10 scroll-mt-28 font-serif text-h3 text-ink-900 first:mt-0"
    />
  ),
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
    <h3
      {...props}
      className="mt-8 scroll-mt-28 font-serif text-h4 text-ink-900"
    />
  ),
  p: (props: React.ComponentPropsWithoutRef<"p">) => (
    <p {...props} className="mb-4 text-body-lg leading-relaxed text-ink-800/90" />
  ),
  ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
    <ul
      {...props}
      className="mb-4 list-disc space-y-2 pl-6 text-body-lg text-ink-800/90"
    />
  ),
  ol: (props: React.ComponentPropsWithoutRef<"ol">) => (
    <ol
      {...props}
      className="mb-4 list-decimal space-y-2 pl-6 text-body-lg text-ink-800/90"
    />
  ),
  a: (props: React.ComponentPropsWithoutRef<"a">) => (
    <a
      {...props}
      className="text-amber-600 underline-offset-4 hover:underline"
    />
  ),
};
