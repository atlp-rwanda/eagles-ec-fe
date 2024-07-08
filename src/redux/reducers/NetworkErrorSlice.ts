import { createSlice } from "@reduxjs/toolkit";

export const networkErrorSlice = createSlice({
  name: "networkError",
  initialState: { showPopup: false },
  reducers: {
    setNetworkError: (state) => {
      state.showPopup = true;
    },
    clearNetworkError: (state) => {
      state.showPopup = false;
    },
  },
});

export const { setNetworkError, clearNetworkError } = networkErrorSlice.actions;

export default networkErrorSlice.reducer;
