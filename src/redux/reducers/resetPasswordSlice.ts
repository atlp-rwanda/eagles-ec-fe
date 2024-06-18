import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import axios from "../api/api";
import { ResetError } from "../../../type";

interface ResetData {
  password: string;
  confirmPassword: string;
  token: string;
}
interface ResetPass {
  isLoading: boolean;
  data: [];
  error: string | null;
}

const initialState: ResetPass = {
  isLoading: false,
  data: [],
  error: null,
};

export const resetPassword = createAsyncThunk(
  "reset",
  async (data: ResetData, { rejectWithValue }) => {
    try {
      const response = await axios.patch("/users/reset-password", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ResetError>;
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const resetPasswordSlice = createSlice({
  name: "reset",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.data = [];
      });
  },
});

export default resetPasswordSlice.reducer;
