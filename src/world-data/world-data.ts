import {
  FioBuilding, FioCommodityAmount, FactionCode,
  FioMaterial, FioPlanet, ResourceType, BuildingCategory,
  FioSystemStar, FioWorldSector, StarType
} from "../features/fio/fio-types";

type Map<T> = Record<string, T>

export const worldData = {
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
function add(container: Record<string, string[]>, key: string, value: string) {
  if (!container[key])
    container[key] = []
  container[key].push(value)
}

// TODO: split loading, type defs etc
export async function loadWorldData() {
  await openFetchDb();
  await openDb();
  ([worldData.materials, worldData.buildings, worldData.planets, worldData.systems] = await Promise.all([
    getAll<Material>("materials"),
    getAll<Building>("buildings"),
    getAll<Planet>("planets"),
    getAll<System>("systems"),
  ]));
  worldData.materialCategories = [...new Set(Object.values(worldData.materials).map(mat => mat.category))].sort()

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

export interface Building {
  id: string;
  name: string;
  type: BuildingType,
  workforceLevel: WorkforceLevel,
  costs: Commodities;
  recipes: Recipe[];
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
export interface Planet {
  id: string;
  name: string;
  system: string;
  resources: PlanetResource[];
  cmCosts: Commodities;
  orbitData: PlanetOrbitData;
  surfaceData: PlanetSurfaceData;
  factionCode?: FactionCode;
  tier: number;
}

export interface System {
  connections: string[];
  id: string;
  name: string;
  position: Position;
  sector: string;
  subSector: string;
  type: StarType;
  planets: string[];
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

let db: IDBDatabase

const ID_MAP_STORE = "idMaps"

async function openDb() {
  let needsInitializing = false
  db = await new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open("world-data", 1)
    request.onupgradeneeded = (e) => {
      const db = request.result;
      if (e.oldVersion < 1) {
        db.createObjectStore("materials", { keyPath: "id" })
        db.createObjectStore("buildings", { keyPath: "id" })
        db.createObjectStore("planets", { keyPath: "id" })
        db.createObjectStore("systems", { keyPath: "id" })
        db.createObjectStore("sectors", { keyPath: "id" })
        db.createObjectStore(ID_MAP_STORE)
      }
      needsInitializing = true
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = reject
  })
  if (needsInitializing) {
    console.log("initializing world data")

    const materialsFio = await loadData<FioMaterial[]>("/material/allmaterials")
    const matIdToTicker: Record<string, string> = materialsFio.reduce((acc, mat) => ({ ...acc, [mat.MatId]: mat.Ticker }), {})
    const materials: Material[] = materialsFio.map(mat => ({
      id: mat.Ticker,
      name: mat.Name,
      category: mat.CategoryName,
      weight: mat.Weight,
      volume: mat.Volume,
    }))
    await putAll("materials", materials)
    await putIdMap("materials", matIdToTicker)

    const buildingsFio = await loadData<FioBuilding[]>("/building/allbuildings")
    const mapCA = (amounts: FioCommodityAmount[]) => amounts.reduce((acc, ca) => ({ ...acc, [ca.CommodityTicker]: ca.Amount }), {})
    const buildings: Building[] = buildingsFio.map(bui => ({
      id: bui.Ticker,
      name: bui.Name,
      type: BuildingType.PRODUCTION,
      workforceLevel: "Pioneers",
      costs: mapCA(bui.BuildingCosts),
      recipes: bui.Recipes.map<Recipe>(r => ({
        inputs: mapCA(r.Inputs),
        outputs: mapCA(r.Outputs),
        durationMs: r.DurationMs,
      })),
      expertise: bui.Expertise || undefined,
      workforce: {
        Pioneers: bui.Pioneers,
        Settlers: bui.Settlers,
        Technicians: bui.Technicians,
        Engineers: bui.Engineers,
        Scientists: bui.Scientists,
      },
      area: bui.AreaCost,
    }))
    for (const bui of buildings) {
      // NOTE: the type is not transfered by FIO, so we just create it our own based on some heuristics
      if (bui.id == "CM")
        bui.type = BuildingType.CORE
      else if (bui.id == "STO")
        bui.type = BuildingType.STORAGE
      else if (bui.name.startsWith("planetaryProject"))
        bui.type = BuildingType.PLANETARY_PROJECT
      else if (bui.name.startsWith("corporationProject"))
        bui.type = BuildingType.CORPORATION_PROJECT
      else if (bui.recipes.length) {
        if (bui.expertise == "RESOURCE_EXTRACTION" && bui.recipes.filter(r => Object.keys(r.inputs).length == 0).length > 0)
          bui.type = BuildingType.RESOURCES
        else {
          bui.type = BuildingType.PRODUCTION
          for (const level of ["Scientists", "Engineers", "Technicians", "Settlers", "Pioneers"] as WorkforceLevel[])
            if (bui.workforce[level] > 0) {
              bui.workforceLevel = level
              break;
            }
        }
      }
      else
        bui.type = BuildingType.HABITATION
    }
    await putAll("buildings", buildings)

    const systemsFio = await loadData<FioSystemStar[]>("/systemstars")
    const systemIdtoId: Record<string, string> = systemsFio.reduce((acc, system) => ({ ...acc, [system.SystemId]: system.NaturalId }), {})
    await putIdMap("systems", systemIdtoId)

    const planetsFio = await loadData<FioPlanet[]>("/planet/allplanets/full")
    const planetIdtoId: Record<string, string> = planetsFio.reduce((acc, planet) => ({ ...acc, [planet.PlanetId]: planet.PlanetNaturalId }), {})
    const planets: Planet[] = planetsFio.map(planet => ({
      id: planet.PlanetNaturalId,
      name: planet.PlanetName,
      system: systemIdtoId[planet.SystemId],
      resources: planet.Resources.map<Planet['resources'][0]>(r => ({
        material: matIdToTicker[r.MaterialId],
        perDay: r.Factor * (r.ResourceType == "GASEOUS" ? 60 : 70),
        type: r.ResourceType,
      })),
      cmCosts: planet.BuildRequirements.reduce((acc, r) => ({ ...acc, [r.MaterialTicker]: r.MaterialAmount }), {}),
      orbitData: {
        gravity: planet.Gravity,
        magneticField: planet.MagneticField,
        mass: planet.Mass,
        massEarth: planet.MassEarth,
        orbitSemiMajorAxis: planet.OrbitSemiMajorAxis,
        orbitEccentricity: planet.OrbitEccentricity,
        orbitInclination: planet.OrbitInclination,
        orbitRightAscension: planet.OrbitRightAscension,
        orbitPeriapsis: planet.OrbitPeriapsis,
        orbitIndex: planet.OrbitIndex,
      },
      surfaceData: {
        pressure: planet.Pressure,
        radiation: planet.Radiation,
        radius: planet.Radius,
        sunlight: planet.Sunlight,
        surface: planet.Surface,
        temperature: planet.Temperature,
        fertility: planet.Fertility,
      },
      factionCode: planet.FactionCode || undefined,
      tier: 0, //planet.PlanetTier, it is not set for some planets, so just always re-calculate it
    }))
    for (const planet of planets)
      if (planet.tier == 0) {
        planet.tier = 1
        if (planet.cmCosts["SEA"])
          planet.tier++
        if (planet.cmCosts["BL"])
          planet.tier++
        if (planet.cmCosts["MGC"])
          planet.tier++
        if (planet.cmCosts["HSE"])
          planet.tier += 2
        if (planet.cmCosts["INS"])
          planet.tier += 3
        if (planet.cmCosts["TSH"])
          planet.tier += 3
      }
    await putAll("planets", planets)
    await putIdMap("planets", planetIdtoId)

    const systems: System[] = systemsFio.map(system => ({
      id: system.NaturalId,
      name: system.Name,
      type: system.Type,
      position: [system.PositionX, system.PositionY, system.PositionZ],
      sector: system.SectorId,
      subSector: system.SubSectorId,
      connections: system.Connections.map(c => systemIdtoId[c.Connection]),
      planets: planets.filter(p => p.system == system.NaturalId).map(p => p.id),
    }))
    await putAll("systems", systems)

    const sectorsFio = await loadData<FioWorldSector[]>("/systemstars/worldsectors")
    const sectors: Sector[] = sectorsFio.map(sector => ({
      id: sector.SectorId,
      name: sector.Name,
      position: [sector.HexQ, sector.HexR, sector.HexS],
      subSectors: sector.SubSectors.map(sub => ({
        id: sub.SSId,
        vertices: sub.Vertices.map(v => [v.X, v.Y, v.Z])
      })),
    }))
    await putAll("sectors", sectors)

    console.log("finished initializing world data")
  }
}

async function getAll<T extends { id: string }>(storeName: string) {
  return new Promise<Record<string, T>>(resolve => {
    const transaction = db.transaction(storeName);
    const store = transaction.objectStore(storeName)
    const request = store.getAll()
    request.onsuccess = () => {
      const data = request.result as T[]
      const result: Record<string, T> = {}
      for (const e of data)
        result[e.id] = e
      resolve(result)
    }
  })
}

async function putAll<T>(storeName: string, objects: T[]) {
  await new Promise<void>(resolve => {
    const transaction = db.transaction(storeName, "readwrite");
    transaction.oncomplete = () => {
      resolve()
    }
    const store = transaction.objectStore(storeName)
    for (const object of objects)
      store.put(object)
  })
}

async function putIdMap(key: string, object: Record<string, string>) {
  await put(key, object, ID_MAP_STORE)
}

async function put<T = any>(key: string | undefined, object: T, storeName: string, mydb = db) {
  await new Promise<void>(resolve => {
    const transaction = mydb.transaction(storeName, "readwrite");
    transaction.oncomplete = () => {
      resolve()
    }
    const store = transaction.objectStore(storeName)
    store.put(object, key)
  })
}
async function get<T>(key: string, storeName: string, mydb = db): Promise<T | undefined> {
  return await new Promise<T>(resolve => {
    const transaction = mydb.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName)
    const request = store.get(key)
    transaction.oncomplete = () => {
      resolve(request.result)
    }
  })
}

let fetchDb: IDBDatabase
const FETCH_STORE = "fetches"

async function openFetchDb() {
  fetchDb = await new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open("fetches", 1)
    request.onupgradeneeded = (e) => {
      const db = request.result;
      if (e.oldVersion < 1) {
        db.createObjectStore(FETCH_STORE, { keyPath: "url" })
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = reject
  })
  await loadData<FioMaterial[]>("/material/allmaterials")
  await loadData<FioBuilding[]>("/building/allbuildings")
}

type FetchResult<T> = {
  url: string
  timestamp: Date
  data: T
}

async function loadData<T = any>(fioPath: string): Promise<T> {
  // TODO: enable fetch db stuff only for debugging
  const url = "https://rest.fnar.net" + fioPath
  let fetchResult = await get<FetchResult<T>>(url, FETCH_STORE, fetchDb)
  if (fetchResult)
    return fetchResult.data
  const result = await fetchData<T>(url)
  await put<FetchResult<T>>(undefined, { url, timestamp: new Date(), data: result }, FETCH_STORE, fetchDb)
  return result
}

async function fetchData<T = any>(url: string): Promise<T> {
  console.log("fetching data", url)
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  return await response.json()
}
