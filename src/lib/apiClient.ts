import axios, { type AxiosRequestHeaders } from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://ncir.aimedicare.ng/";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem("ncir_auth");
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as { token?: string };
        if (parsed.token) {
          config.headers = {
            ...(config.headers || {}),
            Authorization: `Bearer ${parsed.token}`,
          } as AxiosRequestHeaders;
        }
      } catch {
        // ignore parse errors and continue without auth header
      }
    }
  }

  return config;
});

