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
    return rejectWithValue({
      message: axiosError.message,
    });
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
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        localStorage.setItem("accessToken", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Unknown error";
      });
  },
});

export default loginApiSlice.reducer;
