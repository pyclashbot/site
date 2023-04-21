import React from "react";
import styles from "./Markdown.module.css";

const MarkdownSubheader = ({ children }) => {
  return <h2 className={styles.subheader}>{children}</h2>;
};

export default MarkdownSubheader;
