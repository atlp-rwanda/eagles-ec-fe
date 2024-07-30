import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import MockAdapter from "axios-mock-adapter";

import UserList from "../page-sections/UserList";
import chatSlice from "../redux/reducers/chatSlice";
import api from "../redux/api/api";
import { socket } from "../config/socket";

const mockApi = new MockAdapter(api);

jest.mock("../config/socket", () => ({
  socket: {
    on: jest.fn(),
    off: jest.fn(),
  },
}));

const mockStore = (initialState) =>
  configureStore({
    reducer: {
      // @ts-ignore
      chats: chatSlice,
    },
    preloadedState: initialState,
  });

describe("UserList Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      chats: {
        chats: {
          data: [
            {
              id: "1",
              messages: [
                { sender: "User1", message: "Hello", createdAt: new Date() },
              ],
              sender: {
                id: "1",
                name: "User1",
                profile: { profileImage: null },
              },
              receiver: {
                id: "2",
                name: "User2",
                profile: { profileImage: null },
              },
            },
          ],
          loading: false,
          error: null,
        },
        users: {
          data: [
            {
              id: "3",
              username: "User3",
              email: "user3@example.com",
              profile: { profileImage: null },
            },
          ],
          loading: false,
        },
      },
    });
  });

  test("renders loading state", () => {
    const messages = [];
    store = mockStore({
      chats: {
        chats: { data: [], loading: true, error: null },
        users: { data: [], loading: true },
      },
    });

    render(
      <Provider store={store}>
        <UserList
          onUserSelect={jest.fn()}
          messages={messages}
          onPublicChatSelect={jest.fn()}
        />
      </Provider>,
    );

    expect(screen.getByText(/Loading chats.../i)).toBeDefined();
  });
});
