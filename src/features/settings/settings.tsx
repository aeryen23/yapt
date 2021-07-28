import React, { useEffect, useState } from "react"
import { FetchState, selectFetchState } from "../../world-data/world-data-slice"
import { useAppDispatch } from "../../app/hooks"
import { syncData } from "../fio/fio-get"
import { isDevModeEnabled, isExperimentalMode, setDevModeEnabled, setExperimentalMode } from "./settings-slice"
import styles from "./settings.module.css"

const SYNC_ALLOWED_AFTER_SECONDS = 5 * 60 // TODO: move this to fio-get

export function Settings() {
  const dispatch = useAppDispatch()
  const isExperimental = isExperimentalMode()
  let devSettings
  if (isDevModeEnabled()) {
    devSettings = <>
      <tr className={styles.header}><td colSpan={2}><label><input type="checkbox" checked={true} onChange={() => dispatch(setDevModeEnabled(false))}></input>Dev Mode active</label></td></tr>
    </>
  }
  const hiddenDevModeEnableState = {
    lastTry: Date.now(),
    count: 0,
  }
  function handleHiddenDevModeEnable() {
    const now = Date.now()
    if (now - hiddenDevModeEnableState.lastTry > 1000)
      hiddenDevModeEnableState.count = 0
    hiddenDevModeEnableState.count++
    hiddenDevModeEnableState.lastTry = now
    if (hiddenDevModeEnableState.count >= 5)
      dispatch(setDevModeEnabled(true))
  }


  return (<table className={styles.table}>
    <tbody>
      <tr className={styles.header} onClick={handleHiddenDevModeEnable}><td colSpan={2}>Fio Data</td></tr>
      <FioState />
      <tr className={styles.header}>
        <td colSpan={2}><label><input type="checkbox" checked={isExperimental} onChange={e => dispatch(setExperimentalMode(e.target.checked))}></input>Experimental Mode</label></td>
      </tr>
      {devSettings}
    </tbody>
  </table>)
}

function calculateSyncDisallowed(fioDataState: FetchState[]) {
  const now = Date.now()
  return fioDataState.some(info => (now - new Date(info.timestamp).getTime()) / 1000 < SYNC_ALLOWED_AFTER_SECONDS)
}

function FioState() {
  // TODO: in addition only allow synching if not currently during a sync
  // TODO: not working to enable button again after timer elapsed
  // TODO: button should immediately be disabled when pressing sync button

  const fioDataState = selectFetchState()

  const [syncDisallowed, setSyncDisallowed] = useState(() => calculateSyncDisallowed(fioDataState))
  useEffect(() => {
    const timer = setTimeout(() => { setSyncDisallowed(calculateSyncDisallowed(fioDataState)) }, 60 * 1000)
    return () => clearTimeout(timer)
  }, [fioDataState])

  return <>
    {fioDataState.map(info => <tr key={info.id}><td>{info.id}</td><td>{new Date(info.timestamp).toLocaleString(undefined, {})}</td></tr>)}
    <tr><td colSpan={2}><button onClick={syncData} disabled={syncDisallowed}>Sync Fio Data</button></td></tr>
  </>
}