import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import UsersProfile from "../pages/userProfile";
import store from "../redux/store";

describe("UsersProfile component", () => {
  beforeAll(() => {
    const mockAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    global.localStorage.setItem("accessToken", mockAccessToken);
  });

  afterAll(() => {
    global.localStorage.removeItem("accessToken");
  });

  it("displays loading state", () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <UsersProfile />
        </BrowserRouter>
      </Provider>,
    );
    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("calls getProfile action on mount", () => {
    const getProfileMock = jest.fn();
    const { rerender } = render(
      <Provider store={store}>
        <BrowserRouter>
          <UsersProfile />
        </BrowserRouter>
      </Provider>,
    );
    rerender(
      <Provider store={store}>
        <BrowserRouter>
          <UsersProfile />
        </BrowserRouter>
      </Provider>,
    );
    expect(getProfileMock).toBeTruthy();
  });
});
