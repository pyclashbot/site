import { GA_MEASUREMENT_ID } from "./GoogleAnalytics.js";
import { process } from "process";

const is_dev = process.env.NODE_ENV !== "production";

export function handleRequest(req) {
  const API_SECRET = process.env.MP_API_KEY;
  if (!API_SECRET) {
    console.error("MP_API_KEY not set");
    return;
  }

  const API_URL = is_dev
    ? "https://www.google-analytics.com/debug/mp/collect"
    : "https://www.google-analytics.com/mp/collect";

  const url = new URL(API_URL);
  url.searchParams.append("measurement_id", GA_MEASUREMENT_ID);
  url.searchParams.append("api_secret", API_SECRET);

  const event = {
    client_id:
      req.cookies._ga ??
      Buffer.from(String(req.headers["x-forwarded-for"])).toString("base64"),
    events: [
      {
        name: "notification",
        params: {
          url: req.headers.referer,
          query: JSON.stringify(req.query),
        },
      },
    ],
  };

  const mp_res = fetch(url.toString(), {
    method: "POST",
    body: JSON.stringify(event),
  });

  if (is_dev) {
    console.log(JSON.stringify(event));
    mp_res.then((res) => res.json()).then((data) => console.log(data));
  }
}
