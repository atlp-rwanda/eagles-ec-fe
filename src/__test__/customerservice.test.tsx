// @ts-nocheck
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "../redux/store";
import CustomerService from "../components/common/customerservice/CustomerService";

describe("Testing CustomerService Component", () => {
  it("should render customer service", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CustomerService />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByTestId("customer-service")).toBeInTheDocument();
    expect(screen.getByTestId("delivery")).toBeInTheDocument();
    expect(screen.getByTestId("customer-support")).toBeInTheDocument();
    expect(screen.getByTestId("money-back-guarantee")).toBeInTheDocument();

    expect(screen.getByText(/FREE AND FAST DELIVERY/i)).toBeInTheDocument();
    expect(screen.getByText(/24\/7 CUSTOMER SERVICE/i)).toBeInTheDocument();
    expect(screen.getByText(/MONEY BACK GUARANTEE/i)).toBeInTheDocument();
  });
});
