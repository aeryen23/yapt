import React, { useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { WorkforceLevel } from "../../world-data/world-data"
import { numberForUser } from "../utils/utils"
import { BaseB, selectAvailablePlanets, selectCurrentBase } from "./bases-slice"
import { calculateLaberMaterialsPerDay, excludeLuxuries } from "./consumption"
import { importStorage } from "./rain-import"

export function BasesOverview() {
  const [rainExport, setRainExport] = useState("")
  const availablePlanets = selectAvailablePlanets()
  const dispatch = useAppDispatch()

  return (<div>
    <form onSubmit={e => {
      e.preventDefault()
      importStorage(rainExport, dispatch)
    }}>
      <textarea placeholder="Rain data export" value={rainExport} onChange={e => setRainExport(e.target.value)}></textarea>
      <button type="submit">Import</button>
    </form>
    <table>
      <thead><tr>
        <th>Planet</th>
        <th>Workforce</th>
        <th>Consumables</th>
      </tr></thead>
      <tbody>
        {availablePlanets.map(pId => (<tr key={pId}>
          <td>{pId}</td>
          <CurrentBase id={pId} />
        </tr>)).flat()}
      </tbody>
    </table>
  </div>)
}

const workforces: (keyof BaseB["workforce"])[] = ["Pioneers", "Settlers", "Technicians", "Engineers", "Scientists"]

function CurrentBase({ id }: { id: string }) {
  const base = selectCurrentBase(id);
  const totalPop = workforces.reduce((sum, wf) => sum + base.workforce[wf].current, 0)
  const popTip = workforces.filter(wf => base.workforce[wf].current > 0).map(wf => wf + ": " + base.workforce[wf].current + "/" + base.workforce[wf].required + " (" + base.workforce[wf].total + ") " + numberForUser(base.workforce[wf].satisfaction * 100, 1) + "%").join("\n")
  const consumablesPerDay = calculateLaberMaterialsPerDay(workforces.reduce((acc, wf) => ({ ...acc, [wf]: base.workforce[wf].current }), {} as Record<WorkforceLevel, number>))
  const days: Record<string, number> = {}
  for (const [mat, amount] of Object.entries(consumablesPerDay)) {
    days[mat] = base.inventory[mat] ? base.inventory[mat] / amount : 0
  }
  const minWithoutLuxuries = min(excludeLuxuries(days))
  const minAll = min(days)

  return (<>
    <td title={popTip}>{totalPop}</td>
    <td title={Object.entries(days).map(([mat, amount]) => mat + " " + numberForUser(amount, 1)).join("\n")}>{numberForUser(minWithoutLuxuries, 1)+"/"+numberForUser(minAll, 1)}</td>
  </>)

  function min(consumables: Record<string, number>) {
    return Math.min(...Object.values(consumables))
  }
}
