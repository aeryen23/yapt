import React from "react"
import styles from "./base-page.module.css"
import { useParams } from "react-router-dom";
import { BaseBuilding, BaseWorkforce, selectBase, selectBaseExperts, setExpert } from "./bases-slice";
import { numberForUser } from "../utils/utils";
import { selectBuildings } from "../../world-data/world-data-slice";
import { BuildingType } from "../../world-data/world-data";
import { expertiseTranslations } from "../../world-data/translations";
import { BuildingCategory } from "../fio/fio-types";
import { useAppDispatch } from "../../app/hooks";

export const EXPERTISES: BuildingCategory[] = ["AGRICULTURE", "CHEMISTRY", "CONSTRUCTION", "ELECTRONICS", "FOOD_INDUSTRIES", "FUEL_REFINING", "MANUFACTURING", "METALLURGY", "RESOURCE_EXTRACTION"]
export const EXPERT_BONUS_PERCENT = [0, 3.06, 6.96, 12.48, 19.74, 28.40]

export function BasePage() {
  const { id } = useParams<{ id: string }>()
  const base = selectBase(id)
  if (!base)
    return <div>Base not found</div>

  return (<div className={styles.page}>
    <h1>{base.planet}</h1>
    <Experts id={id} />
    <ProductionBuildings buildings={base.buildings} />
    <InfrastructureBuildings buildings={base.buildings} />
    <Workforce workforce={base.workforce} />
    {/* <pre style={{ textAlign: "left<" }}>{JSON.stringify(base, undefined, " ")}</pre> */}
  </div>)
}

function Experts({ id }: { id: string }) {
  const dispatch = useAppDispatch()
  const experts = selectBaseExperts(id)
  return (<div>
    <h2>Experts</h2>
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Active</th>
          <th>Efficiency Gain</th>
        </tr>
      </thead>
      <tbody>
        {EXPERTISES.map(expertise => (<tr id={expertise}>
          <td>{expertiseTranslations[expertise]}</td>
          <td><input type="number" min="0" max="5" value={experts[expertise]} onChange={e => dispatch(setExpert({ id, expertise, amount: parseInt(e.target.value, 10) ?? 0 }))} /></td>
          <td>{EXPERT_BONUS_PERCENT[experts[expertise]]}</td>
        </tr>)).flat()}
      </tbody>
    </table>
  </div>)
}
function ProductionBuildings({ buildings }: { buildings: Record<string, BaseBuilding> }) {
  const buildingData = selectBuildings()
  const buildingIds = [...Object.keys(buildings).filter(id => buildingData[id].type == BuildingType.RESOURCES),
  ...Object.keys(buildings).filter(id => buildingData[id].type == BuildingType.PRODUCTION)]
  return (<div>
    <div>
      <h2>Buildings</h2>
      <table>
        <thead>
          <tr>
            <th>Building</th>
            <th>Amount</th>
            <th>Condition</th>
            <th>Efficiency</th>
          </tr>
        </thead>
        <tbody>
          {buildingIds.map(id => ({ ticker: id, building: buildings[id] })).map(({ ticker, building }) => (<tr key={ticker}>
            <td>{ticker}</td>
            <td>{building.amount}</td>
            <td>{numberForUser(building.condition * 100, 1) + "%"}</td>
            <td>{building.condition}</td>
          </tr>)).flat()}
        </tbody>
      </table>
    </div>
  </div>)
}

function InfrastructureBuildings({ buildings }: { buildings: Record<string, BaseBuilding> }) {
  const buildingData = selectBuildings()
  const buildingIds = [...Object.keys(buildings).filter(id => buildingData[id].type == BuildingType.HABITATION),
  ...Object.keys(buildings).filter(id => buildingData[id].type == BuildingType.STORAGE)]
  return (<div>
    <div>
      <h2>Infrastructure</h2>
      <table>
        <thead>
          <tr>
            <th>Building</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {buildingIds.map(id => ({ ticker: id, building: buildings[id] })).map(({ ticker, building }) => (<tr key={ticker}>
            <td>{ticker}</td>
            <td>{building.amount}</td>
          </tr>)).flat()}
        </tbody>
      </table>
    </div>
  </div>)
}

function Workforce({ workforce }: { workforce: BaseWorkforce }) {
  return (<div>
    <div>
      <h2>Workforce</h2>
      <table>
        <thead>
          <tr>
            <th>Level</th>
            <th>Required</th>
            <th>Current</th>
            <th>Capacity</th>
            <th>Satisfaction</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(workforce).map(([level, workforce]) => (<tr key={level}>
            <td>{level}</td>
            <td>{workforce.required}</td>
            <td>{workforce.current}</td>
            <td>{workforce.total}</td>
            <td>{numberForUser(workforce.satisfaction * 100, 1) + "%"}</td>
          </tr>)).flat()}
        </tbody>
      </table>
    </div>
  </div>)
}
