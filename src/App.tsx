import React from "react"
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom"
import styles from "./App.module.css"
// import { BaseScreen } from './features/bases/base-screen'
import { PlanetSearch } from "./features/planet-search/planet-search"
// import { RoiList } from './features/roi/roi'
// import { LongtermPlanner } from './features/longterm/longterm'
import DataLists from "./world-data/data-lists"
import { PlayerBaseStatistics } from "./features/bases/player-base-statistics"
import { TabDefinition, TabHeader } from "./features/ui/tabs"
import { Settings } from "./features/settings/settings"
import { isDevModeEnabled, isExperimentalMode } from "./features/settings/settings-slice"
import { FindCompanyOrders } from "./features/commodity-exchange/find-company-orders"

const pages: (TabDefinition & { experimental?: boolean, hidden?: boolean })[] = [
  { id: "planetsearch", title: "Search planets", content: PlanetSearch },
  { id: "basecount", title: "Basecount", content: PlayerBaseStatistics },
  // { title: "Worklist", content: LongtermPlanner, hidden: true },
  // { title: "ROI list", content: RoiList, hidden: true },
  // { title: "Base", content: BaseScreen, hidden: true },
  { id: "find-company-orders", title: "Find Company Orders", content: FindCompanyOrders, experimental: true },
  { id: "settings", title: "⚙️", content: Settings },
]

function App() {
  const isDev = isDevModeEnabled()
  const isExperimental = isExperimentalMode()
  const usablePages = isDev ? pages : pages.filter(p => !p.hidden)
  const visiblePages = isExperimental || isDev ? usablePages : usablePages.filter(p => !p.experimental)
  const history = useHistory()
  const currentTab = useLocation().pathname.substr(1)

  return (<>
    <DataLists />

    <div className={styles.App}>
      <TabHeader tabs={visiblePages} currentTab={currentTab} setCurrentTab={tabId => history.push("/" + tabId)} />
      <Switch>
        {usablePages.map(page => {
          const Content = page.content
          return (<Route key={page.id} exact path={"/" + page.id}>
            <Content />
          </Route>)
        })}
        <Route exact path="/">
          <Redirect to={"/" + visiblePages[0].id} />
        </Route>
      </Switch>
    </div >
  </>)
}

export default App

function Statistics() {
  // TODO use nested routing and list PlayerBaseStatistics here
}
