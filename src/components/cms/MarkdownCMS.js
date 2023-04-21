// this compnent is a content management system for reading the readme file from the github repo
// it is used to generate the website from the readme file, replacing select elements with custom components

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import styles from "./Markdown.module.css";

// import MarkdownLink from "./MarkdownLink";
// import MarkdownBody from "./MarkdownBody";
// import { MarkdownHeader, MarkdownSubheader } from "./MarkdownHeader";
// import components above dynamically to prevent build errors
const MarkdownLink = dynamic(() => import("./MarkdownLink"));
const MarkdownBody = dynamic(() => import("./MarkdownBody"));
const MarkdownHeader = dynamic(() => import("./MarkdownHeader"));
const MarkdownSubheader = dynamic(() => import("./MarkdownSubheader"));

const MarkdownCMS = ({ readmeURL: markdownURL }) => {
  const [markdownText, setMarkdownText] = useState("");
  useEffect(() => {
    fetch(markdownURL)
      .then((res) => res.text())
      .then((text) => {
        setMarkdownText(text);
      });
  }, [markdownURL]);

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
