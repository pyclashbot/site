import dynamic from "next/dynamic";
import React from "react";

const Header = dynamic(() => import("../components/Header"));
const ReadMeCMS = dynamic(() => import("../components/readme/ReadMeCMS"));

export default function Home() {
  return (
    <>
      <Header
        title="py-clash-bot"
        description="A Clash Royale automation bot written in Python"
        keywords="clash royale, bot, automation, python, py-clash-bot"
        url="https://pyclashbot.vercel.app/"
      />
      <ReadMeCMS />
    </>
  );
}
