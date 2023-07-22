import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import MarkdownBody from "./MarkdownBody";
import MarkdownCode from "./MarkdownCode";
import MarkdownHeader from "./MarkdownHeader";
import MarkdownLink from "./MarkdownLink";
import MarkdownSubheader from "./MarkdownSubheader";
import { MarkdownOL, MarkdownUL, MarkdownLI } from "./MarkdownList";

const MarkdownCMS = ({ markdownText }: { markdownText: string }) => {
  const components: any = {
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
        <div className="mt-2 bg-foreground px-1 py-2 shadow-header">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={components}
          >
            {markdownText}
          </ReactMarkdown>
        </div>
      </div>
    )
  );
};

export default MarkdownCMS;
