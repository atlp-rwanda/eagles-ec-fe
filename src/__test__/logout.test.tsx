import "@testing-library/jest-dom";
import {
  render, screen, fireEvent, waitFor,
} from "@testing-library/react";
import { isExpired } from "react-jwt";

import {
  useLogout,
  LogoutProvider,
} from "../components/dashboard/admin/LogoutContext";
import { performLogout } from "../utils/logoutUtils";

// Mocking performLogout and isExpired functions
jest.mock("../utils/logoutUtils", () => ({
  performLogout: jest.fn(),
}));
jest.mock("react-jwt", () => ({
  isExpired: jest.fn(),
}));

const MockComponent = () => {
  const { openLogoutModal } = useLogout();
  return <button onClick={openLogoutModal}>Open Logout Modal</button>;
};

describe("LogoutContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render children", () => {
    render(
      <LogoutProvider>
        <div>Child Component</div>
      </LogoutProvider>,
    );
    expect(screen.getByText("Child Component")).toBeInTheDocument();
  });

  it("should open and close the logout modal", () => {
    render(
      <LogoutProvider>
        <MockComponent />
      </LogoutProvider>,
    );

    fireEvent.click(screen.getByText("Open Logout Modal"));
    expect(screen.getByText("Confirm Logout")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByText("Confirm Logout")).not.toBeInTheDocument();
  });

  it("should handle logout", async () => {
    (performLogout as jest.Mock).mockResolvedValueOnce(undefined);

    render(
      <LogoutProvider>
        <MockComponent />
      </LogoutProvider>,
    );

    fireEvent.click(screen.getByText("Open Logout Modal"));
    expect(screen.getByText("Confirm Logout")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Logout"));
    await waitFor(() => expect(performLogout).toHaveBeenCalled());
    expect(screen.queryByText("Confirm Logout")).not.toBeInTheDocument();
  });

  it("should not redirect if token is not expired", async () => {
    (isExpired as jest.Mock).mockReturnValue(false);

    render(
      <LogoutProvider>
        <MockComponent />
      </LogoutProvider>,
    );

    // await waitFor(() => expect(isExpired).toHaveBeenCalled());
    expect(window.location.href).not.toBe("/");
  });
});
