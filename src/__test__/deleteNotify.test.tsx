import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import store from "../redux/store";
import DeleteNotify from "../components/common/notify/DeleteNotify";

describe("DeleteNotify component", () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <DeleteNotify onConfirm={mockOnConfirm} onCancel={mockOnCancel} />
        </Router>
      </Provider>,
    );
  });

  test('renders the "Clear Cart" button', () => {
    const clearCartButton = screen.getByText("Clear Cart");
    expect(clearCartButton).toBeInTheDocument();
  });

  test("opens the modal when Clear Cart button is clicked", () => {
    const clearCartButton = screen.getByText("Clear Cart");
    fireEvent.click(clearCartButton);

    const modalHeader = screen.getByText(
      "Are you sure you want to delete this product?",
    );
    expect(modalHeader).toBeInTheDocument();
  });

  test("calls onConfirm and closes modal when is clicked", () => {
    const clearCartButton = screen.getByText("Clear Cart");
    fireEvent.click(clearCartButton);

    const confirmButton = screen.getByText("Yes, I'm sure");
    fireEvent.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(
      screen.queryByText("Are you sure you want to delete this product?"),
    ).toBeInTheDocument();
  });

  test('calls onCancel and closes modal when "No, cancel" is clicked', () => {
    const clearCartButton = screen.getByText("Clear Cart");
    fireEvent.click(clearCartButton);

    const cancelButton = screen.getByText("No, cancel");
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
    expect(
      screen.queryByText("Are you sure you want to delete this product?"),
    ).toBeInTheDocument();
  });
});
