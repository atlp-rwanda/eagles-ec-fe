// @ts-nocheck
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "../redux/store";
import Footer from "../components/common/footer/Footer";

describe("Testing React components", () => {
  it("should render home page components", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("contacts")).toBeInTheDocument();
    expect(screen.getByTestId("categories")).toBeInTheDocument();
    expect(screen.getByTestId("quick-links")).toBeInTheDocument();
    expect(screen.getByTestId("support")).toBeInTheDocument();

    expect(screen.getByTestId("facebook-link")).toBeInTheDocument();
    expect(screen.getByTestId("instagram-link")).toBeInTheDocument();
    expect(screen.getByTestId("twitter-link")).toBeInTheDocument();
    expect(screen.getByTestId("linkedin-link")).toBeInTheDocument();

    expect(
      screen.getByText(
        /Terms & conditions Cookies Policy Privacy Accessibility/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/© 2024 eagles ec. All rights reserved./i),
    ).toBeInTheDocument();
  });
});
