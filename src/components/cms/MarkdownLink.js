import React from "react";
import { handleClick } from "../../GoogleAnalytics";

const MarkdownLink = ({ href, children }) => {
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
