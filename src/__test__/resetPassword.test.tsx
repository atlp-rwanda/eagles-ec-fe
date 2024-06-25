// @ts-nocheck
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { AnyAction } from "@reduxjs/toolkit";

import store from "../redux/store";
import ResetPassword from "../pages/ResetPassword";
import { resetPassword } from "../redux/reducers/resetPasswordSlice";

test("should render reset password page correctly", async () => {
  render(
    <Provider store={store}>
      <Router>
        <ResetPassword />
      </Router>
    </Provider>,
  );

  expect(screen.getByText("eagles", { exact: false })).toBeInTheDocument();
  expect(
    screen.getByText("Reset your password", { exact: false }),
  ).toBeInTheDocument();
  const description = screen.getAllByText(
    "Before you write your password consider if your password is strong enough that can not be guessed or cracked by anyone.",
  );
  const newPassword = screen.getAllByPlaceholderText("New Password");
  const confirmPassword = screen.getAllByPlaceholderText("Confirm password");

  expect(description).toBeTruthy();
  expect(newPassword).toBeTruthy();
  expect(confirmPassword).toBeTruthy();
});

test("the link is not disabled", () => {
  const { getByText } = render(
    <Provider store={store}>
      <Router>
        <ResetPassword />
      </Router>
    </Provider>,
  );
  const linkElement = getByText("Reset");
  expect(linkElement).not.toBeDisabled();
  expect(linkElement).toBeEnabled();
  expect(linkElement).toBeVisible();
});

it("should handle initial state", () => {
  expect(store.getState().reset).toEqual({
    isLoading: false,
    data: [],
    error: null,
  });
});

it("should handle resetPassword.pending", () => {
  // @ts-ignore
  store.dispatch(resetPassword.pending(""));
  expect(store.getState().reset).toEqual({
    isLoading: true,
    data: [],
    error: null,
  });
});

it("should handle resetPassword.fulfilled", () => {
  const mockData = { message: "Password reset successfully" };
  store.dispatch(resetPassword.fulfilled(mockData, "", {} as AnyAction));
  expect(store.getState().reset).toEqual({
    isLoading: false,
    data: mockData,
    error: null,
  });
});

it("should handle resetPassword.rejected", () => {
  store.dispatch(resetPassword.rejected(null, "", {} as AnyAction));
  expect(store.getState().reset).toEqual({
    isLoading: false,
    data: [],
    error: undefined,
  });
});
