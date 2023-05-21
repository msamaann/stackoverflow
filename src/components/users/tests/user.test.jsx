import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import User from "../user";

describe("User component", () => {
  const userDetails = {
    id: 1,
    profileImage: "image-url",
    name: "John Doe",
    display_name: "John",
    reputation: 100,
    isFollowed: false,
    isBlocked: false,
  };

  const updateUsersMock = jest.fn();

  it("renders the user details correctly", () => {
    render(<User details={userDetails} updateUsers={updateUsersMock} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Reputation: 100")).toBeInTheDocument();
  });

  it("calls updateUsers with the correct parameters when follow button is clicked", () => {
    render(<User details={userDetails} updateUsers={updateUsersMock} />);

    const followButton = screen.getByText("Follow");
    fireEvent.click(followButton);

    expect(updateUsersMock).toHaveBeenCalledWith(expect.any(Function));
  });

  it("calls updateUsers with the correct parameters when block button is clicked", () => {
    render(<User details={userDetails} updateUsers={updateUsersMock} />);

    const blockButton = screen.getByText("Block");
    fireEvent.click(blockButton);

    expect(updateUsersMock).toHaveBeenCalledWith(expect.any(Function));
  });
});
