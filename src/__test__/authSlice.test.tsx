import { configureStore } from "@reduxjs/toolkit";
import MockAdapter from "axios-mock-adapter";

import api from "../redux/api/api";
import authSlice, { fetchUser, setUser } from "../redux/reducers/authSlice";

const mockApi = new MockAdapter(api);
const mockStore = (initialState) =>
  configureStore({
    reducer: {
      // @ts-ignore
      auth: authSlice,
    },
    preloadedState: initialState,
  });

describe("Auth Slice Thunks", () => {
  let store;

  beforeEach(() => {
    mockApi.reset();
    store = mockStore({
      auth: {
        loading: false,
        data: [],
        error: null,
        userInfo: JSON.parse(localStorage.getItem("userInfo") || "{}"),
      },
    });
  });

  it("should handle fetchUser pending", async () => {
    mockApi.onGet("/users/me").reply(200, {});

    store.dispatch(fetchUser());
    expect(store.getState().auth.loading).toBe(true);
  });

  it("should handle fetchUser fulfilled", async () => {
    const mockData = { id: "1", name: "John Doe" };
    mockApi.onGet("/users/me").reply(200, mockData);

    await store.dispatch(fetchUser());

    expect(store.getState().auth.loading).toBe(false);
    expect(store.getState().auth.data).toEqual(mockData);
    expect(localStorage.getItem("userInfo")).toEqual(JSON.stringify(mockData));
  });

  it("should handle fetchUser rejected", async () => {
    mockApi.onGet("/users/me").reply(500);

    await store.dispatch(fetchUser());

    expect(store.getState().auth.loading).toBe(false);
    expect(store.getState().auth.error).toBe("Rejected");
  });

  it("should handle setUser", () => {
    const mockUser = { id: "2", name: "Jane Doe" };
    store.dispatch(setUser(mockUser));

    expect(store.getState().auth.userInfo).toEqual(mockUser);
    expect(localStorage.getItem("userInfo")).toEqual(JSON.stringify(mockUser));
  });

  it("should handle fetchUser axios error with specific message", async () => {
    mockApi.onGet("/users/me").reply(500, { message: "Server error" });

    await store.dispatch(fetchUser());

    expect(store.getState().auth.loading).toBe(false);
    expect(store.getState().auth.error.message).toBe("Server error");
  });

  it("should handle fetchUser axios network error", async () => {
    mockApi.onGet("/users/me").networkError();

    await store.dispatch(fetchUser());

    expect(store.getState().auth.loading).toBe(false);
    expect(store.getState().auth.error).toBe("Rejected");
  });
});
