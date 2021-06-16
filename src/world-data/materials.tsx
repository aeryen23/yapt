import React from "react"
import { worldData } from "./world-data"
import { Select } from "../features/utils/ui"

export function SelectBuilding({ value, onChange }: { value: string, onChange?: (id: string) => void }) {
  const options = Object.values(worldData.materials).map(o => {
    return [[o.id, o.id]] as [string, string][]
  }).flat()
  return <Select value={value} options={options} onChange={onChange}></Select>
}
