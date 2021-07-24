import React from "react"
import styles from "./settings.module.css"
import { selectFetchState } from "../../world-data/world-data-slice"
import { isDevModeEnabled, setDevModeEnabled } from "./settings-slice"
import { useAppDispatch } from "../../app/hooks"

export function Settings() {
  const dispatch = useAppDispatch()
  const fioDataState = selectFetchState()
  let devSettings;
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

  const first = fioDataState.map(info => new Date(info.timestamp)).reduce(function (a, b) { return a < b ? a : b; });
  return (<table className={styles.table}>
    <tbody>
      <tr className={styles.header} onClick={handleHiddenDevModeEnable}><td colSpan={2}>Fio Data</td></tr>
      {fioDataState.map(info => <tr key={info.id}><td>{info.id}</td><td>{new Date(info.timestamp).toLocaleString(undefined, {})}</td></tr>)}
      <tr><td colSpan={2}><button onClick={() => { }} disabled={true}>Sync Fio Data</button></td></tr>
      {devSettings}
      <tr><td colSpan={2}>{first.toUTCString()}</td></tr>
    </tbody>
  </table>)
}
