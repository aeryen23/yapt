import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useAppSelector } from "../app/hooks";
import { Material, Building, Planet, System, BuildingType, Sector } from "./world-data";

export type IdMap<T> = Record<string, T>
export type FetchState = {
  id: string
  timestamp: string
}

const initialState = {
  fetchState: {} as Record<string, string>,
  material: {
    data: {} as IdMap<Material>,
    byCategory: {} as IdMap<string[]>,
  },
  building: {
    data: {} as IdMap<Building>,
    byType: Object.keys(BuildingType).reduce((acc, val) => ({ ...acc, [val]: [] }), {} as Record<BuildingType, string[]>)
    // productionByWorkforce?
  },
  planet: {
    data: {} as IdMap<Planet>,
    bySystem: {} as IdMap<string[]>,
  },
  system: {
    data: {} as IdMap<System>,
    byName: {} as IdMap<string>,
  },

  // material: {
  //   usedIn: {} as Record<string, string[]>,
  //   producedIn: {} as Record<string, string[]>,
  // },
  // planetMaxResources: {} as Record<string, number>,
  // sectors: [] as Sector[]
}

const WorldDataSlice = createSlice({
  name: "worldData",
  initialState,
  reducers: {
    setFetchState(state, action: PayloadAction<FetchState[]>) {
      const obj = state.fetchState
      for (const o of action.payload)
        obj[o.id] = o.timestamp
    },
    setMaterials(state, action: PayloadAction<Material[]>) {
      const obj = state.material
      for (const o of action.payload) {
        obj.data[o.id] = o
        add(obj.byCategory, o.category, o.id)
      }
    },
    setBuildings(state, action: PayloadAction<Building[]>) {
      const obj = state.building
      for (const o of action.payload) {
        obj.data[o.id] = o
        add(obj.byType, o.type, o.id)
      }

      // for (const o of action.payload)
      //   state.buildings[o.id] = o

      // let allBuildingIds = Object.keys(state.buildings)
      // for (const type of Object.keys(BuildingType) as BuildingType[])
      //   state.buildingCategories[type] = allBuildingIds.filter(id => state.buildings[id].type == type)

      // let productionBuildingIds = state.buildingCategories[BuildingType.PRODUCTION]
      // for (const wf of ["Scientists", "Engineers", "Technicians", "Settlers", "Pioneers"] as (keyof Building["workforce"])[]) {
      //   state.buildingsProduction[wf] = productionBuildingIds.filter(id => state.buildings[id].workforce[wf] > 0)
      //   productionBuildingIds = productionBuildingIds.filter(id => state.buildings[id].workforce[wf] == 0)
      // }

      // for (const bui of state.buildingCategories[BuildingType.PRODUCTION]) {
      //   const building = state.buildings[bui]
      //   for (const recipe of building.recipes) {
      //     for (const output of Object.keys(recipe.outputs)) {
      //       add(state.material.producedIn, output, bui)
      //       for (const input of Object.keys(recipe.inputs))
      //         add(state.material.usedIn, input, output)
      //     }
      //   }
      // }

    },
    setPlanets(state, action: PayloadAction<Planet[]>) {
      const obj = state.planet
      for (const o of action.payload) {
        obj.data[o.id] = o
        add(obj.bySystem, o.system, o.id)
      }

      // state.planetMaxResources = {}
      // for (const planet of Object.values(state.planets))
      //   for (const { material, perDay } of planet.resources) {
      //     if (!state.planetMaxResources[material])
      //       state.planetMaxResources[material] = perDay
      //     else
      //       state.planetMaxResources[material] = Math.max(state.planetMaxResources[material], perDay)
      //   }
    },
    setSystems(state, action: PayloadAction<System[]>) {
      const obj = state.system
      for (const o of action.payload) {
        obj.data[o.id] = o
        obj.byName[o.name] = o.id
      }
    },
  }
})

function add(container: Record<string, string[]>, key: string, value: string) {
  if (!container[key])
    container[key] = []
  container[key].push(value)
}

export const { setFetchState, setMaterials, setBuildings, setPlanets, setSystems } = WorldDataSlice.actions
export const { reducer: worldDataSlice } = WorldDataSlice

export function selectFetchState() {
  return useAppSelector(state => Object.keys(state.worldData.fetchState).map(id => ({ id, timestamp: state.worldData.fetchState[id] } as FetchState)))
}

export function selectMaterials() {
  return useAppSelector(state => state.worldData.material.data)
}

export function selectBuildings() {
  return useAppSelector(state => state.worldData.building.data)
}
export function selectPlanets() {
  return useAppSelector(state => state.worldData.planet.data)
}
export function selectSystems() {
  return useAppSelector(state => state.worldData.system.data)
}

export function selectPlanetsPerSystem() {
  const planets = selectPlanets()
  const systems = selectSystems()
  const planetsPerSystem = useMemo(() => {
    const result: Record<string, string[]> = Object.keys(systems).reduce((acc, system) => ({ ...acc, [system]: [] }), {})
    for (const [id, planet] of Object.entries(planets))
      add(result, planet.system, id)
    return result;
  }, [planets, systems])
  return { planets, planetsPerSystem }
}
