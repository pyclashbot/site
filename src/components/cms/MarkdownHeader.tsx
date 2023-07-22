import React from "react";

const MarkdownHeader = ({ children }) => {
  return (
    <h1 className="bg-accent p-2 text-3xl font-bold text-white shadow-header">
      {children}
    </h1>
  );
};

export default MarkdownHeader;
