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
  data: [];
  error: string | null;
}

const initialState: RegisterState = {
  isLoading: false,
  data: [],
  error: null,
};

export const createUser = createAsyncThunk(
  "registerUser",
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
export const registerSlice = createSlice({
  name: "registerUser",
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
      });
  },
});

export default registerSlice.reducer;
