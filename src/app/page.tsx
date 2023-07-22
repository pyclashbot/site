import React from "react";
import MarkdownCMS from "@/components/cms/MarkdownCMS";

const markdownURL =
  "https://raw.githubusercontent.com/matthewmiglio/py-clash-bot/master/README.md";

async function Index() {
  const res = await fetch(markdownURL, { next: { revalidate: 6000 } });
  const readmeText = await res.text();
  return <MarkdownCMS markdownText={readmeText} />;
}

export default Index;
