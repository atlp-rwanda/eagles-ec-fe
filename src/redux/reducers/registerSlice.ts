import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import axios from "../api/api";
import { RegisterError } from "../../../type";

interface UserData {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface RegisterState {
  isLoading: boolean;
  data: any[];
  error: string | null;
  verified: boolean;
}

const initialState: RegisterState = {
  isLoading: false,
  data: [],
  error: null,
  verified: false,
};

export const createUser = createAsyncThunk(
  "register/createUser",
  async (userData: UserData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/register", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      const error = err as AxiosError<RegisterError>;
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const verifyUser = createAsyncThunk(
  "register/verifyUser",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/users/verify-user?token=${token}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyUser.fulfilled, (state) => {
        state.isLoading = false;
        state.verified = true;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default registerSlice.reducer;
