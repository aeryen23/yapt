import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { worldData } from '../../world-data'
import { currentBase } from './bases-slice'
import { numberForUser } from '../utils/utils'
import styles from './base-screen.module.css'

export default function BaseScreen() {
  // const dispatch = useAppDispatch()
  const current = currentBase()
  const planet = worldData.planets[current.planet]
  if (!planet)
    return <div>Error: could not find planet data for {current.planet}</div>

  return (<div>
    {current.name ? current.planet + " - " + current.name : current.planet}<br />
    <div>
      Resources
      <table className={styles.resources}>
        <thead><tr><th>Material</th><th>Rate</th></tr></thead>
        <tbody>
          {planet.resources.map(resource => <tr key={resource.material}><td>{resource.material}</td><td>{numberForUser(resource.perDay)}</td></tr>)}
        </tbody>
      </table>
    </div>
  </div>)
}