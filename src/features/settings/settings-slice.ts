import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useAppSelector } from "../../app/hooks"
import planetSearch from "../planet-search/planet-search-slice";

const devModeSlice = createSlice({
  name: "mode",
  initialState: {
    experimental: false,
    dev: false
  },
  reducers: {
    setExperimentalMode(state, action: PayloadAction<boolean>) {
      state.experimental = action.payload
    },
    setDevModeEnabled(state, action: PayloadAction<boolean>) {
      state.dev = action.payload
    },
  }
})

export const { setExperimentalMode, setDevModeEnabled } = devModeSlice.actions

export function isExperimentalMode() {
  return useAppSelector(state => state.settings.mode.experimental)
}
export function isDevModeEnabled() {
  return useAppSelector(state => state.settings.mode.dev)
}

export default combineReducers({
  mode: devModeSlice.reducer,
  planetSearch,
})
