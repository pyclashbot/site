import Link from "next/link";
import React from "react";

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
    <Link
      href={href ?? ""}
      className="text-accent-foreground underline hover:opacity-80"
      data-umami-event="link click"
      data-umami-event-href={href ?? ""}
    >
      {children}
    </Link>
  );
};

export default MarkdownLink;
