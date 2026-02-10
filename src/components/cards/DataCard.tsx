import React from "react"
import {Button} from "../ui/button"

export default function DataCard({ title, description, metrics = [] }: { title: string; description?: string; metrics?: Array<{label:string,value:string | number}> }) {
  return (
    <article className="bg-white border rounded-lg p-5 shadow-sm">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      {description && <p className="text-sm text-slate-600 mb-3">{description}</p>}
      <div className="flex flex-wrap gap-4 mb-4">
        {metrics.map(m => (
          <div key={m.label} className="min-w-[8rem]">
            <div className="text-xs text-slate-500">{m.label}</div>
            <div className="text-2xl font-bold text-emerald-500">{m.value}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <Button variant="primary">Download Dataset</Button>
        <Button variant="ghost">Preview</Button>
      </div>
    </article>
  )
}