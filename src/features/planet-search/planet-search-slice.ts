import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useAppSelector } from "../../app/hooks"

const defaultBuildingMaterialsFilter = ["MCG", "AEF", "SEA"].sort()
const allBuildingMaterialsFilter = ["MCG", "AEF", "SEA", "HSE", "INS", "TSH", "MGC", "BL"].sort()

const PlanetSearchSlice = createSlice({
  name: "planetSearch",
  initialState: {
    startSystem: "OT-580",
    maxJumps: 10 as number | undefined,
    materialFilter: [] as string[],
    materialFilterAnd: false,
    buildingMaterialFilter: [...defaultBuildingMaterialsFilter],
    minimumExtractionRatePercentage: undefined as number | undefined,
  },
  reducers: {
    setStartSystem(state, action: PayloadAction<string>) {
      state.startSystem = action.payload
    },
    toggleMaterialFilter(state, action: PayloadAction<string>) {
      const idx = state.materialFilter.indexOf(action.payload)
      if (idx == -1)
        state.materialFilter.push(action.payload)
      else
        state.materialFilter.splice(idx, 1)
    },
    clearMaterialFilter(state) {
      if (state.materialFilter.length)
        state.materialFilter = []
    },
    setMaterialFilterAnd(state, action: PayloadAction<boolean>) {
      state.materialFilterAnd = action.payload
    },
    toggleBuildingMaterialFilter(state, action: PayloadAction<string>) {
      const idx = state.buildingMaterialFilter.indexOf(action.payload)
      if (idx == -1) {
        state.buildingMaterialFilter.push(action.payload)
        state.buildingMaterialFilter.sort()
      }
      else
        state.buildingMaterialFilter.splice(idx, 1)
    },
    resetBuildingMaterialFilter(state, action: PayloadAction<boolean>) {
      const target = action.payload ? allBuildingMaterialsFilter : defaultBuildingMaterialsFilter
      if (!(state.buildingMaterialFilter.length === target.length && state.buildingMaterialFilter.every((value, index) => value === target[index])))
        state.buildingMaterialFilter = [...target]
    },
    setMaxJumps(state, action: PayloadAction<number | undefined>) {
      let jumps = action.payload
      if (jumps !== undefined) {
        if (jumps < 0)
          jumps = 0
        else if (jumps > 100)
          jumps = 100
      }
      state.maxJumps = jumps
    },
    setMinimumExtractionRatePercentage(state, action: PayloadAction<number | undefined>) {
      state.minimumExtractionRatePercentage = action.payload ? Math.min(100, Math.max(0, action.payload)) : undefined
    },
  }
})

export const {
  setStartSystem, setMaxJumps, setMinimumExtractionRatePercentage,
  toggleMaterialFilter, clearMaterialFilter, setMaterialFilterAnd,
  toggleBuildingMaterialFilter, resetBuildingMaterialFilter,
} = PlanetSearchSlice.actions
export default PlanetSearchSlice.reducer

export function selectStartSystem() {
  return useAppSelector(state => state.settings.planetSearch.startSystem)
}
export function selectMaxJumps() {
  return useAppSelector(state => state.settings.planetSearch.maxJumps)
}
export function selectMaterialFilter() {
  return useAppSelector(state => state.settings.planetSearch.materialFilter)
}
export function selectMaterialFilterAnd() {
  return useAppSelector(state => state.settings.planetSearch.materialFilterAnd)
}
export function selectBuildingMaterialFilter() {
  return useAppSelector(state => state.settings.planetSearch.buildingMaterialFilter)
}
export function selectMinimumExtractionRatePercentage() {
  return useAppSelector(state => state.settings.planetSearch.minimumExtractionRatePercentage)
}
