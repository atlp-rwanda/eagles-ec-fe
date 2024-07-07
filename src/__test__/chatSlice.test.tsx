import { configureStore } from "@reduxjs/toolkit";
import MockAdapter from "axios-mock-adapter";

import api from "../redux/api/api";
import chatsSlice, {
  fetchUsers,
  fetchChats,
  sendMessage,
  setChats,
  setUsers,
} from "../redux/reducers/chatSlice";

const mockApi = new MockAdapter(api);
const mockStore = (initialState) =>
  configureStore({
    reducer: {
      // @ts-ignore
      chats: chatsSlice,
    },
    preloadedState: initialState,
  });

describe("Chats Slice Thunks", () => {
  let store;

  beforeEach(() => {
    mockApi.reset();
    store = mockStore({
      chats: {
        chats: {
          loading: false,
          data: [],
          error: null,
          sending: false,
          sendError: null,
        },
        users: {
          loading: false,
          data: [],
          error: null,
        },
      },
    });
  });

  it("should handle fetchUsers pending", async () => {
    mockApi.onGet("/users").reply(200, { users: [] });

    store.dispatch(fetchUsers());
    expect(store.getState().chats.users.loading).toBe(true);
  });

  it("should handle fetchUsers fulfilled", async () => {
    const mockData = [{ id: "1", name: "John Doe" }];
    mockApi.onGet("/users").reply(200, { users: mockData });

    await store.dispatch(fetchUsers());

    expect(store.getState().chats.users.loading).toBe(false);
    expect(store.getState().chats.users.data).toEqual(mockData);
  });

  it("should handle fetchUsers rejected", async () => {
    mockApi.onGet("/users").reply(500);

    await store.dispatch(fetchUsers());

    expect(store.getState().chats.users.loading).toBe(false);
    expect(store.getState().chats.users.error).toBeTruthy();
  });

  it("should handle fetchChats pending", async () => {
    mockApi.onGet("/chats/private").reply(200, {});

    store.dispatch(fetchChats());
    expect(store.getState().chats.chats.loading).toBe(true);
  });

  it("should handle fetchChats fulfilled", async () => {
    const mockData = [{ id: "1", messages: [] }];
    mockApi.onGet("/chats/private").reply(200, mockData);

    await store.dispatch(fetchChats());

    expect(store.getState().chats.chats.loading).toBe(false);
    expect(store.getState().chats.chats.data).toEqual(mockData);
  });

  it("should handle fetchChats rejected", async () => {
    mockApi.onGet("/chats/private").reply(500);

    await store.dispatch(fetchChats());

    expect(store.getState().chats.chats.loading).toBe(false);
    expect(store.getState().chats.chats.error).toBeTruthy();
  });

  it("should handle sendMessage pending", async () => {
    mockApi.onPost("/chats/private/1").reply(200, {});

    store.dispatch(sendMessage({ message: "Hello", id: 1 }));
    expect(store.getState().chats.chats.sending).toBe(true);
  });

  it("should handle sendMessage fulfilled", async () => {
    const mockMessage = { message: "Hello", recipientId: 1 };
    const initialChats = [{ id: "1", messages: [{ recipientId: 1 }] }];
    store = mockStore({
      chats: {
        chats: {
          loading: false,
          data: initialChats,
          error: null,
          sending: false,
          sendError: null,
        },
        users: {
          loading: false,
          data: [],
          error: null,
        },
      },
    });

    mockApi.onPost("/chats/private/1").reply(200, mockMessage);

    await store.dispatch(sendMessage({ message: "Hello", id: 1 }));

    expect(store.getState().chats.chats.sending).toBe(false);
    expect(store.getState().chats.chats.data[0].messages).toContainEqual(
      mockMessage,
    );
  });

  it("should handle sendMessage rejected", async () => {
    mockApi.onPost("/chats/private/1").reply(500);

    await store.dispatch(sendMessage({ message: "Hello", id: 1 }));

    expect(store.getState().chats.chats.sending).toBe(false);
    expect(store.getState().chats.chats.sendError).toBeTruthy();
  });

  it("should handle setChats", () => {
    const mockChats = [{ id: "2", messages: [] }];
    store.dispatch(setChats(mockChats));

    expect(store.getState().chats.chats.data).toEqual(mockChats);
  });

  it("should handle setUsers", () => {
    const mockUsers = [{ id: "3", name: "Jane Doe" }];
    store.dispatch(setUsers(mockUsers));

    expect(store.getState().chats.users.data).toEqual(mockUsers);
  });
});
