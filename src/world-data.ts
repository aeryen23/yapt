import { Building, BuildRequirement, CurrencyCode, CurrencyName, FactionCode, Material, Planet, Resource } from "./features/fio/fio-types";

const version = 1;
const STORAGE_KEY_PREFIX = `__FIO_v${version}_`;

export const worldData = {
  planets: [] as ShortPlanet[],
  materials: [] as Material[],
  buildings: [] as Building[],
}

const urls: Record<keyof typeof worldData, string> = {
  planets: "/planet/allplanets/full",
  materials: "/material/allmaterials",
  buildings: "/building/allbuildings",
  // systemstars: "/systemstars",
}

const modifiers: { [K in keyof typeof worldData]?: (data: any[]) => typeof worldData[K] } = {
  planets: data => {
    const converted = data.map((planet: Planet) => ({
    resources: planet.Resources,
    buildRequirements: planet.BuildRequirements,
    id: planet.PlanetId,
    naturalId: planet.PlanetNaturalId,
    name: planet.PlanetName,
    systemId: planet.SystemId,
    orbitData: {
      gravity:             planet.Gravity,
      magneticField:       planet.MagneticField,
      mass:                planet.Mass,
      massEarth:           planet.MassEarth,
      orbitSemiMajorAxis:  planet.OrbitSemiMajorAxis,
      orbitEccentricity:   planet.OrbitEccentricity,
      orbitInclination:    planet.OrbitInclination,
      orbitRightAscension: planet.OrbitRightAscension,
      orbitPeriapsis:      planet.OrbitPeriapsis,
      orbitIndex:          planet.OrbitIndex,
    },
    surfaceData: {
      pressure:            planet.Pressure,
      radiation:           planet.Radiation,
      radius:              planet.Radius,
      sunlight:            planet.Sunlight,
      surface:             planet.Surface,
      temperature:         planet.Temperature,
      fertility:           planet.Fertility,
    },
    tier: planet.PlanetTier,
    factionCode: planet.FactionCode,
  } as ShortPlanet))
  console.log("planets", data.length, JSON.stringify(converted).length)
  return converted
},
}

export async function loadWorldData() {
  await Promise.all(Object.entries(urls).map(([key, url]) => ensureData(key as keyof typeof worldData, url)))
}

async function ensureData<K extends keyof typeof worldData>(name: K, url: string): Promise<void> {
  let data = loadState<typeof worldData[K]>(name)
  if (!data) {
    const serverData = await loadData(url)
    const modifier = modifiers[name]
    data = (modifier ? modifier(serverData) : serverData) as typeof worldData[K]
    saveState(name, data)
  }
  worldData[name] = data
}

export interface PlanetOrbitData {
  gravity:             number;
  magneticField:       number;
  mass:                number;
  massEarth:           number;
  orbitSemiMajorAxis:  number;
  orbitEccentricity:   number;
  orbitInclination:    number;
  orbitRightAscension: number;
  orbitPeriapsis:      number;
  orbitIndex:          number;
}
export interface PlanetSurfaceData {
  pressure:            number;
  radiation:           number;
  radius:              number;
  sunlight:            number;
  surface:             boolean;
  temperature:         number;
  fertility:           number;
}
export interface ShortPlanet {
  resources:         Resource[];
  buildRequirements: BuildRequirement[];
  id:                 string;
  naturalId:          string;
  name:               string;
  systemId:           string;
  orbitData:          PlanetOrbitData;
  surfaceData:        PlanetSurfaceData;
  factionCode?:       FactionCode;
  tier:         number;
}

async function loadData(url: string): Promise<any> {
  const response = await fetch("https://rest.fnar.net" + url, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  return await response.json()
}

function saveState<T = object>(name: string, storeState: T): boolean {
  if (!localStorage) {
    return false;
  }

  try {
    const serializedState = JSON.stringify(storeState);
    localStorage.setItem(STORAGE_KEY_PREFIX + name, serializedState);
    return true;
  } catch (error) {
    // ignore read errors
    console.error('store serialization failed', name, error);
    return false;
  }
}

function loadState<T = object>(name: string): T | undefined {
  if (!localStorage) {
    return;
  }

  try {
    const serializedState = localStorage.getItem(STORAGE_KEY_PREFIX + name);
    if (serializedState == null) {
      return;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    // ignore write errors
    console.error('store deserialization failed', name, error);
  }
}
