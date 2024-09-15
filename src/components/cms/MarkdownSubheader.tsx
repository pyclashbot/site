import React from "react";

const MarkdownSubheader = ({
  children,
}: React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) => {
  return <h3 className="pb-2 pt-4 text-3xl font-semibold">{children}</h3>;
};

export default MarkdownSubheader;
