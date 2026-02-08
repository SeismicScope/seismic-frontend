import { api } from "@/shared/lib/axios";

export async function login() {
  const { data } = await api.post("/auth/login");

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
