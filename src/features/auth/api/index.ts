import { api } from "@/shared/lib/axios";

import type {
  LoginCredentials,
  LoginResponse,
  LogoutResponse,
  User,
} from "../types";

export async function login(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login", credentials);

  return data;
}

export async function logout(): Promise<LogoutResponse> {
  const { data } = await api.post<LogoutResponse>("/auth/logout");

  return data;
}

export async function me(): Promise<User> {
  const { data } = await api.get<User>("/auth/me");

  return data;
}
