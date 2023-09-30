import React from "react";
import Link from "next/link";

const MarkdownLink = ({
  href,
  children,
}: React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) => {
  // if href links to .md file, it should really link to the page
  if (href?.includes(".md")) {
    const fileName = href.split("/").pop();
    const pageName = fileName?.replace(".md", "");
    const pageNameLower = pageName?.toLowerCase();
    href = `/${pageNameLower}`;
  }
  return (
    <Link href={href ?? ""} className="text-accent hover:underline">
      {children}
    </Link>
  );
};

export default MarkdownLink;
