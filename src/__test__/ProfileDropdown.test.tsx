import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { useLogout } from "../components/dashboard/admin/LogoutContext"; // Ensure the correct path
import ProfileDropdown from "../components/common/ProfileDropdown";

// Mock the useLogout hook
jest.mock("../components/dashboard/admin/LogoutContext", () => ({
  useLogout: jest.fn(),
}));

describe("ProfileDropdown", () => {
  const openLogoutModalMock = jest.fn();

  beforeEach(() => {
    (useLogout as jest.Mock).mockReturnValue({
      openLogoutModal: openLogoutModalMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render profile and orders links for a user with roleId 1", () => {
    const userInfo = { roleId: 1 };

    render(
      <Router>
        <ProfileDropdown userInfo={userInfo} />
      </Router>,
    );

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("My Orders")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("should render the correct dashboard link for roleId 2", () => {
    const userInfo = { roleId: 2 };

    render(
      <Router>
        <ProfileDropdown userInfo={userInfo} />
      </Router>,
    );

    expect(screen.getByText("My Dashboard")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /My Dashboard/i })).toHaveAttribute(
      "href",
      "/dashboard",
    );
  });

  it("should render the correct dashboard link for roleId 3", () => {
    const userInfo = { roleId: 3 };

    render(
      <Router>
        <ProfileDropdown userInfo={userInfo} />
      </Router>,
    );

    expect(screen.getByText("My Dashboard")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /My Dashboard/i })).toHaveAttribute(
      "href",
      "/admin/users",
    );
  });

  it("should call openLogoutModal when logout button is clicked", () => {
    const userInfo = { roleId: 1 };

    render(
      <Router>
        <ProfileDropdown userInfo={userInfo} />
      </Router>,
    );

    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    expect(openLogoutModalMock).toHaveBeenCalled();
  });

  it("should render login link if userInfo is not provided", () => {
    render(
      <Router>
        <ProfileDropdown userInfo={null} />
      </Router>,
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
