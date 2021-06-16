import React from "react"
import { worldData } from "./world-data"
import { Select } from "../features/utils/ui"

export function SelectPlanet({ value, onChange }: { value: string, onChange?: (id: string) => void }) {
  const options = Object.values(worldData.planets).map(o => {
    const result: [string, string][] = [[o.id, o.id]]
    if (o.name != o.id)
      result.push([o.id, o.name])
    return result
  }).flat()
  return <Select value={value} options={options} onChange={onChange}></Select>
}
