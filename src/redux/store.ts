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
import notificationReducer from "./reducers/notificationSlice";
import updatePasswordReducer from "./reducers/updatePasswordSlice";
import reviewSlice from "./reducers/reviewSlice";
import chatSlice from "./reducers/chatSlice";
import authReducer from "./reducers/authSlice";
import wishListSlice from "./reducers/wishListSlice";
import ordersReducer from "./reducers/ordersSlice";
import PaymentSlice from "./reducers/payment";
import adsReducer from "./reducers/listAddSlice";
import sellerStatsReducer from "./reducers/sellerStats";

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
    notifications: notificationReducer,
    updatePin: updatePasswordReducer,
    review: reviewSlice,
    chats: chatSlice,
    auth: authReducer,
    wishes: wishListSlice,
    order: ordersReducer,
    payment: PaymentSlice,
    ads: adsReducer,
    sellerStats: sellerStatsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
