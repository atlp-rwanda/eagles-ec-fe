import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { Profile } from "../../../type";
import axios from "../api/api";

export interface ProfileState {
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

export const updateProfile = createAsyncThunk<
ProfileResponse,
FormData,
{
  rejectValue: ProfileError;
}
>("profile/updateProfile", async (payload: FormData, { rejectWithValue }) => {
  try {
    const response = await axios.patch("/users/profile", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ProfileError>;
    return rejectWithValue(error.response?.data ?? { message: error.message });
  }
});
export const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateProfile.fulfilled,
        (state, action: PayloadAction<ProfileResponse>) => {
          state.loading = false;
          state.error = null;
          state.profile = action.payload.data;
        },
      )
      // @ts-ignore
      .addCase(
        updateProfile.rejected,
        (state, action: PayloadAction<ProfileError>) => {
          state.loading = false;
          // @ts-ignore
          state.error = action.payload;
        },
      );
  },
});

export default updateProfileSlice.reducer;
