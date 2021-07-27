import { WorkforceLevel } from "../../world-data/world-data";

// https://rest.fnar.net/global/workforceneeds
// result.reduce((acc, v) => ({...acc, [v.WorkforceType]: v.Needs.reduce((ia,iv)=>({...ia, [iv.MaterialTicker]: iv.Amount}), {})}),{})
export const CONSUMABLES_BY_WORKFORCE: Record<WorkforceLevel, Record<string, number>> = {
  Pioneers: {
    OVE: 0.5,
    PWO: 0.2,
    RAT: 4,
    COF: 0.5,
    DW: 4
  },
  Settlers: {
    KOM: 1,
    RAT: 6,
    PT: 0.5,
    REP: 0.2,
    EXO: 0.5,
    DW: 5
  },
  Technicians: {
    DW: 7.5,
    RAT: 7,
    SCN: 0.1,
    SC: 0.1,
    MED: 0.5,
    HMS: 0.5,
    ALE: 1
  },
  Engineers: {
    DW: 10,
    GIN: 1,
    FIM: 7,
    PDA: 0.1,
    MED: 0.5,
    VG: 0.2,
    HSS: 0.2
  },
  Scientists: {
    WIN: 1,
    DW: 10,
    MEA: 7,
    WS: 0.05,
    MED: 0.5,
    NST: 0.1,
    LC: 0.2
  }
}
