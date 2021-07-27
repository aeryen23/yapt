import React, { useState } from "react"
import styles from "./tabs.module.css"

export type TabDefinition = {
  id: string;
  title?: string;
  content: () => JSX.Element;
}

export function Tabs({ tabs }: { tabs: TabDefinition[] }) {
  const [currentTab, setCurrentTab] = useState(tabs[0]?.id ?? "")
  const Content = tabs.filter(t => t.id == currentTab)[0]?.content

  return (<div className={styles.component}>
    <TabHeader tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
    <article className={styles.content}>
      {Content && <Content />}
    </article>
  </div>)
}

export function TabHeader({ tabs, currentTab, setCurrentTab }: { tabs: TabDefinition[], currentTab: string, setCurrentTab: (selected: string) => void }) {
  return <div className={styles.tabs}>
    {tabs.map(def => {
      const active = def.id == currentTab
      return (<div className={styles.header} key={def.id}>
        <a className={(active ? styles.tabActive + " " : "") + styles.tab} onClick={() => { setCurrentTab(def.id); console.log("tab", def.id) }}>
          {def.title ?? def.id}
        </a>
        <div className={(active ? styles.toggleIndicatorActive + " " : "") + styles.toggleIndicator} />
      </div>)
    })}
  </div>
}
