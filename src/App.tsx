import React from "react"
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom"
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

function App() {
  const pages2 = isDevModeEnabled() ? pages : pages.filter(p => !p.hidden)
  const history = useHistory()
  const currentTab = useLocation().pathname.substr(1)

  return (<>
    <DataLists />

    <div className="App">
      <div className="body">
        <div className="main">
          <TabHeader tabs={pages2} currentTab={currentTab} setCurrentTab={tabId => history.push("/" + tabId)} />
          <Switch>
            {pages.map(page => {
              const Content = page.content
              return (<Route exact path={"/" + page.id}>
                <Content />
              </Route>)
            })}
            <Route exact path="/">
              <Redirect to={"/" + pages[0].id} />
            </Route>
          </Switch>
        </div>
      </div>
    </div >
  </>)
}

export default App

function Statistics() {
  // TODO use nested routing and list PlayerBaseStatistics here
}
