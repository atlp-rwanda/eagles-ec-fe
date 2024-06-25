import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import axios from "./api";

interface LoginState {
  loading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  loading: false,
  error: null,
};

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface LoginError {
  message: string;
}

export const login = createAsyncThunk<
LoginResponse,
LoginPayload,
{ rejectValue: LoginError }
>("login", async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.post("/users/login", payload);
    console.log("Payload being returned:", response.data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<LoginError>;
    return rejectWithValue(axiosError.response?.data as LoginError);
  }
});

const loginApiSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message ?? "Unknown error";
      });
  },
});

export default loginApiSlice.reducer;
