import { configureStore } from "@reduxjs/toolkit";
import counter from "../features/counter/CounterSlice"
import { apiSlice } from "../features/fio/fio-api-slice";

export const store = configureStore({
  reducer: {
    counter,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
