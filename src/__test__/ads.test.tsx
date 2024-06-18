// @ts-nocheck
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import AdvertisedCategory from "../components/common/ads/AdvertisedCategory";
import store from "../redux/store";

test("demo", () => {
  expect(true).toBe(true);
});

describe("Testing AdvertisedCategory Component", () => {
  it("should render advertised category section", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AdvertisedCategory />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByTestId("advertised-category")).toBeInTheDocument();
    expect(screen.getByText(/Categories/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Enhance Your Music Experiences/i),
    ).toBeInTheDocument();
    expect(screen.getByTestId("buy-now-button")).toBeInTheDocument();

    expect(screen.getByText("23")).toBeInTheDocument();
    expect(screen.getByText("05")).toBeInTheDocument();
    expect(screen.getByText("59")).toBeInTheDocument();
    expect(screen.getByText("35")).toBeInTheDocument();
  });
});
