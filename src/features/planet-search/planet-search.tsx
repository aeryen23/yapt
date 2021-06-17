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
  const [materialFilter, setMaterialFilter] = useState([] as string[])
  const maxJumps = 5
  const maxTier = 4

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

    // TODO: split systems vs found planets, so planets can be more easily be filtered/sorted without needing to reiterate the jump counts
    const newResult: SingleResult[] = []
    for (const [system, jumps] of evaluated)
      for (const planet of worldData.systems[system].planets)
        if (worldData.planets[planet].tier <= maxTier)
          newResult.push({ planet, jumps })

    newResult.sort((a, b) => {
      // TODO: make the sort criterium configurable?! e.g. sort by resource rate, necessary building mats
      if (a.jumps < b.jumps)
        return -1
      else if (a.jumps > b.jumps)
        return +1
      return a.planet.localeCompare(b.planet)
    })

    setResult(newResult)
  }, [system])

  // Settings:
  // - checkboxes for building materials
  // - fertile
  // - already existing planetary buildings?
  // - minimum production/day

  const materials = result.reduce((acc, v) => {
    for (const { material, perDay } of worldData.planets[v.planet].resources)
      if (!acc[material] || acc[material] < perDay)
        acc[material] = perDay
    return acc
  }, {} as Record<string, number>)
  function toggleMaterialFilter(e: React.MouseEvent<HTMLDivElement>) {
    const mat = (e.target as HTMLDivElement).innerText
    if (materialFilter.indexOf(mat) == -1)
      setMaterialFilter([...materialFilter, mat])
    else
      setMaterialFilter(materialFilter.filter(m => m != mat))
  }
  // TODO: color filtered materials under planet list as well
  // TODO: have a fixed material order and use it for all planets?! (maybe already implicit?)
  // TODO: show max available material rate in material filter of currently available planets + hide materials for which no planets are available anymore

  return <div>
    <div style={{ border: "1 solid white" }}>
      System: <input value={system} onChange={e => {
        setSystem(e.target.value)
      }}></input>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {Object.keys(materials).sort().map(mat => (
        <div key={mat} style={{
          margin: 10,
          color: materialFilter.indexOf(mat) != -1 ? "lightskyblue" : "white"
        }} onClick={toggleMaterialFilter}>{mat}</div>)
      )}
    </div>
    <div>
      <table style={{ borderSpacing: 50 }}>
        <thead>
          <tr>
            <th>Jumps</th>
            <th>Planet</th>
            <th>Fertility</th>
            <th>Surface</th>
            <th>Pressure</th>
            <th>Gravity</th>
            <th>Temperature</th>
            <th>Tier</th>
            <th colSpan={10}>Resources</th>
          </tr>
        </thead>
        <tbody>

          {result.filter(r => {
            if (materialFilter.length == 0)
              return true
            for (const { material } of worldData.planets[r.planet].resources)
              if (materialFilter.indexOf(material) != -1)
                return true
            return false
          }).map(r => {
            const planet = worldData.planets[r.planet]
            return (<tr key={r.planet}>
              <td>{r.jumps}</td>
              <td>{r.planet}</td>
              <td>{planet.surfaceData.fertility == -1 ? "-" : numberForUser(30 * planet.surfaceData.fertility) + "%"}</td>
              {[["MCG", "AEF"], ["SEA", "HSE"], ["INS", "TSH"], ["MGC", "BL"]].map(mats => {
                const used = mats.filter(m => planet.cmCosts[m])[0]
                return <td>{used || ""}</td>
              }).flat()}
              <td>{planet.tier}</td>
              {
                planet.resources.map(r => <><td style={{ textAlign: "left" }}>{r.material}</td><td style={{ textAlign: "right" }}>{numberForUser(r.perDay)}</td></>).flat()
              }
            </tr>)
          })}
        </tbody>
      </table>
    </div>
  </div>
}
