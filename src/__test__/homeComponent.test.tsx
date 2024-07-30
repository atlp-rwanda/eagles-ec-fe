// @ts-nocheck
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import store from "../redux/store";
import Homepage from "../pages/Homepage";

const client = new QueryClient({});

test("demo", () => {
  expect(true).toBe(true);
});

describe("Testing React components", () => {
  it("should render home page componets", () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={client}>
          <BrowserRouter>
            <Homepage />
          </BrowserRouter>
        </QueryClientProvider>
        ,
      </Provider>,
    );
    expect(true).toBeTruthy();
  });
});
