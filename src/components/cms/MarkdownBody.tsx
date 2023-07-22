import React from "react";

const MarkdownBody = ({ children }: { children: any }) => {
  if (typeof children === "string") {
    return <div className="px-2">{children}</div>;
  }
  children = children.filter((child: any) => child !== " ");
  const hasImage = children.find((child: any) => child.type === "img");
  if (hasImage) {
    return <div className="flex items-start">{children}</div>;
  }

  const hasLinks = children.every((child: any) => {
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
