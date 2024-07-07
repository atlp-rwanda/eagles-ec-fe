import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import api from "../api/api";

export const fetchProducts = createAsyncThunk(
  "products",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data.products;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        // @ts-ignore
        state.error = action.payload || action.error.message;
      });
  },
});

export default productsSlice.reducer;
