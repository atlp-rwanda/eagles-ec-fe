import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./api/loginApiSlice";
import productReducer from "./api/productSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
