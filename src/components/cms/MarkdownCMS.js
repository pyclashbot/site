import React from "react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import styles from "./Markdown.module.css";

const MarkdownLink = dynamic(() => import("./MarkdownLink"));
const MarkdownBody = dynamic(() => import("./MarkdownBody"));
const MarkdownHeader = dynamic(() => import("./MarkdownHeader"));
const MarkdownSubheader = dynamic(() => import("./MarkdownSubheader"));

const MarkdownCMS = ({ markdownText }) => {
  const components = {
    a: MarkdownLink,
    h1: MarkdownHeader,
    h2: MarkdownSubheader,
    p: MarkdownBody,
  };

  return (
    markdownText !== "" && (
      <div className={styles.container}>
        <div className={styles.block}>
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
