import React, { useMemo, useState } from "react"
import styles from "./find-company-orders.module.css"
import { CompanyCXOrder, CompanyCXOrders, useFindCompanyOrdersQuery } from "../fio/fio-api-slice"
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
  const { data, isFetching, error } = useFindCompanyOrdersQuery(companyCode)
  const orders = useMemo(() => {
    if (data) {
      return data.reduce((acc, o) => {
        if (!acc[o.cx])
          acc[o.cx] = []
        acc[o.cx].push(o)
        return acc
      }, {} as Record<string, typeof data>)
    }
    return {}
  }, [data])

  if (isFetching)
    return <div>Loading</div>
  if (error)
    return <div>Error: {JSON.stringify(error)}</div>

  const orderyByCX = Object.keys(orders).sort()
  return (<div className={styles.allCxOrders}>
    {
      orderyByCX.map(cx => {
        const salesTotal = calcTotal(orders[cx], true)
        const buysTotal = calcTotal(orders[cx], false)

        return <div key={cx} className={styles.cxOrders}>
          {cx}
          <table className={styles.table}>
            <tbody>
              <tr>
                <td>Mat</td>
                <td>Type</td>
                <td>Quantity</td>
                <td>Limit</td>
                <td>Total</td>
              </tr>
              {
                orders[cx].map(o => [
                  ...createOrderRow(o.material, o.sells, true),
                  ...createOrderRow(o.material, o.buys, false),
                ]).flat()
              }
              {salesTotal > 0 && <tr className={styles.summary}>
                <td colSpan={2}>Total Sales</td>
                <td></td>
                <td className={styles.orderSell} colSpan={2}>{numberForUser(salesTotal)}</td>
              </tr>}
              {buysTotal > 0 && <tr className={salesTotal > 0 ? "" : styles.summary}>
                <td colSpan={2}>Total Buys</td>
                <td></td>
                <td className={styles.orderBuy} colSpan={2}>{numberForUser(buysTotal)}</td>
              </tr>}
            </tbody>
          </table>
        </div>
      }).flat()
    }
  </div>)
}

function createOrderRow(material: string, orders: CompanyCXOrder[], isSell: boolean) {
  const orderTypeStyle = isSell ? styles.orderSell : styles.orderBuy
  const key = material + (isSell ? "S" : "B");
  return orders.map(({ amount, cost }, index) => (<tr key={key + index} className={index == 0 ? styles.firstOfMaterial : ""}>
    <td>{material}</td>
    <td className={orderTypeStyle}>{isSell ? "SELL" : "BUY"}</td>
    <td>{amount}</td>
    <td className={orderTypeStyle}>{numberForUser(cost)}</td>
    <td className={orderTypeStyle}>{numberForUser(amount * cost)}</td>
  </tr>)
  )
}

function calcTotal(orders: CompanyCXOrders[], isSell: boolean): number {
  return orders.reduce((totalSum, order) => totalSum + (isSell ? order.sells : order.buys).reduce((sum, { amount, cost }) => sum + amount * cost, 0), 0)
}
