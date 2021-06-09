import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import uuid from 'uuid-random';

interface Base {
  id: string,
  planet: string,
  // buildings, recipes, ...
  // market data
}
interface BasesState {
  list: Base[];
}

const initialState: BasesState = {
  list: [makeEmptyBase("OT-580b")],
}

const BasesSlice = createSlice({
  name: "bases",
  initialState,
  reducers: {
    add(state, action: PayloadAction<string>) {
      state.list.push(makeEmptyBase(action.payload))
    },
    remove(state, action: PayloadAction<string>) {
      if (state.list.length < 2)
        return // don't allow last base to be deleted
      const idx = state.list.findIndex(base => base.id == action.payload)
      if (idx !== -1)
        state.list.splice(idx, 1)
    },
  }
})

export const { add, remove } = BasesSlice.actions
export default BasesSlice.reducer

function generateId() { return nanoid(); }

function makeEmptyBase(planet: string): Base {
  return { id: generateId(), planet }
}
