import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import api from "../api/api";
import { ICategory } from "../../types";

export const fetchCategories = createAsyncThunk(
  "categories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/categories", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data.categories;
    } catch (err: any) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  },
);

export const addCategory = createAsyncThunk(
  "addCategory",
  async (
    payload: { name: string; description: string; image: File },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.post("/categories", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  },
);

interface ICategoryRoot {
  loading: boolean;
  data: ICategory[];
  error: string | null;
}

const initialState: ICategoryRoot = {
  loading: false,
  data: [],
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        if (state.data.length === 0) {
          state.loading = true;
        }
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<ICategory[]>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        // @ts-ignore
        state.error = action.payload || action.error.message;
      });
  },
});

export default categoriesSlice.reducer;
