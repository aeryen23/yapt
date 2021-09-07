import { createSelector } from "@reduxjs/toolkit"
import React, { useEffect, useMemo, useState } from "react"
import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { RootState } from "../../app/store"
import { SystemInput } from "../../world-data/data-lists"
import { buildingTranslations } from "../../world-data/translations"
import { getPlanetMaterials, PlanetInfrastructure, PlanetResource, System } from "../../world-data/world-data"
import { hasData, IdMap, selectBuildings, selectMaterials, selectPlanet, selectPlanetsMaxResources, selectPlanetsPerSystem, selectSystems } from "../../world-data/world-data-slice"
import { ResourceType } from "../fio/fio-types"
import { MaterialIcon, Icon, styleForMaterial } from "../ui/icons"
import { isEmpty, numberForUser } from "../utils/utils"
import { clearMaterialFilter, resetBuildingMaterialFilter, selectBuildingMaterialFilter, selectMaterialFilter, selectMaterialFilterAnd, selectMaxJumps, selectMinimumExtractionRatePercentage, selectStartSystem, setMaterialFilterAnd, setMaxJumps, setMinimumExtractionRatePercentage, setStartSystem, toggleBuildingMaterialFilter, toggleMaterialFilter } from "./planet-search-slice"
import styles from "./planet-search.module.css"

/*
- fix unicode chars that are not working on phone: 🪐🧱
- correctly remembering what is sorted
- different cursor hover sorting headers
- explanation(help) window explaining what the fields mean
- filter out planets with resources less than a specified value/percentage
- show infrastructure projects + filter?
- better visibility for selected (building-)material filter
- check layout on phone

  Settings:
  - fertile
  - already existing planetary buildings?
  - minimum production/day

  TODO: show max available material rate in material filter of currently available planets + hide materials for which no planets are available anymore
  TODO: add option to hide planets without resources even if no filter is selected
  TODO: PERF!!!
  TODO: make selected more visible

  -----
  and if you're adding counters, another useful one would be  a "number of planets containing this resourse", on the tooltip
*/

type SingleResult = {
  planet: string
  jumps: number
}

const materialTypeIcon: Record<ResourceType, string> = {
  "MINERAL": "🧱",
  "LIQUID": "💧",
  "GASEOUS": "☁️",
}

const DOWN = "▼"

const HEADERS = {
  Jumps: "#",
  Planet: "Planet",
  Fertility: "🌱",
  [`Type
Rocky or Gaseous`]: "🪐",
  Pressure: "💨",
  Temperature: "🌡️",
  Gravity: "⚛️",
}
const NUM_HEADERS = Object.keys(HEADERS).length

const test = "📉📈💰"

const additionalBuildingMaterials = ["MCG", "AEF", "SEA", "HSE", "INS", "TSH", "MGC", "BL"]

export function PlanetSearch() {
  if (!hasData(["material", "system", "planet"]))
    return <Loading />
  return <PlanetSearchInternal />
}

const CX_SYSTEMS = { AI1: "ZV-307", CI1: "UV-351", IC1: "VH-331", NC1: "OT-580" }

function PlanetSearchInternal() {
  const dispatch = useAppDispatch()
  const systems = selectSystems()
  const { planets, planetsPerSystem } = selectPlanetsPerSystem()
  const maxResources = selectPlanetsMaxResources()

  const startSystem = selectStartSystem()
  const materialFilter = selectMaterialFilter()
  const materialFilterAnd = selectMaterialFilterAnd()
  const maxJumps = selectMaxJumps()
  const buildingMaterials = selectBuildingMaterialFilter()
  const [sortColumn, setSortColumn] = useState("jumps")
  const minimumExtractionRatePercentage = selectMinimumExtractionRatePercentage()

  const cxDistances = useMemo(() =>
    Object.entries(CX_SYSTEMS).reduce((acc, [cx, system]) => ({ ...acc, [cx]: calculateSystemDistances(system, systems) }), {} as Record<string, Map<string, number>>)
    , [systems])
  const distanceFromStartSystem = useMemo(() => calculateSystemDistances(startSystem, systems), [systems, startSystem])

  const matchingSystems = useMemo(() => {
    console.time("Evaluate systems")
    const result: string[] = []
    for (const [system, jumps] of distanceFromStartSystem) {
      if (maxJumps !== undefined && jumps > maxJumps)
        continue
      result.push(system)
    }
    console.timeEnd("Evaluate systems")
    return result
  }, [distanceFromStartSystem, maxJumps])
  const minRates: Record<string, number> | undefined = useMemo(() => {
    if (!minimumExtractionRatePercentage || minimumExtractionRatePercentage == 0)
      return undefined
    return Object.entries(maxResources).reduce((acc, [mat, rate]) => ({ ...acc, [mat]: rate * minimumExtractionRatePercentage / 100 }), {} as Record<string, number>)
  }, [minimumExtractionRatePercentage, maxResources])

  const allowedByMaterialFilter = useMemo(() => (planetId: string) => {
    if (materialFilter.length == 0) {
      if (minRates) {
        for (const { material, perDay } of planets[planetId].resources)
          if (minRates[material] <= perDay)
            return true
        return false
      }
      return true
    }
    const materials = planets[planetId].resources.map(r => r.material)
    if (minRates && materials.length == 0)
      return false
    let numMatchingMaterials = 0
    for (const { material, perDay } of planets[planetId].resources) {
      if (minRates && minRates[material] > perDay)
        continue
      if (materialFilter.indexOf(material) != -1) {
        if (materialFilterAnd)
          ++numMatchingMaterials
        else
          return true
      }
    }
    return materialFilterAnd && numMatchingMaterials == materialFilter.length
  }, [planets, materialFilter, materialFilterAnd, minRates])
  const matchingPlanets = useMemo(() => {
    console.time("Evaluate planets")
    const newResult: string[] = []
    for (const system of matchingSystems) {
      for (const planetId of planetsPerSystem[system]) {
        let hasAllBuildingCosts = true
        for (const mat of Object.keys(getPlanetMaterials(planets[planetId]))) {
          if (additionalBuildingMaterials.indexOf(mat) == -1)
            continue // only check for the additional costs
          if (buildingMaterials.indexOf(mat) == -1) {
            hasAllBuildingCosts = false
            break
          }
        }
        if (!hasAllBuildingCosts)
          continue
        if (!allowedByMaterialFilter(planetId))
          continue
        newResult.push(planetId)
      }
    }
    console.timeEnd("Evaluate planets")
    return newResult
  }, [matchingSystems, planetsPerSystem, buildingMaterials, allowedByMaterialFilter])

  const sortedPlanets = useMemo(() => {
    console.time("Sorting planets")
    const result = [...matchingPlanets].sort((a, b) => {
      // TODO: sort necessary building mats (per column), both mats alphabetically, then no mat
      // TODO: sorting does not work when e.g. mat filter changes. also using a number does not work when columns can be added in the middle
      const getDistanceFromStartSystem = (planet: string) => { return distanceFromStartSystem.get(planets[planet].system) ?? 0 }
      const res = (() => {
        if (materialFilter.includes(sortColumn)) {
          const getResourcePerDay = (id: string) => planets[id].resources.find(r => r.material == sortColumn)?.perDay ?? 0
          return getResourcePerDay(b) - getResourcePerDay(a)
        }
        if (Object.keys(cxDistances).includes(sortColumn)) {
          const getJumps = (planet: string) => { return cxDistances[sortColumn].get(planets[planet].system)! }
          return getJumps(a) - getJumps(b)
        }
        switch (sortColumn) {
          case "jumps":
            return getDistanceFromStartSystem(a) - getDistanceFromStartSystem(b)
          case "name":
            return a.localeCompare(b)
          case "fertility":
            return planets[b].environment.fertility - planets[a].environment.fertility
        }
        console.error("Missing sort handling for ", sortColumn)
        return 0
      })()

      if (res == 0)
        return getDistanceFromStartSystem(a) - getDistanceFromStartSystem(b)
      return res
    })

    console.timeEnd("Sorting planets")
    return result
  }, [matchingPlanets, planets, sortColumn, cxDistances])

  const materials = selectMaterials()

  const allResources = useMemo(() => {
    const mats = Object.keys(maxResources)
    const cat2mats = mats.reduce((acc, mat) => {
      if (!materials[mat]) {
        console.error("missing mat", mat, materials)
        return acc
      }
      const cat = materials[mat].category
      if (!acc[cat])
        acc[cat] = []
      acc[cat].push(mat)
      return acc
    }, {} as Record<string, string[]>)
    return Object.keys(cat2mats).sort().map(category => ({ category, materials: cat2mats[category].sort() }))
  }, [materials, maxResources])

  const columns = useMemo(() => [
    { text: "#", title: "Jumps", id: "jumps", sort: true },
    { text: "Planet", id: "name" },
    { text: "🌱", title: "Fertility", id: "fertility", sort: true },
    {
      text: "🪐", title: `Type
Rocky or Gaseous`, id: "type"
    },
    { text: "💨", title: "Pressure", id: "pressure" },
    { text: "🌡️", title: "Temperature", id: "temperature" },
    { text: "⚛️", title: "Gravity", id: "gravity" },
    ...materialFilter.map(filter => ({ text: filter, id: filter, sort: true })),
    ...Array(5).fill(0).map((_, index) => ({ text: "", id: "other_resources_" + index })),
    ...Object.keys(cxDistances).map(cx => ({ text: cx, id: cx, sort: true })),
    { text: "Faction", id: "faction" },
    { text: "Infrastructure", id: "infrastructure" },
  ] as SortableTableColumn[], [materialFilter, cxDistances]);

  useEffect(() => {
    if (columns.find(a => a.id == sortColumn) === undefined)
      setSortColumn(columns[0].id)
  }, [columns, sortColumn])

  return <div>
    <div style={{ border: "1 solid white" }}>
      System: <SystemInput system={startSystem} onChange={v => dispatch(setStartSystem(v))} />
      Jumps: <input type="number" value={maxJumps ?? ""} onChange={e => {
        const jumps = parseInt(e.target.value, 10)
        dispatch(setMaxJumps(isNaN(jumps) ? undefined : jumps))
      }} />
      Quick select: {Object.values(CX_SYSTEMS).map(id => <a key={id} style={{ margin: 1 }} onClick={() => dispatch(setStartSystem(id))}>{systems[id].name}</a>).flat()}
      <label title="Minimum percentage of materials rate in comparison to universe maximum">
        Minimum Extraction Rate: <input type="number" value={minimumExtractionRatePercentage} min="0" max="100" onChange={e => {
          const minRateP = parseInt(e.target.value, 10)
          dispatch(setMinimumExtractionRatePercentage(isNaN(minRateP) ? undefined : minRateP))
        }} />%</label>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {
        allResources.map(o => o.materials.map(mat => <div key={mat} style={{ margin: 1 }}>
          <MaterialIcon key={mat} materialId={mat} size={32} isSelected={materialFilter.indexOf(mat) != -1} onClick={material => dispatch(toggleMaterialFilter(material))} />
        </div>)).flat()
      }
      <div style={{ margin: 1, position: "relative" }}>
        <Icon label="Clear" size={32} colorClass="" onClick={() => dispatch(clearMaterialFilter())} />
      </div>
      <div style={{ margin: 1, position: "relative" }}>
        <Icon label={materialFilterAnd ? "ALL" : "ANY"} hoverText="Toggle filtering any/all selected materials" size={32} colorClass="" onClick={() => dispatch(setMaterialFilterAnd(!materialFilterAnd))} />
      </div>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <Icon label="🌱" hoverText="Fertility" size={32} />
      {additionalBuildingMaterials.map(mat => <div key={mat} style={{ margin: 1 }}>
        <MaterialIcon key={mat} materialId={mat} size={32} isSelected={buildingMaterials.indexOf(mat) != -1} onClick={mat => dispatch(toggleBuildingMaterialFilter(mat))} />
      </div>)}
      <div style={{ margin: 1, position: "relative" }}>
        <Icon label="Reset" size={32} colorClass="" onClick={() => dispatch(resetBuildingMaterialFilter(false))} />
      </div>
      <div style={{ margin: 1, position: "relative" }}>
        <Icon label="All" hoverText="Select all building materials" size={32} colorClass="" onClick={() => dispatch(resetBuildingMaterialFilter(true))} />
      </div>
    </div>
    <div>
      <table className={styles.table}>
        <PlanetSearchResultHeader columns={columns} setSortColumn={setSortColumn} sortColumn={sortColumn} />
        <tbody>
          {sortedPlanets.map(planetId => <tr key={planetId}>
            <PlanetSearchResult planetId={planetId} startSystem={startSystem} materialFilter={materialFilter} minRates={minRates} cxDistances={cxDistances} />
          </tr>)}
        </tbody>
      </table>
    </div>
  </div >
}

// function MaterialSelection({ onChanged }: { onChanged: (selected: string[]) => void)} {
//   const [materialFilter, setMaterialFilter] = useState([] as string[])

//   function toggleMaterialFilter(mat: string) {
//     if (materialFilter.indexOf(mat) == -1)
//       setMaterialFilter([...materialFilter, mat])
//     else {
//       setMaterialFilter(materialFilter.filter(m => m != mat))
//       // TODO: if filtered material as the current sorting one, reset sort order
//     }
//   }

//   return (<div style={{ display: "flex", flexWrap: "wrap" }}>
//     {
//       allResources.map(o => o.materials.map(mat => <div key={mat} style={{ margin: 1 }}>
//         <MaterialIcon key={mat} materialId={mat} size={32} isSelected={materialFilter.indexOf(mat) != -1} onClick={toggleMaterialFilter} />
//       </div>)).flat()
//     }
//     <div style={{ margin: 1, position: "relative" }}>
//       <Icon label="Reset" size={32} colorClass="" onClick={() => setMaterialFilter([])} />
//     </div>
//     <div style={{ margin: 1, position: "relative" }}>
//       <Icon label={materialFilterAnd ? "ALL" : "ANY"} hoverText="Toggle filtering any/all selected materials" size={32} colorClass="" onClick={() => setMaterialFilterAnd(!materialFilterAnd)} />
//     </div>
//   </div>)
// }

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

function PlanetSearchResultHeader({ columns, setSortColumn, sortColumn }: { columns: SortableTableColumn[], setSortColumn: React.Dispatch<React.SetStateAction<string>>, sortColumn: string }) {
  return (<thead>
    <tr>
      {columns.map(col => <th key={col.id} title={col.title} onClick={col.sort ? () => setSortColumn(col.id) : undefined}>{col.text + (col.id == sortColumn ? DOWN : "")}</th>)}
    </tr>
    {/* <th></th>
    {Object.entries(HEADERS).map(([title, text], index) => <th key={text} title={title} onClick={sortByColumn(index)}>{text + (sortColumn == index ? DOWN : "")}</th>)}
    {materialFilter.map((filter, index) => <th key={filter} title={filter} onClick={sortByColumn(NUM_HEADERS + index)}>{filter + (sortColumn == NUM_HEADERS + index ? DOWN : "")}</th>)}
    <th colSpan={5}></th>
    {Object.keys(cxDistances).map((cx, index) => <th key={cx} onClick={sortByColumn(NUM_HEADERS + materialFilter.length + 5 + index)}>{cx + (sortColumn == NUM_HEADERS + materialFilter.length + 5 + index ? DOWN : "")}</th>)}
    <th>Faction</th>
    <th>Infrastructure</th> */}
  </thead>)
}

function calculateSystemDistances(startSystem: string, systems: IdMap<System>) {
  console.log("calculateSystemDistances", startSystem)
  // TODO: it can take 15ms to evaluate all planets :/
  const evaluated = new Map<string, number>()
  evaluated.set(startSystem, 0)
  if (isEmpty(systems))
    return evaluated
  let next = []
  let later = [startSystem]
  while (later.length) {
    next = later
    later = []
    while (next.length) {
      const checkId: string = next.pop()!
      const jumps = evaluated.get(checkId)! + 1
      const check = systems[checkId]
      if (!check) {
        console.error("system not found", checkId, systems)
        continue
      }
      for (const other of check.connections) {
        if (evaluated.has(other))
          continue
        evaluated.set(other, jumps)
        later.push(other)
      }
    }
  }
  return evaluated
}

/*
- createSelector does only cache the last call to it (parameters) => can't really be used for multiple locations with different input parameters
  => should create 1 selector instance per component -> can not share between components
- should store the selected start system -> could calculate when setting + planets update
- try something with createApi?
*/
const selectSystemDistances = createSelector([(state: RootState) => state.worldData.system.data, (state: RootState, startSystem: string) => startSystem], (systems, startSystem) => {
  return calculateSystemDistances(startSystem, systems)
})

function getSystemDistances(startSystem: string) {
  return useAppSelector(state => selectSystemDistances(state, startSystem))
}

const BUILDING_FOR_RESOURCE_TYPE: Record<PlanetResource["type"], string> = {
  "GASEOUS": "COL",
  "LIQUID": "RIG",
  "MINERAL": "EXT",
}

function PlanetSearchResult({ planetId, startSystem, materialFilter, minRates, cxDistances }: { planetId: string, startSystem: string, materialFilter: string[], minRates: Record<string, number> | undefined, cxDistances: Record<string, Map<string, number>> }) {
  const planet = selectPlanet(planetId)
  const materials = selectMaterials()
  const planetMaterials = Object.keys(getPlanetMaterials(planet))
  const maxResources = selectPlanetsMaxResources()
  const distances = getSystemDistances(startSystem)

  function showResource(r: PlanetResource) {
    const percentage = r.perDay / maxResources[r.material]
    return (<div style={{ justifyContent: "flex-end", alignItems: "flex-end", display: "flex" }}>
      {numberForUser(r.perDay) + materialTypeIcon[r.type]}
      <div className={styles.resourceIndicator} style={{ background: `linear-gradient(transparent ${(1 - percentage) * 100}%, rgb(${(1 - percentage) * 255}, ${percentage * 255}, 0) 0%)` }} />
    </div>)
  }
  function getResourceTooltip(r: PlanetResource): string {
    return `${r.material}
Type: ${r.type} ➤ ${BUILDING_FOR_RESOURCE_TYPE[r.type]}
Per day: ${numberForUser(r.perDay)}
Universe maximum: ${numberForUser(100 * r.perDay / maxResources[r.material], 0)}% of ${numberForUser(maxResources[r.material])}`
  }

  const planetName = planetId == planet.name ? "" : planet.name;

  return (<>
    <td>{distances.get(planet.system)}</td>
    <td title={planetName} style={{ textAlign: "left" }}>{planetId + (planetId == planet.name ? "" : " (" + planet.name + ")")}</td>
    <td>{planet.environment.fertility == -1 ? "-" : numberForUser(100 / 3.3 * planet.environment.fertility) + "%"}</td>
    {[["MCG", "AEF"], ["SEA", "HSE"], ["INS", "TSH"], ["MGC", "BL"]].map(mats => {
      const used = mats.filter(m => planetMaterials.indexOf(m) != -1)[0]
      return <td key={mats.join()} className={used ? styleForMaterial(materials[used]?.category) : ""}>{used}</td>
    }).flat()}
    {
      materialFilter.map(filter => {
        const pr = planet.resources.filter(r => r.material == filter).shift()
        if (pr)
          return <td key={filter} className={styleForMaterial(materials[filter]?.category)} title={getResourceTooltip(pr)}>
            {showResource(pr)}
          </td>
        return <td key={filter}></td>
      })
    }
    {
      planet.resources.filter(r => materialFilter.indexOf(r.material) == -1).sort((a, b) => b.perDay - a.perDay).map(r =>
        <td key={r.material} className={styleForMaterial(materials[r.material]?.category)} style={{ textAlign: "right" }} title={getResourceTooltip(r)}>
          {<div style={{ display: "flex", justifyContent: "space-between", color: minRates && minRates[r.material] > r.perDay ? "grey" : undefined }}><div> {r.material}</div>{showResource(r)}</div>}
        </td>
      ).concat(new Array(5).fill(0).map((_, idx) => <td key={"filler" + idx} />)).slice(0, 5).flat()
    }
    {Object.entries(cxDistances).map(([cx, distPerSystem]) => <td key={cx}>{distPerSystem.get(planet.system)}</td>)}
    <td>
      {planet.factionCode ?? "-"}
    </td>
    <td><Infrastructure infrastructure={planet.infrastructure} /></td>
  </>)
}

const infrastructureIcons = {
  "ADM": "🏛️",
  "LM": "🏪",
  "COG": "🏦",
  "PWH": "🏬",
  "PSY": "🏗️",
}

const infrastructureAvailableKey: Record<keyof typeof infrastructureIcons, keyof PlanetInfrastructure> = {
  "ADM": "hasAdministrationCenter",
  "LM": "hasLocalMarket",
  "COG": "hasChamberOfCommerce",
  "PWH": "hasWarehouse",
  "PSY": "hasShipyard",
}
function Infrastructure({ infrastructure }: { infrastructure: PlanetInfrastructure }) {
  const buildings = selectBuildings()

  function showInfra(code: keyof typeof infrastructureIcons) {
    if (infrastructure[infrastructureAvailableKey[code]])
      return <span key={code} title={code + "\n" + buildingTranslations[buildings[code].name].name}>{infrastructureIcons[code]}</span>
  }

  return <>
    {Object.keys(infrastructureIcons).map(code => showInfra(code as keyof typeof infrastructureIcons)).flat()}
  </>
}

type SortableTableColumn = {
  text: string
  title?: string
  id: string
  sort?: boolean
}
// function SortableTableInternal<T extends Record<string, string | number> & { key: string }, K extends keyof T>({ headers, entries, sortFn = {} }: { headers: K[], entries: T[], sortFn?: Partial<Record<K, (a: T[K], b: T[K]) => number>> }) {

function SortableTable<T extends Record<string, string | number> & { key: string }, K extends keyof T>({ columns, entries }: { columns: SortableTableColumn[], entries: T[] }) {
  const [sortColumn, setSortColumn] = useState(() => columns.find(col => col.sort)?.id ?? "")
  return (<table className={styles.table}>
    <thead>
      <tr>
        {columns.map(col => <th key={col.id} title={col.title} onClick={col.sort ? () => setSortColumn(col.id) : undefined}>{col.text + (col.id == sortColumn ? DOWN : "")}</th>)}
      </tr>
    </thead>
    <tbody>
      {entries.map(entry => (<tr key={entry.id}>
        {columns.map(col => (<td key={col.id}>{
          entry[col.id]
        }</td>)).flat()}
      </tr>))}
      {/* {matchingPlanets.filter(r => {
        if (materialFilter.length == 0)
          return true
        const materials = planets[r.planet].resources.map(r => r.material)
        for (const filter of materialFilter) {
          if (materials.indexOf(filter) != -1) {
            if (!materialFilterAnd)
              return true
          } else if (materialFilterAnd) {
            return false
          }
        }
        return materialFilterAnd
      }).map((r, index) => <tr key={r.planet}>
        <td>{index + 1}</td>
        <PlanetSearchResult planetId={r.planet} startSystem={startSystem} materialFilter={materialFilter} cxDistances={cxDistances} />
      </tr>)} */}
    </tbody>
  </table>)


  //   const headerNames = ["Jumps", "Name", "Rate"];
  //   const entries = [{ key: "1", jumps: 20, name: "A", rate: "10.2" }, { key: "2", jumps: 3, name: "C", rate: "2.5" }, { key: "3", jumps: 10, name: "B", rate: "2.5" }];
  //   const headerKeys = ["jumps", "name", "rate"];
  //   const sortFn = {
  //     jumps: (a: number, b: number) => a - b
  //   }

  //   return <SortableTableInternal headers={["jumps", "name", "rate"]} entries={entries} />
}


// /**
//  * - sort by number, but display e.g. only 2 decimal places
//  * - sort inc/dec(/toggle?)
//  * - string sort
//  * - no sort on column
//  */
// type TableSortFunctions<T, K extends keyof T> = Partial<Record<K, (a: T[K], b: T[K]) => number>>

// function SortableTableInternal<T extends Record<string, string | number> & { key: string }, K extends keyof T>({ headers, entries, sortFn = {} }: { headers: K[], entries: T[], sortFn?: Partial<Record<K, (a: T[K], b: T[K]) => number>> }) {
//   const sortedEntries = [...entries]
//   const [sortedField, setSortedField] = useState(headers[0])

//   // const sf = sortFn[headers[0]];
//   // if (sf)
//   //   sortedEntries.sort((a, b) => sf(a[headers[0]], b[headers[0]]))

//   // needs some values to inc, some to dec
//   sortedEntries.sort((a, b) => a[sortedField] - b[sortedField]) // -> does not work with strings -> NaN -> does not sort

//   return (<table>
//     <thead>
//       <tr>
//         {headers.map(header => sortFn[header] ? <td onClick={() => setSortedField(header)}>{header}</td> : <td>{header}</td>)}
//       </tr>
//     </thead>
//     <tbody>
//       {sortedEntries.map(e => <tr key={e.key}>{headers.map(key => <td>{e[key]}</td>)}</tr>)}
//     </tbody>
//   </table>)
// }

// TODO: Material listings with prices / production chain planning

function Loading() {
  return <div>Loading Fio Data</div>
}
