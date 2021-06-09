import React from 'react'
import './App.css'
import BaseList from './features/bases/base-list'

function Planner() {
  return (<div>
    Prun Base Planner
    <BaseList />
  </div>)
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Planner />
      </header>
    </div >
  )
}

export default App
