import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import api from "../api/api";

interface Review {
  id: string;
  productId: string;
  user: {
    id: any;
    name: string;
  };
  rating: string;
  feedback: string;
}

interface ReviewState {
  reviews: Review[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  isLoading: false,
  error: null,
};

export const fetchReviews = createAsyncThunk<
Review[],
{ productId: string },
{ rejectValue: string }
>("reviews/fetch", async ({ productId }, { rejectWithValue }) => {
  try {
    const response = await api.get(`/products/${productId}/reviews`);
    return response.data.reviewProduct;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch reviews");
  }
});

export const addReview = createAsyncThunk<
Review,
{ productId: string; rating: string; feedback: string },
{ rejectValue: string }
>(
  "reviews/add",
  async ({ productId, rating, feedback }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/products/${productId}/reviews`,
        {
          rating,
          feedback,
        },
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
          axiosError.response?.data ?? { message: "Unknown error occurred" },
        );
      }
      return rejectWithValue("Unknown error occurred");
    }
  },
);

export const deleteReview = createAsyncThunk<
string,
{ productId: string; id: number },
{ rejectValue: string }
// @ts-ignore
>("reviews/delete", async ({ productId, id }, { rejectWithValue }) => {
  try {
    await api.delete(`/products/${productId}/reviews`, {
      data: { id },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return id;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        // @ts-ignore
        axiosError.response?.data ?? { message: "Unknown error occurred" },
      );
    }
    return rejectWithValue("Unknown error occurred");
  }
});

export const updateReview = createAsyncThunk<
Review,
{ productId: string; id: number; rating: string; feedback: string },
{ rejectValue: string }
>(
  "reviews/update",
  async ({
    productId, id, rating, feedback,
  }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/products/${productId}/reviews`,
        {
          id,
          rating,
          feedback,
        },
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
          axiosError.response?.data ?? { message: "Unknown error occurred" },
        );
      }
      return rejectWithValue("Unknown error occurred");
    }
  },
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchReviews.fulfilled,
        (state, action: PayloadAction<Review[]>) => {
          state.isLoading = false;
          state.reviews = action.payload;
        },
      )
      .addCase(fetchReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action: PayloadAction<Review>) => {
        state.isLoading = false;
        if (!Array.isArray(state.reviews)) {
          state.reviews = [];
        }
        state.reviews.push(action.payload);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        deleteReview.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.reviews = state.reviews.filter(
            (review) => review.id !== action.payload,
          );
        },
      )
      .addCase(deleteReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        updateReview.fulfilled,
        (state, action: PayloadAction<Review>) => {
          state.isLoading = false;
          state.reviews = state.reviews.map((review) =>
            (review.id === action.payload.id ? action.payload : review));
        },
      )
      .addCase(updateReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default reviewSlice.reducer;
