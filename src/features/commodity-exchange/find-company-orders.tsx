import React, { useMemo, useState } from "react"
import styles from "./find-company-orders.module.css"
import { CompanyCXOrder, useFindCompanyOrdersQuery } from "../fio/fio-api-slice"
import { numberForUser } from "../utils/utils"

export function FindCompanyOrders() {
  const [company, setCompany] = useState("")
  const [submittedCompany, setSubmittedCompany] = useState("")

  return (<div>
    <form onSubmit={e => { e.preventDefault(); setSubmittedCompany(company) }}><input type="text" name="company" placeholder="Company Code" value={company} onChange={e => setCompany(e.target.value)}></input><button type="submit">Search</button></form><br />
    Selected: {submittedCompany}<br />
    {submittedCompany != "" && <FindCompanyOrdersResult companyCode={submittedCompany} />}
  </div>)
}
function FindCompanyOrdersResult({ companyCode }: { companyCode: string }) {
  const { data, isLoading, error } = useFindCompanyOrdersQuery(companyCode)
  const orders = useMemo(() => {
    if (data)
      return data.reduce((acc, o) => {
        if (!acc[o.cx])
          acc[o.cx] = []
        acc[o.cx].push(o)
        return acc
      }, {} as Record<string, typeof data>)
    return {}
  }, [data])

  if (isLoading)
    return <div>Loading</div>
  if (error)
    return <div>Error: ${error}</div>

  const cx = Object.keys(orders).sort()

  return (<table className={styles.table}>
    <tbody>
      <tr>
        <td>CX</td>
        <td>Mat</td>
        <td>Type</td>
        <td>Amount</td>
        <td>Limit</td>
        <td>Value</td>
      </tr>
      {
        cx.map(k =>
          orders[k].map(o => {
            const orderCount = o.buys.length + o.sells.length
            const cxOrders = [
              ...createOrderRow(o.sells, true),
              ...createOrderRow(o.buys, false),
            ]
            const firstRow = <tr key={o.material + "." + k}><td rowSpan={orderCount}>{k}</td><td rowSpan={orderCount}>{o.material}</td>{cxOrders[0].flat()}</tr>
            return [
              firstRow,
              ...cxOrders.slice(1).map((cxo, index) => <tr key={o.material + "." + k + index}>{cxo.flat()}</tr>)
            ]
          }).flat()
        ).flat()
      }
    </tbody>
  </table>)
}

function createOrderRow(orders: CompanyCXOrder[], isSell: boolean) {
  return orders.map(({ amount, cost }, index) => [
    ...(index == 0 ? [<td key="type" className={isSell ? styles.orderSell : styles.orderBuy} rowSpan={orders.length}>{isSell ? "SELL" : "BUY"}</td>] : []),
    <td key="amount">{amount}</td>,
    <td key="limit">{numberForUser(cost)}</td>,
    <td key="value">{numberForUser(amount * cost)}</td>
  ])
}