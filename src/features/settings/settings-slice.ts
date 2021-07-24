import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../../app/hooks";
// import bases from "../bases/bases-slice";

const devModeSlice = createSlice({
  name: "devMode",
  initialState: false,
  reducers: {
    set(state, action: PayloadAction<boolean>) {
      return action.payload
    },
  }
})

export const { set: setDevModeEnabled } = devModeSlice.actions

export function isDevModeEnabled() {
  return useAppSelector(state => state.settings.devMode)
}

export default combineReducers({
  devMode: devModeSlice.reducer,
  // bases,
})
