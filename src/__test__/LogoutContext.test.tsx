import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import {
  LogoutProvider,
  useLogout,
} from "../components/dashboard/admin/LogoutContext";

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
});
