import React, { useMemo, useState } from "react"
import { Building, BuildingType, Commodities, WorkforceLevel, worldData } from "../../world-data/world-data"
import { PriceInfo, useFetchPricesQuery } from "../fio/fio-api-slice"
import { numberForUser } from "../utils/utils"

const TIER: Record<WorkforceLevel, number> = {
  Pioneers: 1,
  Settlers: 2,
  Technicians: 3,
  Engineers: 4,
  Scientists: 5,
}

type PriceSource = Exclude<keyof PriceInfo, "Ticker">

function calcCommodityCosts(materials: Commodities, prices: Record<string, number>) {
  return Object.entries(materials).reduce((total, [mat, amount]) => total + amount * prices[mat], 0)
}
function calcBuildingEnvironmentMaterials(building: Building, planetId: string): Commodities {
  // https://handbook.apex.prosperousuniverse.com/wiki/building-costs/
  const cmCosts = worldData.planets[planetId].cmCosts
  return Object.entries({
    MCG: building.area * 4,
    AEF: Math.trunc((building.area + 2) / 3),
    SEA: building.area,
    HSE: 1,
    MGC: 1,
    BL: 1,
    INS: building.area * 10,
    TSH: 1,
  }).filter(([mat, amount]) => cmCosts[mat] && amount > 0).reduce((acc, [mat, amount]) => ({ ...acc, [mat]: amount }), {} as Commodities)
}
function calcBuildingCosts(building: Building, planetId: string, prices: Record<string, number>) {
  return calcCommodityCosts(building.costs, prices) + calcCommodityCosts(calcBuildingEnvironmentMaterials(building, planetId), prices)
}

const housing: Record<string, Partial<Record<WorkforceLevel, Number>>> = {
  HB1: { Pioneers: 100 },
  HB2: { Settlers: 100 },
  HB3: { Technicians: 100 },
  HB4: { Engineers: 100 },
  HB5: { Scientists: 100 },
  HBB: { Pioneers: 75, Settlers: 75 },
  HBC: { Settlers: 75, Technicians: 75 },
  HBM: { Technicians: 75, Engineers: 75 },
  HBL: { Engineers: 75, Scientists: 75 },
}
const workforceToHab: Record<WorkforceLevel, string> = {
  Pioneers: "HB1",
  Settlers: "HB2",
  Technicians: "HB3",
  Engineers: "HB4",
  Scientists: "HB5",
}
function calcHabPerWorkforceCosts(planetId: string, prices: Record<string, number>) {
  const singleWorkforceCosts = Object.entries({
    HB1: "Pioneers",
    HB2: "Settlers",
    HB3: "Technicians",
    HB4: "Engineers",
    HB5: "Scientists"
  }).reduce((acc, [id, workforce]) => ({ ...acc, [workforce]: calcBuildingCosts(worldData.buildings[id], planetId, prices) / 100 }), {} as Record<string, number>)
  const minimumCosts = { ...singleWorkforceCosts }
  for (const [id, pops] of Object.entries({
    HBB: ["Pioneers", "Settlers"],
    HBC: ["Settlers", "Technicians"],
    HBM: ["Technicians", "Engineers"],
    HBL: ["Engineers", "Scientists"]
  })) {
    const cost = calcBuildingCosts(worldData.buildings[id], planetId, prices) / 75 / (pops.map(pop => singleWorkforceCosts[pop]).reduce((a, b) => a + b, 0))
    for (const pop of pops) {
      const popCost = cost * singleWorkforceCosts[pop]
      if (popCost < minimumCosts[pop])
        minimumCosts[pop] = popCost
    }
  }
  // Object.entries(building.workforce).filter(([_, amount]) => amount > 0).map(([type, amount]) => )

  return minimumCosts
  // return calcBuildingCosts(building, planetId, prices)
}

export function RoiList() {
  const buildingIds = [
    ...Object.keys(worldData.buildings).filter(id => worldData.buildings[id].type == BuildingType.RESOURCES),
    ...Object.keys(worldData.buildings).filter(id => worldData.buildings[id].type == BuildingType.PRODUCTION).sort((a, b) => {
      const bA = worldData.buildings[a]
      const bB = worldData.buildings[b]
      const diff = TIER[bA.workforceLevel] - TIER[bB.workforceLevel]
      if (diff == 0)
        return a.localeCompare(b)
      return diff
    })
  ]

  const { data, error, isLoading } = useFetchPricesQuery()

  const [planet, setPlanet] = useState("OT-580b")
  const [priceSource, setPriceSource] = useState<PriceSource>("NC1-Average") // TODO: use array as prio order instead
  const prices = useMemo(() => isLoading ? {} : (data as PriceInfo[]).reduce((acc, current) => ({ ...acc, [current.Ticker]: current[priceSource] ?? 0 }), {} as Record<string, number>), [data, priceSource])
  const habCosts = useMemo(() => calcHabPerWorkforceCosts(planet, prices), [prices, planet])
  const buildingCosts = useMemo(() =>
    worldData.buildingCategories[BuildingType.PRODUCTION].reduce((acc, bId) => ({ ...acc, [bId]: calcBuildingCosts(worldData.buildings[bId], planet, prices) }), {} as Record<string, number>),
    [prices, planet])

  if (isLoading)
    return <div>Loading</div>
  if (error)
    return <div>Error: ${error}</div>

  return (<div style={{ display: "grid", gridTemplateColumns: "max-content auto auto max-content auto" }}>
    <div>BUI</div>
    <div>BUI-Cost</div>
    <div>Recipe</div>
    <div>Time</div>
    <div>ROI</div>
    {buildingIds.map(buildingCode => worldData.buildings[buildingCode].recipes.map(recipe => {
      const key = buildingCode + "|" + Object.entries(recipe.inputs).map(([mat, amount]) => amount + mat).join(",") + "|" + Object.entries(recipe.outputs).map(([mat, amount]) => amount + mat).join(",")
      return [
        <div key={key + "A"}>{buildingCode}</div>,
        <div key={key + "A1"}>{numberForUser(buildingCosts[buildingCode], 0)}</div>,
        <div key={key + "B"}>{Object.entries(recipe.outputs).map(([mat]) => mat).join(" ") + "-"}</div>,
        <div key={key + "C"}>{showDuration(recipe.durationMs)}</div>,
        <div key={key + "D"}>{Object.keys(recipe.outputs)[0] ? numberForUser(prices[Object.keys(recipe.outputs)[0]]) : 0}</div>,
      ]
    })).flat()}
  </div >)
}

function showDuration(durationMs: number) {
  const minutes = durationMs / 60000
  const hours = Math.trunc(minutes / 60)
  const remainingMinutes = Math.round(minutes % 60)
  let result = ""
  if (hours)
    result += " " + hours + " h"
  if (remainingMinutes)
    result += " " + remainingMinutes + " m"
  return result.trim();
}
