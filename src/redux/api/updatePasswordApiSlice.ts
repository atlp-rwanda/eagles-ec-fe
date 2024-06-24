import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import axios from "./api";

interface UpdatePasswordState {
  loading: boolean;
  error: string | null;
}

const initialState: UpdatePasswordState = {
  loading: false,
  error: null,
};

interface UpdatePasswordPayload {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface UpdatePasswordResponse {
  message: string;
}

interface UpdatePasswordError {
  message: string;
}
const token = localStorage.getItem("accessToken");
export const updatePassword = createAsyncThunk<
UpdatePasswordResponse,
UpdatePasswordPayload,
{ rejectValue: UpdatePasswordError }
>("updatePassword", async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.put("/users/passwordupdate", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<UpdatePasswordError>;
    return rejectWithValue(axiosError.response?.data as UpdatePasswordError);
  }
});

const updatePasswordApiSlice = createSlice({
  name: "updatePassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updatePassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || null;
      });
  },
});

export default updatePasswordApiSlice.reducer;
