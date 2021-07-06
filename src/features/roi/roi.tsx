import React from "react"
import { BuildingType, WorkforceLevel, worldData } from "../../world-data/world-data"
import { PriceInfo, useFetchPricesQuery } from "../fio/fio-api-slice"
import { numberForUser } from "../utils/utils"

const TIER: Record<WorkforceLevel, number> = {
  Pioneers: 1,
  Settlers: 2,
  Technicians: 3,
  Engineers: 4,
  Scientists: 5,
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
  if (isLoading)
    return <div>Loading</div>
  if (error)
    return <div>Error: ${error}</div>
  const prices = (data as PriceInfo[]).reduce((acc, current) => ({ ...acc, [current.Ticker]: current }), {} as Record<string, PriceInfo>)

  return (<div style={{ display: "grid", gridTemplateColumns: "max-content auto max-content auto" }}>
    <div>BUI</div>
    <div>Recipe</div>
    <div>Time</div>
    <div>ROI</div>
    {buildingIds.map(buildingCode => worldData.buildings[buildingCode].recipes.map(recipe => {
      const key = buildingCode + "|" + Object.entries(recipe.inputs).map(([mat, amount]) => amount + mat).join(",") + "|" + Object.entries(recipe.outputs).map(([mat, amount]) => amount + mat).join(",")
      return [
        <div key={key + "A"}> {buildingCode}</div>,
        <div key={key + "B"}>{Object.entries(recipe.outputs).map(([mat]) => mat).join(" ") + "-"}</div>,
        <div key={key + "C"}>{showDuration(recipe.durationMs)}</div>,
        <div key={key + "D"}>{Object.keys(recipe.outputs)[0] ? numberForUser(prices[Object.keys(recipe.outputs)[0]]["NC1-Average"]): 0}</div>,
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
