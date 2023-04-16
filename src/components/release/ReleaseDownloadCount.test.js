import { render, screen, waitFor } from "@testing-library/react";
import ReleaseDownloadCount from "./ReleaseDownloadCount";
import React from "react";

describe("ReleaseDownloadCount", () => {
  it("should render initial state correctly", () => {
    render(<ReleaseDownloadCount />);

    // Assert that the initial state of download_count is 0
    expect(screen.getByText("0")).toBeTruthy();
  });

  it("should call fetch API and update state on mount", async () => {
    // Mock the fetch API response
    const mockResponse = {
      json: jest.fn(() =>
        Promise.resolve({
          assets: [
            { download_count: 100 },
            { download_count: 200 },
            { download_count: 300 },
          ],
        })
      ),
    };
    global.fetch = jest.fn(() => Promise.resolve(mockResponse));

    render(<ReleaseDownloadCount />);

    // Assert that fetch API was called with the correct URL
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.github.com/repos/matthewmiglio/py-clash-bot/releases/latest"
      );
    });
    // Wait for the state to be updated
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Assert that the state was updated with the correct download count
    expect(screen.getByText("600")).toBeTruthy();
  });
});
