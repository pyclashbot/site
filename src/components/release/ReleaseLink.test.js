import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import ReleaseLink from "./ReleaseLink";

describe("ReleaseLink", () => {
  it("should render with initial props and state", () => {
    render(<ReleaseLink child={<span>Download</span>} />);

    // Assert that the child prop is rendered
    expect(screen.getByText("Download")).toBeTruthy();

    // Assert that the initial state of release_url is set correctly
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://github.com/matthewmiglio/py-clash-bot/releases/latest"
    );
  });

  it("should update state on componentDidMount", async () => {
    // Mock the fetch API response
    const mockResponse = {
      assets: [
        { browser_download_url: "https://example.com/download" },
        { browser_download_url: "https://example.com/download2" },
      ],
    };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );

    render(<ReleaseLink child={<span>Download</span>} />);

    // Wait for componentDidMount to fetch and update state
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Assert that the state was updated with the correct release URL
    await waitFor(() => {
      expect(screen.getByRole("link")).toHaveAttribute(
        "href",
        "https://example.com/download"
      );
    });
  });

  it("should call handleDownload when link is clicked", async () => {
    // Mock the fetch API response
    const mockResponse = {
      assets: [{ browser_download_url: "https://example.com/download" }],
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );

    const handleDownloadMock = jest.fn();

    render(
      <ReleaseLink child={<span>Download</span>} onClick={handleDownloadMock} />
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    // wait until we find the link with the inital href and see that it changes
    await waitFor(() => {
      expect(screen.getByRole("link")).toHaveAttribute(
        "href",
        "https://example.com/download"
      );
    });

    // click the link
    const linkElement = screen.getByRole("link");
    fireEvent.click(linkElement);

    // Assert that handleDownload was called with the correct arguments
    await waitFor(() => {
      expect(handleDownloadMock).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            href: "https://example.com/download",
          }),
        }),
        "https://example.com/download"
      );
    });
  });
});
