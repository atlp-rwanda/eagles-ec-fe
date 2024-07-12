import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
// import { useDispatch } from "react-redux";

import api from "../api/api";

export const makePayment = createAsyncThunk(
  "makePayment",
  async (paymentData: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/payment/checkout", paymentData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    } catch (err) {
      // @ts-ignore
      const error: AxiosError = err;
      return rejectWithValue(error.response?.data);
    }
  },
);

export const handleSuccess = createAsyncThunk(
  "handleSuccess",
  async (
    { sessionId, userId }: { sessionId: string; userId: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.get(
        `/payment/success?sessionId=${sessionId}&userId=${userId}`,
      );
      return response.data;
    } catch (err) {
      // @ts-ignore
      const error: AxiosError = err;
      return rejectWithValue(error.response?.data);
    }
  },
);
// const dispatch = useDispatch();
const initialState = {
  loading: false,
  data: [],
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(makePayment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(makePayment.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      // dispatch(handleSuccess() as unknown as any);
    });
    builder.addCase(makePayment.rejected, (state, action) => {
      state.loading = false;
      // @ts-ignore
      state.error = action.payload || action.error.message;
    });
  },
});

export default paymentSlice.reducer;
