import React, { useState } from 'react'
import { worldData } from "./world-data";

export enum List {
  buildings,
  materials,
  planets,
  systems,
};

const LIST_PREFIX = "LIST_"
function listName(list: List): string {
  return LIST_PREFIX + List[list];
}

type ListData = string[][]

const listGetter: Record<List, () => ListData> = {
  [List.buildings]: () => id(worldData.buildings),
  [List.materials]: () => id(worldData.materials),
  [List.planets]: () => Object.entries(worldData.planets).map(([id, planet]) => [id, planet.name]),
  [List.systems]: () => Object.entries(worldData.systems).map(([id, system]) => [id, system.name]),
}

const listValidate: Record<List, (id: string) => boolean> = {
  [List.buildings]: (id) => !!worldData.buildings[id],
  [List.materials]: (id) => !!worldData.materials[id],
  [List.planets]: (id) => !!worldData.planets[id],
  [List.systems]: (id) => !!worldData.systems[id],
}
function id(map: Record<string, { id: string }>): ListData {
  return Object.keys(map).map(id => [id, id]);
}

function DataList({ id, list }: { id: string, list: ListData }) {
  return <datalist id={id}>
    {list.map(([id, name]) => <option value={id} key={name}>{name}</option>)}
  </datalist>
}

export default function DataLists() {
  const keys = Object.keys(List).filter(k => typeof List[k as any] === "number").map(k => List[k as any]) as unknown as List[];
  return <>
    {keys.map(list => <DataList key={listName(list)} id={listName(list)} list={listGetter[list]()} />)}
  </>
}

export function DataListSelector({ list, onSelect }: { list: List, onSelect?: (id: string) => void }) {
  const [isValid, setIsValid] = useState(false)
  const [current, setCurrent] = useState("")
  const [last, setLast] = useState("")

  function apply() {
    if (isValid && current != last) {
      setLast(current)
      if (onSelect)
        onSelect(current)
    }
  }
  return <input type="text" placeholder="Building" list={listName(list)} value={current} onChange={e =>
    setCurrent(e.target.value.toUpperCase()) // NOTE: assumption all IDs are uppercase
  } onKeyDown={e => {
    if (e.code == "Enter") {
      e.preventDefault()
      // const d = listValidate[list](current)
      // if (d != current)
      // setCurrent(d)
      apply()
    }
  }} />
}
