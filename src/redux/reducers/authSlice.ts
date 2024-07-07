import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import api from "../api/api";

export const fetchUser = createAsyncThunk(
  "fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    data: [],
    error: null,
    userInfo: JSON.parse(localStorage.getItem("userInfo") || "{}"),
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.userInfo = payload;
      localStorage.setItem("userInfo", JSON.stringify(payload));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      // @ts-ignore
      state.error = action.payload || action.error.message;
    });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
