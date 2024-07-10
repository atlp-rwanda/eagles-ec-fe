// @ts-nocheck
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import axios from "../api/api";
import { UserCart } from "../../../type";

export const cartManage = createAsyncThunk(
  "fetchCartItem",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/carts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data.userCart.items as UserCart;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  },
);

export const cartDelete = createAsyncThunk(
  "deleteCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete("/carts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const addToCart = createAsyncThunk(
  "addToCart",
  async (
    { productId, quantity }: { productId: number; quantity: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(
        "/carts",
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const removeFromCart = createAsyncThunk(
  "cart/removeItem",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "/carts",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const updateCarts = createAsyncThunk(
  "update",
  async (
    { productId, quantity }: { productId: string; quantity: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.patch(
        "/carts",
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );

      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const cartManageSlice = createSlice({
  name: "carts",
  initialState: {
    isLoading: false,
    data: [] as UserCart[],
    error: false,
    delete: {
      isLoading: false,
      error: false,
    },
    add: {
      isLoading: false,
      data: [],
      error: null,
    },
    remove: {
      isLoading: false,
      error: false,
    },
    update: {
      isLoading: false,
      data: [],
      error: false,
    },
  },
  reducers: {
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.data.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.data.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(cartManage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cartManage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(cartManage.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(cartDelete.pending, (state) => {
        state.delete.isLoading = true;
      })
      .addCase(cartDelete.fulfilled, (state) => {
        state.delete.isLoading = false;
      })
      .addCase(cartDelete.rejected, (state) => {
        state.delete.error = true;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.remove.isLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state) => {
        state.remove.isLoading = false;
      })
      .addCase(removeFromCart.rejected, (state) => {
        state.remove.error = true;
      })
      .addCase(addToCart.pending, (state) => {
        state.add.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.add.isLoading = false;
        state.data.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.add.isLoading = false;
        state.add.error = action.payload as string;
      })
      .addCase(updateCarts.pending, (state) => {
        state.update.isLoading = true;
      })
      .addCase(updateCarts.fulfilled, (state, action) => {
        state.update.isLoading = false;
        const updatedItem = action.payload;
        const index = state.data.findIndex(
          (item) => item.id === updatedItem.id,
        );
        if (index !== -1) {
          state.data[index] = updatedItem;
        }
      })
      .addCase(updateCarts.rejected, (state, action) => {
        state.update.isLoading = false;
        state.update.error = action.payload as string;
      });
  },
});

export const { increaseQuantity, decreaseQuantity } = cartManageSlice.actions;
export default cartManageSlice.reducer;
