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
  FactionCode:             FactionCode | null;
  FactionName:             string | null;
  GovernorId:              null;
  GovernorUserName:        null;
  GovernorCorporationId:   string | null;
  GovernorCorporationName: string | null;
  GovernorCorporationCode: FactionCode | null;
  CurrencyName:            CurrencyName | null;
  CurrencyCode:            string | null;
  CollectorId:             string | null;
  CollectorName:           string | null;
  CollectorCode:           FactionCode | null;
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

export type FactionCode = "AI" | "CI" | "IC" | "NC"
export enum FactionName {
  AntaresInitiative = "Antares Initiative",
  CastilloItoMercantile = "Castillo-Ito Mercantile",
  InsitorCooperative = "Insitor Cooperative",
  NEOCharterExploration = "NEO Charter Exploration",
}

export enum CurrencyName {
  Austral = "Austral",
  MartianCoin = "Martian Coin",
  NCECoupons = "NCE Coupons",
  Sol = "Sol",
}

export interface ProductionFee {
  Category:    BuildingCategory;
  FeeAmount:   number;
  FeeCurrency: CurrencyCode;
}
export type CurrencyCode = "AIC" | "CIS" | "ICA" | "NCC"

export type BuildingCategory = "AGRICULTURE" | "CHEMISTRY" | "CONSTRUCTION" | "ELECTRONICS" | "FOOD_INDUSTRIES" | "FUEL_REFINING" | "MANUFACTURING" | "METALLURGY" | "RESOURCE_EXTRACTION"
