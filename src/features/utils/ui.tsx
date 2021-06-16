import React from "react"

export function Select({ value, options, onChange }: { value: string, options: [string, string][] | string[], onChange?: (id: string) => void }) {
  return <select value={value} onChange={e => onChange && onChange(e.target.value)}>
    {options.length && (Array.isArray(options[0])
      ? options.map(([id, displayName]) => <option id={id} key={displayName}>{displayName}</option>)
      : (options as string[]).map(id => <option id={id} key={id}>{id}</option>)
    )}
  </select>
}
