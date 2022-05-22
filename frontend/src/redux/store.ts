import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import {
  useSelector as rawUseSelector,
  TypedUseSelectorHook,
} from "react-redux";
import userReducer from "./slice/userSlice";

export const store = configureStore({
  reducer: userReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["user/setUser"],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
