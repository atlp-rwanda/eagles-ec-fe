import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IROOTI {
  isPasswordExpired: boolean;
}

const initialState = {
  isPasswordExpired: false,
};

const updatePasswordSlice = createSlice({
  name: "updatePassword",
  initialState,
  reducers: {
    setPasswordExpired(state, action: PayloadAction<boolean>) {
      state.isPasswordExpired = action.payload;
    },
  },
});

export const { setPasswordExpired } = updatePasswordSlice.actions;

export default updatePasswordSlice.reducer;
