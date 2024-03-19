import React from "react";

const MarkdownCode = ({
  children,
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
  return <code className="">{children}</code>;
};

export default MarkdownCode;
