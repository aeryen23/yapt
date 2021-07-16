
import { store } from "../../app/store";
import { FioBuilding, FioCommodityAmount, FioMaterial, FioPlanet, FioSystemStar, FioWorldSector } from "./fio-types";
import { BuildingType, Material, Planet, Recipe, Sector, System } from "../../world-data/world-data";
import { setBuildings, setMaterials, setPlanets, setSectors, setSystems } from "../../world-data/world-data-slice";

type StoreDescriptor<F, T> = {
  name: string,
  id: string,
  path: string,
  transform: (a: F) => T,
  // set: (a: T[]) => void
}
const mapCA = (amounts: FioCommodityAmount[]) => amounts.reduce((acc, ca) => ({ ...acc, [ca.CommodityTicker]: ca.Amount }), {})

const idbStores = {
  systemstars: {
    name: "systemstars", id: "id", path: "/systemstars",
    transform: (entry: FioSystemStar) => ({
      id: entry.SystemId,
      name: entry.NaturalId,
    }),
    // const systemsFio = await loadData<FioSystemStar[]>("/systemstars")
    // const systemIdtoId: Record<string, string> = systemsFio.reduce((acc, system) => ({ ...acc, [system.SystemId]: system.NaturalId }), {})
    set: () => { }
  },
  materials: {
    name: "materials", id: "id", path: "/material/allmaterials",
    transform: (entry: FioMaterial) => ({
      id: entry.Ticker,
      name: entry.Name,
      category: entry.CategoryName,
      weight: entry.Weight,
      volume: entry.Volume,
    }) as Material, set: setMaterials
  },
  buildings: {
    name: "buildings", id: "id", path: "/building/allbuildings",
    transform: (entry: FioBuilding) => ({
      id: entry.Ticker,
      name: entry.Name,
      type: BuildingType.PRODUCTION,
      workforceLevel: "Pioneers",
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
    }), set: setBuildings
  },
  systems: {
    name: "systems", id: "id", path: "/systemstars",
    transform: (entry: FioSystemStar) => ({
      id: entry.NaturalId,
      name: entry.Name,
      type: entry.Type,
      position: [entry.PositionX, entry.PositionY, entry.PositionZ],
      sector: entry.SectorId,
      subSector: entry.SubSectorId,
      // connections: entry.Connections.map(c => systemIdtoId[c.Connection]),
      // planets: planets.filter(p => p.system == entry.NaturalId).map(p => p.id),
    }) as System, set: setSystems
  },
  planets: {
    name: "planets", id: "id", path: "/planet/allplanets/full",
    transform: (entry: FioPlanet) => ({
      id: entry.PlanetNaturalId,
      name: entry.PlanetName,
      system: "",//systemIdtoId[entry.SystemId],
      resources: entry.Resources.map<Planet['resources'][0]>(r => ({
        material: "",//matIdToTicker[r.MaterialId],
        perDay: r.Factor * (r.ResourceType == "GASEOUS" ? 60 : 70),
        type: r.ResourceType,
      })),
      cmCosts: entry.BuildRequirements.reduce((acc, r) => ({ ...acc, [r.MaterialTicker]: r.MaterialAmount }), {}),
      orbitData: {
        gravity: entry.Gravity,
        magneticField: entry.MagneticField,
        mass: entry.Mass,
        massEarth: entry.MassEarth,
        orbitSemiMajorAxis: entry.OrbitSemiMajorAxis,
        orbitEccentricity: entry.OrbitEccentricity,
        orbitInclination: entry.OrbitInclination,
        orbitRightAscension: entry.OrbitRightAscension,
        orbitPeriapsis: entry.OrbitPeriapsis,
        orbitIndex: entry.OrbitIndex,
      },
      surfaceData: {
        pressure: entry.Pressure,
        radiation: entry.Radiation,
        radius: entry.Radius,
        sunlight: entry.Sunlight,
        surface: entry.Surface,
        temperature: entry.Temperature,
        fertility: entry.Fertility,
      },
      factionCode: entry.FactionCode || undefined,
      tier: 0, //planet.PlanetTier, it is not set for some planets, so just always re-calculate it
    }) as Planet, set: setPlanets
  },
  sectors: {
    name: "sectors", id: "id", path: "/systemstars/worldsectors",
    transform: (entry: FioWorldSector) => ({
      id: entry.SectorId,
      name: entry.Name,
      position: [entry.HexQ, entry.HexR, entry.HexS],
      subSectors: entry.SubSectors.map(sub => ({
        id: sub.SSId,
        vertices: sub.Vertices.map(v => [v.X, v.Y, v.Z])
      })),
    }) as Sector, set: setSectors
  },
}

const FETCHES_STORE = "fetches"

async function openDb() {
  return await new Promise<IDBDatabase>((resolve, reject) => {
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
  })

}
export async function initDb() {
  const db = await openDb()
  await initializeStore(db, idbStores.systemstars)
  await Promise.all([
    initializeStore(db, idbStores.materials),
    initializeStore(db, idbStores.buildings),
  ])
}

type FetchInfo = {
  id: string
  timestamp: Date
}

async function initializeStore<F, T>(db: IDBDatabase, descriptor: StoreDescriptor<F, T>) {
  let info = await get<FetchInfo>(db, FETCHES_STORE, descriptor.path)
  let data: T[]
  if (!info) {
    const url = "https://rest.fnar.net" + descriptor.path
    const fioData = await fetchData<F[]>(url)
    data = fioData.map(entry => descriptor.transform(entry))
    await putAll(db, descriptor.name, data)

    info = {
      id: descriptor.path,
      timestamp: new Date()
    }
    await put(db, FETCHES_STORE, info)
  }
  else {
    data = await getAll<T>(db, descriptor.name)
  }

  // store.dispatch(descriptor.set(data))
  // TODO: start a timer to update according to info.timestamp
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

async function get<T>(db: IDBDatabase, storeName: string, key: string): Promise<T | undefined> {
  return await new Promise<T>(resolve => {
    const transaction = db.transaction(storeName, "readonly")
    const store = transaction.objectStore(storeName)
    const request = store.get(key)
    transaction.oncomplete = () => {
      resolve(request.result)
    }
  })
}
async function getAll<T>(db: IDBDatabase, storeName: string) {
  return new Promise<T[]>(resolve => {
    const transaction = db.transaction(storeName, "readonly")
    const store = transaction.objectStore(storeName)
    const request = store.getAll()
    request.onsuccess = () => {
      resolve(request.result)
    }
  })
}
async function put<T = any>(db: IDBDatabase, storeName: string, object: T, key?: string) {
  await new Promise<void>(resolve => {
    const transaction = db.transaction(storeName, "readwrite")
    transaction.oncomplete = () => {
      resolve()
    }
    const store = transaction.objectStore(storeName)
    store.put(object, key)
  })
}
async function putAll<T>(db: IDBDatabase, storeName: string, objects: T[]) {
  await new Promise<void>(resolve => {
    const transaction = db.transaction(storeName, "readwrite")
    transaction.oncomplete = () => {
      resolve()
    }
    const store = transaction.objectStore(storeName)
    for (const object of objects)
      store.put(object)
  })
}
