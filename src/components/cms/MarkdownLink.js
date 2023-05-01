import React from "react";
import { handleClick } from "../../GoogleAnalytics";

const MarkdownLink = ({ href, children }) => {
  // if href links to .md file, it should really link to the page
  if (href.includes(".md")) {
    const fileName = href.split("/").pop();
    const pageName = fileName.replace(".md", "");
    const pageNameLower = pageName.toLowerCase();
    href = `/${pageNameLower}`;
  }
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
};

export default MarkdownLink;
