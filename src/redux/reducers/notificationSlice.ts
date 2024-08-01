import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../api/api";
import { getCurrentUser } from "../../utils/currentuser";

export interface INotificationR {
  id: number;
  userId: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICurrentUser {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  lastPasswordUpdateTime: Date;
  roleId: number;
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const getUserNotifications = createAsyncThunk<INotificationR[], void>(
  "notifications/getUserNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/notifications", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      return response.data.notifications;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  },
);

export const readNotification = createAsyncThunk<number, number>(
  "notification/read",
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      dispatch(markNotificationAsRead(id));
      const response = await api.get(`/notifications/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

interface INotificationRootState {
  notifications: INotificationR[];
  unreadCount: number;
  currentUser: ICurrentUser | null;
  isConnected: boolean;
}

const initialState: INotificationRootState = {
  notifications: [],
  unreadCount: 0,
  isConnected: false,
  currentUser: null,
};

export const handleCurrentUser = createAsyncThunk(
  "user/currentUser",
  async () => {
    try {
      const user = await getCurrentUser();
      return user;
    } catch (error: any) {
      return null;
    }
  },
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    onIncomingNotification: (state, action: PayloadAction<INotificationR>) => {
      state.notifications.push(action.payload);
      if (!action.payload.isRead) {
        state.unreadCount += 1;
      }
    },
    markNotificationAsRead: (state, action: PayloadAction<number>) => {
      const notification = state.notifications.find(
        (notif) => notif.id === action.payload,
      );
      if (notification && !notification.isRead) {
        notification.isRead = true;
        state.unreadCount -= 1;
      }
    },
    setNotifications: (state, action: PayloadAction<INotificationR[]>) => {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter(
        (notification) => !notification.isRead,
      ).length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getUserNotifications.fulfilled,
        (state, action: PayloadAction<INotificationR[]>) => {
          state.notifications = action.payload;
          state.unreadCount = action.payload.filter(
            (notification) => !notification.isRead,
          ).length;
        },
      )
      .addCase(handleCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
  },
});

export const {
  onIncomingNotification,
  markNotificationAsRead,
  setNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
