import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { BuildingType, PlanetResource, WorkforceLevel, worldData } from '../../world-data/world-data'
import { addBuilding, BaseBuilding, currentBase } from './bases-slice'
import { numberForUser } from '../utils/utils'
import styles from './base-screen.module.css'
import { SelectBuilding } from '../../world-data/buildings'

export default function BaseScreen() {
  // const dispatch = useAppDispatch()
  const current = currentBase()
  const planet = worldData.planets[current.planet]
  if (!planet)
    return <div>Error: could not find planet data for {current.planet}</div>

  return (<div>
    {current.name ? current.planet + " - " + current.name : current.planet}<br />
    <BaseResources resources={planet.resources} />
    <BaseBuildings />
  </div>)
}

function BaseResources({ resources }: { resources: PlanetResource[] }) {
  return (<div>
    Resources
    <table className={styles.resources}>
      <thead><tr><th>Material</th><th>Rate</th></tr></thead>
      <tbody>
        {resources.map(resource => <tr key={resource.material}><td>{resource.material}</td><td>{numberForUser(resource.perDay)}</td></tr>)}
      </tbody>
    </table>
  </div>)
}

function BaseBuildings() {
  const dispatch = useAppDispatch()
  const [building, setBuilding] = useState("")
  // filter out already built ones / change look by having all always available e.g. sorted by tier collapseable
  return <>
    <div style={{ border: "1px" }}>
      <SelectBuilding value={building} onChange={id => setBuilding(id)} />
      <button onClick={() => dispatch(addBuilding(building))}>+</button>
    </div>

    <BuildingList />
  </>
}
function BuildingList() {
  const current = currentBase()
  const buildings = Object.values(current.buildings).filter(b => b.amount > 0)
  const resourceBuildings = buildings.filter(b => worldData.buildings[b.building].type == BuildingType.RESOURCES)
  const productionBuildings = buildings.filter(b => worldData.buildings[b.building].type == BuildingType.PRODUCTION).reduce((acc, b) => {
    if (!acc[worldData.buildings[b.building].workforceLevel])
      acc[worldData.buildings[b.building].workforceLevel] = []
    acc[worldData.buildings[b.building].workforceLevel].push(b)
    return acc
  }, {} as Record<WorkforceLevel, BaseBuilding[]>)
  const buildingIds = buildings.map(b => b.building)
  buildingIds.map(id => worldData.buildings[id])

  function cat(name: string, buildings: BaseBuilding[]) {
    if (resourceBuildings.length == 0)
      return
    return (<>
      <tr key={name}><td colSpan={2} style={{ textAlign: "left" }}>{name}</td></tr>
      {buildings.map(bui => <tr key={bui.building}><td>{bui.amount}</td><td>{bui.building}</td></tr >)}
    </>)
  }

  return <table>
    <thead><th><td>Amount</td><td>Building</td></th></thead>
    <tbody>
      {cat("Resource", resourceBuildings)}
      {Object.entries(productionBuildings).map(([a, list]) => cat(a, list))}
    </tbody>
  </table>
}