import React, { useMemo } from "react"
import { useBasecountQuery } from "../fio/fio-api-slice"
import styles from "./chart.module.css"

type Entry = { baseCount: number, companies: string[], additional: number }

export function PlayerBaseStatistics() {
  const { data, error, isFetching } = useBasecountQuery()

  const processedData = useMemo(() => {
    const result = [] as Entry[]
    if (data) {
      const result2 = data!.reduce((acc, { CompanyCode, BaseCount }) => {
        const companies = acc.get(BaseCount) ?? []
        companies.push(CompanyCode)
        acc.set(BaseCount, companies)
        return acc
      }, new Map<number, string[]>())
      for (const [baseCount, companies] of result2)
        result.push({ baseCount, companies, additional: 0 })
    }
    result.sort((a, b) => b.baseCount - a.baseCount)
    let additional = 0
    for (const e of result) {
      e.additional = additional
      additional += e.companies.length
      e.companies.sort()
    }
    result.sort((a, b) => a.baseCount - b.baseCount)
    return result
  }, [data])

  if (isFetching)
    return <div>Loading</div>
  if (error)
    return <div>Error: {JSON.stringify(error)}</div>

  const width = 800
  const barHeight = 30
  const avgValue = processedData.length > 0 ? processedData.reduce((sum, a) => sum + a.companies.length, 0) / processedData.length : 1
  const advance = Math.trunc(width / avgValue)
  const barGroups = processedData.map((d, i) => <g key={i} transform={`translate(0, ${i * barHeight})`}>
    <BarGroup data={{ name: d.baseCount.toString(), value: d.companies.length, additional: d.additional, title: d.companies.join(" ") }} barHeight={barHeight} maxWidth={width} advance={advance} />
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

function BarGroup({ data, barHeight, maxWidth, advance = 10 }: { data: { name: string, value: number, additional: number, title: string }, barHeight: number, maxWidth: number, advance?: number }) {
  const barPadding = 2
  const barColour = "#348AA7"
  const widthScale = (d: number) => d * advance

  const text = data.value + (data.additional != 0 ? " (" + (data.value + data.additional) + ")" : "")
  const width = Math.min(Math.max(widthScale(data.value), 20), maxWidth)
  const yMid = barHeight * 0.5
  const xPos = Math.max(width, 60) - 8

  return (<g className={styles["bar-group"]}>
    <text className={styles["name-label"]} x="-6" y={yMid} alignmentBaseline="middle" >{data.name}</text>
    <g>
      <title>{data.title}</title>
      <rect y={barPadding * 0.5} width={width} height={barHeight - barPadding} fill={barColour} />
      <text className={styles["value-label"]} x={xPos} y={yMid} alignmentBaseline="middle" >{text}</text>
    </g>
  </g>)
}
