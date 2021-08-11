import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit"
import { useAppSelector } from "../../app/hooks"
import { RootState } from "../../app/store"
import { WorkforceLevel } from "../../world-data/world-data"
import { BuildingCategory } from "../fio/fio-types"

export interface BaseWorkforce {
  Pioneers: WorkforceStatus
  Settlers: WorkforceStatus
  Technicians: WorkforceStatus
  Engineers: WorkforceStatus
  Scientists: WorkforceStatus
}

export interface BaseB {
  planet: string
  isSynched?: boolean
  buildings: Record<string, BaseBuilding>
  inventory: Record<string, number>
  workforce: BaseWorkforce
  experts: Experts
  cogcFocus: COGCFocus
}
export type Experts = Record<BuildingCategory, number>
export type COGCFocus = BuildingCategory | WorkforceLevel | undefined

export interface SynchedBase {
  buildings: {
    ticker: string
    condition: number
    //  buildTimestamp, lastRepairedTimestamp
  }[]
  inventory: Record<string, number>
}
export interface WorkforceStatus {
  current: number;
  total: number;
  required: number;
  satisfaction: number;
}

// export interface BaseBuildingB {
//   c: number,
//   // recipes: BaseBuildingRecipe[]
// }

// export interface Base {
//   id: string,
//   planet: string,
//   name?: string,
//   buildings: Record<string, BaseBuilding>,
//   // buildings, recipes, ...
//   // market data
// }
export interface BaseBuilding {
  // id: string
  amount: number
  condition: number
  recipes: BaseBuildingRecipe[]
}
export interface BaseBuildingRecipe {
  recipe: string,
  amount: number,
}

// interface Bases {
//   current?: Base
//   // variants: Record<string, Base & { name: string }>
// }

interface BasesState {
  byId: Record<string, BaseB>;
  byPlanet: Record<string, string[]>;
}

const BasesSlice = createSlice({
  name: "bases",
  initialState: {
    byId: {},
    byPlanet: {},
  } as BasesState,
  reducers: {
    setSynched(state, action: PayloadAction<BaseB>) {
      const base = action.payload
      const planet = base.planet
      const synchedBaseId = (state.byPlanet[planet] ?? []).find(id => state.byId[id].isSynched) ?? nanoid()
      if (!state.byId[synchedBaseId]) {
        if (!state.byPlanet[planet])
          state.byPlanet[planet] = []
        state.byPlanet[planet].push(synchedBaseId)
      }
      state.byId[synchedBaseId] = { ...base, isSynched: true }
    },
    setExpert(state, action: PayloadAction<{ id: string, expertise: BuildingCategory, amount: number }>) {
      const { id, expertise, amount } = action.payload
      state.byId[id].experts[expertise] = Math.min(5, Math.max(0, amount))
    },
    setCOGCFocus(state, action: PayloadAction<{ id: string, focus: COGCFocus }>) {
      const { id, focus } = action.payload
      state.byId[id].cogcFocus = focus
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

export const { setSynched, setExpert, setCOGCFocus/*, remove, select, addBuilding, removeBuilding*/ } = BasesSlice.actions
export default BasesSlice.reducer

export function selectAvailablePlanets() {
  return useAppSelector(state => Object.keys(state.bases.byPlanet))
}
export function selectBasesOnPlanet(planet: string) {
  return useAppSelector(state => state.bases.byPlanet[planet])
}
export function selectBase(id: string) {
  return useAppSelector(state => state.bases.byId[id])
}
export function selectBaseExperts(id: string) {
  return useAppSelector(state => state.bases.byId[id].experts)
}