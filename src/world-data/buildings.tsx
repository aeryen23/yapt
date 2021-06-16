import React from "react"
import { worldData } from "./world-data"
import { Select } from "../features/utils/ui"

export function SelectBuilding({ value, onChange }: { value: string, onChange?: (id: string) => void }) {
  return <Select value={value} options={Object.keys(worldData.buildings)} onChange={onChange}></Select>
}
