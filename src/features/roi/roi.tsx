import React, { useMemo, useState } from "react"
import { Building, BuildingType, Commodities, WorkforceLevel } from "../../world-data/world-data"
import { CONSUMABLES_BY_WORKFORCE } from "../bases/consumption"
import { PriceInfo, useFetchPricesQuery } from "../fio/fio-api-slice"
import { numberForUser } from "../utils/utils"

const TIER: Record<WorkforceLevel, number> = {
  Pioneers: 1,
  Settlers: 2,
  Technicians: 3,
  Engineers: 4,
  Scientists: 5,
}

const DAY_IN_MS = 24 * 60 * 60 * 1000

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
  return minimumCosts
}

// TODO: calculate materials used + then calc price separate, so used materials can be shown for labor cost tooltip
function calcLaborMaterials(building: Building, luxury: Record<string, boolean>) {
  // TODO: hab-factor (-> not enough workforce)
  // const totalWorkforce = Object.values(building.workforce).reduce((sum, amount) => sum + amount, 0)
  return Object.entries(building.workforce).reduce((materials, [type, amount]) => {
    for (const [material, per100] of Object.entries(CONSUMABLES_BY_WORKFORCE[type as WorkforceLevel])) {
      if (worldData.materials[material].category == "consumables (luxury)" && !luxury[material])
        continue
      if (!materials[material])
        materials[material] = 0
      materials[material] += per100 / 100 * amount
    }
    return materials
  }, {} as Record<string, number>)
}
function calcLaborCosts(building: Building, prices: Record<string, number>, luxury: Record<string, boolean>) {
  return calcCommodityCosts(calcLaborMaterials(building, luxury), prices)
}

export function RoiList() {
  // TODO: fertility
  // TODO: bonuses: cogc, experts, hq (level)
  // TODO?: condition, not full workforce, not full consumables
  const buildingIds = Object.keys(worldData.buildings).filter(id => worldData.buildings[id].type == BuildingType.PRODUCTION).sort((a, b) => {
    const bA = worldData.buildings[a]
    const bB = worldData.buildings[b]
    const diff = TIER[bA.workforceLevel] - TIER[bB.workforceLevel]
    if (diff == 0)
      return a.localeCompare(b)
    return diff
  })

  const { data, error, isLoading } = useFetchPricesQuery()

  const [planet, setPlanet] = useState("OT-580b")
  const [usableWorkforce, setUsableWorkforce] = useState({
    Pioneers: true,
    Settlers: true,
    Technicians: true,
    Engineers: true,
    Scientists: true,
  })
  const [usableConsumables, setUsableConsumables] = useState({
    PWO: true,
    COF: true,
  })

  const [priceSource, setPriceSource] = useState<PriceSource>("NC1-Average") // TODO: use array as prio order instead
  const prices = useMemo(() => isLoading ? {} : (data as PriceInfo[]).reduce((acc, current) => ({ ...acc, [current.Ticker]: current[priceSource] ?? 0 }), {} as Record<string, number>), [data, priceSource])
  const habPerWorkforceCosts = useMemo(() => calcHabPerWorkforceCosts(planet, prices), [prices, planet])
  const relevantBuildings = [...worldData.buildingCategories[BuildingType.RESOURCES], ...worldData.buildingCategories[BuildingType.PRODUCTION]]
  const buildingCosts = useMemo(() =>
    relevantBuildings.reduce((acc, bId) => ({ ...acc, [bId]: calcBuildingCosts(worldData.buildings[bId], planet, prices) }), {} as Record<string, number>),
    [prices, planet])
  const habCosts = useMemo(() =>
    relevantBuildings.reduce((acc, bId) => ({ ...acc, [bId]: Object.entries(worldData.buildings[bId].workforce).reduce((sum, [type, amount]) => sum + habPerWorkforceCosts[type] * amount, 0) }), {} as Record<string, number>),
    [prices, planet])
  const consumableCosts = useMemo(() =>
    relevantBuildings.reduce((acc, bId) => ({ ...acc, [bId]: calcLaborCosts(worldData.buildings[bId], prices, usableConsumables) }), {} as Record<string, number>),
    [prices, usableConsumables])


  if (isLoading)
    return <div>Loading</div>
  if (error)
    return <div>Error: ${error}</div>

  return (<>
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ margin: "0 2px" }}>Planet: <PlanetInput value={planet} onChange={setPlanet} /></div>
      <div style={{ margin: "0 2px" }}>Workforce: {Object.keys(usableWorkforce).map(wf => <label key={wf}><input type="checkbox" checked={usableWorkforce[wf as keyof typeof usableWorkforce]} onChange={e => setUsableWorkforce({ ...usableWorkforce, [wf]: e.target.checked })}></input>{wf}</label>).flat()}</div>
      <div style={{ margin: "0 2px" }}>Consumables: {Object.keys(usableConsumables).map(cons => <label key={cons}><input type="checkbox" checked={usableConsumables[cons as keyof typeof usableConsumables]} onChange={e => setUsableConsumables({ ...usableConsumables, [cons]: e.target.checked })}></input>{cons}</label>).flat()}</div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "max-content auto max-content auto auto auto auto auto" }}>
      <div>BUI</div>
      <div>BUI-Cost</div>
      <div>Recipe</div>
      <div>Labor/d</div>
      <div>Input/d</div>
      <div>Output/d</div>
      <div>Profit/d</div>
      <div>ROI</div>
      {worldData.planets[planet].resources
        .sort((a, b) => a.type.localeCompare(b.type))
        .map(({ material, perDay, type }) => {
          const buildingCode = { GASEOUS: "COL", LIQUID: "RIG", MINERAL: "EXT" }[type]
          const key = buildingCode + "|" + Math.round(perDay) + material
          const buiCost = buildingCosts[buildingCode]
          const habCost = habCosts[buildingCode]
          const laborCost = consumableCosts[buildingCode]
          const outputCost = perDay * prices[material]
          const profit = outputCost - laborCost
          return [
            <div key={key + "A"} style={{ textAlign: "left" }}>{buildingCode}</div>,
            <div key={key + "A1"} title={"Building: " + numberForUser(buiCost, 0) + "\nHab: " + numberForUser(habCost, 0)}>{numberForUser(buiCost + habCost, 0)}</div>,
            <div key={key + "B"} title={material + ": " + numberForUser(prices[material])}>{numberForUser(perDay, 1) + material}</div>,
            <div key={key + "C1"}>{numberForUser(laborCost, 0)}</div>,
            <div key={key + "C"}>0</div>,
            <div key={key + "D"}>{numberForUser(outputCost, 0)}</div>,
            <div key={key + "E"}>{numberForUser(profit, 0)}</div>,
            <div key={key + "F"} style={{ textAlign: "right" }}>{profit > 0 ? numberForUser((buiCost + habCost) / profit, 2) : "∞"}</div>,
          ]
        }).flat()}
      {buildingIds
        .filter(id => Object.entries(worldData.buildings[id].workforce).filter(([type, amount]) => !usableWorkforce[type as keyof typeof usableWorkforce] && amount > 0).length == 0)
        .map(buildingCode => worldData.buildings[buildingCode].recipes.map(recipe => {
          const key = buildingCode + "|" + Object.entries(recipe.inputs).map(([mat, amount]) => amount + mat).join(",") + "|" + Object.entries(recipe.outputs).map(([mat, amount]) => amount + mat).join(",")
          const buiCost = buildingCosts[buildingCode]
          const habCost = habCosts[buildingCode]
          const timesPerDay = DAY_IN_MS / recipe.durationMs
          const laborCost = consumableCosts[buildingCode]
          const inputCost = Object.entries(recipe.inputs).reduce((sum, [mat, amount]) => sum + amount * prices[mat], 0) * timesPerDay
          const outputCost = Object.entries(recipe.outputs).reduce((sum, [mat, amount]) => sum + amount * prices[mat], 0) * timesPerDay
          const profit = outputCost - inputCost - laborCost
          return [
            <div key={key + "A"} style={{ textAlign: "left" }}>{buildingCode}</div>,
            <div key={key + "A1"} title={"Building: " + numberForUser(buiCost, 0) + "\nHab: " + numberForUser(habCost, 0)}>{numberForUser(buiCost + habCost, 0)}</div>,
            <div key={key + "B"} title={[...Object.keys(recipe.outputs), ...Object.keys(recipe.inputs)].map(mat => mat + ": " + numberForUser(prices[mat])).join("\n")}>{Object.entries(recipe.outputs).map(([mat, amount]) => amount + mat).join(" ") + " := " + Object.keys(recipe.inputs).join("+")}</div>,
            <div key={key + "C1"}>{numberForUser(laborCost, 0)}</div>,
            <div key={key + "C"}>{numberForUser(inputCost, 0)}</div>,
            <div key={key + "D"}>{numberForUser(outputCost, 0)}</div>,
            <div key={key + "E"}>{numberForUser(profit, 0)}</div>,
            <div key={key + "F"} style={{ textAlign: "right" }}>{profit > 0 ? numberForUser((buiCost + habCost) / profit, 2) : "∞"}</div>,
          ]
        })).flat()}
    </div >
  </>)
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

function PlanetInput({ value, onChange }: { value: string, onChange: (planet: string) => void }) {
  const [currentValue, setCurrentValue] = useState(value)
  return <input value={currentValue} onChange={e => {
    setCurrentValue(e.target.value)
    if (worldData.planets[e.target.value])
      onChange(e.target.value)
  }} list="LIST_planets"></input>
}
