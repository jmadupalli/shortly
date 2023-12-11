import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import { shortlyApi } from "./features/shortlyApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [shortlyApi.reducerPath]: shortlyApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shortlyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
