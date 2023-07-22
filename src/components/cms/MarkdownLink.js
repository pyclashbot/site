import React from "react";

const MarkdownLink = ({ href, children }) => {
  // if href links to .md file, it should really link to the page
  if (href.includes(".md")) {
    const fileName = href.split("/").pop();
    const pageName = fileName.replace(".md", "");
    const pageNameLower = pageName.toLowerCase();
    href = `/${pageNameLower}`;
  }
  return (
    <a href={href} className="text-accent hover:underline">
      {children}
    </a>
  );
};

export default MarkdownLink;
