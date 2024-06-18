import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { ToastContainer } from "react-toastify";

import Login from "../pages/Login";
import store from "../redux/store";

const localStorageMock = (() => {
  let lstore: Record<string, string> = {};
  return {
    getItem: (key: string) => lstore[key] || null,
    setItem: (key: string, value: string) => {
      lstore[key] = value.toString();
    },
    clear: () => {
      lstore = {};
    },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

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

  expect(emailInput).toBeDefined();
  expect(passwordInput).toBeDefined();
  expect(localStorage.getItem("accessToken")).toBeDefined();
});
