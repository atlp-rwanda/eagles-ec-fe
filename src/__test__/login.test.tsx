import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";
import { ToastContainer } from "react-toastify";
import { AnyAction } from "redux";
import { ThunkDispatch } from "@reduxjs/toolkit";

import Login from "../pages/Login";
import { RootState } from "../redux/store";

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

const mockStore = configureStore<
RootState,
ThunkDispatch<RootState, unknown, AnyAction>
>([]);
// @ts-ignore
const initialState: RootState = {
  login: {
    loading: false,
    error: null,
  },
};

let store: ReturnType<typeof mockStore>;

beforeEach(() => {
  store = mockStore(initialState);
});

test("test user login", () => {
  render(
    <Provider store={store}>
      <Router>
        <Login />
        <ToastContainer />
      </Router>
    </Provider>,
  );
  const logo = screen.getByText("eagles");
  const emailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Password");
  const loginButton = screen.getByRole("button", { name: /login/i });

  expect(logo).toBeInTheDocument();
  userEvent.type(emailInput, "jaboinnovates@gmail.com");
  userEvent.type(passwordInput, "Test@123");

  userEvent.click(loginButton);

  console.log("email input: ", emailInput);
  console.log("password input: ", passwordInput);

  expect(emailInput).toBeDefined();
  expect(passwordInput).toBeDefined();
  expect(localStorage.getItem("accessToken")).toBeDefined();
});
