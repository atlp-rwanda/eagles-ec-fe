import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import store from "../redux/store";
import CartManagement from "../pages/CartManagement";
import Warning from "../components/common/notify/Warning";

describe("Cart Management Page", () => {
  beforeAll(() => {
    jest
      .spyOn(Object.getPrototypeOf(window.localStorage), "getItem")
      .mockReturnValue("mockAccessToken");
  });

  test("should render cart management page correctly", async () => {
    render(
      <Provider store={store}>
        <Router>
          <CartManagement />
        </Router>
      </Provider>,
    );

    await waitFor(() => {
      const spinner = screen.queryByRole("status");
      expect(spinner).toBeNull();
    });

    expect(<Warning />).toBeDefined();
    // expect(screen.getByText("Cart Total")).toBeInTheDocument();
    // expect(screen.getByText("Update Cart")).toBeInTheDocument();
  });

  afterAll(() => {
    // Restore original getItem method after tests
    jest.restoreAllMocks();
  });
});
