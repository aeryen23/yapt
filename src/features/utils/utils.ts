import { useLocation } from "react-router-dom"

export function distinctStable<T>(array: T[]): T[] {
  const result = []
  const s = new Set()
  for (const v of array)
    if (!s.has(v)) {
      s.add(v)
      result.push(v)
    }
  return result
}

export function numberForUser(v: number, precision = 2): string {
  if (typeof v == "undefined")
    return "undefined"
  return v.toFixed(precision)
}

export function isEmpty(obj: Record<any, any>) {
  for (const i in obj)
    return false
  return true
}

export function useQuery(): URLSearchParams;
export function useQuery(param: string): string | null;
export function useQuery(param?: string) {
  const result = new URLSearchParams(useLocation().search);
  if (param !== undefined)
    return result.get(param)
  return result
}
