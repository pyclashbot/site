import React from "react";

const MarkdownSubheader = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="my-2 bg-accent p-1 text-xl text-white shadow-subheader">
      {children}
    </h2>
  );
};

export default MarkdownSubheader;
