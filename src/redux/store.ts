import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./api/loginApiSlice";
import registerReducer from "./reducers/registerSlice";
import otpVerificationReucer from "./api/otpApiSclice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    otpVerification: otpVerificationReucer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
