import React from "react";

const MarkdownUL = ({
  children,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>) => {
  return <ul className="list-inside list-disc space-y-1">{children}</ul>;
};

const MarkdownOL = ({
  children,
}: React.DetailedHTMLProps<
  React.OlHTMLAttributes<HTMLOListElement>,
  HTMLOListElement
>) => {
  return <ol className="list-inside list-decimal space-y-1">{children}</ol>;
};

const MarkdownLI = ({
  children,
}: React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>) => {
  return <li>{children}</li>;
};

export { MarkdownUL, MarkdownLI, MarkdownOL };
