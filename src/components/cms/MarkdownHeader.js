import React from "react";
import styles from "./Markdown.module.css";

const MarkdownHeader = ({ children }) => {
  return <h1 className={styles.header}>{children}</h1>;
};

export default MarkdownHeader;
