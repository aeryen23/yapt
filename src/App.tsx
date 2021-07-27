import React from "react"
import { Route, Switch } from "react-router-dom"
import "./App.css"
// import { BaseScreen } from './features/bases/base-screen'
import { PlanetSearch } from "./features/planet-search/planet-search"
// import { RoiList } from './features/roi/roi'
// import { LongtermPlanner } from './features/longterm/longterm'
import DataLists from "./world-data/data-lists"
import { PlayerBaseStatistics } from "./features/bases/player-base-statistics"
import { TabDefinition, TabHeader } from "./features/ui/tabs"
import { Settings } from "./features/settings/settings"
import { isDevModeEnabled } from "./features/settings/settings-slice"

const pages: (TabDefinition & { hidden?: boolean })[] = [
  { id: "planetsearch", title: "Search planets", content: PlanetSearch },
  { id: "basecount", title: "Basecount", content: PlayerBaseStatistics },
  // { title: "Worklist", content: LongtermPlanner, hidden: true },
  // { title: "ROI list", content: RoiList, hidden: true },
  // { title: "Base", content: BaseScreen, hidden: true },
  { id: "settings", title: "⚙️", content: Settings },
]

// TODO: use HashRouter stuff to have separate urls for tabs
function App() {
  const pages2 = isDevModeEnabled() ? pages : pages.filter(p => !p.hidden)
  const head = null
  return (<>
    <DataLists />

    <div className="App">
      <div className="body">
        {head}
        <div className="main">
          <TabHeader tabs={pages2} currentTab="planetsearch" setCurrentTab={()=>{/**/}} />
          <Switch>
            <Route exact path="">

            </Route>
          </Switch>
        </div>
      </div>
    </div >
  </>)
}

export default App
