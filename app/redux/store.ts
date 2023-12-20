import { configureStore } from "@reduxjs/toolkit";
import {productsApi} from './services/productsApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import cartReducer from './features/cartSlice'

export const store = configureStore({
  reducer: {
    cartReducer,
    [productsApi.reducerPath]: productsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([productsApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;