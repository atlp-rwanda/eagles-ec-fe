// @ts-nocheck
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "../redux/store";
import HeroSection from "../components/common/hero/HeroSection";

describe("Testing HeroSection Component", () => {
  it("should render hero section", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <HeroSection />
          {/* <Navbar /> */}
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    expect(screen.getByText("Your One-Stop")).toBeInTheDocument();
    expect(screen.getByText("Electronic Market")).toBeInTheDocument();
    expect(screen.getByText(/Welcome to eagles/i)).toBeInTheDocument();
    expect(screen.getByTestId("get-started-button")).toBeInTheDocument();
    expect(screen.getByText("Get Started")).toBeInTheDocument();

    // const navLinks = screen.getAllByRole("link");
    // const productsLink = screen.getByText("Products");

    // expect(productsLink).toBeInTheDocument();
    // expect(productsLink).toHaveAttribute("href", "/products");
  });
});
