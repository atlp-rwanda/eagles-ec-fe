import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./api/loginApiSlice";
import registerReducer from "./reducers/registerSlice";
import otpVerificationReucer from "./api/otpApiSclice";
import getLinkReducer from "./reducers/getLinkSlice";
import resetReducer from "./reducers/resetPasswordSlice";
import categoriesReducer from "./reducers/categoriesSlice";
import updatePasswordApiSlice from "./api/updatePasswordApiSlice";
import profileSlice from "./reducers/profileSlice";
import updateProfileSlice from "./reducers/updateProfileSlice";
import productsReducer from "./reducers/productsSlice";
import cartsReducer from "./reducers/cartSlice";
import reviewSlice from "./reducers/reviewSlice";
import wishListSlice from "./reducers/wishListSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    otpVerification: otpVerificationReucer,
    getLink: getLinkReducer,
    reset: resetReducer,
    categories: categoriesReducer,
    updatePassword: updatePasswordApiSlice,
    usersProfile: profileSlice,
    updateUsersProfile: updateProfileSlice,
    products: productsReducer,
    cart: cartsReducer,
    review: reviewSlice,
    wishes: wishListSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
