import Link from "next/link"
import React from "react"

export default function Footer() {
  return (
    <footer className="bg-white mt-12">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-slate-600">&copy; {new Date().getFullYear()} NCIR — Developed by <Link href="https://blumentechnologies.com"><span className="font-semibold text-blue-600 hover:text-blue-400">Blumentech</span></Link></div>
        <div className="flex gap-4 text-sm text-slate-600">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </footer>
  )
}