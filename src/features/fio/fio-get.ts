
import { store } from "../../app/store";
import { FioBuilding, FioCommodityAmount, FioMaterial, FioPlanet, FioSystemStar, FioWorldSector } from "./fio-types";
import { Building, BuildingType, Material, Planet, Recipe, System, WorkforceLevel } from "../../world-data/world-data";
import { IdMap, setBuildings, setFetchState, setMaterials, setPlanets, setSystems } from "../../world-data/world-data-slice";

type StoreDescriptor<FioType, AppType> = {
  name: string,
  id: string,
  path: string,
  transform: (a: FioType[], dependencies: IdMap<string>[]) => AppType[],
  set: (a: AppType[]) => void,
  internalIdMapping?: { internalId: string, id: string }
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

const materialsDesc: StoreDescriptor<FioMaterial, Material> = {
  name: "materials", id: "id", path: "/material/allmaterials",
  transform: transformAll(entry => ({
    id: entry.Ticker,
    name: entry.Name,
    category: entry.CategoryName,
    weight: entry.Weight,
    volume: entry.Volume,
  })),
  set: entries => store.dispatch(setMaterials(entries)),
  internalIdMapping: { internalId: "MatId", id: "Ticker" },
}
const buildingsDesc: StoreDescriptor<FioBuilding, Building> = {
  name: "buildings", id: "id", path: "/building/allbuildings",
  transform: transformAll(entry => ({
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
  })),
  set: entries => store.dispatch(setBuildings(entries)),
}
const systemsDesc: StoreDescriptor<FioSystemStar, System> = {
  name: "systems", id: "id", path: "/systemstars",
  transform: entries => {
    const systemIdtoId: Record<string, string> = entries.reduce((acc, system) => ({ ...acc, [system.SystemId]: system.NaturalId }), {})
    return entries.map(entry => ({
      id: entry.NaturalId,
      name: entry.Name,
      type: entry.Type,
      connections: entry.Connections.map(c => systemIdtoId[c.Connection]),
      // position: [entry.PositionX, entry.PositionY, entry.PositionZ],
      // sector: entry.SectorId,
      // subSector: entry.SubSectorId,
      // planets: planets.filter(p => p.system == entry.NaturalId).map(p => p.id),
    }))
  },
  set: entries => store.dispatch(setSystems(entries)),
  internalIdMapping: { internalId: "SystemId", id: "NaturalId" },
}
const planetsDesc: StoreDescriptor<FioPlanet, Planet> = {
  name: "planets", id: "id", path: "/planet/allplanets/full",
  transform: (entries, dependencies) => {
    const [systemIdtoId, materialIdtoId] = dependencies
    return entries.map(entry => ({
      id: entry.PlanetNaturalId,
      name: entry.PlanetName,
      system: systemIdtoId[entry.SystemId],
      resources: entry.Resources.map<Planet['resources'][0]>(r => ({
        material: materialIdtoId[r.MaterialId],
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
    }))
  },
  set: entries => store.dispatch(setPlanets(entries)),
  internalIdMapping: { internalId: "PlanetId", id: "PlanetNaturalId" },
}
const idbStores = {
  materials: materialsDesc,
  buildings: buildingsDesc,
  systems: systemsDesc,
  planets: planetsDesc,
}
function transformAll<FioType, AppType>(transform: (fioData: FioType) => AppType) {
  return (fioData: FioType[]) => fioData.map<AppType>(entry => transform(entry))
}

export async function initDb() {
  const db = await Idb.open()
  const fetchInfo = await db.getAll<FetchInfo>(FETCHES_STORE)
  store.dispatch(setFetchState(fetchInfo.map(info => ({ id: info.id, timestamp: info.timestamp.toUTCString() }))))
  Object.values(idbStores).map(desc => desc.name) // instead of desc.name use Object.keys()?

  const materials = loadInitial(db, materialsDesc)
  const buildings = loadInitial(db, buildingsDesc)
  const systems = loadInitial(db, systemsDesc)
  const planets = loadInitial(db, planetsDesc, [systems, materials])
  await Promise.all([
    materials,
    buildings,
    systems,
    planets,
  ])
}

export async function syncData() {
  const db = await Idb.open()
  const materials = load(db, materialsDesc)
  const buildings = load(db, buildingsDesc)
  const systems = load(db, systemsDesc)
  const planets = load(db, planetsDesc, [systems, materials])
  await Promise.all([
    materials,
    buildings,
    systems,
    planets,
  ])
}

async function loadInitial<FioType, AppType>(db: Idb, desc: StoreDescriptor<FioType, AppType>, dependencies: Promise<IdMap<string> | undefined>[] = []) {
  if (await db.getFetchInfo(desc.name)) {
    desc.set(await db.getAll<AppType>(desc.name))
    if (desc.internalIdMapping)
      return await db.getIdMap(desc.name)
  }
  else
    return await load(db, desc, dependencies)
  return undefined
}
async function load<FioType extends Record<string, any>, AppType>(db: Idb, desc: StoreDescriptor<FioType, AppType>, dependencies: Promise<IdMap<string> | undefined>[] = []) {
  const fioData = await fetchFioData<FioType[]>(desc.path)
  let idMapping: IdMap<string> | undefined
  if (desc.internalIdMapping) {
    const im = desc.internalIdMapping
    idMapping = fioData.reduce((acc, entry) => ({ ...acc, [entry[im.internalId]]: entry[im.id] }), {} as IdMap<string>)
    await db.putIdMap(desc.name, idMapping)
  }
  const data = desc.transform(fioData, (await Promise.all(dependencies)).map<IdMap<string>>(e => e ?? {}))
  await db.putAll(desc.name, data)
  const timestamp = await db.putFetchInfo(desc.name)
  desc.set(data)
  store.dispatch(setFetchState([{ id: desc.name, timestamp: timestamp.toUTCString() }]))
  return idMapping
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

// TODO: maybe combine fetches & idMaps because there should be always the same number of entries (apart from not needing the map)
const FETCHES_STORE = "fetches"
const ID_MAP_STORE = "idMaps"

class Idb {
  static async open() {
    return new Idb(await new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open("worldData", 1)
      request.onupgradeneeded = (e) => {
        const db = request.result;
        if (e.oldVersion < 1) {
          db.createObjectStore(FETCHES_STORE, { keyPath: "id" })
          db.createObjectStore(ID_MAP_STORE)
          for (const { name, id } of Object.values(idbStores))
            db.createObjectStore(name, { keyPath: id })
        }
      }
      request.onsuccess = () => resolve(request.result)
      request.onerror = reject
    }))
  }

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
    const timestamp = new Date()
    await this.put<FetchInfo>(FETCHES_STORE, { id, timestamp })
    return timestamp
  }

  async getIdMap(key: string) {
    return await this.get<IdMap<string>>(ID_MAP_STORE, key)
  }
  async putIdMap(key: string, object: IdMap<string>) {
    await this.put(ID_MAP_STORE, object, key)
  }
}
