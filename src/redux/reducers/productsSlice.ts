import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import api from "../api/api";
import { IProduct } from "../../types";

interface SearchParams {
  name?: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string;
}

interface ProductsState {
  data: IProduct[];
  loading: boolean;
  error: string | null;
}

export const fetchProducts = createAsyncThunk<IProduct[], void>(
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
export const handleSearchProduct = createAsyncThunk<
IProduct[] | { status: number; message: string },
SearchParams
>(
  "search/product",
  async ({
    name, minPrice, maxPrice, category,
  }, { rejectWithValue }) => {
    try {
      let queryString = "/products/search?";
      if (name) queryString += `name=${name}&`;
      if (minPrice !== undefined) queryString += `minPrice=${minPrice}&`;
      if (maxPrice !== undefined) queryString += `maxPrice=${maxPrice}&`;
      if (category !== undefined) queryString += `category=${category}&`;

      const res = await api.get<IProduct[]>(queryString);

      if (!Array.isArray(res.data)) {
        return rejectWithValue(
          "No products found matching your search criteria.",
        );
      }

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const isProductAvailable = createAsyncThunk(
  "products/avail",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/products/${id}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const initialState: ProductsState = {
  loading: false,
  data: [],
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        if (state.data.length === 0) {
          state.loading = true;
        }
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        // @ts-ignore
        state.error = action.payload || action.error.message;
      })
      .addCase(handleSearchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleSearchProduct.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.loading = false;
          state.data = action.payload;
        } else {
          state.loading = false;
          state.data = [];
        }
      })
      .addCase(handleSearchProduct.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        // @ts-ignore
        state.error = action.payload || "Failed to search products";
      });
  },
});

export default productsSlice.reducer;
