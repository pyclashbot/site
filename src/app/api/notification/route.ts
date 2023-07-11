// nextjs api route for notification data
// https://nextjs.org/docs/api-routes/introduction
import { NextRequest, NextResponse } from "next/server";
import notifications from "@/assets/notifications.json";
import { handleRequest } from "@/MeasurmentProtocol";
import { z } from "zod";

let envSchema = z.object({
  MP_API_KEY: z.string(),
  GA_MEASUREMENT_ID: z.string(),
});
let env = envSchema.parse(process.env);

export async function GET(request: NextRequest) {
  const { MP_API_KEY, GA_MEASUREMENT_ID } = env;

  if (MP_API_KEY) {
    const is_dev = process.env.NODE_ENV !== "production";
    handleRequest(request, MP_API_KEY, GA_MEASUREMENT_ID, is_dev);
  }

  const { searchParams } = new URL(request.url);

  // latest query param returns only the latest notification
  if (searchParams.get("latest")) {
    return new NextResponse(JSON.stringify(notifications[0]), { status: 200 });
  } else {
    return new NextResponse(JSON.stringify(notifications), { status: 200 });
  }
}
