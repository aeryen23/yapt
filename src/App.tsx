import React from 'react'
import './App.css'
// import { BaseScreen } from './features/bases/base-screen'
import { PlanetSearch } from './features/planet-search/planet-search'
// import { RoiList } from './features/roi/roi'
// import { LongtermPlanner } from './features/longterm/longterm'
import DataLists from './world-data/data-lists'
import { PlayerBaseStatistics } from './features/bases/player-base-statistics'
import { TabDefinition, Tabs } from './features/ui/tabs'
import { Settings } from './features/settings/settings'
import { isDevModeEnabled } from './features/settings/settings-slice'

const pages: (TabDefinition & { hidden?: boolean })[] = [
  { title: "Search planets", content: PlanetSearch },
  { title: "Basecount", content: PlayerBaseStatistics },
  // { title: "Worklist", content: LongtermPlanner, hidden: true },
  // { title: "ROI list", content: RoiList, hidden: true },
  // { title: "Base", content: BaseScreen, hidden: true },
  { title: "⚙️", content: Settings },
]

function App() {
  const pages2 = isDevModeEnabled() ? pages : pages.filter(p => !p.hidden)
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
