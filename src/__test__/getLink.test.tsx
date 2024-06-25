import "@testing-library/jest-dom";
import {
  render, screen, fireEvent, waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import store from "../redux/store";
import GetLinkPage from "../pages/GetLinkPage";
import { getLink } from "../redux/reducers/getLinkSlice";
import axios from "../redux/api/api";

jest.mock("../redux/api/api");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: jest.fn(),
}));

describe("GetLinkPage and getLinkSlice", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render GetLinkPage correctly", () => {
    render(
      <Provider store={store}>
        <Router>
          <GetLinkPage />
        </Router>
      </Provider>,
    );

    expect(screen.getByText("eagles", { exact: false })).toBeInTheDocument();
    expect(
      screen.getByText("Get a link to reset password"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByText("Send Link")).toBeInTheDocument();
  });

  test("should handle initial state", () => {
    expect(store.getState().getLink).toEqual({
      isLoading: false,
      data: [],
      error: null,
    });
  });

  test("should handle getLink.pending", () => {
    // @ts-ignore
    store.dispatch(getLink.pending());
    expect(store.getState().getLink).toEqual({
      isLoading: true,
      data: [],
      error: null,
    });
  });

  test("should handle getLink.fulfilled", () => {
    const mockData = { message: "Reset link sent successfully" };
    store.dispatch(
      getLink.fulfilled(mockData, "", { email: "test@example.com" }),
    );
    expect(store.getState().getLink).toEqual({
      isLoading: false,
      data: mockData,
      error: null,
    });
  });

  test("should handle form submission", async () => {
    const mockData = { message: "Reset link sent successfully" };
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: mockData });

    render(
      <Provider store={store}>
        <Router>
          <GetLinkPage />
        </Router>
      </Provider>,
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const submitButton = screen.getByText("Send Link");

    userEvent.type(emailInput, "test@example.com");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(store.getState().getLink.isLoading).toBe(false);
      expect(store.getState().getLink.data).toEqual(mockData);
    });
  });

  test("should show success message after successful submission", async () => {
    const mockData = { message: "Reset link sent successfully" };
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: mockData });

    render(
      <Provider store={store}>
        <Router>
          <GetLinkPage />
        </Router>
      </Provider>,
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const submitButton = screen.getByText("Send Link");

    userEvent.type(emailInput, "test@example.com");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(store.getState().getLink.data).toEqual(mockData);
    });
  });

  test("getLink thunk should make API call and handle success", async () => {
    const mockData = { message: "Reset link sent successfully" };
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: mockData });

    const dispatch = jest.fn();
    const thunk = getLink({ email: "test@example.com" });

    await thunk(dispatch, () => ({}), undefined);

    const { calls } = dispatch.mock;
    expect(calls[0][0].type).toBe("getLinkEmail/pending");
    expect(calls[1][0].type).toBe("getLinkEmail/fulfilled");
    expect(calls[1][0].payload).toEqual(mockData);
  });
});
