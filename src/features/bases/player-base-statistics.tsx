import React, { useMemo } from "react";
import { useBasecountQuery } from "../fio/fio-api-slice";
import styles from "./chart.module.css";

type Entry = { baseCount: number, companies: string[] }
export function PlayerBaseStatistics() {
  const { data, error, isLoading } = useBasecountQuery()

  const processedData = useMemo(() => {
    const result = [] as Entry[]
    if (!isLoading && !error) {
      const result2 = data!.reduce((acc, { CompanyCode, BaseCount }) => {
        const companies = acc.get(BaseCount) ?? []
        companies.push(CompanyCode)
        acc.set(BaseCount, companies)
        return acc
      }, new Map<number, string[]>())
      for (const [baseCount, companies] of result2)
        result.push({ baseCount, companies })
    }
    result.sort((a, b) => a.baseCount - b.baseCount)
    return result
  }, [isLoading, error, data])

  if (isLoading)
    return <div>Loading</div>
  if (error)
    return <div>Error: ${error}</div>

  const sorted = [...data!]
  sorted.sort((a, b) => b.BaseCount - a.BaseCount)

  if (true) {
    const width = 800
    const barHeight = 30
    const avgValue =  processedData.length>0 ? processedData.reduce((sum, a) => sum+a.companies.length, 0) / processedData.length : 1
    const advance = Math.trunc(width / avgValue)
    let barGroups = processedData.map((d, i) => <g key={i} transform={`translate(0, ${i * barHeight})`}>
      <BarGroup data={{ name: d.baseCount.toString(), value: d.companies.length, title: d.companies.join(" ") }} barHeight={barHeight} maxWidth={width} advance={advance} />
    </g>)
    return (<svg width={width + 20} height="300" >
      <g className={styles.container}>
        <text className={styles.title} x="10" y="30">Player bases by count</text>
        <g className={styles.chart} transform="translate(15,60)">
          {barGroups}
        </g>
      </g>
    </svg>)
  }

  return (<div style={{ display: "flex", flexDirection: "column" }}>
    {/* {sorted.map(({ CompanyCode, BaseCount }) => <div key={CompanyCode}>{CompanyCode}: {BaseCount}</div>)} */}
    {Object.entries(data).map(([idx, a]) => <div key={idx}>{idx + ": "} <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}> {a.join(" ")}</div></div>)}
  </div>)
}

function BarGroup({ data, barHeight, maxWidth, advance = 10 }: { data: { name: string, value: number, title: string }, barHeight: number, maxWidth: number, advance?: number }) {
  let barPadding = 2
  let barColour = '#348AA7'
  let widthScale = (d: number) => d * advance

  let width = Math.min(Math.max(widthScale(data.value), 20), maxWidth)
  let yMid = barHeight * 0.5

  return (<g className={styles["bar-group"]}>
    <text className={styles["name-label"]} x="-6" y={yMid} alignmentBaseline="middle" >{data.name}</text>
    <g>
      <title>{data.title}</title>
      <rect y={barPadding * 0.5} width={width} height={barHeight - barPadding} fill={barColour} />
      <text className={styles["value-label"]} x={width - 8} y={yMid} alignmentBaseline="middle" >{data.value}</text>
    </g>
  </g>)
}
