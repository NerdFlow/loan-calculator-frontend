import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import authSliceReducer from "@/lib/slices/auth/authSlice";
import offerSliceReducer from "@/lib/slices/offer/offerSlice";
import authMiddleware from "./slices/middlewares/authMiddleware";

// setting up the store
export const store = () => {
  return configureStore({
    reducer: {
      auth: authSliceReducer,
      offer: offerSliceReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware, authMiddleware),
    devTools: true, // turn this false on production
  });
};

// Infer the type of store
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
