import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import * as currentUserUtils from "../utils/currentuser";
import {
  ICurrentUser,
  INotificationR,
} from "../redux/reducers/notificationSlice";
import UserNotifications from "../components/common/user-notifications/UserNotifcations";

// Mock the react-icons
jest.mock("react-icons/fa", () => ({
  FaEnvelope: () => <div data-testid="unread-icon" />,
  FaEnvelopeOpenText: () => <div data-testid="read-icon" />,
}));

const mockStore = configureStore([]);

describe("UserNotifications", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      notifications: {
        notifications: [] as INotificationR[],
        currentUser: null as ICurrentUser | null,
      },
    });
  });

  it("renders no notifications message when there are no notifications", () => {
    render(
      <Provider store={store}>
        <Router>
          <UserNotifications />
        </Router>
      </Provider>,
    );

    expect(screen.queryByTestId("no-notifications")).toBeDefined();
    expect(
      screen.queryByText("You dont have any notification yet."),
    ).toBeDefined();
  });

  it("renders login prompt when user is not logged in", () => {
    // @ts-ignore
    jest.spyOn(currentUserUtils, "getCurrentUser").mockReturnValue(null);

    render(
      <Provider store={store}>
        <Router>
          <UserNotifications />
        </Router>
      </Provider>,
    );

    expect(screen.queryByTestId("login-prompt")).toBeDefined();
    expect(screen.queryByTestId("login-button")).toBeDefined();
  });

  it("renders notifications list when there are notifications", () => {
    const mockNotifications: INotificationR[] = [
      {
        id: 1,
        userId: 1,
        title: "Notification 1",
        message: "Test notification 1",
        isRead: false,
        createdAt: new Date("2023-01-01T12:00:00"),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 1,
        title: "Notification 2",
        message: "Test notification 2",
        isRead: true,
        createdAt: new Date("2023-01-02T12:00:00"),
        updatedAt: new Date(),
      },
    ];

    store = mockStore({
      notifications: {
        notifications: mockNotifications,
        currentUser: { roleId: 1 } as ICurrentUser,
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <UserNotifications />
        </Router>
      </Provider>,
    );

    expect(screen.queryByTestId("notifications-list")).toBeDefined();
    expect(screen.queryAllByTestId(/^notification-/)).toHaveLength(6);
    expect(screen.queryByTestId("unread-icon")).toBeDefined();
    expect(screen.queryByTestId("read-icon")).toBeDefined();
  });

  it("sorts notifications by date in descending order", () => {
    const mockNotifications: INotificationR[] = [
      {
        id: 1,
        userId: 1,
        title: "Older notification",
        message: "Older notification",
        isRead: false,
        createdAt: new Date("2023-01-01T12:00:00"),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 1,
        title: "Newer notification",
        message: "Newer notification",
        isRead: true,
        createdAt: new Date("2023-01-02T12:00:00"),
        updatedAt: new Date(),
      },
    ];

    store = mockStore({
      notifications: {
        notifications: mockNotifications,
        currentUser: { roleId: 1 } as ICurrentUser,
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <UserNotifications />
        </Router>
      </Provider>,
    );

    expect(screen.queryByTestId("notification-message-2")).toBeDefined();
    expect(screen.queryByTestId("notification-message-1")).toBeDefined();
  });

  it("renders correct link for regular user", () => {
    const mockNotifications: INotificationR[] = [
      {
        id: 1,
        userId: 1,
        title: "Test notification",
        message: "Test notification",
        isRead: false,
        createdAt: new Date("2023-01-01T12:00:00"),
        updatedAt: new Date(),
      },
    ];

    store = mockStore({
      notifications: {
        notifications: mockNotifications,
        currentUser: { roleId: 1 } as ICurrentUser,
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <UserNotifications />
        </Router>
      </Provider>,
    );

    expect(screen.queryByTestId("notification-1")).toBeDefined();
  });

  it("renders correct link for admin user", () => {
    const mockNotifications: INotificationR[] = [
      {
        id: 1,
        userId: 1,
        title: "Test notification",
        message: "Test notification",
        isRead: false,
        createdAt: new Date("2023-01-01T12:00:00"),
        updatedAt: new Date(),
      },
    ];

    store = mockStore({
      notifications: {
        notifications: mockNotifications,
        currentUser: { roleId: 2 } as ICurrentUser,
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <UserNotifications />
        </Router>
      </Provider>,
    );

    expect(screen.queryByTestId("notification-1")).toBeDefined();
  });
});
