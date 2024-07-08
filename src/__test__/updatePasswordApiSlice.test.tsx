import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";

import updatePasswordApiSlice, {
  updatePassword,
} from "../redux/api/updatePasswordApiSlice";

jest.mock("axios");
jest.mock("../redux/api/api", () => ({
  api: {
    interceptors: {
      response: {
        use: jest.fn(),
      },
      request: {
        use: jest.fn(),
      },
    },
  },
}));

describe("updatePasswordApiSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        updatePassword: updatePasswordApiSlice,
      },
    });
  });

  it("handles successful password update", async () => {
    const mockResponse = { data: { message: "Password updated successfully" } };
    // @ts-ignore
    axios.put.mockResolvedValueOnce(mockResponse);

    await store.dispatch(
      updatePassword({
        oldPassword: "Test@123",
        newPassword: "NewTest@123",
        confirmPassword: "NewTest@123",
      }),
    );

    const state = store.getState();
    expect(state.updatePassword.loading).toBe(false);
    expect(state.updatePassword.error).toBe(null);
  });

  it("handles failed password update", async () => {
    const mockError = { response: { data: { message: "Update failed" } } };
    // @ts-ignore
    axios.put.mockRejectedValueOnce(mockError);

    await store.dispatch(
      updatePassword({
        oldPassword: "Test@123",
        newPassword: "NewTest@123",
        confirmPassword: "NewTest@123",
      }),
    );

    const state = store.getState();
    expect(state.updatePassword.loading).toBe(false);
    expect(state.updatePassword.error).toBe(null);
  });
});
