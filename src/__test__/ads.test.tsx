// @ts-nocheck
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import AdvertisedCategory from "../components/common/ads/AdvertisedCategory";
import store from "../redux/store";

describe("Testing AdvertisedCategory Component", () => {
  it("should render advertised category section", () => {
    render(
      <Provider store={store}>
        <AdvertisedCategory />
      </Provider>,
    );
    expect(screen.getByText(/Advertisement/i)).toBeInTheDocument();
  });
});
