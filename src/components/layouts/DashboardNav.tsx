// components/Navbar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Shield, Settings, LogOut, Menu, X } from "lucide-react";

interface NavbarProps {
  userRole: string;
  onLogout: () => void;
  onSettings?: () => void;
  siteTitle?: string;
}

const getRoleColor = (role: string) => {
  switch (role) {
    case "super-admin":
      return "bg-red-500";
    case "contributor":
      return "bg-blue-500";
    case "annotator":
      return "bg-green-500";
    case "researcher":
      return "bg-purple-500";
    case "ethics-officer":
      return "bg-orange-500";
    default:
      return "bg-gray-500";
  }
};

const getRoleDisplayName = (role: string) => {
  switch (role) {
    case "super-admin":
      return "Super Admin";
    case "contributor":
      return "Contributor";
    case "annotator":
      return "Annotator";
    case "researcher":
      return "Researcher";
    case "ethics-officer":
      return "Ethics Officer";
    default:
      return "User";
  }
};

const roleNavItems: Record<
  string,
  { title: string; href: string }[]
> = {
  "super-admin": [
    { title: "Overview", href: "/dashboard/superadmin" },
    { title: "Analytics", href: "/dashboard/superadmin/analytics" },
    { title: "Users", href: "/dashboard/superadmin/users" },
    { title: "Settings", href: "/dashboard/superadmin/settings" },
  ],
  contributor: [
    { title: "Overview", href: "/dashboard/contributor" },
    { title: "Upload", href: "/dashboard/contributor/upload" },
    { title: "My Submissions", href: "/dashboard/contributor/submissions" },
  ],
  annotator: [
    { title: "Overview", href: "/dashboard/annotator" },
    { title: "Annotate", href: "/dashboard/annotator/queue" },
    { title: "Review", href: "/dashboard/annotator/review" },
  ],
  researcher: [
    { title: "Overview", href: "/dashboard/researcher" },
    { title: "Datasets", href: "/dashboard/researcher/datasets" },
    { title: "Requests", href: "/dashboard/researcher/requests" },
  ],
  "ethics-officer": [
    { title: "Overview", href: "/dashboard/ethics-officer" },
    { title: "Audits", href: "/dashboard/ethics-officer/audits" },
    { title: "Compliance", href: "/dashboard/ethics-officer/compliance" },
  ],
};

export const Navbar: React.FC<NavbarProps> = ({
  userRole,
  onLogout,
  onSettings,
  siteTitle = "NCIR Dashboard",
}) => {
  const [open, setOpen] = useState(false);

  const navItems = roleNavItems[userRole] ?? [
    { title: "Overview", href: "/" },
  ];

  return (
    <header className="bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: logo & title */}
          <div className="flex items-center gap-4">
            <Shield className="h-8 w-8 text-primary" />
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-semibold">{siteTitle}</span>
              <div className="flex items-center gap-2">
                <Badge className={getRoleColor(userRole)}>
                  {getRoleDisplayName(userRole)}
                </Badge>
              </div>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-3">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-muted/50"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              aria-label="Settings"
              onClick={() => onSettings?.()}
              className="hidden sm:inline-flex"
            >
              <Settings className="h-4 w-4" />
            </Button>

            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              aria-label="Logout"
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>

            {/* Mobile menu button */}
            <button
              className="inline-flex md:hidden items-center p-2 rounded-md hover:bg-muted/50"
              aria-label="Open menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav (collapsible) */}
      {open && (
        <nav className="md:hidden border-t border-border bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted/50"
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}

              <li className="pt-2">
                <button
                  onClick={() => {
                    setOpen(false);
                    onSettings?.();
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-sm font-medium hover:bg-muted/50"
                >
                  Settings
                </button>
              </li>

              <li>
                <button
                  onClick={() => {
                    setOpen(false);
                    onLogout();
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-sm font-medium hover:bg-muted/50"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;