import dynamic from "next/dynamic";
import React from "react";

const Header = dynamic(() => import("../components/Header"));
const MarkdownCMS = dynamic(() => import("../components/cms/MarkdownCMS"));

export default function Home() {
  return (
    <>
      <Header
        title="py-clash-bot Contributing"
        description="A Clash Royale automation bot written in Python"
        keywords="clash royale, bot, automation, python, py-clash-bot"
        url="https://pyclashbot.vercel.app/"
      />
      <MarkdownCMS
        readmeURL={
          "https://raw.githubusercontent.com/matthewmiglio/py-clash-bot/master/CONTRIBUTING.md"
        }
      />
    </>
  );
}
