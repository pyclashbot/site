import "@/styles/global.css";
import Script from "next/script";
export const metadata = {
  title: {
    template: "%s | py-clash-bot",
    default: "py-clash-bot - Automated Clash Royale",
  },
  description:
    "An open-source application that allows users to automate their Clash Royale gameplay on Windows using an emulated Android phone.",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    title: "py-clash-bot",
    description:
      "An open-source application that allows users to automate their Clash Royale gameplay on Windows using an emulated Android phone.",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://pyclashbot.app/og",
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
  themeColor: "#ffffff",
  twitter: {
    title: "py-clash-bot",
    description:
      "An open-source application that allows users to automate their Clash Royale gameplay on Windows using an emulated Android phone.",
    card: "summary_large_image",
    images: ["https://pyclashbot.app/og"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  other: { "msapplication-TileColor": "#3bc4c1" },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.GA_MEASUREMENT_ID}');
        `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
