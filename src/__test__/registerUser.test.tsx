// @ts-nocheck
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { AnyAction } from "redux";

import store from "../redux/store";
import RegisterUser from "../pages/RegisterUser";
import { createUser } from "../redux/reducers/registerSlice";

test("should render registration page correctly", async () => {
  render(
    <Provider store={store}>
      <Router>
        <RegisterUser />
      </Router>
    </Provider>,
  );

  const name = screen.getByPlaceholderText("Name");
  const username = screen.getByPlaceholderText("Username");
  const email = screen.getByPlaceholderText("Email");
  const password = screen.getByPlaceholderText("Password");

  expect(name).toBeInTheDocument();
  expect(username).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();

  const linkElement = screen.getByRole("link", {
    name: /Sign in with Google/i,
  });
  expect(linkElement).toBeDefined();
  expect(linkElement).toBeInTheDocument();

  const loginLink = screen.getByRole("link", { name: /Login/i });
  expect(loginLink).toBeInTheDocument();
  expect(loginLink.getAttribute("href")).toBe("/login");

  userEvent.click(loginLink);
});

it("should handle initial state", () => {
  expect(store.getState().reset).toEqual({
    isLoading: false,
    data: [],
    error: null,
  });
});

it("should handle registerUser.pending", () => {
  // @ts-ignore
  store.dispatch(createUser.pending(""));
  expect(store.getState().reset).toEqual({
    isLoading: false,
    data: [],
    error: null,
  });
});

it("should handle createUser.fulfilled", () => {
  const mockData = { message: "Account created successfully!" };
  store.dispatch(createUser.fulfilled(mockData, "", {} as AnyAction));
  expect(store.getState().reset).toEqual({
    isLoading: false,
    data: [],
    error: null,
  });
});

it("should handle createUser.rejected", () => {
  store.dispatch(createUser.rejected(null, "", {} as AnyAction));
  expect(store.getState().reset).toEqual({
    isLoading: false,
    data: [],
    error: null,
  });
});
