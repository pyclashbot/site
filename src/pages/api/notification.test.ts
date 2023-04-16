import { NextApiRequest, NextApiResponse } from "next";
import handler from "./notification";
import notifications from "../../assets/notifications.json";
import { handleRequest } from "../../MeasurmentProtocol.js";

jest.mock("../../MeasurmentProtocol", () => ({
  handleRequest: jest.fn(),
}));

describe("Next.js API Route: handler", () => {
  let req: NextApiRequest;
  let res: NextApiResponse;

  beforeEach(() => {
    req = {
      query: {},
    } as NextApiRequest;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should call handleRequest with req object", () => {
    handler(req, res);

    expect(handleRequest).toHaveBeenCalledWith(req);
  });

  it("should return all notifications when latest query param is not provided", () => {
    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(notifications);
  });

  it("should return the latest notification when latest query param is provided", () => {
    req.query.latest = "true";

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(notifications[0]);
  });
});
