import React from 'react'
import './App.css'
import BaseSelection from './features/bases/base-selection'
import BaseScreen from './features/bases/base-screen'
import PlanetSearch from './features/planet-search/planet-search'
import DataLists from './world-data/data-lists'

function Planner() {
  if (true)
    return <PlanetSearch />
  return <BaseScreen />
}

function App() {
  const head = "Prun Base Planner"
  const body = <Planner />
  const foot = <div className="foot"><BaseSelection /></div>
  return (
    <div className="App">
      <DataLists />
      <header className="App-header">
        <div className="body">
          {head}
          <div className="main">
            {body}
          </div>
          {foot}
        </div>
      </header>
    </div >
  )
}

export default App
