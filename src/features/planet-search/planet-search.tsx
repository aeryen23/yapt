import React, { useEffect, useState } from "react"
import { worldData } from "../../world-data/world-data"
import { currentBase } from "../bases/bases-slice"
import { ResourceType } from "../fio/fio-types"
import { MaterialIcon, Icon, styleForMaterial } from "../ui/icons"
import { numberForUser } from "../utils/utils"
import styles from "./planet-search.module.css"

type SingleResult = {
  planet: string
  jumps: number
}

const materialTypeIcon: Record<ResourceType, string> = {
  "MINERAL": "🧱",
  "LIQUID": "💧",
  "GASEOUS": "☁️",
}

const DOWN = "▼";

const HEADERS = {
  Jumps: "#",
  Planet: "Planet",
  Fertility: "🌾",
  [`Type
Rocky or Gaseous`]: "🪐",
  Pressure: "💨",
  Temperature: "🌡️",
  Gravity: "⚛️",
}
const NUM_HEADERS = Object.keys(HEADERS).length

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
  const [sortColumn, setSortColumn] = useState(0)

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
      const res = (() => {
        if (sortColumn == 0)
          return a.jumps - b.jumps
        else if (sortColumn == 2)
          return worldData.planets[b.planet].surfaceData.fertility - worldData.planets[a.planet].surfaceData.fertility
        else {
          const filter = materialFilter[sortColumn - NUM_HEADERS]
          function getResourcePerDay(planet: string) {
            const res = worldData.planets[planet].resources.filter(r => r.material == filter)[0]
            return res ? res.perDay : 0
          }
          return getResourcePerDay(b.planet) - getResourcePerDay(a.planet)
        }
        return 0
      })()
      if (res == 0)
        return a.planet.localeCompare(b.planet)
      return res
    })

    setMatchingPlanets(newResult)
  }, [systems, maxJumps, buildingMaterials, sortColumn])

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
  // TODO: PERF!!!
  // TODO: make selected more visible
  function sortByColumn(column: number) {
    if (column == 0 || column == 2 || column >= NUM_HEADERS)
      return () => setSortColumn(column)
    return () => { }
  }

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
      <Icon label="🌾" hoverText="Fertility" size={32} />
      <div style={{ margin: 1, position: "relative" }}>
        <Icon label="Clear" size={32} colorClass="" onClick={() => setMaterialFilter([])} />
      </div>
      <div style={{ margin: 1, position: "relative" }}>
        <Icon label={materialFilterAnd ? "ALL" : "ANY"} hoverText="Toggle filtering any/all selected materials" size={32} colorClass="" onClick={() => setMaterialFilterAnd(!materialFilterAnd)} />
      </div>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {additionalBuildingMaterials.map(mat => <div style={{ margin: 1 }}>
        <MaterialIcon key={mat} materialId={mat} size={32} isSelected={buildingMaterials.indexOf(mat) != -1} onClick={toggleBuildingMaterialFilter} />
      </div>)}
    </div>
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            {Object.entries(HEADERS).map(([title, text], index) => <th title={title} onClick={sortByColumn(index)}>{text + (sortColumn == index ? DOWN : "")}</th>)}
            {materialFilter.map((filter, index) => <th title={filter} onClick={sortByColumn(NUM_HEADERS + index)}>{filter + (sortColumn == NUM_HEADERS + index ? DOWN : "")}</th>)}
            <th colSpan={5}></th>
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
              <td title={worldData.planets[r.planet].name}>{r.planet}</td>
              <td>{planet.surfaceData.fertility == -1 ? "-" : numberForUser(30 * planet.surfaceData.fertility) + "%"}</td>
              {[["MCG", "AEF"], ["SEA", "HSE"], ["INS", "TSH"], ["MGC", "BL"]].map(mats => {
                const used = mats.filter(m => planet.cmCosts[m])[0]
                return <td className={used ? styleForMaterial(used) : ""}>{used}</td>
              }).flat()}
              {
                materialFilter.map(filter => <td className={styleForMaterial(filter)} style={{ textAlign: "right" }}>
                  {planet.resources.filter(r => r.material == filter).map(r => numberForUser(r.perDay) + materialTypeIcon[r.type]).flat() || null}
                </td>
                )
              }
              {
                planet.resources.filter(r => materialFilter.indexOf(r.material) == -1).sort((a, b) => b.perDay - a.perDay).map(r => <>
                  <td className={styleForMaterial(r.material)} style={{ textAlign: "right" }}>{numberForUser(r.perDay) + r.material + materialTypeIcon[r.type]}</td>
                </>).concat(new Array(5).fill(<td />)).slice(0, 5).flat()
              }
            </tr>)
          })}
        </tbody>
      </table>
    </div>
  </div >
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
