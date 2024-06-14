import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import axios from "./api";

interface OtpState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: OtpState = {
  loading: false,
  error: null,
  success: false,
};

interface VerifyOtpPayload {
  otp: number;
  token: string;
}

export const verifyOtp = createAsyncThunk(
  "verifyOtp",
  async ({ otp, token }: VerifyOtpPayload, thunkAPI) => {
    try {
      const response = await axios.post(`/users/2fa-verify?token=${token}`, {
        otp,
        token,
      });
      return response.data;
    } catch (error) {
      // @ts-ignore
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const otpVerificationApiSlice = createSlice({
  name: "verifyOtp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      // @ts-ignore
      .addCase(verifyOtp.rejected, (state, action: PayloadAction) => {
        state.loading = false;
        // @ts-ignore
        state.error = action.payload.message;
      });
  },
});

export default otpVerificationApiSlice.reducer;
