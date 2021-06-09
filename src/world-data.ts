const version = 1;
const STORAGE_KEY_PREFIX = `__FIO_v${version}_`;

export const worldData = {
  planets: [] as Planet[],
  materials: [] as Material[],
  buildings: [] as Building[],
}

const urls: Record<keyof typeof worldData, string> = {
  planets: "/planet/allplanets/full",
  materials: "/material/allmaterials",
  buildings: "/building/allbuildings",
}

export async function loadWorldData() {
  await Promise.all(Object.entries(urls).map(([key, url]) => ensureData(key as keyof typeof worldData, url)))
}

async function ensureData<K extends keyof typeof worldData>(name: K, url: string): Promise<void> {
  let data = loadState<typeof worldData[K]>(name)
  if (!data) {
    data = await loadData<typeof worldData[K]>(url)
    saveState(name, data)
  }
  worldData[name] = data
}

export interface ShortPlanet {
  PlanetNaturalId: string;
  PlanetName: string;
}
export interface Material {
  CategoryName:      string;
  CategoryId:        string;
  Name:              string;
  MatId:             string;
  Ticker:            string;
  Weight:            number;
  Volume:            number;
  UserNameSubmitted: string;
  Timestamp:         string;
}

export interface Building {
  BuildingCosts:     MaterialAmount[];
  Recipes:           Recipe[];
  Name:              string;
  Ticker:            string;
  Expertise:         string;//BuildingCategory? empty?
  Pioneers:          number;
  Settlers:          number;
  Technicians:       number;
  Engineers:         number;
  Scientists:        number;
  AreaCost:          number;
  UserNameSubmitted: string;
  Timestamp:         string;
}

export interface MaterialAmount {
  CommodityName:   string;
  CommodityTicker: string;
  Weight:          number;
  Volume:          number;
  Amount:          number;
}

export interface Recipe {
  Inputs:     MaterialAmount[];
  Outputs:    MaterialAmount[];
  DurationMs: number;
  RecipeName: string;
}

export type ResourceType = "GASEOUS" | "LIQUID" | "MINERAL"
export interface Resource {
  MaterialId:   string;
  ResourceType: ResourceType;
  Factor:       number;
}
export interface Planet {
  Resources:               Resource[];
  BuildRequirements:       BuildRequirement[];
  ProductionFees:          ProductionFee[];
  COGCPrograms:            any[];
  COGCVotes:               any[];
  COGCUpkeep:              any[];
  PlanetId:                string;
  PlanetNaturalId:         string;
  PlanetName:              string;
  Namer:                   string | null;
  NamingDataEpochMs:       number;
  Nameable:                boolean;
  SystemId:                string;
  Gravity:                 number;
  MagneticField:           number;
  Mass:                    number;
  MassEarth:               number;
  OrbitSemiMajorAxis:      number;
  OrbitEccentricity:       number;
  OrbitInclination:        number;
  OrbitRightAscension:     number;
  OrbitPeriapsis:          number;
  OrbitIndex:              number;
  Pressure:                number;
  Radiation:               number;
  Radius:                  number;
  Sunlight:                number;
  Surface:                 boolean;
  Temperature:             number;
  Fertility:               number;
  HasLocalMarket:          boolean;
  HasChamberOfCommerce:    boolean;
  HasWarehouse:            boolean;
  HasAdministrationCenter: boolean;
  HasShipyard:             boolean;
  FactionCode:             string | null;
  FactionName:             string | null;
  GovernorId:              null;
  GovernorUserName:        null;
  GovernorCorporationId:   string | null;
  GovernorCorporationName: string | null;
  GovernorCorporationCode: string | null;
  CurrencyName:            string | null;
  CurrencyCode:            string | null;
  CollectorId:             string | null;
  CollectorName:           string | null;
  CollectorCode:           string | null;
  BaseLocalMarketFee:      number;
  LocalMarketFeeFactor:    number;
  WarehouseFee:            number;
  PopulationId:            string;
  COGCProgramStatus:       null;
  PlanetTier:              number;
  UserNameSubmitted:       string;
  Timestamp:               string;
}

export interface BuildRequirement {
  MaterialName:     string;
  MaterialId:       string;
  MaterialTicker:   string;
  MaterialCategory: string;
  MaterialAmount:   number;
  MaterialWeight:   number;
  MaterialVolume:   number;
}

export interface ProductionFee {
  Category:    BuildingCategory;
  FeeAmount:   number;
  FeeCurrency: CurrencyCode;
}
export type CurrencyCode = "AIC" | "CIS" | "ICA" | "NCC"

export type BuildingCategory = "AGRICULTURE" | "CHEMISTRY" | "CONSTRUCTION" | "ELECTRONICS" | "FOOD_INDUSTRIES" | "FUEL_REFINING" | "MANUFACTURING" | "METALLURGY" | "RESOURCE_EXTRACTION"


async function loadData<T>(url: string): Promise<T> {
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
