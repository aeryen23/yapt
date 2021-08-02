export interface FioMaterial {
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

export interface FioBuilding {
  BuildingCosts:     FioCommodityAmount[];
  Recipes:           FioRecipe[];
  Name:              string;
  Ticker:            string;
  Expertise:         BuildingCategory | null;
  Pioneers:          number;
  Settlers:          number;
  Technicians:       number;
  Engineers:         number;
  Scientists:        number;
  AreaCost:          number;
  UserNameSubmitted: string;
  Timestamp:         string;
}

export interface FioCommodityAmount {
  CommodityName:   string;
  CommodityTicker: string;
  Weight:          number;
  Volume:          number;
  Amount:          number;
}

export interface FioRecipe {
  Inputs:     FioCommodityAmount[];
  Outputs:    FioCommodityAmount[];
  DurationMs: number;
  RecipeName: string;
}

export interface FioShortPlanet {
  PlanetNaturalId: string;
  PlanetName: string;
}
export type ResourceType = "GASEOUS" | "LIQUID" | "MINERAL"
export interface FioResource {
  MaterialId:   string;
  ResourceType: ResourceType;
  Factor:       number;
}
export interface FioPlanet {
  Resources:               FioResource[];
  BuildRequirements:       FioBuildRequirement[];
  ProductionFees:          ProductionFee[];
  COGCPrograms:            FioCOGCProgram[];
  COGCVotes:               FioCOGCVote[];
  COGCUpkeep:              any[]; // Seems this is always empty?
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
  GovernorId:              string | null;
  GovernorUserName:        string | null;
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
  COGCProgramStatus:       string | null;
  PlanetTier:              number;
  UserNameSubmitted:       string;
  Timestamp:               string;
}
export interface FioCOGCProgram {
  ProgramType:  FioCOGCProgramType;
  StartEpochMs: number;
  EndEpochMs:   number;
}

export enum FioCOGCProgramType {
  AdvertisingConstruction = "ADVERTISING_CONSTRUCTION",
  AdvertisingFuelRefining = "ADVERTISING_FUEL_REFINING",
  WorkforcePioneers = "WORKFORCE_PIONEERS",
  WorkforceSettlers = "WORKFORCE_SETTLERS",
  // TODO: there are more
}

export interface FioCOGCVote {
  CompanyName:     string;
  CompanyCode:     string;
  Influence:       number;
  VoteType:        FioCOGCProgramType;
  VoteTimeEpochMs: number;
}

export interface FioBuildRequirement {
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


export interface FioSystemStar {
  Connections:       { Connection: string; }[];
  SystemId:          string;
  Name:              string;
  NaturalId:         string;
  Type:              StarType;
  PositionX:         number;
  PositionY:         number;
  PositionZ:         number;
  SectorId:          string;
  SubSectorId:       string;
  UserNameSubmitted: string | null;
  Timestamp:         string;
}
export type StarType = "A" | "B" | "F" | "G" | "K" | "M" | "O"

export interface FioWorldSector {
  SubSectors:        FioSubSector[];
  SectorId:          string;
  Name:              string;
  HexQ:              number;
  HexR:              number;
  HexS:              number;
  Size:              number;
  UserNameSubmitted: string | null;
  Timestamp:         string;
}

export interface FioSubSector {
  Vertices: FioSubSectorVertex[];
  SSId:     string;
}

export interface FioSubSectorVertex {
  X: number;
  Y: number;
  Z: number;
}
