import React from 'react'
import './App.css'
// import { BaseScreen } from './features/bases/base-screen'
// import { PlanetSearch } from './features/planet-search/planet-search'
// import { RoiList } from './features/roi/roi'
// import { LongtermPlanner } from './features/longterm/longterm'
// import DataLists from './world-data/data-lists'
// import { PlayerBaseStatistics } from './features/bases/player-base-statistics'
import { Tabs } from './features/ui/tabs'
import { selectPlanets } from './world-data/world-data-slice'

const pages = [
  { title: "test", content: Test },
  // { title: "Search planets", content: PlanetSearch },
  // { title: "Basecount", content: PlayerBaseStatistics },
  // { title: "Worklist", content: LongtermPlanner },
  // { title: "ROI list", content: RoiList },
  // { title: "Base", content: BaseScreen },
]

function App() {
  const head = null
  const body = <Tabs tabs={pages} />
  return (
    <div className="App">
      {/* <DataLists /> */}
      <div className="body">
        {head}
        <div className="main">
          {body}
        </div>
      </div>
    </div >
  )
}

export default App

function Test() {
  const planets = selectPlanets()
  const planetIds = Object.keys(planets)
  if (planetIds.length == 0)
    return <div>Loading</div>
  return (<div>
    {planetIds.slice(0, 10).join(" ")}
  </div>)
}
