"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/src/context/AuthProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}