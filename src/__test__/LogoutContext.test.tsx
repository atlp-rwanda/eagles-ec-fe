import "@testing-library/jest-dom";
import React from "react";
import {
  render, screen, fireEvent, waitFor,
} from "@testing-library/react";

import {
  LogoutProvider,
  useLogout,
} from "../components/dashboard/admin/LogoutContext";
import api from "../redux/api/api";

// Mock the API and localStorage
jest.mock("../redux/api/api");
const mockPost = api.post as jest.MockedFunction<typeof api.post>;

// Mock LogoutModal component
jest.mock("../components/dashboard/admin/LogoutModal", () => ({
  __esModule: true,
  default: ({ isOpen, onClose, onConfirm }: any) =>
    (isOpen ? (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="p-6 bg-white rounded shadow-lg">
          <h2 className="mb-4 text-xl">Confirm Logout</h2>
          <p className="mb-4">Are you sure you want to logout?</p>
          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-2 text-white bg-gray-500 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-white bg-red-500 rounded"
              onClick={onConfirm}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    ) : null),
}));

const TestComponent: React.FC = () => {
  const { openLogoutModal } = useLogout();
  return <button onClick={openLogoutModal}>Open Logout Modal</button>;
};

describe("LogoutProvider Component", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it("should render LogoutProvider and trigger logout modal", () => {
    render(
      <LogoutProvider>
        <TestComponent />
      </LogoutProvider>,
    );

    const openModalButton = screen.getByText("Open Logout Modal");
    fireEvent.click(openModalButton);

    // Verify that the modal is rendered
    expect(screen.getByText("Confirm Logout")).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure you want to logout?"),
    ).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("should call confirmLogout and perform logout", async () => {
    localStorage.setItem("accessToken", "mockToken");
    mockPost.mockResolvedValue({});

    render(
      <LogoutProvider>
        <TestComponent />
      </LogoutProvider>,
    );

    fireEvent.click(screen.getByText("Open Logout Modal"));
    fireEvent.click(screen.getByText("Logout"));

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith(
        "/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer mockToken`,
            Accept: "*/*",
          },
        },
      );
      expect(localStorage.getItem("accessToken")).toBeNull();
    });
  });

  it("should handle logout failure", async () => {
    localStorage.setItem("accessToken", "mockToken");
    mockPost.mockRejectedValue(new Error("Network error"));

    render(
      <LogoutProvider>
        <TestComponent />
      </LogoutProvider>,
    );

    fireEvent.click(screen.getByText("Open Logout Modal"));
    fireEvent.click(screen.getByText("Logout"));

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "Failed to logout:",
        expect.any(Error),
      );
    });
  });
});
