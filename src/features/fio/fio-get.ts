
import { store } from "../../app/store";
import { FioBuilding, FioCommodityAmount, FioMaterial, FioPlanet, FioSystemStar, FioWorldSector } from "./fio-types";
import { Building, BuildingType, Material, Planet, Recipe, System, WorkforceLevel } from "../../world-data/world-data";
import { setBuildings, setMaterials, setPlanets, setSystems } from "../../world-data/world-data-slice";

type StoreDescriptor<FioType, AppType> = {
  name: string,
  id: string,
  path: string,
  transform: (a: FioType[]) => AppType[],
  set: (a: AppType[]) => void
}
const mapCA = (amounts: FioCommodityAmount[]) => amounts.reduce((acc, ca) => ({ ...acc, [ca.CommodityTicker]: ca.Amount }), {})

function getBuildingType(bui: FioBuilding) {
  // NOTE: the type is not transfered by FIO, so we just create it our own based on some heuristics
  if (bui.Ticker == "CM")
    return BuildingType.CORE
  if (bui.Ticker == "STO")
    return BuildingType.STORAGE
  if (bui.Name.startsWith("planetaryProject"))
    return BuildingType.PLANETARY_PROJECT
  if (bui.Name.startsWith("corporationProject"))
    return BuildingType.CORPORATION_PROJECT
  if (bui.Recipes.length) {
    if (bui.Expertise == "RESOURCE_EXTRACTION" && bui.Recipes.filter(r => r.Inputs.length == 0).length > 0)
      return BuildingType.RESOURCES
    else {
      return BuildingType.PRODUCTION
      // for (const level of ["Scientists", "Engineers", "Technicians", "Settlers", "Pioneers"] as WorkforceLevel[])
      //   if (bui.workforce[level] > 0) {
      //     bui.workforceLevel = level
      //     break;
      //   }
    }
  }
  return BuildingType.HABITATION
}

const idbStores = {
  materials: {
    name: "materials", id: "id", path: "/material/allmaterials",
    transform: transformAll((entry: FioMaterial) => ({
      id: entry.Ticker,
      name: entry.Name,
      category: entry.CategoryName,
      weight: entry.Weight,
      volume: entry.Volume,
    }) as Material),
    set: (entries: Material[]) => store.dispatch(setMaterials(entries))
  },
  buildings: {
    name: "buildings", id: "id", path: "/building/allbuildings",
    transform: transformAll((entry: FioBuilding) => ({
      id: entry.Ticker,
      name: entry.Name,
      type: getBuildingType(entry),
      workforceLevel: "Pioneers", // TODO
      costs: mapCA(entry.BuildingCosts),
      recipes: entry.Recipes.map<Recipe>(r => ({
        inputs: mapCA(r.Inputs),
        outputs: mapCA(r.Outputs),
        durationMs: r.DurationMs,
      })),
      expertise: entry.Expertise || undefined,
      workforce: {
        Pioneers: entry.Pioneers,
        Settlers: entry.Settlers,
        Technicians: entry.Technicians,
        Engineers: entry.Engineers,
        Scientists: entry.Scientists,
      },
      area: entry.AreaCost,
    }) as Building),
    set: (entries: Building[]) => store.dispatch(setBuildings(entries)),
  },
  systems: {
    name: "systems", id: "id", path: "/systemstars",
    transform: (entries: FioSystemStar[]) => {
      const systemIdtoId: Record<string, string> = entries.reduce((acc, system) => ({ ...acc, [system.SystemId]: system.NaturalId }), {})
      return entries.map(entry => ({
        id: entry.NaturalId,
        internalId: entry.SystemId,
        name: entry.Name,
        type: entry.Type,
        connections: entry.Connections.map(c => systemIdtoId[c.Connection]),
        // position: [entry.PositionX, entry.PositionY, entry.PositionZ],
        // sector: entry.SectorId,
        // subSector: entry.SubSectorId,
        // planets: planets.filter(p => p.system == entry.NaturalId).map(p => p.id),
      }) as System)
    },
    set: (entries: System[]) => store.dispatch(setSystems(entries)),

  },
  planets: {
    name: "planets", id: "id", path: "/planet/allplanets/full",
    transform: transformAll((entry: FioPlanet) => ({
      id: entry.PlanetNaturalId,
      internalId: entry.PlanetId,
      name: entry.PlanetName,
      system: entry.SystemId,
      resources: entry.Resources.map<Planet['resources'][0]>(r => ({
        material: r.MaterialId,
        perDay: r.Factor * (r.ResourceType == "GASEOUS" ? 60 : 70),
        type: r.ResourceType,
      })),
      // cmCosts: planet.BuildRequirements.reduce((acc, r) => ({ ...acc, [r.MaterialTicker]: r.MaterialAmount }), {}),
      // flightData: {
      //   magneticField: planet.MagneticField,
      //   mass: planet.Mass,
      //   massEarth: planet.MassEarth,
      //   radiation: planet.Radiation,
      // },
      // orbitData: {
      //   orbitSemiMajorAxis: planet.OrbitSemiMajorAxis,
      //   orbitEccentricity: planet.OrbitEccentricity,
      //   orbitInclination: planet.OrbitInclination,
      //   orbitRightAscension: planet.OrbitRightAscension,
      //   orbitPeriapsis: planet.OrbitPeriapsis,
      //   orbitIndex: planet.OrbitIndex,
      // },
      environment: {
        surface: entry.Surface,
        fertility: entry.Fertility,
        temperature: entry.Temperature,
        gravity: entry.Gravity,
        pressure: entry.Pressure,
        // radius: planet.Radius,
        // sunlight: planet.Sunlight,
      },
      // factionCode: planet.FactionCode || undefined,
    }) as Planet),
    set: (entries: Planet[]) => store.dispatch(setPlanets(entries)),
  },
}
function transformAll<FioType, AppType>(transform: (fioData: FioType) => AppType) {
  return (fioData: FioType[]) => fioData.map<AppType>(entry => transform(entry))
}

const FETCHES_STORE = "fetches"

async function openDb() {
  return new Idb(await new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open("worldData", 1)
    request.onupgradeneeded = (e) => {
      const db = request.result;
      if (e.oldVersion < 1) {
        db.createObjectStore(FETCHES_STORE, { keyPath: "id" })
        for (const { name, id } of Object.values(idbStores))
          db.createObjectStore(name, { keyPath: id })
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = reject
  }))
}

export async function initDb() {
  const db = await openDb()
  await Promise.all([
    loadInitial(db, idbStores.materials),
    loadInitial(db, idbStores.buildings),
    loadInitial(db, idbStores.systems),
    loadInitial(db, idbStores.planets),
  ])
}

async function loadInitial<FioType, AppType>(db: Idb, desc: StoreDescriptor<FioType, AppType>) {
  if (await db.getFetchInfo(desc.name))
    desc.set(await db.getAll<AppType>(desc.name))
  else
    await load(db, desc)
}
async function load<FioType, AppType>(db: Idb, desc: StoreDescriptor<FioType, AppType>) {
  const fioData = await fetchFioData<FioType[]>(desc.path)
  const data = desc.transform(fioData)
  await db.putAll(desc.name, data)
  await db.putFetchInfo(desc.name)
  desc.set(data)
}

async function fetchFioData<FioType = any>(url: string): Promise<FioType> {
  const response = await fetch("https://rest.fnar.net" + url, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  return await response.json()
}

type FetchInfo = {
  id: string
  timestamp: Date
}

class Idb {
  constructor(private readonly db: IDBDatabase) { }

  async get<T>(storeName: string, key: string): Promise<T | undefined> {
    return await new Promise<T>(resolve => {
      const transaction = this.db.transaction(storeName, "readonly")
      const store = transaction.objectStore(storeName)
      const request = store.get(key)
      transaction.oncomplete = () => {
        resolve(request.result)
      }
    })
  }
  async put<T = any>(storeName: string, object: T, key?: string) {
    await new Promise<void>(resolve => {
      const transaction = this.db.transaction(storeName, "readwrite")
      transaction.oncomplete = () => {
        resolve()
      }
      const store = transaction.objectStore(storeName)
      store.put(object, key)
    })
  }

  async getAll<T>(storeName: string) {
    return new Promise<T[]>(resolve => {
      const transaction = this.db.transaction(storeName, "readonly")
      const store = transaction.objectStore(storeName)
      const request = store.getAll()
      request.onsuccess = () => {
        resolve(request.result)
      }
    })
  }
  async putAll<T>(storeName: string, objects: T[]) {
    await new Promise<void>(resolve => {
      const transaction = this.db.transaction(storeName, "readwrite")
      transaction.oncomplete = () => {
        resolve()
      }
      const store = transaction.objectStore(storeName)
      for (const object of objects)
        store.put(object)
    })
  }

  async getFetchInfo(id: string) {
    return await this.get<FetchInfo>(FETCHES_STORE, id)
  }
  async putFetchInfo(id: string) {
    await this.put<FetchInfo>(FETCHES_STORE, {
      id,
      timestamp: new Date()
    })
  }
}
