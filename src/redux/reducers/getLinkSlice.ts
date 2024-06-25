import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import axios from "../api/api";
import { errorLink } from "../../../type";
import createCustomSlice from "../../components/common/auth/createSlice";

interface EmailUser {
  email: string;
}
interface LinkState {
  isLoading: boolean;
  data: [];
  error: string | null;
}

const initialState: LinkState = {
  isLoading: false,
  data: [],
  error: null,
};

export const getLink = createAsyncThunk(
  "getLinkEmail",
  async (data: EmailUser, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/password-reset-link", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      const error = err as AxiosError<errorLink>;
      return rejectWithValue(error.message);
    }
  },
);

export const getLinkSlicer = createCustomSlice(
  "getLink",
  initialState,
  (builder) => {
    builder
      .addCase(getLink.pending, (state: LinkState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLink.fulfilled, (state: LinkState, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(
        getLink.rejected,
        (state: LinkState, action: { payload: string }) => {
          state.isLoading = false;
          state.error = action.payload as string;
        },
      );
  },
);

export default getLinkSlicer.reducer;
