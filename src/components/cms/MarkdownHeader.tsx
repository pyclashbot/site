import React from "react";

const MarkdownHeader = ({
  children,
}: React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) => {
  if (typeof children === "string" && children === "py-clash-bot") {
    return null;
  }

  return (
    <h2 className="py-2 text-3xl font-black tracking-wide text-primary">
      {children}
    </h2>
  );
};

export default MarkdownHeader;
