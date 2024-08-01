import { Store, configureStore } from "@reduxjs/toolkit";

import notificationReducer, {
  getUserNotifications,
  readNotification,
  onIncomingNotification,
  markNotificationAsRead,
  setNotifications,
  INotificationR,
} from "../redux/reducers/notificationSlice";
import api from "../redux/api/api";

import { connectSocketMock, socketMock } from "./__mock__/socketMock";

jest.mock("../redux/api/api");

describe("notificationSlice", () => {
  let store;

  beforeEach(() => {
    // jest.clearAllMocks();
    store = configureStore({
      reducer: {
        notifications: notificationReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });
  });

  it("should handle onIncomingNotification", () => {
    const notification: INotificationR = {
      id: 1,
      userId: 1,
      title: "New Notification",
      message: "This is a new notification",
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    store.dispatch(onIncomingNotification(notification));

    const state = store.getState().notifications;
    expect(state.notifications).toContainEqual(notification);
    expect(state.unreadCount).toBe(1);
  });

  it("should handle markNotificationAsRead", () => {
    const notification: INotificationR = {
      id: 1,
      userId: 1,
      title: "New Notification",
      message: "This is a new notification",
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    store.dispatch(onIncomingNotification(notification));
    store.dispatch(markNotificationAsRead(notification.id));

    const state = store.getState().notifications;
    expect(state.notifications[0].isRead).toBe(true);
    expect(state.unreadCount).toBe(0);
  });

  it("should handle setNotifications", () => {
    const notifications: INotificationR[] = [
      {
        id: 1,
        userId: 1,
        title: "Test Notification",
        message: "This is a test notification",
        isRead: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    store.dispatch(setNotifications(notifications));

    const state = store.getState().notifications;
    expect(state.notifications).toEqual(notifications);
    expect(state.unreadCount).toBe(1);
  });

  it("should handle getUserNotifications thunk", async () => {
    const mockNotifications: INotificationR[] = [
      {
        id: 1,
        userId: 1,
        title: "Test Notification",
        message: "This is a test notification",
        isRead: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 1,
        title: "Test Notification",
        message: "This is a test notification",
        isRead: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    (api.get as jest.Mock).mockResolvedValueOnce({
      data: { notifications: mockNotifications },
    });

    const result = await store.dispatch(getUserNotifications());
    console.log("Thunk result:", result);

    const state = store.getState().notifications;

    expect(state.notifications).toEqual(mockNotifications);
    expect(state.unreadCount).toBe(2);
  });

  it("should handle readNotification thunk", async () => {
    const notification: INotificationR = {
      id: 1,
      userId: 1,
      title: "Test Notification",
      message: "This is a test notification",
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    store.dispatch(onIncomingNotification(notification));
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: {},
    });
    // @ts-ignore
    await store.dispatch(readNotification(notification.id));

    const state = store.getState().notifications;
    console.log("State after readNotification:", state); // Debugging output
    expect(state.notifications[0].isRead).toBe(true);
    expect(state.unreadCount).toBe(0);
  });
});
