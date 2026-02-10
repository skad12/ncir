"use client";

import Link from "next/link";
import { useState } from "react";
import { User, Shield } from "lucide-react";
import { Button } from "../ui/button";

interface HeaderProps {
  user?: { name: string; role: string } | null;
  onLogout?: () => void;
}

interface NavbarProps {
  onGetStarted?: () => void;
}

export default function Header({ user, onLogout }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-emerald-600" />
            <div className="leading-tight">
              <span className="block text-lg font-bold text-gray-900">NCIR</span>
              <span className="block text-xs text-gray-500">
                National Cancer Imaging Repository
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="#about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="#research" className="text-gray-600 hover:text-gray-900">
              Research
            </Link>
            <Link href="/journal" className="text-gray-600 hover:text-gray-900">
              Journal
            </Link>
            <Link href="/publications" className="text-gray-600 hover:text-gray-900">
              Publications
            </Link>
            <Link href="#compliance" className="text-gray-600 hover:text-gray-900">
              Compliance
            </Link>

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-gray-600">Hi, {user.name}</span>
                <Button size="sm" variant="secondary" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/auth/login">
                 
                <Button onClick={onGetStarted} size="sm"> <User className="h-4 w-4 text-white " />Login</Button>
              </Link>
            )}
          </nav>

          {/* Mobile toggle */}
          <button
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setOpen(!open)}
          >
            <svg
              className="h-6 w-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  open
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {open && (
          <nav className="md:hidden py-4 flex flex-col gap-3 text-sm">
            <Link href="/about">About</Link>
            <Link href="/research">Research</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/publications">Publications</Link>
            <Link href="/compliance">Compliance</Link>
            <Link href="/auth/login">Login</Link>
          </nav>
        )}
      </div>
    </header>
  );
}