import React from "react";

const MarkdownUL = ({
  children,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>) => {
  return <ul className="list-inside list-disc px-2">{children}</ul>;
};

const MarkdownOL = ({
  children,
}: React.DetailedHTMLProps<
  React.OlHTMLAttributes<HTMLOListElement>,
  HTMLOListElement
>) => {
  return <ol className="list-inside list-decimal px-2">{children}</ol>;
};

const MarkdownLI = ({
  children,
}: React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>) => {
  return <li className="my-1">{children}</li>;
};

export { MarkdownUL, MarkdownLI, MarkdownOL };
