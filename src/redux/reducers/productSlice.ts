import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import api from "../api/api";
import { IProduct } from "../../types";

interface SearchParams {
  name?: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string;
}

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

export const fetchProducts = createAsyncThunk<
IProduct[],
void,
{ rejectValue: string }
>("products/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<{ products: IProduct[] }>("/products");
    return res.data.products;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch products");
  }
});

interface ProductsState {
  products: IProduct[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "An unknown error occurred";
      })
      .addCase(handleSearchProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleSearchProduct.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.isLoading = false;
          state.products = action.payload;
        } else {
          state.isLoading = false;
          state.products = [];
        }
      })
      .addCase(handleSearchProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.products = [];
        // @ts-ignore
        state.error = action.payload || "Failed to search products";
      });
  },
});

export default productSlice.reducer;
