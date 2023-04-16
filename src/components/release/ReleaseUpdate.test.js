import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import ReleaseUpdate from "./ReleaseUpdate";

describe("ReleaseUpdate", () => {
  it("should render with initial props and state", () => {
    render(<ReleaseUpdate />);

    // Assert that the initial state of last_updated is set correctly
    expect(screen.getByText("Release last updated")).toBeTruthy();
  });

  it("should render 1 day ago", async () => {
    // Mock the fetch API response
    const mockResponse = {
      assets: [
        {
          updated_at: new Date(new Date() - 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
    };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );

    render(<ReleaseUpdate />);

    // Wait for componentDidMount to fetch and update state
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Assert that the state was updated with the correct release URL
    await waitFor(() => {
      expect(screen.getByText("Release last updated 1 day ago")).toBeTruthy();
    });
  });

  it("should render 1 hour ago", async () => {
    // Mock the fetch API response
    const mockResponse = {
      assets: [
        {
          updated_at: new Date(new Date() - 60 * 60 * 1000).toISOString(),
        },
      ],
    };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );

    render(<ReleaseUpdate />);

    // Wait for componentDidMount to fetch and update state
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Assert that the state was updated with the correct release URL
    await waitFor(() => {
      expect(screen.getByText("Release last updated 1 hour ago")).toBeTruthy();
    });
  });
});
