import React, { useMemo, useState } from "react"
import styles from "./find-company-orders.module.css"
import { CompanyCXOrder, CompanyCXOrders, useFindCompanyBasesQuery, useFindCompanyLMOrdersQuery, useFindCompanyOrdersQuery } from "../fio/fio-api-slice"
import { numberForUser, useQuery } from "../utils/utils"
import { useHistory } from "react-router-dom"

export function FindCompanyOrders() {
  const company = useQuery("company")
  console.log("comp", company)

  if (company)
    return (<div>
      <CompanyInput startValue={company} />
      Selected: {company}<br />
      {<FindCompanyOrdersResult companyCode={company} />}
      {<FindCompanyLMOrdersResult companyCode={company} />}
      {<FindCompanyBasesResult companyCode={company} />}
    </div>)
  return <CompanyInput />
}

function CompanyInput({ startValue = "" }: { startValue?: string }) {
  const [company, setCompany] = useState(startValue)
  const history = useHistory()

  return (<form onSubmit={e => { e.preventDefault(); history.push("/view-company?company=" + company) }}>
    <input type="text" name="company" placeholder="Company Code" value={company} onChange={e => setCompany(e.target.value.toUpperCase())}></input>
    <button type="submit">Search</button>
  </form>)
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
  if (orderyByCX.length == 0)
    return null
  return (<div>
    <h4>CX Orders</h4>
    <div className={styles.allCxOrders}>
      {orderyByCX.map(cx => {
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
    </div>
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

function FindCompanyLMOrdersResult({ companyCode }: { companyCode: string }) {
  const { data, isFetching, error } = useFindCompanyLMOrdersQuery(companyCode)
  if (isFetching || !data)
    return <div>Loading</div>
  if (error)
    return <div>Error: {JSON.stringify(error)}</div>

  if (data.BuyingAds.length == 0 && data.SellingAds.length == 0 && data.ShippingAds.length == 0)
    return null
  return (<div>
    <h4>LM Orders</h4>
    <div className={styles.allCxOrders}>
      {data.BuyingAds.length == 0 ? null : (<div key="buying" className={styles.lmOrders}>
        <h4>Buying</h4>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>Mat</td>
              <td>Quantity</td>
              <td>Total</td>
              <td>Per Unit</td>
              <td>Time</td>
              <td>Planet</td>
            </tr>
          </thead>
          <tbody>
            {
              [...data.BuyingAds].sort((a, b) => a.PlanetName.localeCompare(b.PlanetName)).map((ad, idx) => (<tr key={idx}>
                <td>{ad.MaterialTicker}</td>
                <td>{ad.MaterialAmount}</td>
                <td>{ad.Price + " " + ad.PriceCurrency}</td>
                <td>{numberForUser(ad.Price / ad.MaterialAmount)}</td>
                <td>{ad.DeliveryTime}</td>
                <td>{ad.PlanetName}</td>
              </tr>)).flat()
            }
          </tbody>
        </table>
      </div>)}
      {data.SellingAds.length == 0 ? null : (<div key="selling" className={styles.lmOrders}>
        <h4>Selling</h4>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>Mat</td>
              <td>Quantity</td>
              <td>Total</td>
              <td>Per Unit</td>
              <td>Time</td>
              <td>Planet</td>
            </tr>
          </thead>
          <tbody>
            {
              [...data.SellingAds].sort((a, b) => a.PlanetName.localeCompare(b.PlanetName)).map((ad, idx) => (<tr key={idx}>
                <td>{ad.MaterialTicker}</td>
                <td>{ad.MaterialAmount}</td>
                <td>{ad.Price + " " + ad.PriceCurrency}</td>
                <td>{numberForUser(ad.Price / ad.MaterialAmount)}</td>
                <td>{ad.DeliveryTime}</td>
                <td>{ad.PlanetName}</td>
              </tr>)).flat()
            }
          </tbody>
        </table>
      </div>)}
      {data.ShippingAds.length == 0 ? null : (<div key="shipping" className={styles.lmOrders}>
        <h4>Shipping</h4>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>From</td>
              <td>To</td>
              <td>Cargo</td>
              <td>Total</td>
              <td>Per t/m³</td>
              <td>Time</td>
              <td>Planet</td>
            </tr>
          </thead>
          <tbody>
            {
              [...data.ShippingAds].sort((a, b) => a.PlanetName.localeCompare(b.PlanetName)).map((ad, idx) => (<tr key={idx}>
                <td>{ad.OriginPlanetNaturalId}</td>
                <td>{ad.DestinationPlanetNaturalId}</td>
                <td>{numberForUser(ad.CargoWeight) + "t / " + numberForUser(ad.CargoVolume) + "m³"}</td>
                <td>{ad.PayoutPrice + " " + ad.PayoutCurrency}</td>
                <td>{numberForUser(ad.PayoutPrice / Math.max(ad.CargoVolume, ad.CargoWeight))}</td>
                <td>{ad.DeliveryTime}</td>
                <td>{ad.PlanetName}</td>
              </tr>)).flat()
            }
          </tbody>
        </table>
      </div>)}
    </div>
  </div>)
}

function FindCompanyBasesResult({ companyCode }: { companyCode: string }) {
  const { data, isFetching, error } = useFindCompanyBasesQuery(companyCode)
  if (isFetching)
    return <div>Loading</div>
  if (error)
    return <div>Error: {JSON.stringify(error)}</div>

  return (<div>
    <h4>Bases on planets</h4>
    <div className={styles.planetList}>
      {data?.map(planet => <div key={planet}>{planet}</div>).flat()}
    </div>
  </div>)
}