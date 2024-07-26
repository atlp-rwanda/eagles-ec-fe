import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import axios from "../api/api";
import { orders } from "../../../type";

export const fetchOrders = createAsyncThunk<
orders,
void,
{ rejectValue: string }
>("orders/fetchOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    return response.data.orders as orders;
  } catch (error: any) {
    return rejectWithValue(error.data.message);
  }
});

export const updateOrderStatus = createAsyncThunk<
any,
{ orderId: number; status: string },
{ rejectValue: string }
>(
  "orders/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/orders/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      return response.data.updatedItems;
    } catch (error: any) {
      if (
        error.response
        && error.response.data
        && error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("An unexpected error occurred.");
    }
  },
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    isLoading: false,
    data: [] as unknown as orders,
    error: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const { orderId, productId, status } = action.payload;
        const orderIndex = state.data.findIndex(
          (order) => order.order.id === orderId,
        );
        if (orderIndex !== -1) {
          const productIndex = state.data[orderIndex].products.findIndex(
            (product) => product.id === productId,
          );
          if (productIndex !== -1) {
            state.data[orderIndex].products[productIndex].status = status;
          }
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default ordersSlice.reducer;
