import React from "react";
import MarkdownCMS from "@/components/cms/MarkdownCMS";

const markdownURL =
  "https://raw.githubusercontent.com/matthewmiglio/py-clash-bot/master/CONTRIBUTING.md";

async function Contributing() {
  const res = await fetch(markdownURL);
  const readmeText = await res.text();
  return <MarkdownCMS markdownText={readmeText} />;
}

export default Contributing;
