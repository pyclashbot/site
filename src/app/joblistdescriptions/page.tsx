import MarkdownCMS from "@/components/cms/MarkdownCMS";
import React from "react";

export const revalidate = 3600;

const markdownURL =
  "https://raw.githubusercontent.com/pyclashbot/py-clash-bot/master/JobListDescriptions.md";

async function JobListDescriptions() {
  const res = await fetch(markdownURL);
  let readmeText = await res.text();
  readmeText +=
    "\n\n## Links\n **[View py-clash-bot on GitHub](https://github.com/pyclashbot/py-clash-bot)**";
  return <MarkdownCMS markdownText={readmeText} />;
}

export default JobListDescriptions;
