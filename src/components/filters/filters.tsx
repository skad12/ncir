"use client"
import React, { useState } from "react"
import {Button} from "../ui/button"

export default function FiltersPanel({ onApply }: { onApply: (filters: { q?: string; modality?: string[] }) => void }) {
  const [q, setQ] = useState("")
  const [modality, setModality] = useState<string[]>([])

  function toggleMod(m: string) {
    setModality(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m])
  }

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm">
      <label className="block text-sm text-slate-600 mb-1">Search</label>
      <input value={q} onChange={e => setQ(e.target.value)} className="w-full border border-gray-200 rounded px-3 py-2 mb-3" placeholder="Search datasets..." />

      <div className="mb-3">
        <div className="text-sm text-slate-600 mb-2">Modality</div>
        <div className="flex gap-2 flex-wrap">
          {["Mammography","Histopathology","CT"].map(m => (
            <button key={m} onClick={() => toggleMod(m)} className={`text-sm px-3 py-1 rounded ${modality.includes(m) ? "bg-emerald-100 border border-emerald-200" : "bg-slate-50"}`}>
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <Button variant="ghost" onClick={() => { setQ(""); setModality([]) }}>Reset</Button>
        <Button variant="primary" onClick={() => onApply({ q, modality })}>Apply</Button>
      </div>
    </div>
  )
}