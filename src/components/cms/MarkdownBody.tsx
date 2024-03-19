import React from "react";

const MarkdownBody = ({
  children,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) => {
  if (!children) return <></>;
  if (
    typeof children === "string" ||
    typeof children === "number" ||
    typeof children === "boolean" ||
    React.isValidElement(children)
  ) {
    return <div>{children}</div>;
  }

  if (Array.isArray(children)) {
    let childArr = Array.from(children);
    childArr = childArr.filter((child: React.ReactNode) => child !== " ");

    // check if any children are images
    if (
      childArr.some(
        (child: React.ReactNode) =>
          React.isValidElement(child) && child?.type == "img",
      )
    ) {
      return <div className="flex items-start">{children}</div>;
    }

    // check if all children are links
    if (
      childArr.every(
        (child: React.ReactNode) =>
          React.isValidElement(child) && child?.props?.href,
      )
    ) {
      return <div className="flex gap-1 pb-1 pt-1">{children}</div>;
    }
  }

  return <div>{children}</div>;
};

export default MarkdownBody;
