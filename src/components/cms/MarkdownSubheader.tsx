import React from "react";

const MarkdownSubheader = ({
  children,
}: React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) => {
  return <h2 className="pb-2 pt-4 text-3xl font-bold">{children}</h2>;
};

export default MarkdownSubheader;
