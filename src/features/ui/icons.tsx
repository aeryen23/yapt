import React from "react"
import styles from "./icons.module.css"
import { worldData } from "../../world-data/world-data"

function styleForMaterial(materialId: string) {
  const category = worldData.materials[materialId].category.replaceAll(" ", "_").replaceAll(/\(|\)/g, "")
  return styles[category] ?? styles.defaultColor
}
export function MaterialIcon({ materialId, amount, size = 48, isSelected = false, onClick }: { materialId: string, amount?: number, size?: number, isSelected?: boolean, onClick?: (material: string, amount?: number) => void }) {
  const actualSize = size
  const containerStyle = {}

  return (<div className={styles.container} style={containerStyle}>
    <Icon label={materialId} colorClass={styleForMaterial(materialId)} size={actualSize} isSelected={isSelected} onClick={e => onClick && onClick(materialId, amount)} />
    {!amount ? null : (<div className={styles.indicatorContainer}>
      <div className={styles.indicator}>{amount}</div>
    </div>)}
  </div>)
}

export function Icon({ label, size = 48, colorClass = styles.defaultColor, hoverText, isSelected = false, onClick, children }: { label: string, size?: number, colorClass?: string, hoverText?: string, isSelected?: boolean, onClick?: (e: React.MouseEvent) => void, children?: JSX.Element | JSX.Element[] }) {
  const title = hoverText || label
  const containerStyle = {
    height: size,
    width: size,
    fontSize: size * 0.33,
    cursor: onClick ? 'pointer' : 'default'
  }
  const classes = [styles.container, colorClass]
  if (isSelected)
    classes.push(styles.selected)
  return (<div className={classes.join(" ")} style={containerStyle} title={title} onClick={e => onClick && onClick(e)}>
    <div className={styles.labelContainer}>
      <span className={styles.label}>{label}</span>
    </div>
    {children}
  </div>)
}
