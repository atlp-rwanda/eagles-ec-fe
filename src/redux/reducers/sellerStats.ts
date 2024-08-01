import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import api from "../api/api";

export const fetchStats = createAsyncThunk(
  "sellerStatistics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/stats", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    } catch (err: any) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  },
);

interface IStatistics {
  loading: boolean;
  data: any[];
  error: string | null;
}

const initialState: IStatistics = {
  loading: false,
  data: [],
  error: null,
};

const sellerStatsSlice = createSlice({
  name: "sellerStatistics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => {
        if (state.data.length === 0) {
          state.loading = true;
        }
      })
      .addCase(fetchStats.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading = false;
        // @ts-ignore
        state.error = action.payload || action.error.message;
      });
  },
});

export default sellerStatsSlice.reducer;
