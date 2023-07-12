import logo from "@/assets/pixel-pycb80.svg";
import { ImageResponse } from "@vercel/og";
import Image from "next/image";

export const config = {
  runtime: "edge",
};

export default function OGImage() {
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
          }}
        >
          <Image src={logo} alt="py-clash-bot" />
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontStyle: "normal",
            color: "black",
            marginTop: 30,
            lineHeight: 1.8,
            whiteSpace: "pre-wrap",
          }}
        >
          <b>py-clash-bot</b>
        </div>
      </div>
    ),

    {
      width: 1200,
      height: 600,
    }
  );
}
