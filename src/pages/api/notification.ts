// nextjs api route for notification data
// https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import notifications from "../../assets/notifications.json";
import { handleRequest } from "../../MeasurmentProtocol";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  handleRequest(req);

  // latest query param returns only the latest notification
  if (req.query.latest) {
    res.status(200).json(notifications[0]);
  } else {
    res.status(200).json(notifications);
  }
}
