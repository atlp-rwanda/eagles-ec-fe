import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "../api/api";

export const createAds = createAsyncThunk("listAdds", async () => {
  const response = await axios.get("/products/ads", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
});

const createAdsSlice = createSlice({
  name: "ads",
  initialState: {
    isLoading: false,
    data: [],
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAds.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(createAds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(createAds.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoading = true;
      });
  },
});

export default createAdsSlice.reducer;
