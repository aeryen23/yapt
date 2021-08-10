import { nanoid } from "@reduxjs/toolkit"
import { useAppDispatch } from "../../app/hooks"
import { isEmpty } from "../utils/utils"
import { BaseB, setCurrent, WorkforceStatus } from "./bases-slice"

export function importStorage(text: string, dispatch: ReturnType<typeof useAppDispatch>) {
  const current: { planet: string, base: BaseB }[] = []
  for (const msg of parseStorage(text)) {
    if (msg.dataVersion == "STORAGE-003-COLONY") {
      const base: BaseB = {
        buildings: {},
        inventory: msg.colony.storage.reduce((acc, [mat, amount]) => ({ ...acc, [mat]: amount }), {} as Record<string, number>),
        workforce: {
          Pioneers: convertWorkforce(msg.colony.workforces.p),
          Settlers: convertWorkforce(msg.colony.workforces.s),
          Technicians: convertWorkforce(msg.colony.workforces.t),
          Engineers: convertWorkforce(msg.colony.workforces.e),
          Scientists: convertWorkforce(msg.colony.workforces.c),
        },
      }
      for (const building of msg.colony.buildings) {
        if (!base.buildings[building.ticker])
          base.buildings[building.ticker] = { list: [] }
        base.buildings[building.ticker].list.push({ condition: building.condition })
      }
      for (const pLine of msg.colony.productionLines) {
        // pLine.type// building name! not ticker
        // pLine.orders
      }
      current.push({ planet: msg.colony.naturalId, base })
    }
  }
  dispatch(setCurrent(current))
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
