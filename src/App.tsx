import React from 'react'
import './App.css'
// import { BaseScreen } from './features/bases/base-screen'
import { PlanetSearch } from './features/planet-search/planet-search'
// import { RoiList } from './features/roi/roi'
// import { LongtermPlanner } from './features/longterm/longterm'
// import DataLists from './world-data/data-lists'
import { PlayerBaseStatistics } from './features/bases/player-base-statistics'
import { Tabs } from './features/ui/tabs'
import { selectPlanets } from './world-data/world-data-slice'

const pages = [
  { title: "test", content: Test },
  { title: "Search planets", content: PlanetSearch },
  { title: "Basecount", content: PlayerBaseStatistics },
  // { title: "Worklist", content: LongtermPlanner },
  // { title: "ROI list", content: RoiList },
  // { title: "Base", content: BaseScreen },
]

function App() {
  const head = null
  return (<>
    <div className="App">
      <div className="body">
        {head}
        <div className="main">
          <Tabs tabs={pages} />
        </div>
      </div>
    </div >
    {/* <DataLists /> */}
  </>)
}

export default App

function Test() {
  const planets = selectPlanets()
  const planetIds = Object.values(planets).map(p => p.id)
  if (planetIds.length == 0)
    return <div>Loading</div>
  return (<div>
    {planetIds.slice(0, 10).join(" ")}
  </div>)
}
