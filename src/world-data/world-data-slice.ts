import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../app/hooks";
import { Map, Material, Building, Planet, System, BuildingType, Sector } from "./world-data";

const initialState = {
  materials: {} as Map<Material>,
  materialCategories: [] as string[],
  buildings: {} as Map<Building>,
  buildingsProduction: {} as Record<keyof Building["workforce"], string[]>,
  buildingCategories: {} as Record<BuildingType, string[]>,
  material: {
    usedIn: {} as Record<string, string[]>,
    producedIn: {} as Record<string, string[]>,
  },
  planets: {} as Map<Planet>,
  systems: {} as Map<System>,
  planetMaxResources: {} as Record<string, number>,
  sectors: [] as Sector[]
}

function add(container: Record<string, string[]>, key: string, value: string) {
  if (!container[key])
    container[key] = []
  container[key].push(value)
}

const WorldDataSlice = createSlice({
  name: "worldData",
  initialState,
  reducers: {
    setMaterials(state, action: PayloadAction<Material[]>) {
      for (const o of action.payload)
        state.materials[o.id] = o
      state.materialCategories = [...new Set(Object.values(state.materials).map(mat => mat.category))].sort()
    },
    setBuildings(state, action: PayloadAction<Building[]>) {
      for (const o of action.payload)
        state.buildings[o.id] = o

      let allBuildingIds = Object.keys(state.buildings)
      for (const type of Object.keys(BuildingType) as BuildingType[])
        state.buildingCategories[type] = allBuildingIds.filter(id => state.buildings[id].type == type)

      let productionBuildingIds = state.buildingCategories[BuildingType.PRODUCTION]
      for (const wf of ["Scientists", "Engineers", "Technicians", "Settlers", "Pioneers"] as (keyof Building["workforce"])[]) {
        state.buildingsProduction[wf] = productionBuildingIds.filter(id => state.buildings[id].workforce[wf] > 0)
        productionBuildingIds = productionBuildingIds.filter(id => state.buildings[id].workforce[wf] == 0)
      }

      for (const bui of state.buildingCategories[BuildingType.PRODUCTION]) {
        const building = state.buildings[bui]
        for (const recipe of building.recipes) {
          for (const output of Object.keys(recipe.outputs)) {
            add(state.material.producedIn, output, bui)
            for (const input of Object.keys(recipe.inputs))
              add(state.material.usedIn, input, output)
          }
        }
      }

    },
    setPlanets(state, action: PayloadAction<Planet[]>) {
      for (const o of action.payload)
        state.planets[o.id] = o

      state.planetMaxResources = {}
      for (const planet of Object.values(state.planets))
        for (const { material, perDay } of planet.resources) {
          if (!state.planetMaxResources[material])
            state.planetMaxResources[material] = perDay
          else
            state.planetMaxResources[material] = Math.max(state.planetMaxResources[material], perDay)
        }
    },
    setSystems(state, action: PayloadAction<System[]>) {
      for (const o of action.payload)
        state.systems[o.id] = o
    },
    setSectors(state, action: PayloadAction<Sector[]>) {
      state.sectors = action.payload
    },
  }
})

export const { setMaterials, setBuildings, setPlanets, setSystems, setSectors } = WorldDataSlice.actions
export const { reducer: worldDataSlice } = WorldDataSlice

export function selectMaterials() {
  return useAppSelector(state => state.worldData.materials)
}
export function selectBuildings() {
  return useAppSelector(state => state.worldData.buildings)
}
export function selectPlanets() {
  return useAppSelector(state => state.worldData.planets)
}
export function selectSystems() {
  return useAppSelector(state => state.worldData.systems)
}
