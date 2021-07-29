import {
  FioBuilding, FioCommodityAmount, FactionCode,
  FioMaterial, FioPlanet, ResourceType, BuildingCategory,
  FioSystemStar, FioWorldSector, StarType, FioShortPlanet
} from "../features/fio/fio-types"

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
  if (planet.environment.gravity > 2.5)
    result.BL = 1

  if (planet.environment.temperature < -25)
    result.INS = area * 10
  if (planet.environment.temperature > 75)
    result.TSH = 1

  return result
}

/// ------

export interface Material {
  id: string;
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
