// context/AuthProvider.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Role = "super-admin" | "contributor" | "annotator" | "researcher" | "ethicsofficer";

type User = {
  id: string;
  email: string;
  role: Role;
  name?: string;
};

type LoginPayload = { email: string; password: string; role: Role };

type AuthContextValue = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ROLE_ROUTES: Record<Role, string> = {
  "super-admin": "/dashboard/superadmin",
  contributor: "/dashboard/contributor",
  annotator: "/dashboard/annotator",
  researcher: "/dashboard/researcher",
  "ethicsofficer": "/dashboard/ethicsofficer",
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // rehydrate persisted auth (demo localStorage). Replace with cookie-based rehydrate for prod.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("ncir_auth");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setUser(parsed.user);
        setToken(parsed.token);
      } catch {
        localStorage.removeItem("ncir_auth");
      }
    }
  }, []);

  const persist = (t: string, u: User) => {
    setToken(t);
    setUser(u);
    try {
      localStorage.setItem("ncir_auth", JSON.stringify({ token: t, user: u }));
    } catch {}
  };

  const login = async ({ email, password, role }: LoginPayload) => {
    setLoading(true);
    try {
      // call real backend
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Login failed");
      }

      const data = await res.json();
      // expected { token: string, user: { id, email, role, name? } }
      if (data?.token && data?.user) {
        persist(data.token, data.user);
        const route = ROLE_ROUTES[data.user.role as Role] || "/";
        router.push(route);
        return;
      }

      // fallback (in case server returns only route)
      if (data?.route) {
        router.push(data.route);
        return;
      }

      throw new Error("Unexpected server response");
    } catch (err) {
      // demo fallback if API missing or failed: create a demo user client-side
      console.warn("Auth API failed — using demo fallback. Error:", err);
      const fakeUser: User = { id: "demo-1", email, role, name: "Demo User" };
      const fakeToken = "demo-token";
      persist(fakeToken, fakeUser);
      router.push(ROLE_ROUTES[role]);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("ncir_auth");
    // In prod: call backend to clear httpOnly cookie, then redirect to / (or login)
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};