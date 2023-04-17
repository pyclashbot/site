import dynamic from "next/dynamic";
import React from "react";
import { initializeGA } from "../GoogleAnalytics";

const Header = dynamic(() => import("../components/Header"));
const ReadMe = dynamic(() => import("../components/readme/ReadMe"));

initializeGA();

export default function Home() {
  return (
    <>
      <Header
        title="py-clash-bot"
        description="A Clash Royale automation bot written in Python"
        keywords="clash royale, bot, automation, python, py-clash-bot"
        url="https://pyclashbot.vercel.app/"
      />
      <ReadMe />
    </>
  );
}
