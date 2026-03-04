// src/components/layouts/Navbar.tsx
"use client";

import Link from "next/link";
import React, { useState } from "react";
import { User, Shield } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useAuth } from "@/src/context/AuthProvider";
import { LoginModal } from "@/src/components/LoginModal";
import { SignUpModal } from "@/src/components/SignUpModal";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const auth = useAuth();

  const currentUser = auth.user;

  return (
    <>
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

              {currentUser ? (
                <div className="flex items-center gap-3">
                  <span className="text-gray-600">
                    Hi, {currentUser.name || currentUser.email}
                  </span>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={auth.logout}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setLoginOpen(true)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                  <Button
                    size="sm"
                    variant="medical"
                    onClick={() => setSignUpOpen(true)}
                  >
                    Sign up
                  </Button>
                </div>
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
                    open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          {/* Mobile Nav */}
          {open && (
            <nav className="md:hidden py-4 flex flex-col gap-3 text-sm">
              <Link href="/about" className="text-gray-700">About</Link>
              <Link href="/research" className="text-gray-700">Research</Link>
              <Link href="/journal" className="text-gray-700">Journal</Link>
              <Link href="/publications" className="text-gray-700">Publications</Link>
              <Link href="/compliance" className="text-gray-700">Compliance</Link>

              {!currentUser ? (
                <button
                  onClick={() => {
                    setLoginOpen(true);
                    setOpen(false);
                  }}
                  className="text-left text-gray-700"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={() => {
                    setOpen(false);
                    auth.logout();
                  }}
                  className="text-left text-gray-700"
                >
                  Logout
                </button>
              )}
            </nav>
          )}
        </div>
      </header>
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
      />
      <SignUpModal
        isOpen={signUpOpen}
        onClose={() => setSignUpOpen(false)}
      />
    </>
  );
}