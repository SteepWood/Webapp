import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "@/components/mdx/mdxComponents";
import { normaliseMdxContent } from "@/lib/blog/launchPack";

export async function renderBlogMdx(source: string) {
  const content = normaliseMdxContent(source);

  return (
    <MDXRemote
      source={content}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypePrettyCode,
              {
                theme: "github-light",
                keepBackground: false,
              },
            ],
          ],
        },
      }}
    />
  );
}
