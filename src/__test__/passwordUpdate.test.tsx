import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import { ToastContainer } from "react-toastify";

import UpdatePasswordmod from "../components/password/updateModal";
// import { updatePassword } from "../redux/api/updatePasswordApiSlice";
// import updatePasswordApiSlice from "../redux/api/updatePasswordApiSlice";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: () => <div />,
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
}));

const middlewares = [thunk];
// @ts-ignore
const mockStore = configureStore(middlewares);
const setPasswordModal = jest.fn();
// @ts-ignore
const renderComponent = (store) => render(
  <Provider store={store}>
    <Router>
      <UpdatePasswordmod setPasswordModal={setPasswordModal} />
      <ToastContainer />
    </Router>
  </Provider>,
);

describe("Update Password Modal", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      updatePassword: {
        loading: false,
      },
    });
    jest.clearAllMocks();
  });

  it("update Password Modal renders correctly", () => {
    renderComponent(store);
    expect(screen.getByPlaceholderText("Old Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("New Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
  });

  it("handles input and form submission", async () => {
    // const mockUpdatePassword = jest.fn();
    // (useDispatch as unknown as jest.Mock).mockReturnValue(mockUpdatePassword);
    const mockDispatch = jest.fn();
    jest.mock("react-redux", () => ({
      useDispatch: () => mockDispatch,
    }));

    renderComponent(store);
    const currentPasswordInput = screen.getByPlaceholderText("Old Password");
    const newPasswordInput = screen.getByPlaceholderText("New Password");
    const confirmNewPasswordInput = screen.getByPlaceholderText("Confirm Password");
    const updateButton = screen.getByRole("button", { name: /Save Changes/i });

    await act(() => {
      fireEvent.change(currentPasswordInput, { target: { value: "Test@123" } });
      fireEvent.change(newPasswordInput, { target: { value: "NewTest@123" } });
      fireEvent.change(confirmNewPasswordInput, {
        target: { value: "NewTest@123" },
      });
    });

    await act(() => {
      fireEvent.click(updateButton);
      console.log("updateButton", updateButton.textContent);
    });

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(0);
      expect(updateButton).toHaveTextContent("Save Changes");
      expect(setPasswordModal).toHaveBeenCalledTimes(0);
    });
  });
  it("Should close the Modal on cancel", async () => {
    renderComponent(store);
    const cancelButton = screen.getByRole("button", { name: /Cancel/i });
    await act(() => {
      fireEvent.click(cancelButton);
    });
    await waitFor(() => {
      expect(setPasswordModal).toHaveBeenCalledTimes(1);
    });
  });

  it("Should show PassWord and hide Password", async () => {
    renderComponent(store);
    const passwordInput = screen.getByPlaceholderText("Old Password");
    const AllshowPasswordButton = screen.getAllByRole("button", {
      name: /Show/i,
    });
    const showPasswordButton = AllshowPasswordButton[0];
    await act(() => {
      fireEvent.click(showPasswordButton);
    });
    await waitFor(() => {
      expect(passwordInput).toHaveAttribute("type", "text");
    });
  });
});
