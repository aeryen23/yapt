import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Base {
  id: string,
  PlanetId: string,
  // buildings, recipes, ...
  // market data
}
interface BasesState {
  bases: Base[];
}

const initialState: BasesState = {
  bases: [],
}

const BasesSlice = createSlice({
  name: "bases",
  initialState,
  reducers: {
    add(state, action: PayloadAction<string>) {
      state.bases.push({ id: generateId(), PlanetId: action.payload })
    },
    remove(state, action: PayloadAction<string>) {
      const idx = state.bases.findIndex(base => base.id == action.payload)
      if (idx !== -1)
        state.bases.splice(idx, 1)
    },
  }
})

export const { add, remove } = BasesSlice.actions
export default BasesSlice.reducer


import uuid from 'uuid-random';

function generateId() { return uuid(); }
