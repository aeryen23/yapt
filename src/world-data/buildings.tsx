import React from "react"
import { Select } from "../features/utils/ui"
import { worldData } from "./world-data"

export function SelectBuilding({ value, onChange }: { value: string, onChange?: (id: string) => void }) {
  return <Select value={value} options={Object.keys(worldData.buildings)} onChange={onChange}></Select>
}
