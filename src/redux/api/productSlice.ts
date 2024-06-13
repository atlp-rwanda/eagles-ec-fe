import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { IProductR, prod } from "../../types";

import api from "./api";

const initialState: IProductR[] = prod;

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await api.get("/api/v1/products");
    return response.data;
  },
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<IProductR[]>) => action.payload,
    );

    builder.addCase(fetchProducts.pending, (state) => {});

    builder.addCase(fetchProducts.rejected, (state, action) => {});
  },
});

export default productSlice.reducer;
