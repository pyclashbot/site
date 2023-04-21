import dynamic from "next/dynamic";
import React from "react";

const Header = dynamic(() => import("../components/Header"));
const MarkdownCMS = dynamic(() => import("../components/cms/MarkdownCMS"));

const markdownURL =
  "https://raw.githubusercontent.com/matthewmiglio/py-clash-bot/master/CONTRIBUTING.md";

function Home({ readmeText }) {
  return (
    <>
      <Header
        title="py-clash-bot Contributing"
        description="A Clash Royale automation bot written in Python"
        keywords="clash royale, bot, automation, python, py-clash-bot"
        url="https://pyclashbot.vercel.app/"
      />
      <MarkdownCMS markdownText={readmeText} />
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(markdownURL);
  const text = await res.text();
  return { props: { readmeText: text } };
}

export default Home;
