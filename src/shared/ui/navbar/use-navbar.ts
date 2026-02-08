"use client";

import { useAuth } from "@/features/auth/hooks/use-auth";

export function useNavbar() {
  const { login, logout, user } = useAuth();

  async function handleLogin(): Promise<void> {
    try {
      await login();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleLogout(): Promise<void> {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  }

  return {
    login: handleLogin,
    logout: handleLogout,
    user,
  };
}
