import Footer from "@/components/Footer";
import Provider from "@/components/providers/GlobalProvider";
import "@/styles/global.css";
import { Gantari as Font } from "next/font/google";
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
}: Readonly<{
  children: ReactNode;
}>) {
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
      <Provider>
      <body className={`${font.className} antialiased`}>
        <div className="mx-auto flex w-11/12 max-w-screen-md flex-col">
          <div className="flex min-h-screen flex-col">{children}</div>
          <Footer />
        </div>
      </body>
      </Provider>
    </html>
  );
}
