import { configureStore } from "@reduxjs/toolkit"
import { save, load } from "redux-localstorage-simple"
import { apiSlice } from "../features/fio/fio-api-slice"
import { worldDataSlice as worldData } from "../world-data/world-data-slice"
import settings from "../features/settings/settings-slice"

const localStorageOptions = { states: ["settings"], namespace: "yapt" }
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    worldData,
    settings,
  },
  preloadedState: load(localStorageOptions),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: { ignoredPaths: ["worldData"] },
    serializableCheck: { ignoredPaths: ["worldData"] }
  }).concat(apiSlice.middleware).concat(save(localStorageOptions))
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
