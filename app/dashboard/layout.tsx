// app/dashboard/layout.tsx
import React from "react";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      
      <main className="min-h-screen">
        {children}
      </main>
      <Toaster richColors />
    </>
  );
}