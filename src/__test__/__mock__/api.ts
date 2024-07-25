const api = {
  interceptors: {
    response: {
      use: jest.fn(),
    },
  },
  get: jest.fn((url: string) => {
    if (url === "/notifications") {
      return Promise.resolve({
        data: {
          notifications: [
            {
              id: 1,
              userId: 1,
              title: "Test Notification",
              message: "This is a test notification",
              isRead: false,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        },
      });
    }
    if (url.includes("/notifications/")) {
      return Promise.resolve({
        data: {},
      });
    }
    return Promise.reject(new Error("not found"));
  }),
};

export default api;
