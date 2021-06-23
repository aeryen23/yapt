import React, { useEffect, useState } from "react"
import { worldData } from "../../world-data/world-data"
import { currentBase } from "../bases/bases-slice"
import { MaterialIcon, Icon } from "../ui/icons"
import { numberForUser } from "../utils/utils"

type SingleResult = {
  planet: string
  jumps: number
}

let allResources: { category: string, materials: string[] }[] | undefined = undefined
function getAllResources() {
  if (!allResources) {
    const mats = [... new Set(Object.values(worldData.planets).map(p => p.resources.map(r => r.material)).flat())]
    const cat2mats = mats.reduce((acc, mat) => {
      const cat = worldData.materials[mat].category
      if (!acc[cat])
        acc[cat] = []
      acc[cat].push(mat)
      return acc
    }, {} as Record<string, string[]>)
    allResources = Object.keys(cat2mats).sort().map(category => ({ category, materials: cat2mats[category].sort() }));
  }
  return allResources
}

const additionalBuildingMaterials = ["MCG", "AEF", "SEA", "HSE", "INS", "TSH", "MGC", "BL"]

export default function PlanetSearch() {
  const [startSystem, setStartSystem] = useState(worldData.planets[currentBase().planet].system)
  const [systems, setSystems] = useState(new Map<string, number>())
  const [matchingPlanets, setMatchingPlanets] = useState([] as SingleResult[])
  const [materialFilter, setMaterialFilter] = useState([] as string[])
  const [materialFilterAnd, setMaterialFilterAnd] = useState(false)
  const [maxJumps, setMaxJumps] = useState(10 as number | undefined)
  const [buildingMaterials, setBuildingMaterials] = useState(["MCG", "AEF", "SEA"]) // TODO: save this state permanently + start with all?!

  useEffect(() => {
    if (!worldData.systems[startSystem])
      return
    console.time("Evaluate jumps")
    const evaluated = new Map<string, number>()
    evaluated.set(startSystem, 0)
    let next = []
    let later = [startSystem]
    // TODO: it can take 15ms to evaluate all planets :/
    while (later.length) {
      next = later;
      later = []
      while (next.length) {
        const checkId: string = next.pop()!
        const jumps = evaluated.get(checkId)! + 1
        const check = worldData.systems[checkId]
        for (const other of check.connections) {
          if (evaluated.has(other))
            continue;
          evaluated.set(other, jumps)
          later.push(other)
        }
      }
    }
    setSystems(evaluated)
    console.timeEnd("Evaluate jumps")
  }, [startSystem])
  useEffect(() => {
    console.time("Evaluate planets")

    // TODO: split systems vs found planets, so planets can be more easily be filtered/sorted without needing to reiterate the jump counts
    const newResult: SingleResult[] = []
    for (const [system, jumps] of systems) {
      if (maxJumps && jumps > maxJumps)
        continue
      for (const planet of worldData.systems[system].planets) {
        const cmCosts = worldData.planets[planet].cmCosts
        let hasAllBuildingCosts = true
        for (const mat of Object.keys(cmCosts)) {
          if (additionalBuildingMaterials.indexOf(mat) == -1)
            continue // only check for the additional costs
          if (buildingMaterials.indexOf(mat) == -1) {
            hasAllBuildingCosts = false
            break
          }
        }
        if (!hasAllBuildingCosts)
          continue;
        newResult.push({ planet, jumps })
      }
    }
    console.timeEnd("Evaluate planets")
    newResult.sort((a, b) => {
      // TODO: make the sort criterium configurable?! e.g. sort by resource rate, necessary building mats
      if (a.jumps < b.jumps)
        return -1
      else if (a.jumps > b.jumps)
        return +1
      return a.planet.localeCompare(b.planet)
    })

    setMatchingPlanets(newResult)
  }, [systems, maxJumps, buildingMaterials])

  // Settings:
  // - checkboxes for building materials
  // - fertile
  // - already existing planetary buildings?
  // - minimum production/day

  function toggleMaterialFilter(mat: string) {
    if (materialFilter.indexOf(mat) == -1)
      setMaterialFilter([...materialFilter, mat])
    else
      setMaterialFilter(materialFilter.filter(m => m != mat))
  }
  function toggleBuildingMaterialFilter(mat: string) {
    if (buildingMaterials.indexOf(mat) == -1)
      setBuildingMaterials([...buildingMaterials, mat])
    else
      setBuildingMaterials(buildingMaterials.filter(m => m != mat))
  }
  // TODO: color filtered materials under planet list as well
  // TODO: have a fixed material order and use it for all planets?! (maybe already implicit?)
  // TODO: show max available material rate in material filter of currently available planets + hide materials for which no planets are available anymore
  // TODO: add option to hide planets without resources even if no filter is selected
  // TODO: filter mode: and/or
  // TODO: PERF!!!
  // TODO: make selected more visible

  return <div>
    <div style={{ border: "1 solid white" }}>
      System: <input value={startSystem} onChange={e => { setStartSystem(e.target.value) }} list="LIST_systems"></input>
      Jumps: <input type="number" value={maxJumps} onChange={e => {
        if (!e.target.value) {
          setMaxJumps(undefined)
          return
        }
        const jumps = parseInt(e.target.value, 10)
        if (jumps >= 0 && jumps < 100)
          setMaxJumps(jumps)
      }} />
    </div>
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {
        getAllResources().map(o => o.materials.map(mat => <div key={mat} style={{ margin: 1 }}>
          <MaterialIcon key={mat} materialId={mat} size={32} isSelected={materialFilter.indexOf(mat) != -1} onClick={toggleMaterialFilter} />
        </div>)).flat()
      }
      {/* {Object.keys(materials).sort().map(mat => (
        <div style={{ margin: 1 }}>
          <MaterialIcon key={mat} materialId={mat} size={32} isSelected={materialFilter.indexOf(mat) != -1} onClick={toggleMaterialFilter} />
        </div>
      ))} */}
      <div style={{ margin: 1, position: "relative" }}>
        <Icon label="Clear" size={32} colorClass="" onClick={() => setMaterialFilter([])} />
      </div>
      <div style={{ margin: 1, position: "relative" }}>
        <Icon label={materialFilterAnd ? "AND" : "OR"} size={32} colorClass="" onClick={() => setMaterialFilterAnd(!materialFilterAnd)} />
      </div>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {additionalBuildingMaterials.map(mat => <div style={{ margin: 1 }}>
        <MaterialIcon key={mat} materialId={mat} size={32} isSelected={buildingMaterials.indexOf(mat) != -1} onClick={toggleBuildingMaterialFilter} />
      </div>)}
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Jumps</th>
            <th>Planet</th>
            <th>Fertility</th>
            <th colSpan={4}>Base materials</th>
            <th colSpan={10}>Resources</th>
          </tr>
        </thead>
        <tbody>
          {matchingPlanets.filter(r => {
            if (materialFilter.length == 0)
              return true
            const materials = worldData.planets[r.planet].resources.map(r => r.material)
            for (const filter of materialFilter) {
              if (materials.indexOf(filter) != -1) {
                if (!materialFilterAnd)
                  return true
              } else if (materialFilterAnd) {
                return false
              }
            }
            return materialFilterAnd
          }).map(r => {
            const planet = worldData.planets[r.planet]
            return (<tr key={r.planet}>
              <td>{r.jumps}</td>
              <td>{r.planet}</td>
              <td>{planet.surfaceData.fertility == -1 ? "-" : numberForUser(30 * planet.surfaceData.fertility) + "%"}</td>
              {[["MCG", "AEF"], ["SEA", "HSE"], ["INS", "TSH"], ["MGC", "BL"]].map(mats => {
                const used = mats.filter(m => planet.cmCosts[m])[0]
                return <td>{used && <MaterialIcon materialId={used} size={32} />}</td>
              }).flat()}
              {
                planet.resources.map(r => <>
                  {/* <td style={{ textAlign: "left", color: selectedColors[materialFilter.length > 0 ? materialFilter.indexOf(r.material) % selectedColors.length : -1] }}>{r.material}</td> */}
                  <td><MaterialIcon materialId={r.material} size={32} isSelected={materialFilter.indexOf(r.material) != -1} /></td>
                  <td style={{ textAlign: "right" }}>{numberForUser(r.perDay)}</td>
                </>).flat()
              }
            </tr>)
          })}
        </tbody>
      </table>
    </div>
  </div>
}

const selectedColors = [
  "lightskyblue",
  "coral",
  "lightgreen",
  "orange",
  "crimson",
  "sienna",
  "orchid",
  "Aquamarine",
]
selectedColors[-1] = "white"
