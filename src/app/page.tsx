import React from "react";
import MarkdownCMS from "@/components/cms/MarkdownCMS";

const markdownURL =
  "https://raw.githubusercontent.com/matthewmiglio/py-clash-bot/master/README.md";

async function Index() {
  const res = await fetch(markdownURL, { next: { revalidate: 6000 } });
  let readmeText = await res.text();
  readmeText +=
    "\n\n## Links\n **[View py-clash-bot on GitHub](https://github.com/matthewmiglio/py-clash-bot)**";
  return <MarkdownCMS markdownText={readmeText} />;
}

export default Index;
