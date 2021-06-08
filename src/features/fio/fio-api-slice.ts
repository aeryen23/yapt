import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Planet {
  Resources: Resource[];
  BuildRequirements: BuildRequirement[];
  ProductionFees: ProductionFee[];
  COGCPrograms: any[];
  COGCVotes: any[];
  COGCUpkeep: any[];
  PlanetId: string;
  PlanetNaturalId: string;
  PlanetName: string;
  Namer: null;
  NamingDataEpochMs: number;
  Nameable: boolean;
  SystemId: string;
  Gravity: number;
  MagneticField: number;
  Mass: number;
  MassEarth: number;
  OrbitSemiMajorAxis: number;
  OrbitEccentricity: number;
  OrbitInclination: number;
  OrbitRightAscension: number;
  OrbitPeriapsis: number;
  OrbitIndex: number;
  Pressure: number;
  Radiation: number;
  Radius: number;
  Sunlight: number;
  Surface: boolean;
  Temperature: number;
  Fertility: number;
  HasLocalMarket: boolean;
  HasChamberOfCommerce: boolean;
  HasWarehouse: boolean;
  HasAdministrationCenter: boolean;
  HasShipyard: boolean;
  FactionCode: string;
  FactionName: string;
  GovernorId: string;
  GovernorUserName: string;
  GovernorCorporationId: string;
  GovernorCorporationName: string;
  GovernorCorporationCode: string;
  CurrencyName: string;
  CurrencyCode: string;
  CollectorId: string;
  CollectorName: string;
  CollectorCode: string;
  BaseLocalMarketFee: number;
  LocalMarketFeeFactor: number;
  WarehouseFee: number;
  PopulationId: string;
  COGCProgramStatus: null;
  PlanetTier: number;
  UserNameSubmitted: string;
  Timestamp: string;
}

export interface BuildRequirement {
  MaterialName: string;
  MaterialId: string;
  MaterialTicker: string;
  MaterialCategory: string;
  MaterialAmount: number;
  MaterialWeight: number;
  MaterialVolume: number;
}

export interface ProductionFee {
  Category: string;
  FeeAmount: number;
  FeeCurrency: string;
}

export interface Resource {
  MaterialId: string;
  ResourceType: string;
  Factor: number;
}

export interface ShortPlanet {
  PlanetNaturalId: string;
  PlanetName: string;
}


export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: "https://rest.fnar.net" }),
  endpoints: (builder) => ({
    fetchPlanets: builder.query<ShortPlanet[], void>({
      query() {
        return `/planet/allplanets`
      }
    }),
    fetchPlanet: builder.query<Resource[], string>({
      query(name) {
        return `/planet/${name}`
      },
      transformResponse(response: Planet) {
        return response.Resources
      },
      keepUnusedDataFor: 60 * 60 * 24 * 7, // 1 week
    })
  }),
})

export const { useFetchPlanetQuery } = apiSlice
