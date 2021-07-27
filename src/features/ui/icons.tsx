import React from "react"
import { selectMaterials } from "../../world-data/world-data-slice"
import styles from "./icons.module.css"

export function styleForMaterial(materialCategory: string) {
  const category = materialCategory?.replaceAll(" ", "_").replaceAll(/\(|\)/g, "")
  return styles[category] ?? styles.defaultColor
}
export function MaterialIcon({ materialId, amount, size = 48, fontFactor = 0.33, isSelected = false, onClick }: { materialId: string, amount?: number, size?: number, fontFactor?: number, isSelected?: boolean, onClick?: (material: string, amount?: number) => void }) {
  const actualSize = size
  const containerStyle = {}
  const materials = selectMaterials() // TODO only need the category of a single material

  return (<div className={styles.container} style={containerStyle}>
    <Icon label={materialId} colorClass={styleForMaterial(materials[materialId]?.category)} size={actualSize} fontFactor={fontFactor} isSelected={isSelected} onClick={e => onClick && onClick(materialId, amount)} />
    {!amount ? null : (<div className={styles.indicatorContainer}>
      <div className={styles.indicator}>{amount}</div>
    </div>)}
  </div>)
}

export function Icon({ label, size = 48, fontFactor = 0.33, colorClass = styles.defaultColor, hoverText, isSelected = false, onClick, children }: { label: string, size?: number, fontFactor?: number, colorClass?: string, hoverText?: string, isSelected?: boolean, onClick?: (e: React.MouseEvent) => void, children?: JSX.Element | JSX.Element[] }) {
  const title = hoverText || label
  const containerStyle = {
    height: size,
    width: size,
    fontSize: size * fontFactor,
    cursor: onClick ? "pointer" : "default"
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
