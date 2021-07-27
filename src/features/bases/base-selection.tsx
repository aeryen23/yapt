import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { distinctStable } from "../utils/utils"
import { add, currentBase, select } from "./bases-slice"
import styles from "./base-selection.module.css"

function Selection({ names, ids, selectedId, onSelect }: { names: string[], ids?: string[], selectedId?: string, onSelect: (id: string) => void }) {
  return <div style={{ display: "flex", flexDirection: "row" }}>
    {names.map((name, index) => {
      const id = ids ? ids[index] : name
      const classNames = [styles.selection]
      const isSelected = selectedId == id
      if (isSelected)
        classNames.push(styles.selected)
      return <div key={id} className={classNames.join(" ")} onClick={() => onSelect(id)}>{name}</div>
    })}
  </div>
}

export default function BaseSelection() {
  const dispatch = useAppDispatch()
  const current = currentBase()
  const currentPlanet = current.planet
  const bases = useAppSelector(state => state.bases.list)

  const [selectedPlanet, setSelectedPlanet] = useState(currentPlanet)

  const variants = bases.filter(b => b.planet == selectedPlanet)
  const planets = distinctStable(bases.map(b => b.planet))

  return (<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", fontSize: "14px" }}>
    <div>
      <Selection names={variants.map((v, idx) => idx.toString() + (v.name ? " - " + v.name : ""))} ids={variants.map(v => v.id)} selectedId={current.id} onSelect={id => dispatch(select(id))} />
      <Selection names={planets} selectedId={selectedPlanet} onSelect={id => setSelectedPlanet(id)} />
    </div>
    <div style={{ marginLeft: "30px" }}> <button onClick={() => dispatch(add("OT-580b"))}>+</button></div>
  </div>)
}
