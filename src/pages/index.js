import dynamic from "next/dynamic";
import React from "react";
import { initializeGA } from "../GoogleAnalytics";
import Script from "next/script";

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
      <div className="gtag-container">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Y7520HNKMG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-Y7520HNKMG');
        `}
        </Script>
      </div>
    </>
  );
}
