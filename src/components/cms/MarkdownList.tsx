import React from "react";

const MarkdownUL = ({ children }) => {
  return <ul className="list-inside list-disc px-2">{children}</ul>;
};

const MarkdownOL = ({ children }) => {
  return <ol className="list-inside list-decimal px-2">{children}</ol>;
};

const MarkdownLI = ({ children }) => {
  return <li className="my-1">{children}</li>;
};

export { MarkdownUL, MarkdownLI, MarkdownOL };
