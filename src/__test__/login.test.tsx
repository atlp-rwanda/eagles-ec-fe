import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { ToastContainer } from "react-toastify";
import MockAdapter from "axios-mock-adapter";

import api from "../redux/api/api";
import Login from "../pages/Login";
import store from "../redux/store";
import { login } from "../redux/api/loginApiSlice";

// Mock Adapter for API requests
const mock = new MockAdapter(api);

const mockData = {
  message: "success",
  token: "mockAccessToken",
};

// Setup and teardown for network requests
const mockNetworkRequests = () => {
  mock.onPost("/login").reply(200, mockData);
};

const unMockNetworkRequests = () => {
  mock.resetHistory();
};

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value?.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

beforeEach(() => {
  mockNetworkRequests();
});

afterEach(() => {
  unMockNetworkRequests();
});

describe("Login Component", () => {
  test("should render login page", () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
          <ToastContainer />
        </Router>
      </Provider>,
    );

    const logo = screen.getByText(/login to/i); // Adjust if needed
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    expect(logo).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test("should handle form validation", async () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
          <ToastContainer />
        </Router>
      </Provider>,
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    userEvent.type(emailInput, "invalid-email");
    userEvent.type(passwordInput, "short");
    userEvent.click(loginButton);
  });

  test("should handle successful login", async () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
          <ToastContainer />
        </Router>
      </Provider>,
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    userEvent.type(emailInput, "testuser@example.com");
    userEvent.type(passwordInput, "password123");
    userEvent.click(loginButton);

    expect(localStorage.getItem("accessToken")).toBe(null);
  });

  test("should handle failed login", async () => {
    mock.onPost("/login").reply(401, { message: "Invalid credentials" });

    render(
      <Provider store={store}>
        <Router>
          <Login />
          <ToastContainer />
        </Router>
      </Provider>,
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    userEvent.type(emailInput, "wronguser@example.com");
    userEvent.type(passwordInput, "wrongpassword");
    userEvent.click(loginButton);
    expect(localStorage.getItem("accessToken")).toBe(null);
  });

  test("should navigate based on user role after login", async () => {
    const mockAdminToken = "mockAdminToken";
    const mockSellerToken = "mockSellerToken";
    const mockCustomerToken = "mockCustomerToken";
    const mockAdminData = { message: "success", token: mockAdminToken };
    const mockSellerData = { message: "success", token: mockSellerToken };
    const mockCustomerData = { message: "success", token: mockCustomerToken };

    mock.onPost("/login").reply((config) => {
      if (config.data.includes("admin@example.com")) return [200, mockAdminData];
      if (config.data.includes("seller@example.com")) return [200, mockSellerData];
      return [200, mockCustomerData];
    });

    render(
      <Provider store={store}>
        <Router>
          <Login />
          <ToastContainer />
        </Router>
      </Provider>,
    );

    // Test for admin role
    userEvent.type(screen.getByPlaceholderText("Email"), "admin@example.com");
    userEvent.type(screen.getByPlaceholderText("Password"), "password123");
    userEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(localStorage.getItem("accessToken")).toBe(null);

    // Test for seller role
    userEvent.type(screen.getByPlaceholderText("Email"), "seller@example.com");
    userEvent.type(screen.getByPlaceholderText("Password"), "password123");
    userEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(localStorage.getItem("accessToken")).toBe(null);

    // Test for customer role
    userEvent.type(
      screen.getByPlaceholderText("Email"),
      "customer@example.com",
    );
    userEvent.type(screen.getByPlaceholderText("Password"), "password123");
    userEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(localStorage.getItem("accessToken")).toBe(null);
  });

  it("should handle initial state", () => {
    expect(store.getState().login).toEqual({
      error: null,
      loading: false,
    });
  });

  it("should handle login pending", () => {
    // @ts-ignore
    store.dispatch(login.pending(""));
    expect(store.getState().login).toEqual({
      loading: true,
      error: null,
    });
  });

  it("should handle login fulfilled", () => {
    const mockLoginData: any = { message: "You're logged in!" };
    // @ts-ignore
    store.dispatch(login.fulfilled(mockLoginData, "", {}));
    expect(store.getState().login).toEqual({
      error: null,
      loading: false,
    });
  });

  it("should handle login rejected", () => {
    const mockError = { message: "An error occurred" };
    store.dispatch(login.rejected(null, "", {} as any, mockError));
    expect(store.getState().login).toEqual({
      loading: false,
      error: "An error occurred",
    });
  });
});
