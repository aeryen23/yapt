import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit"
import { useAppSelector } from "../../app/hooks"
import { RootState } from "../../app/store"

export interface Base {
  id: string,
  planet: string,
  name?: string,
  buildings: Record<string, BaseBuilding>,
  // buildings, recipes, ...
  // market data
}
export interface BaseBuilding {
  building: string,
  amount: number,
  recipes: BaseBuildingRecipe[]
}
export interface BaseBuildingRecipe {
  recipe: string,
  amount: number,
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
    },
    addBuilding(state, action: PayloadAction<string>) {
      const current = state.list.filter(b => b.id == state.currentId)[0]
      const existing = current.buildings[action.payload]
      if (existing)
        existing.amount++
      else
        current.buildings[action.payload] = { building: action.payload, amount: 1, recipes: [] }
    },
    removeBuilding(state, action: PayloadAction<string>) {
      const current = state.list.filter(b => b.id == state.currentId)[0]
      const existing = current.buildings[action.payload]
      if (!existing)
        throw new Error("Can't remove non-existing building")
      if (existing.amount > 0)
        existing.amount--
    },
    addRecipe(state, action: PayloadAction<[string, string]>) {
      const current = state.list.filter(b => b.id == state.currentId)[0]
      const existing = current.buildings[action.payload[0]]
      if (!existing)
        throw new Error("Can't add recipe to non-existing building")
      // existing.recipes.filter
    },
  }
})

export const { add, remove, select, addBuilding, removeBuilding } = BasesSlice.actions
export default BasesSlice.reducer

function generateId() { return nanoid() }

function makeEmptyBase(planet: string): Base {
  return { id: generateId(), planet, buildings: {} }
}

export function currentBaseId() {
  return useAppSelector(state => state.settings.bases.currentId)
}
export function currentBase() {
  return useAppSelector(state => state.settings.bases.list.filter(b => b.id == state.settings.bases.currentId)[0])
}
