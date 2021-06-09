import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/fio/fio-api-slice";
import { save, load } from "redux-localstorage-simple"

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  preloadedState: load(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware).concat(save({ ignoreStates: [apiSlice.reducerPath] }))
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
