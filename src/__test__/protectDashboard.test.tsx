import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import ProtectDashboard from "../redux/ProtectDashboard";
import store from "../redux/store";

beforeAll(() => {
  const localStorageMock = (() => {
    let lstore = {} as { [key: string]: string };
    return {
      getItem: jest.fn((key) => lstore[key] || null),
      setItem: jest.fn((key, value) => (lstore[key] = value)),
      removeItem: jest.fn((key) => delete lstore[key]),
      clear: jest.fn(() => (lstore = {})),
    };
  })();

  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
    writable: true,
  });
});

describe("ProtectDashboard component", () => {
  const ProtectedComponent = () => <div>Protected Content</div>;

  it("should redirect to /login if no token is provided", () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(null);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/dashboard"]}>
          <Routes>
            <Route
              path="/dashboard"
              element={(
                <ProtectDashboard>
                  <ProtectedComponent />
                </ProtectDashboard>
              )}
            />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});
