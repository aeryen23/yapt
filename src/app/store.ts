import { configureStore } from "@reduxjs/toolkit";
import { save, load } from "redux-localstorage-simple"
import { apiSlice } from "../features/fio/fio-api-slice";
import bases from "../features/bases/bases-slice";
import { worldDataSlice as worldData } from "../world-data/world-data-slice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    bases,
    worldData,
  },
  preloadedState: load(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: { ignoredPaths: ["worldData"] },
    serializableCheck: { ignoredPaths: ["worldData"] }
  }).concat(apiSlice.middleware).concat(save({ ignoreStates: [apiSlice.reducerPath, "worldData"] }))
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
