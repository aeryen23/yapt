
export function distinctStable<T>(array: T[]): T[] {
  const result = []
  const s = new Set()
  for (let v of array)
    if (!s.has(v)) {
      s.add(v)
      result.push(v)
    }
  return result
}

export function numberForUser(v: Number, precision = 2): string {
  return v.toFixed(precision)
}
