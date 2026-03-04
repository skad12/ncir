// context/AuthProvider.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "../services/authApi";

export type AccountType =
  | "super-admin"
  | "contributor"
  | "annotator"
  | "researcher"
  | "ethics-officer";

export type User = {
  id?: string;
  email: string;
  account_type: AccountType;
  name?: string;
};

type LoginPayload = { email: string; password: string };
type RegisterPayload = { email: string; password: string; account_type: AccountType };

type AuthContextValue = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ROLE_ROUTES: Record<AccountType, string> = {
  "super-admin": "/dashboard/superadmin",
  contributor: "/dashboard/contributor",
  annotator: "/dashboard/annotator",
  researcher: "/dashboard/researcher",
  "ethics-officer": "/dashboard/ethicsofficer",
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

  const login = async ({ email, password }: LoginPayload) => {
    setLoading(true);
    try {
      const data = await signIn({ email, password });

      const accountType =
        data.account_type ??
        data.user?.account_type;

      if (!accountType) {
        throw new Error("No account_type returned from sign-in.");
      }

      const user: User = {
        email,
        account_type: accountType as AccountType,
      };

      persist("session", user);
      const route = ROLE_ROUTES[user.account_type] || "/";
      router.push(route);
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ email, password, account_type }: RegisterPayload) => {
    setLoading(true);
    try {
      const data = await signUp({ email, password, account_type });

      const returnedType =
        data.account_type ?? account_type;

      const user: User = {
        email,
        account_type: returnedType as AccountType,
      };

      persist("session", user);
      const route = ROLE_ROUTES[user.account_type] || "/";
      router.push(route);
    } catch (err) {
      console.error("Registration failed:", err);
      throw err;
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
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};