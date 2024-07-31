import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import api from "../api/api";

interface Wish {
  id: number;
  product: {
    id: number;
    name: string;
    images: string[];
    stockQuantity: number;
    price: number;
  };
  user: {
    name: string;
    userName: string;
    email: string;
  };
}

interface WishesState {
  wishes: Wish[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WishesState = {
  wishes: [],
  isLoading: false,
  error: null,
};

export const fetchWishes = createAsyncThunk<
Wish[],
void,
{ rejectValue: string }
>("wishes/fetch", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(`/wishes`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data.wishes;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 404) {
        return rejectWithValue("Wishes not found.");
      }
      return rejectWithValue(
        // @ts-ignore
        axiosError.response?.data?.message ?? "Unknown error occurred",
      );
    }
    return rejectWithValue("Unknown error occurred");
  }
});

export const addWish = createAsyncThunk<
Wish,
{ productId: number },
{ rejectValue: string }
>("wishes/add", async ({ productId }, { rejectWithValue }) => {
  try {
    const response = await api.post(
      `/wishes`,
      { productId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        // @ts-ignore
        axiosError.response?.data?.message ?? "Unknown error occurred",
      );
    }
    return rejectWithValue("Unknown error occurred");
  }
});

export const deleteWish = createAsyncThunk<
number,
{ productId: number },
{ rejectValue: string }
>("wishes/delete", async ({ productId }, { rejectWithValue }) => {
  try {
    await api.delete(`/products/${productId}/wishes`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return productId;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        // @ts-ignore
        axiosError.response?.data?.message ?? "Unknown error occurred",
      );
    }
    return rejectWithValue("Unknown error occurred");
  }
});

const wishesSlice = createSlice({
  name: "wishes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchWishes.fulfilled,
        (state, action: PayloadAction<Wish[]>) => {
          state.isLoading = false;
          state.wishes = action.payload;
        },
      )
      .addCase(fetchWishes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addWish.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addWish.fulfilled, (state, action: PayloadAction<Wish>) => {
        state.isLoading = false;
        state.wishes.push(action.payload);
      })
      .addCase(addWish.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteWish.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteWish.fulfilled, (state, action: PayloadAction<number>) => {
        state.isLoading = false;
        state.wishes = state.wishes.filter(
          (wish) => wish.id !== action.payload,
        );
      })
      .addCase(deleteWish.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default wishesSlice.reducer;
