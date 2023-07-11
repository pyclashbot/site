import { NextRequest, NextResponse } from "next/server";
import { SendEmbed } from "./Discord";
import { z } from "zod";

let envSchema = z.object({
  API_ROUTE_SECRET: z.string(),
  DISCORD_WEBHOOK_RELEASE: z.string().url(),
});
let env = envSchema.parse(process.env);

export async function POST(request: NextRequest) {
  // authorization
  const { searchParams } = new URL(request.url);
  if (searchParams.get("code") !== env.API_ROUTE_SECRET) {
    return new NextResponse("You are not authorized to call this API", {
      status: 401,
    });
  }

  // send embed
  const webhookUrl = env.DISCORD_WEBHOOK_RELEASE;
  const reqBody = await request.text();
  if (reqBody === "") {
    return new NextResponse("No body", { status: 400 });
  }
  const data: {
    title?: string;
    description?: string;
    url?: string;
    timestamp?: Date;
    color?: number;
  } = JSON.parse(reqBody);
  console.log("Embed data:", data);
  if (data.title) {
    data.title = "📦 | " + data.title;
  }
  await SendEmbed(webhookUrl, {
    title: "🎁 | New Release",
    url: "https://github.com/matthewmiglio/py-clash-bot/releases/latest",
    color: 0x03fc49,
    ...data,
  });

  return new NextResponse("Success", { status: 200 });
}
