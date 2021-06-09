import {
  FioBuilding, FioCommodityAmount, FactionCode,
  FioMaterial, FioPlanet, ResourceType, BuildingCategory,
  FioSystemStar, FioWorldSector, StarType
} from "./features/fio/fio-types";

export const worldData = {
  materials: [] as Material[],
  materialCategories: [] as string[],
  buildings: [] as Building[],
  planets: [] as Planet[],
}

export async function loadWorldData() {
  await openDb();
  ([worldData.materials, worldData.buildings, worldData.planets] = await Promise.all([
    getAll<Material>("materials"),
    getAll<Building>("buildings"),
    getAll<Planet>("planets"),
  ]));
  worldData.materialCategories = [...new Set(worldData.materials.map(mat => mat.category))].sort()
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

export interface Building {
  id: string;
  name: string;
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
export interface Planet {
  id: string;
  name: string;
  // systemId: string;
  resources: {
    material: string;
    perDay: number;
    type: ResourceType,
  }[];
  cmCosts: Commodities;
  orbitData: PlanetOrbitData;
  surfaceData: PlanetSurfaceData;
  factionCode?: FactionCode;
  tier: number;
}

export interface Star {
  connections: string[];
  id: string;
  name: string;
  position: Position;
  sector: string;
  subSector: string;
  system: string;
  type: StarType;
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
        db.createObjectStore("stars", { keyPath: "id" })
        db.createObjectStore("sectors", { keyPath: "id" })
      }
      needsInitializing = true
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = reject
  })
  if (needsInitializing) {
    console.log("initializing world data")

    const materialsFio = await loadData<FioMaterial[]>("/material/allmaterials")
    // const matIdToTicker: Record<string, string> = materialsFio.reduce((acc, mat) => ({ ...acc, [mat.MatId]: mat.Ticker }), {})
    const materials: Material[] = materialsFio.map(mat => ({
      id: mat.Ticker,
      name: mat.Name,
      category: mat.CategoryName,
      weight: mat.Weight,
      volume: mat.Volume,
    }))
    await putAll("materials", materials)

    const buildingsFio = await loadData<FioBuilding[]>("/building/allbuildings")
    const mapCA = (amounts: FioCommodityAmount[]) => amounts.reduce((acc, ca) => ({ ...acc, [ca.CommodityTicker]: ca.Amount }), {})
    const buildings: Building[] = buildingsFio.map(bui => ({
      id: bui.Ticker,
      name: bui.Name,
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
    const productionBuildings = buildings.filter(bui => bui.recipes.length)
    await putAll("buildings", productionBuildings)

    const planetsFio = await loadData<FioPlanet[]>("/planet/allplanets/full")
    // const planetIdtoId: Record<string, string> = planetsFio.reduce((acc, planet) => ({ ...acc, [planet.PlanetId]: planet.PlanetNaturalId }), {})
    const planets: Planet[] = planetsFio.map(planet => ({
      id: planet.PlanetNaturalId,
      name: planet.PlanetName,
      resources: planet.Resources.map<Planet['resources'][0]>(r => ({
        material: r.MaterialId,
        perDay: r.Factor * (r.ResourceType == "GASEOUS" ? 0.7 : 0.6),
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
      tier: planet.PlanetTier,
    }))
    await putAll("planets", planets)

    const starsFio = await loadData<FioSystemStar[]>("/systemstars")
    const stars: Star[] = starsFio.map(star => ({
      id: star.NaturalId,
      system: star.SystemId,
      name: star.Name,
      type: star.Type,
      position: [star.PositionX, star.PositionY, star.PositionZ],
      sector: star.SectorId,
      subSector: star.SubSectorId,
      connections: star.Connections.map(c => c.Connection)
    }))
    await putAll("stars", stars)

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

async function getAll<T>(storeName: string) {
  return new Promise<T[]>(resolve => {
    const transaction = db.transaction(storeName);
    const store = transaction.objectStore(storeName)
    const request = store.getAll()
    request.onsuccess = () => {
      resolve(request.result)
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

async function loadData<T = any>(url: string): Promise<T> {
  const response = await fetch("https://rest.fnar.net" + url, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  return await response.json()
}
