import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../api/api";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data.users;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const fetchChats = createAsyncThunk(
  "chats/fetchChats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/chats/private`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const sendMessage = createAsyncThunk(
  "chats/sendMessage",
  async (
    { message, id }: { message: string; id: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.post(
        `/chats/private/${id}`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const chatsSlice = createSlice({
  name: "chats",
  initialState: {
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
  reducers: {
    setChats: (state, action) => {
      state.chats.data = action.payload;
    },
    setUsers: (state, action) => {
      state.users.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        if (state.chats.data.length === 0) {
          state.chats.loading = true;
        }
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.chats.loading = false;
        state.chats.data = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.chats.loading = false;
        // @ts-ignore
        state.chats.error = action.payload || action.error.message;
      })
      .addCase(sendMessage.pending, (state) => {
        state.chats.sending = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.chats.sending = false;
        const chat: any = state.chats.data.find(
          (item: any) =>
            item.messages[0].recipientId === action.payload.recipientId,
        );
        if (chat) {
          chat.messages.push(action.payload);
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.chats.sending = false;
        // @ts-ignore
        state.chats.sendError = action.payload || action.error.message;
      })
      .addCase(fetchUsers.pending, (state) => {
        if (state.users.data.length === 0) {
          state.users.loading = true;
        }
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users.loading = false;
        state.users.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.users.loading = false;
        // @ts-ignore
        state.users.error = action.payload || action.error.message;
      });
  },
});

export const { setChats, setUsers } = chatsSlice.actions;

export default chatsSlice.reducer;
