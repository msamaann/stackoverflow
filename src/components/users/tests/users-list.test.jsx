import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import UsersList from "../users-list";

jest.mock("axios");

describe("UsersList component", () => {
  const mockedUsers = [
    {
      user_id: 1,
      profile_image: "image1-url",
      display_name: "John",
      reputation: 100,
    },
    {
      user_id: 2,
      profile_image: "image2-url",
      display_name: "Jane",
      reputation: 200,
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and renders the users correctly", async () => {
    axios.get.mockResolvedValueOnce({ data: { items: mockedUsers } });

    render(<UsersList />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(screen.getByText("John")).toBeInTheDocument();
      expect(screen.getByText("Reputation: 100")).toBeInTheDocument();
      expect(screen.getByText("Jane")).toBeInTheDocument();
      expect(screen.getByText("Reputation: 200")).toBeInTheDocument();
    });
  });

  it("renders loading state initially", () => {
    axios.get.mockResolvedValueOnce({ data: { items: mockedUsers } });

    render(<UsersList />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error message when there is an error", async () => {
    const errorMessage = "Failed to fetch users.";
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    render(<UsersList />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    });
  });
});
