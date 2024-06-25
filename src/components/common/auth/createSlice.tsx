import { createSlice } from "@reduxjs/toolkit";
// @ts-ignore
const createCustomSlice = (name, initialState, extraReducers) => createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers,
});

export default createCustomSlice;
