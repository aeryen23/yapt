import {
  FioBuilding, FioCommodityAmount, FactionCode,
  FioMaterial, FioPlanet, ResourceType, BuildingCategory,
  FioSystemStar, FioWorldSector, StarType, FioShortPlanet
} from "../features/fio/fio-types";

export function getPlanetMaterials(planet: Planet, area = 1) {
  // https://handbook.apex.prosperousuniverse.com/wiki/building-costs/
  const result: Record<string, number> = {}

  if (planet.environment.surface)
    result.MCG = area * 4
  else
    result.AEF = Math.trunc((area + 2) / 3)

  if (planet.environment.pressure < 0.25)
    result.SEA = area
  if (planet.environment.pressure > 2)
    result.HSE = 1

  if (planet.environment.gravity < 0.25)
    result.MGC = 1
  if (planet.environment.gravity > 2)
    result.BL = 1

  if (planet.environment.temperature < 0.25)
    result.INS = area * 10
  if (planet.environment.temperature > 2)
    result.TSH = 1

  return result
}

type Map<T> = Record<string, T>

const worldData = {
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
}

/// ------

function add(container: Record<string, string[]>, key: string, value: string) {
  if (!container[key])
    container[key] = []
  container[key].push(value)
}
type ShortPlanet = {
  id: string
  name: string
}

// TODO: split loading, type defs etc
async function loadWorldData() {

  let allBuildingIds = Object.keys(worldData.buildings)
  for (const type of Object.keys(BuildingType) as BuildingType[])
    worldData.buildingCategories[type] = allBuildingIds.filter(id => worldData.buildings[id].type == type)

  let productionBuildingIds = worldData.buildingCategories[BuildingType.PRODUCTION]
  for (const wf of ["Scientists", "Engineers", "Technicians", "Settlers", "Pioneers"] as (keyof Building["workforce"])[]) {
    worldData.buildingsProduction[wf] = productionBuildingIds.filter(id => worldData.buildings[id].workforce[wf] > 0)
    productionBuildingIds = productionBuildingIds.filter(id => worldData.buildings[id].workforce[wf] == 0)
  }

  for (const bui of worldData.buildingCategories[BuildingType.PRODUCTION]) {
    const building = worldData.buildings[bui]
    for (const recipe of building.recipes) {
      for (const output of Object.keys(recipe.outputs)) {
        add(worldData.material.producedIn, output, bui)
        for (const input of Object.keys(recipe.inputs))
          add(worldData.material.usedIn, input, output)
      }
    }
  }

  worldData.planetMaxResources = {}
  for (const planet of Object.values(worldData.planets))
    for (const { material, perDay } of planet.resources) {
      if (!worldData.planetMaxResources[material])
        worldData.planetMaxResources[material] = perDay
      else
        worldData.planetMaxResources[material] = Math.max(worldData.planetMaxResources[material], perDay)
    }
}

export interface Material {
  id: string;
  internalId: string;
  name: string;
  category: string;
  weight: number;
  volume: number;
}

export type Commodities = Record<string, number>

export interface Recipe {
  inputs: Commodities;
  outputs: Commodities;
  durationMs: number;
}

// export type BuildingType = "CORE" | "STORAGE" | "HABITATION" | "RESOURCES" | "PRODUCTION" | "PLANETARY_PROJECT"
export enum BuildingType {
  CORE = "CORE",
  STORAGE = "STORAGE",
  HABITATION = "HABITATION",
  RESOURCES = "RESOURCES",
  PRODUCTION = "PRODUCTION",
  PLANETARY_PROJECT = "PLANETARY_PROJECT",
  CORPORATION_PROJECT = "CORPORATION_PROJECT",
}
export type WorkforceLevel = "Pioneers" | "Settlers" | "Technicians" | "Engineers" | "Scientists"

type Workforce = { type: WorkforceLevel, amount: number }[] // sorted by increasing WorkforceLevel

export interface Building {
  id: string;
  name: string;
  type: BuildingType,
  workforceLevel: WorkforceLevel,
  costs: Commodities;
  recipes: Recipe[];// TODO: recipe ids instead
  expertise?: BuildingCategory;
  workforce: {
    Pioneers: number;
    Settlers: number;
    Technicians: number;
    Engineers: number;
    Scientists: number;
  }
  area: number;
}

export interface PlanetOrbitData {
  gravity: number;
  magneticField: number;
  mass: number;
  massEarth: number;
  orbitSemiMajorAxis: number;
  orbitEccentricity: number;
  orbitInclination: number;
  orbitRightAscension: number;
  orbitPeriapsis: number;
  orbitIndex: number;
}
export interface PlanetSurfaceData {
  pressure: number;
  radiation: number;
  radius: number;
  sunlight: number;
  surface: boolean;
  temperature: number;
  fertility: number;
}
export interface PlanetResource {
  material: string;
  perDay: number;
  type: ResourceType,
}
export interface PlanetEnvironment {
  surface: boolean;
  fertility: number;
  temperature: number;
  gravity: number;
  pressure: number;
}
export interface Planet {
  id: string;
  internalId: string;
  name: string;
  system: string;
  resources: PlanetResource[];
  environment: PlanetEnvironment;
  // cmCosts: Commodities;
  // orbitData: PlanetOrbitData;
  // surfaceData: PlanetSurfaceData;
  // factionCode?: FactionCode;
}

export interface System {
  id: string;
  internalId: string;
  name: string;
  // position: Position;
  // sector: string;
  // subSector: string;
  // type: StarType;
  connections: string[];
}

export interface Sector {
  id: string;
  name: string;
  position: Position;
  subSectors: {
    id: string;
    vertices: Position[];
  }[];
}
export type Position = number[] // 3 numbers
