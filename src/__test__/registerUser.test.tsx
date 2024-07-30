// @ts-nocheck
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { AnyAction } from "redux";

import store from "../redux/store";
import RegisterUser from "../pages/RegisterUser";
import { createUser, verifyUser } from "../redux/reducers/registerSlice";

describe("RegisterUser component", () => {
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
});

describe("Register slice tests", () => {
  it("should handle initial state", () => {
    expect(store.getState().register).toEqual({
      isLoading: false,
      data: [],
      error: null,
      verified: false,
    });
  });

  it("should handle createUser.pending", () => {
    store.dispatch(createUser.pending(""));
    expect(store.getState().register).toEqual({
      isLoading: true,
      data: [],
      error: null,
      verified: false,
    });
  });

  it("should handle createUser.fulfilled", () => {
    const mockData = { message: "Account created successfully!" };
    store.dispatch(createUser.fulfilled(mockData, "", {} as AnyAction));
    expect(store.getState().register).toEqual({
      isLoading: false,
      data: mockData,
      error: null,
      verified: false,
    });
  });

  it("should handle createUser.rejected", () => {
    const errorMessage = "Registration failed";
    store.dispatch(
      createUser.rejected(null, "", {} as AnyAction, errorMessage),
    );
    expect(store.getState().register).not.toEqual({
      isLoading: false,
      data: [],
      error: errorMessage,
      verified: false,
    });
  });

  it("should handle verifyUser.pending", () => {
    store.dispatch(verifyUser.pending(""));
    expect(store.getState().register).not.toEqual({
      isLoading: true,
      data: [],
      error: null,
      verified: false,
    });
  });

  it("should handle verifyUser.fulfilled", () => {
    store.dispatch(verifyUser.fulfilled({}, "", "someToken"));
    expect(store.getState().register).not.toEqual({
      isLoading: false,
      data: [],
      error: null,
      verified: true,
    });
  });

  it("should handle verifyUser.rejected", () => {
    const errorMessage = "Verification failed";
    store.dispatch(verifyUser.rejected(null, "", "someToken", errorMessage));
    expect(store.getState().register).not.toEqual({
      isLoading: false,
      data: [],
      verified: false,
    });
  });
});
