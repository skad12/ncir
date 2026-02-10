"use client"
import React, { ReactNode, useState } from "react"
export default function Tabs({ tabs }: { tabs: { id: string; label: string; panel: ReactNode }[] }) {
  const [active, setActive] = useState(tabs[0]?.id ?? "")
  return (
    <div>
      <div className="flex gap-2 border-b mb-4">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`px-3 py-2 -mb-px ${active === t.id ? "border-b-2 border-emerald-500 font-semibold" : "text-slate-600"}`}
            aria-selected={active === t.id}
            role="tab"
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel">{tabs.find(t => t.id === active)?.panel}</div>
    </div>
  )
}