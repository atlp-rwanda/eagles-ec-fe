import { render, screen, fireEvent } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { configureStore } from "@reduxjs/toolkit";

import ChatWindow from "../page-sections/ChatWindow";
import api from "../redux/api/api";
import chatSlice from "../redux/reducers/chatSlice";

const mockApi = new MockAdapter(api);

const mockStore = (initialState) =>
  configureStore({
    reducer: {
      // @ts-ignore
      chats: chatSlice,
    },
    preloadedState: initialState,
  });

describe("ChatWindow Component", () => {
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
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  const messages = [
    {
      userId: "1",
      message: "Hello",
      createdAt: new Date(Date.now() - 60000).toISOString(),
      sender: "User1",
      isOwner: false,
    },
    {
      userId: "2",
      message: "Hi there!",
      createdAt: new Date(Date.now() - 30000).toISOString(),
      sender: "User2",
      isOwner: true,
    },
  ];

  const chat = {
    messages,
  };

  const otherUser = {
    username: "User2",
    email: "user2@example.com",
    profile: {
      profileImage: null,
    },
  };

  const mockOnSendMessage = jest.fn();
  const mockOnBack = jest.fn();

  const renderComponent = (props = {}) =>
    render(
      <ChatWindow
        messages={messages}
        chat={chat}
        otherUser={otherUser}
        onSendMessage={mockOnSendMessage}
        onBack={mockOnBack}
        loggedInUserId="2"
        isPublicChat={false}
        {...props}
      />,
    );

  test("renders chat window with messages", () => {
    renderComponent();

    expect(screen.getByText("Hello")).toBeDefined();
    expect(screen.getByText("Hi there!")).toBeDefined();
    expect(screen.getByText(/a few seconds ago/i)).toBeDefined();
  });

  test("renders the other user's information", () => {
    renderComponent();

    expect(screen.getByText("User2")).toBeDefined();
    expect(screen.getByText("user2@example.com")).toBeDefined();
  });

  test("sends a message on button click", () => {
    renderComponent();

    const textArea = screen.getByPlaceholderText("Start typing...");
    const sendButton = screen.getByTestId("send-message-btn");

    fireEvent.change(textArea, { target: { value: "New message" } });
    fireEvent.click(sendButton);

    expect(mockOnSendMessage).toHaveBeenCalledWith("New message");
  });

  test("calls onBack when back button is clicked", () => {
    renderComponent();

    const backButton = screen.getByTestId("back-button");
    fireEvent.click(backButton);

    expect(mockOnBack).toHaveBeenCalled();
  });
});
