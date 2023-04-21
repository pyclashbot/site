import React from "react";
import styles from "./Markdown.module.css";

const MarkdownBody = ({ children }) => {
  const hasImage = children.find((child) => child.type === "img");
  return (
    <p className={hasImage ? styles.demo : styles.textblock}>{children}</p>
  );
};

export default MarkdownBody;
