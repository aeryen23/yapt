import React from 'react'
import './App.css'
import { BaseScreen } from './features/bases/base-screen'
import { PlanetSearch} from './features/planet-search/planet-search'
import { RoiList } from './features/roi/roi'
import { LongtermPlanner } from './features/longterm/longterm'
import DataLists from './world-data/data-lists'
import { PlayerBaseStatistics } from './features/bases/player-base-statistics'
import { Tabs } from './features/ui/tabs'

const pages = [
  { title: "Search planets", content: PlanetSearch },
  { title: "Basecount", content: PlayerBaseStatistics },
  { title: "Worklist", content: LongtermPlanner },
  { title: "ROI list", content: RoiList }, 
  { title: "Base", content: BaseScreen },
]

function App() {
  const head = null
  const body = <Tabs tabs={pages} />
  return (
    <div className="App">
      <DataLists />
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
