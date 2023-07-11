import handler from "./page";
import notifications from "@/assets/notifications.json";
import { handleRequest } from "@/MeasurmentProtocol";

jest.mock("../../../MeasurmentProtocol", () => ({
  handleRequest: jest.fn(),
}));

describe("Next.js API Route: handler", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      query: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should call handleRequest with req object", () => {
    handler(req, res);

    if (process.env.MP_API_KEY) {
      expect(handleRequest).toHaveBeenCalledWith(
        req,
        process.env.MP_API_KEY,
        expect.anything(),
        expect.any(Boolean)
      );
    } else {
      expect(handleRequest).not.toHaveBeenCalled();
    }
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
