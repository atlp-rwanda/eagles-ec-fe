import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./api/loginApiSlice";
import registerReducer from "./reducers/registerSlice";
import otpVerificationReucer from "./api/otpApiSclice";
import getLinkReducer from "./reducers/getLinkSlice";
import resetReducer from "./reducers/resetPasswordSlice";
import categoriesReducer from "./reducers/categoriesSlice";
import updatePasswordApiSlice from "./api/updatePasswordApiSlice";
import productReducer from "./reducers/productSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    otpVerification: otpVerificationReucer,
    getLink: getLinkReducer,
    reset: resetReducer,
    categories: categoriesReducer,
    updatePassword: updatePasswordApiSlice,
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
