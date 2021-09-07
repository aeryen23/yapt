import { useAppDispatch } from "../../app/hooks"
import { BuildingCategory } from "../fio/fio-types"
import { isEmpty } from "../utils/utils"
import { EXPERTISES } from "./base-page"
import { BaseB, setSynched, WorkforceStatus } from "./bases-slice"

export function importStorage(text: string, dispatch: ReturnType<typeof useAppDispatch>) {
  for (const msg of parseStorage(text)) {
    if (msg.dataVersion == "STORAGE-003-COLONY") {
      const base: BaseB = {
        planet: msg.colony.naturalId,
        buildings: {},
        inventory: msg.colony.storage.reduce((acc, [mat, amount]) => ({ ...acc, [mat]: amount }), {} as Record<string, number>),
        workforce: {
          Pioneers: convertWorkforce(msg.colony.workforces.p),
          Settlers: convertWorkforce(msg.colony.workforces.s),
          Technicians: convertWorkforce(msg.colony.workforces.t),
          Engineers: convertWorkforce(msg.colony.workforces.e),
          Scientists: convertWorkforce(msg.colony.workforces.c),
        },
        experts: EXPERTISES.reduce((acc, e) => ({ ...acc, [e]: 0 }), {} as Record<BuildingCategory, number>),
        cogcFocus: undefined,
      }
      for (const building of msg.colony.buildings) {
        if (!base.buildings[building.ticker])
          base.buildings[building.ticker] = { amount: 0, condition: 0, recipes: [] }
        base.buildings[building.ticker].amount++
        base.buildings[building.ticker].condition += building.condition
      }
      for (const b of Object.values(base.buildings))
        b.condition = b.condition / b.amount
      for (const pLine of msg.colony.productionLines) {
        // pLine.type// building name! not ticker
        // pLine.orders
      }
      dispatch(setSynched(base))
    }
  }
}
function convertWorkforce(wf: Workforce): WorkforceStatus {
  return {
    current: wf.p,
    total: wf.c,
    required: wf.r,
    satisfaction: wf.s,
  }
}

function parseStorage(text: string) {
  const result: StorageMessage[] = []
  try {
    const lines = text.split("\n")
    for (const line of lines) {
      const msg = JSON.parse(atob(line)) as StorageMessage
      if (isEmpty(msg))
        continue
      result.push(msg)
    }
  }
  catch (e) {
    console.error("Error importing rain data", e)
  }
  return result
}

type StorageMessage = {
  dataVersion: "STORAGE-003-TRADES",
  userInfo: UserInfo;
  liquid: Liquid;
  trades: Inventory[];
  ships: Inventory[];
} | {
  dataVersion: "STORAGE-003-COLONY"
  userInfo: UserInfo;
  colony: Colony;
}

type MaterialList = [string, number][];

interface Colony {
  naturalId: string;
  name: string;
  workforces: Workforces;
  storage: MaterialList;
  buildings: Building[];
  productionLines: ProductionLine[];
}

interface Building {
  id: string;
  ticker: string;
  created: number;
  reclaimables: MaterialList;
  condition: number;
}

interface ProductionLine {
  type: string;
  orders: ProductionOrder[];
}

interface ProductionOrder {
  id: string;
  completed: number;
  remaining: number | null;
  inputs: MaterialList;
  outputs: MaterialList;
}

interface Workforces {
  p: Workforce;
  s: Workforce;
  t: Workforce;
  e: Workforce;
  c: Workforce;
}

interface Workforce {
  p: number;  // available
  c: number;  // total
  r: number;  // required
  s: number;  // satisfaction
}

interface Liquid {
  cxBuys: CxBuy[];
  currency: Currency[];
}

interface Currency {
  naturalId: string;
  amount: number;
  currency: string;
}

interface CxBuy {
  naturalId: string;
  name: string;
  bid: Bid;
  currency: string;
  amount: number;
  ticker: string;
}

interface Bid {
  quantity: number;
  amount: number;
}

interface Inventory {
  name: null | string;
  naturalId: string;
  type: string;
  inventory: MaterialList;
}

interface UserInfo {
  username: string;
  companyId: string;
  userId: string;
}
