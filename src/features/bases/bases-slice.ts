import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../../app/hooks";

interface Base {
  id: string,
  planet: string,
  name?: string,
  // buildings, recipes, ...
  // market data
}
interface BasesState {
  list: Base[];
  currentId: string;
}

const initialState: BasesState = (() => {
  const starter = makeEmptyBase("OT-580b")
  return {
    list: [starter, makeEmptyBase("QQ-645b")],
    currentId: starter.id
  }
})()

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
      if (idx !== -1) {
        const isCurrent = state.list[idx].id == state.currentId
        state.list.splice(idx, 1)
        if (isCurrent)
          state.currentId = state.list[0].id
      }
    },
    select(state, action: PayloadAction<string>) {
      state.currentId = action.payload
    }
  }
})

export const { add, remove, select } = BasesSlice.actions
export default BasesSlice.reducer

function generateId() { return nanoid(); }

function makeEmptyBase(planet: string): Base {
  return { id: generateId(), planet }
}

export function currentBaseId() {
  return useAppSelector(state => state.bases.currentId)
}
export function currentBase() {
  return useAppSelector(state => state.bases.list.filter(b => b.id == state.bases.currentId)[0])
}