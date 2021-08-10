import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit"
import { useAppSelector } from "../../app/hooks"
import { RootState } from "../../app/store"

export interface BaseB {
  buildings: Record<string, {
    list: {
      condition: number
      //  buildTimestamp, lastRepairedTimestamp
    }[]
    // recipes: BaseBuildingRecipe[]
  }>
  inventory: Record<string, number>
  workforce: {
    Pioneers: WorkforceStatus;
    Settlers: WorkforceStatus;
    Technicians: WorkforceStatus;
    Engineers: WorkforceStatus;
    Scientists: WorkforceStatus;
  }
}
export interface WorkforceStatus {
  current: number;
  total: number;
  required: number;
  satisfaction: number;
}

export interface BaseBuildingB {
  c: number,
  // recipes: BaseBuildingRecipe[]
}

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

interface Bases {
  current?: Base
  // variants: Record<string, Base & { name: string }>
}

interface BasesState {
  current: Record<string, BaseB>;
  byPlanet: Record<string, Bases>;
  currentId?: string;
}

const BasesSlice = createSlice({
  name: "bases",
  initialState: {
    current: {},
    byPlanet: {},
    currentId: undefined
  } as BasesState,
  reducers: {
    setCurrent(state, action: PayloadAction<{ planet: string, base: BaseB }[]>) {
      const current: Record<string, BaseB> = {}
      for (const { planet, base } of action.payload)
        current[planet] = base
      state.current = current
    },
    // remove(state, action: PayloadAction<string>) {
    //   if (state.list.length < 2)
    //     return // don't allow last base to be deleted
    //   const idx = state.list.findIndex(base => base.id == action.payload)
    //   if (idx !== -1) {
    //     const isCurrent = state.list[idx].id == state.currentId
    //     state.list.splice(idx, 1)
    //     if (isCurrent)
    //       state.currentId = state.list[0].id
    //   }
    // },
    // select(state, action: PayloadAction<string>) {
    //   state.currentId = action.payload
    // },
    // addBuilding(state, action: PayloadAction<string>) {
    //   const current = state.list.filter(b => b.id == state.currentId)[0]
    //   const existing = current.buildings[action.payload]
    //   if (existing)
    //     existing.amount++
    //   else
    //     current.buildings[action.payload] = { building: action.payload, amount: 1, recipes: [] }
    // },
    // removeBuilding(state, action: PayloadAction<string>) {
    //   const current = state.list.filter(b => b.id == state.currentId)[0]
    //   const existing = current.buildings[action.payload]
    //   if (!existing)
    //     throw new Error("Can't remove non-existing building")
    //   if (existing.amount > 0)
    //     existing.amount--
    // },
    // addRecipe(state, action: PayloadAction<[string, string]>) {
    //   const current = state.list.filter(b => b.id == state.currentId)[0]
    //   const existing = current.buildings[action.payload[0]]
    //   if (!existing)
    //     throw new Error("Can't add recipe to non-existing building")
    //   // existing.recipes.filter
    // },
  }
})

export const { setCurrent/*, remove, select, addBuilding, removeBuilding*/ } = BasesSlice.actions
export default BasesSlice.reducer

export function selectAvailablePlanets() {
  return useAppSelector(state => Object.keys(state.settings.bases.byPlanet))
}
export function selectCurrentBase(planet:string) {
  return useAppSelector(state => state.settings.bases.current[planet])
}
export function currentBaseId() {
  return useAppSelector(state => state.settings.bases.currentId)
}
// export function currentBase() {
//   return useAppSelector(state => state.settings.bases.list.filter(b => b.id == state.settings.bases.currentId)[0])
// }
