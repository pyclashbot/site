// nextjs api route for notification data
// https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import notifications from "@/assets/notifications.json";
import { handleRequest } from "@/MeasurmentProtocol";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { MP_API_KEY, GA_MEASUREMENT_ID } = process.env;

  if (MP_API_KEY) {
    const is_dev = process.env.NODE_ENV !== "production";
    handleRequest(req, MP_API_KEY, GA_MEASUREMENT_ID, is_dev);
  }

  // latest query param returns only the latest notification
  if (req.query.latest) {
    res.status(200).json(notifications[0]);
  } else {
    res.status(200).json(notifications);
  }
}
