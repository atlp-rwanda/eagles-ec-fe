import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./api/loginApiSlice";
import registerReducer from "./reducers/registerSlice";
import updatePasswordApiSlice from "./api/updatePasswordApiSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    password: updatePasswordApiSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
