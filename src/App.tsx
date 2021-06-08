import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { incrementByAmount } from './features/counter/CounterSlice'
import { useFetchPlanetQuery } from './features/fio/fio-api-slice'

function App() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const handleClick = () => dispatch(incrementByAmount(6))

  const [planet, setPlanet] = useState("Montem")

  const { data, isFetching } = useFetchPlanetQuery(planet)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={handleClick}>
            count is: {count}
          </button>
        </p>
        <div>
          <label>
            Planet: {planet} <br/>
          <input type="text" defaultValue={planet} onKeyDown={(event) => {
              if (event.key === 'Enter')
                setPlanet(event.target.value)
            }} />
          </label>
          {!isFetching &&
            <table>
              <thead>
                <tr><th>Material</th><th>Type</th><th>Factor</th></tr>
              </thead>
              <tbody>
                {data?.Resources.map(res => <tr key={res.MaterialId}><td>{res.MaterialId}</td><td>{res.ResourceType}</td><td>{Math.trunc(res.Factor * 1000)/10 + "%"}</td></tr>)}
              </tbody>
            </table>
          }
        </div>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div >
  )
}

export default App
