import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks"
import { createApi, fetchBaseQuery, QueryDefinition } from "@reduxjs/toolkit/query/react"
import { FioShortPlanet } from "./fio-types"

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

export interface PriceInfo {
  Ticker: string;
  MMBuy: number | null;
  MMSell: number | null;
  "CI1-Average": number;
  "CI1-AskAmt": number;
  "CI1-AskPrice": number;
  "CI1-AskAvail": number;
  "CI1-BidAmt": number;
  "CI1-BidPrice": number;
  "CI1-BidAvail": number;
  "NC1-Average": number;
  "NC1-AskAmt": number;
  "NC1-AskPrice": number;
  "NC1-AskAvail": number;
  "NC1-BidAmt": number;
  "NC1-BidPrice": number;
  "NC1-BidAvail": number;
  "IC1-Average": number;
  "IC1-AskAmt": number;
  "IC1-AskPrice": number;
  "IC1-AskAvail": number;
  "IC1-BidAmt": number;
  "IC1-BidPrice": number;
  "IC1-BidAvail": number;
}

export interface CXTickerInfo {
  BuyingOrders: CXOrder[];
  SellingOrders: CXOrder[];
  MaterialBrokerId: string;
  MaterialName: string;
  MaterialTicker: string;
  MaterialId: string;
  ExchangeName: string;
  ExchangeCode: string;
  Currency: string;
  Previous: number;
  Price: number;
  PriceTimeEpochMs: number;
  High: number;
  AllTimeHigh: number;
  Low: number;
  AllTimeLow: number;
  Ask: number;
  AskCount: number;
  Bid: number;
  BidCount: number;
  Supply: number;
  Demand: number;
  Traded: number;
  VolumeAmount: number;
  PriceAverage: number;
  NarrowPriceBandLow: number;
  NarrowPriceBandHigh: number;
  WidePriceBandLow: number;
  WidePriceBandHigh: number;
  MMBuy: number;
  MMSell: number;
  UserNameSubmitted: string;
  Timestamp: string;
}

export interface CXOrder {
  CompanyId: string;
  CompanyName: string;
  CompanyCode: string;
  ItemCount: number | null;
  ItemCost: number;
}

export interface CompanyCXOrders {
  material: string;
  cx: string;
  buys: CompanyCXOrder[];
  sells: CompanyCXOrder[];
}
export interface CompanyCXOrder {
  amount: number;
  cost: number;
}
export interface CompanyCXOrdersFio {
  Ticker: string;
  Buys: CompanyCXOrderFio[];
  Sells: CompanyCXOrderFio[];
}
export interface CompanyCXOrderFio {
  Count: number;
  Cost: number;
}


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://rest.fnar.net" }),
  endpoints: (builder) => ({
    // TODO: instead get CX info -> prices
    fetchPlanets: builder.query<FioShortPlanet[], void>({
      query() {
        return "/planet/allplanets"
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
    }),
    fetchCXTicker: builder.query<CXTickerInfo, string>({
      query(ticker) {
        return `/exchange/${ticker}`
      }
    }),
    fetchPrices: builder.query<PriceInfo[], void>({
      query() {
        return "/rain/prices"
      },
      keepUnusedDataFor: 60 * 60 * 24 * 7, // 1 week for debugging TODO: reduce
    }),
    basecount: builder.query<{ CompanyCode: string; BaseCount: number; }[], void>({
      query() {
        return "/planet/basecount/1"
      },
      keepUnusedDataFor: 10 * 60
    }),
    findCompanyOrders: builder.query<CompanyCXOrders[], string>({
      query(companyCode) {
        return `/exchange/orders/${companyCode}`
      },
      transformResponse(response: CompanyCXOrdersFio[]) {
        return response.map(o => {
          const [material, cx] = o.Ticker.split(".")
          const m = (orders: CompanyCXOrderFio[], increasing: boolean) => orders.map(a => ({ amount: a.Count, cost: a.Cost })).
            sort((a, b) => increasing ? b.cost - a.cost : a.cost - b.cost)
          return { material, cx, buys: m(o.Buys, true), sells: m(o.Sells, false) }
        })
      },
      keepUnusedDataFor: 10 * 60
    }),
  }),
})

type MyUseQuery = UseQuery<QueryDefinition<any, any, any, any>>
const setDefaultPollingInterval = <T extends MyUseQuery>(fn: T, interval = 30 * 60 * 1000): T => ((arg, options) => fn(arg, { pollingInterval: interval, ...options })) as T

export const { useFetchPlanetQuery, useFetchPricesQuery } = apiSlice
export const useBasecountQuery = setDefaultPollingInterval(apiSlice.useBasecountQuery)
export const useFindCompanyOrdersQuery = setDefaultPollingInterval(apiSlice.useFindCompanyOrdersQuery)
