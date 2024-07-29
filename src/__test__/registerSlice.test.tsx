// Imports required for testing
import { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../redux/api/api";
import { createUser, verifyUser } from "../redux/reducers/registerSlice";

jest.mock("../redux/api/api");

describe("registerSlice Thunks", () => {
  const mockUser = {
    name: "John Doe",
    username: "johndoe",
    email: "johndoe@example.com",
    password: "password123",
  };

  const mockResponseData = { message: "User registered successfully" };
  const mockToken = "validToken123";

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("createUser thunk", () => {
    it("should handle fulfilled case", async () => {
      // @ts-ignore
      axios.post.mockResolvedValueOnce({ data: mockResponseData });

      const thunk = createUser(mockUser);
      const dispatch = jest.fn();
      const getState = jest.fn();

      await thunk(dispatch, getState, null);
      expect(dispatch).toHaveBeenCalled();
    });

    it("should handle rejected case with response error data", async () => {
      const errorMessage = { error: "Registration failed" };
      // @ts-ignore
      axios.post.mockRejectedValueOnce({
        response: { data: errorMessage },
        message: "Request failed",
      });

      const thunk = createUser(mockUser);
      const dispatch = jest.fn();
      const getState = jest.fn();

      await thunk(dispatch, getState, null);
      expect(dispatch).toHaveBeenCalled();
    });

    it("should handle rejected case without response error data", async () => {
      // @ts-ignore
      axios.post.mockRejectedValueOnce(new Error("Network Error"));

      const thunk = createUser(mockUser);
      const dispatch = jest.fn();
      const getState = jest.fn();

      await thunk(dispatch, getState, null);
      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("verifyUser thunk", () => {
    it("should handle fulfilled case", async () => {
      // @ts-ignore
      axios.get.mockResolvedValueOnce({ data: true });

      const thunk = verifyUser(mockToken);
      const dispatch = jest.fn();
      const getState = jest.fn();

      await thunk(dispatch, getState, null);
      expect(dispatch).toHaveBeenCalled();
    });

    it("should handle rejected case with response error data", async () => {
      const errorMessage = { error: "Verification failed" };
      // @ts-ignore
      axios.get.mockRejectedValueOnce({
        response: { data: errorMessage },
        message: "Request failed",
      });

      const thunk = verifyUser(mockToken);
      const dispatch = jest.fn();
      const getState = jest.fn();

      await thunk(dispatch, getState, null);
      expect(dispatch).toHaveBeenCalled();
    });

    it("should handle rejected case without response error data", async () => {
      // @ts-ignore
      axios.get.mockRejectedValueOnce(new Error("Network Error"));

      const thunk = verifyUser(mockToken);
      const dispatch = jest.fn();
      const getState = jest.fn();

      await thunk(dispatch, getState, null);
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
