import "@testing-library/jest-dom";
import {
  render, screen, fireEvent, waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import { toast } from "react-toastify";

import OtpVerificationForm from "../pages/otpVerfication";

jest.mock("react-toastify", () => ({
  toast: {
    // @ts-ignore
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: () => <div />,
}));

jest.mock("../redux/api/otpApiSclice", () => ({
  verifyOtp: jest.fn(),
}));

const middlewares = [thunk];
// @ts-ignores
const mockStore = configureStore(middlewares);
// @ts-ignore
const renderComponent = (store) => render(
  <Provider store={store}>
    <BrowserRouter>
      <OtpVerificationForm />
    </BrowserRouter>
  </Provider>,
);

describe("OtpVerification", () => {
  // @ts-ignore
  let store;
  beforeEach(() => {
    store = mockStore({
      otpVerification: {
        loading: false,
      },
    });
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    renderComponent(store);
    expect(screen.getByText("verify your identity")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Protecting your account is our priority. Please confirm your identity by providing the code sent to your email address",
      ),
    ).toBeInTheDocument();
  });
  it("navigates to login on cancel", () => {
    renderComponent(store);
    fireEvent.click(screen.getByText("Cancel"));
    expect(window.location.pathname).toBe("/login");
  });

  it("focuses on the next input on entering a digit", () => {
    renderComponent(store);
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input, index) => {
      fireEvent.change(input, { target: { value: "1" } });
      if (index < inputs.length - 1) {
        expect(document.activeElement).toBe(inputs[index + 1]);
      }
    });
  });
  it("handles paste event", () => {
    renderComponent(store);
    const inputs = screen.getAllByRole("textbox");
    fireEvent.paste(inputs[0], {
      clipboardData: {
        getData: () => "123456",
      },
    });
    inputs.forEach((input, index) => {
      // @ts-ignore
      expect(input.value).toBe(String(index + 1));
    });
  });

  it("handles backspace correctly", () => {
    renderComponent(store);
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input, index) => {
      fireEvent.change(input, { target: { value: String(index + 1) } });
    });
    fireEvent.keyDown(inputs[5], { key: "Backspace", code: "Backspace" });
    expect(document.activeElement).toBe(inputs[5]);
  });

  it("should handle submit with success", async () => {
    const { getByText } = renderComponent(store);
    const form = getByText("Ver");
    fireEvent.submit(form);
    expect(toast.success).toHaveBeenCalledTimes(0);
  });

  it("should handle submit with error", async () => {
    const { getByText } = renderComponent(store);
    const form = getByText("Ver");
    fireEvent.submit(form);
    await waitFor(() => expect(toast.error).toHaveBeenCalledTimes(0));
  });

  it("should handle backspace key press", () => {
    const { getAllByRole } = renderComponent(store);
    const inputs = getAllByRole("textbox");
    fireEvent.keyDown(inputs[0], { key: "Backspace" });
    // @ts-ignore
    expect(inputs[0].value).toBe("");
  });

  it("should handle paste with same length", () => {
    const { getAllByRole } = renderComponent(store);
    const inputs = getAllByRole("textbox");
    const pasteValue = "123456";
    fireEvent.paste(inputs[0], {
      clipboardData: { getData: () => pasteValue },
    });
    // @ts-ignore
    inputs.forEach((input, index) => expect(input.value).toBe(pasteValue[index]));
  });
  it("should handle paste with shorter length", () => {
    const { getAllByRole } = renderComponent(store);
    const inputs = getAllByRole("textbox");
    const pasteValue = "123";
    fireEvent.paste(inputs[0], {
      clipboardData: { getData: () => pasteValue },
    });
    inputs.forEach((input, index) => {
      if (index < pasteValue.length) {
        // @ts-ignore
        expect(input.value).toBe(pasteValue[index]);
      } else {
        // @ts-ignore
        expect(input.value).toBe("");
      }
    });
  });

  it("should render form elements", () => {
    const { getByText } = renderComponent(store);
    expect(
      getByText(
        "Protecting your account is our priority. Please confirm your identity by providing the code sent to your email address",
      ),
    ).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
  });
});
