import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { initDb } from './features/fio/fio-get'

console.time("loading fio data")
initDb().then(() => console.timeEnd("loading fio data"))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
