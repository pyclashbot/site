import React from "react";

const MarkdownBody = ({ children }) => {
  children = children.filter((child) => child !== " ");
  const hasImage = children.find((child) => child.type === "img");
  if (hasImage) {
    return <div className="flex items-start">{children}</div>;
  }

  const hasLinks = children.every((child) => {
    if (child.props) {
      return child.props.href;
    }
    return false;
  });
  if (hasLinks) {
    return <div className="flex gap-1">{children}</div>;
  }

  return <div className="px-2">{children}</div>;
};

export default MarkdownBody;
