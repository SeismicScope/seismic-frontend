import { api } from "@/shared/lib/axios";

import type { LoginCredentials } from "../types";

export async function login(credentials: LoginCredentials) {
  const { data } = await api.post("/auth/login", credentials);

  return data;
}

export async function logout() {
  const { data } = await api.post("/auth/logout");

  return data;
}

export async function me() {
  const { data } = await api.get("/auth/me");

  return data;
}
