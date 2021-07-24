import React from 'react'
import './App.css'
// import { BaseScreen } from './features/bases/base-screen'
import { PlanetSearch } from './features/planet-search/planet-search'
// import { RoiList } from './features/roi/roi'
// import { LongtermPlanner } from './features/longterm/longterm'
import DataLists from './world-data/data-lists'
import { PlayerBaseStatistics } from './features/bases/player-base-statistics'
import { Tabs } from './features/ui/tabs'
import { selectPlanets } from './world-data/world-data-slice'
import { Settings } from './features/settings/settings'
import { isDevModeEnabled } from './features/settings/settings-slice'

const pages = [
  { title: "Search planets", content: PlanetSearch },
  { title: "Basecount", content: PlayerBaseStatistics },
  // { title: "Worklist", content: LongtermPlanner },
  // { title: "ROI list", content: RoiList },
  // { title: "Base", content: BaseScreen },
  { title: "⚙️", content: Settings },
]

function App() {
  const pages2 = isDevModeEnabled() ? pages : pages.filter(p => p.title == "Search planets" || p.title == "Basecount" || p.title == "⚙️")
  const head = null
  return (<>
    <div className="App">
      <div className="body">
        {head}
        <div className="main">
          <Tabs tabs={pages2} />
        </div>
      </div>
    </div >
    <DataLists />
  </>)
}

export default App
