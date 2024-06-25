import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import axios from "../api/api";
import { Profile } from "../../../type";

interface ProfileState {
  loading: boolean;
  error: string | null;
  profile: Profile | null;
}

const initialState: ProfileState = {
  loading: false,
  error: null,
  profile: null,
};

interface ProfileResponse {
  data: Profile;
}

interface ProfileError {
  message: string;
}

export const getProfile = createAsyncThunk<
ProfileResponse,
void,
{ rejectValue: ProfileError }
>("getProfile", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<ProfileResponse>("/users/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    // @ts-ignore
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ProfileError>;
      return rejectWithValue(
        axiosError.response?.data ?? { message: "Unknown error occurred" },
      );
    }
    // @ts-ignore
    return rejectWithValue({ message: error.message });
  }
});

export const profileSlice = createSlice({
  name: "getProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // @ts-ignore
        state.profile = action.payload;
      })
      // @ts-ignore
      .addCase(
        getProfile.rejected,
        (state, action: PayloadAction<ProfileError>) => {
          state.loading = false;
          state.error = action.payload?.message ?? "Profile not found";
        },
      );
  },
});

export default profileSlice.reducer;
