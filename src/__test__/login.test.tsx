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

const mock = new MockAdapter(api);

const mockData = {
  message: "success",
  token: "mockAccessToken",
};

const mockNetworkRequests = () => {
  mock.onPost("/").reply(200, mockData);
};
const unMockNetworkRequests = () => {
  mock.resetHistory();
};

beforeEach(() => {
  mockNetworkRequests();
});

afterEach(() => {
  unMockNetworkRequests();
});

const localStorageMock = (() => {
  let lstore: Record<string, string> = {};
  return {
    getItem: (key: string) => lstore[key] || null,
    setItem: (key: string, value: string) => {
      lstore[key] = value?.toString();
    },
    clear: () => {
      lstore = {};
    },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("test user login", () => {
  test("should render login page", () => {
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
    const mockLoginData = { message: "Youre're logged in!" };
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
