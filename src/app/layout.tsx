import "@/styles/global.css";
import { Noto_Sans_Mono as Font } from "next/font/google";
import Script from "next/script";
import { ReactNode } from "react";
import { z } from "zod";

const schema = z.object({
  ANALYTICS_ID: z.string(),
});
const env = schema.parse(process.env);

const font = Font({ subsets: ["latin"] });

const title = "py-clash-bot - Automated Clash Royale";
const description =
  "An open-source application that allows users to automate their Clash Royale gameplay on Windows using an emulated Android phone.";

export const metadata = {
  title: {
    template: "%s | py-clash-bot",
    default: title,
  },
  description,
  metadataBase: new URL("https://www.pyclashbot.app"),
  openGraph: {
    title,
    description,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og?v1",
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico?v1",
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    images: ["/og?v1"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://analytics.pyclashbot.app/script.js"
          data-website-id={env.ANALYTICS_ID}
          data-domains="pyclashbot.app,www.pyclashbot.app"
        />
        <link rel="canonical" href="https://www.pyclashbot.app/" />
      </head>
      <body className={`${font.className} bg-background`}>
        <div className="mx-auto flex h-screen min-h-screen max-w-screen-lg flex-col items-center justify-between text-black sm:w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
