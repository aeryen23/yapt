import React, { useState } from "react"
import styles from "./tabs.module.css"

export type TabDefinition = {
  title: string;
  content: () => JSX.Element;
}

export function Tabs({ tabs }: { tabs: TabDefinition[] }) {
  const [tabIndex, setTabIndex] = useState(0)
  const Content = tabs[tabIndex]?.content

  return (<div className={styles.component}>
    <div className={styles.tabs}>
      {tabs.map((def, index) => {
        const active = tabIndex == index

        return (<div className={styles.header} key={index}>
          <a className={(active ? styles.tabActive + " " : "") + styles.tab} onClick={() => setTabIndex(index)}>
            {def.title}
          </a>
          <div className={(active ? styles.toggleIndicatorActive + " " : "") + styles.toggleIndicator} />
        </div>)
      })}
    </div>
    <article className={styles.content}>
      {Content && <Content />}
    </article>
  </div>)
}
