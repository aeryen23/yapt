import React, { useEffect, useState } from "react"
import { worldData } from "../../world-data/world-data"
import { currentBase } from "../bases/bases-slice"
import { numberForUser } from "../utils/utils"

type SingleResult = {
  planet: string
  jumps: number
}

export default function PlanetSearch() {
  const [system, setSystem] = useState(worldData.planets[currentBase().planet].system)
  const [result, setResult] = useState([] as SingleResult[])
  const maxJumps = 5
  const maxTier = 2

  useEffect(() => {
    if (!worldData.systems[system])
      return
    const evaluated = new Map<string, number>()
    evaluated.set(system, 0)
    const next = [system]
    while (next.length) {
      const checkId: string = next.pop()!
      const jumps = evaluated.get(checkId)! + 1
      const check = worldData.systems[checkId]
      for (const other of check.connections) {
        if (evaluated.has(other))
          continue;
        evaluated.set(other, jumps)
        if (jumps < maxJumps)
          next.push(other)
      }
    }

    const result: SingleResult[] = []
    for (const [system, jumps] of evaluated)
      for (const planet of worldData.systems[system].planets)
        if (worldData.planets[planet].tier <= maxTier)
          result.push({ planet, jumps })

    result.sort((a, b) => {
      // TODO: make the sort criterium configurable?! e.g. sort by resource rate, necessary building mats
      if (a.jumps < b.jumps)
        return -1
      else if (a.jumps > b.jumps)
        return +1
      return a.planet.localeCompare(b.planet)
    })

    setResult(result)
  }, [system])

  return <div>
    <div style={{ border: "1 solid white" }}>
      System: <input value={system} onChange={e => {
        setSystem(e.target.value)
      }}></input>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Jumps</th>
            <th>Planet</th>
            <th>Fertility</th>
            <th>Surface</th>
            <th>AP</th>
            <th>Grav</th>
            <th>Temp</th>
            <th>Tier</th>
            <th colSpan={10}>Resources</th>
          </tr>
        </thead>
        <tbody>

          {result.map(r => {
            const planet = worldData.planets[r.planet]
            return (<tr key={r.planet}>
              <td>{r.jumps}</td>
              <td>{r.planet}</td>
              <td>{planet.surfaceData.fertility == -1 ? "-" : numberForUser(30 * planet.surfaceData.fertility) + "%"}</td>
              {[["MCG", "AEF"], ["SEA", ""], ["INS", ""], ["", ""]].map(mats => {
                const used = mats.filter(m => planet.cmCosts[m])[0]
                return <td>{used || ""}</td>
              }).flat()}
              <td>{planet.tier}</td>
              {
                planet.resources.map(r => <><td style={{ textAlign: "left"}}>{r.material}</td><td style={{ textAlign: "right" }}>{numberForUser(r.perDay)}</td></>).flat()
              }
            </tr>)
          })}
        </tbody>
      </table>
    </div>
  </div>
}
