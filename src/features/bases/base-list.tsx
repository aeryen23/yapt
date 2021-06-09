import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { add } from './bases-slice'
import { worldData } from '../../world-data'

export default function BaseList() {
  const bases = useAppSelector(state => state.bases.list)
  const dispatch = useAppDispatch()

  return (<div>
    <button onClick={()=> dispatch(add("OT-580b"))}>Add</button><br />
    <ul>
      {bases.map(base => <li key={base.id}>{base.planet}</li>)}
    </ul>
  </div>)
}
