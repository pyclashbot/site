/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
            backgroundColor: "ivory",
            backgroundImage:
              "radial-gradient(circle at 25px 25px, blue 2%, transparent 0%), radial-gradient(circle at 75px 75px, red 2%, transparent 0%)",
            backgroundSize: "100px 100px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
            }}
          >
            <img
              src="https://www.pyclashbot.app/pixel-pycb80.svg"
              alt="py-clash-bot"
              style={{ width: "250px", height: "250px" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              fontSize: 50,
              fontStyle: "normal",
              color: "black",
              // lineHeight: 1.8,
              // whiteSpace: "pre-wrap",
            }}
          >
            <h2>py-clash-bot</h2>
            <p style={{ color: "darkgray" }}>Automated Clash Royale</p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
