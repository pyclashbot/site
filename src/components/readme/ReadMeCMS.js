// this compnent is a content management system for reading the readme file from the github repo
// it is used to generate the website from the readme file, replacing select elements with custom components

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import styles from "./ReadMe.module.css";
import { handleClick } from "../../GoogleAnalytics";

const README_URL =
  "https://raw.githubusercontent.com/matthewmiglio/py-clash-bot/master/README.md";

const ReadMeCMS = () => {
  const [readme, setReadme] = useState("");
  useEffect(() => {
    fetch(README_URL)
      .then((res) => res.text())
      .then((text) => {
        setReadme(text);
      });
  }, []);

  const components = {
    // a tags get Google Analytics event handler
    a: ({ children, href }) => {
      return (
        <a
          href={href}
          onClick={(event) => {
            handleClick(event);
          }}
        >
          {children}
        </a>
      );
    },
    // p tags get 'styles.textblock' class
    p: ({ children }) => <p className={styles.textblock}>{children}</p>,
    // h1 tags get 'styles.header' class
    h1: ({ children }) => <h1 className={styles.header}>{children}</h1>,
    // h2 and below tags get 'styles.subheader' class
    h2: ({ children }) => <h2 className={styles.subheader}>{children}</h2>,
    h3: ({ children }) => <h3 className={styles.subheader}>{children}</h3>,
    h4: ({ children }) => <h4 className={styles.subheader}>{children}</h4>,
    h5: ({ children }) => <h5 className={styles.subheader}>{children}</h5>,
    h6: ({ children }) => <h6 className={styles.subheader}>{children}</h6>,
    // p's with images get 'demo' class
    p: ({ children }) => {
      let hasImage = false;
      children.forEach((child) => {
        if (child.type === "img") {
          hasImage = true;
        }
      });
      return (
        <p className={hasImage ? styles.demo : styles.textblock}>{children}</p>
      );
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={components}
        >
          {readme}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ReadMeCMS;
