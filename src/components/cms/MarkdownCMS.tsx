import MarkdownBody from "./MarkdownBody";
import MarkdownCode from "./MarkdownCode";
import MarkdownHeader from "./MarkdownHeader";
import MarkdownLink from "./MarkdownLink";
import { MarkdownOL, MarkdownUL, MarkdownLI } from "./MarkdownList";
import MarkdownSubheader from "./MarkdownSubheader";
import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const MarkdownCMS = ({ markdownText }: { markdownText: string }) => {
  const components: Partial<Components> = {
    a: MarkdownLink,
    h1: MarkdownHeader,
    h2: MarkdownSubheader,
    p: MarkdownBody,
    code: MarkdownCode,
    ul: MarkdownUL,
    li: MarkdownLI,
    ol: MarkdownOL,
  };

  return (
    markdownText !== "" && (
      <div className="flex flex-col align-baseline">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, remarkGfm]}
          components={components}
        >
          {markdownText}
        </ReactMarkdown>
      </div>
    )
  );
};

export default MarkdownCMS;
